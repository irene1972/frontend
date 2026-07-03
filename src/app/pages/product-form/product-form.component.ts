import { Component, computed, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Button } from "../../components/atoms/button/button";
import { ActivatedRoute, Router } from '@angular/router';
import { NavStep } from "../../components/organisms/navs/nav-step/nav-step";
import { NavStepOptions } from '../../components/organisms/navs/nav-step/nav-step.config';
import { PhotoUploader } from "../../components/organisms/forms/photo-uploader/photo-uploader";
import { toSignal } from '@angular/core/rxjs-interop';
import { delay, map } from 'rxjs';
import { ArticlePhotosService } from '../../services/article-photos.service';
import { FormGroup, Validators, ReactiveFormsModule, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DetailForm } from '../../components/organisms/forms/detail-form/detail-form';
import { PriceForm } from '../../components/organisms/forms/price-form/price-form';
import { ArticlesService } from '../../services/articles-service';
import { IArticleDetail, IArticlePrice, INewArticleWithPhoto } from '../../interfaces/i-article';
import { ArticleStatus } from '../../enums/article-status.enum';
import { LoadingOverlay } from "../../components/molecules/loading-overlay/loading-overlay";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-form-component',
  imports: [Button, NavStep, PhotoUploader, DetailForm, PriceForm, ReactiveFormsModule, LoadingOverlay],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormPage implements OnInit{
  private userId: number = 0;
  // Query parameters
  public readonly QUERYPARAM_NONE:     string = ""
  public readonly QUERYPARAM_DETAIL:   string = "detail"
  public readonly QUERYPARAM_PRICE:    string = "price"
  public readonly QUERYPARAM_PICTURES: string = "pictures"

  // Estado de validez de cada paso (actualizado vía output de los hijos)
  protected detailValid = signal<boolean>(false);
  protected detailValue = signal<IArticleDetail | null>(null);
  protected detailShowErrors = signal(0);
  
  protected priceValid  = signal<boolean>(false);
  protected priceValue  = signal<IArticlePrice | null>(null);
  protected priceShowErrors  = signal(0);
  
  protected photosValid = signal<boolean>(false);

  protected photos = signal<(File | null)[]>([]);
  protected isValidating = signal(false);
   //Services
  private router = inject(Router);
  private actived_route = inject(ActivatedRoute);
  private article = inject(ArticlesService)
  private article_photos = inject(ArticlePhotosService)

  
  ngOnInit(): void {
    // Get user ID
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      const user = JSON.parse(usuarioString);
      this.userId = user.id
    }
    // Route to first step detail
    this.router.navigate([], {
      queryParams: { step: this.QUERYPARAM_DETAIL },
      queryParamsHandling: 'merge'
    });

    
     
  }

  // Pasos desde la URL
  protected steps = toSignal(
    this.actived_route.queryParamMap.pipe(
        map(params => params.getAll('step'))
    ),
    { initialValue:[] }
  );

  // currentStep derivado de la URL: 1 = ninguno, 2 = detail, 3 = price, 4 = pictures
  protected currentStep = computed(() => {
    if (this.steps().includes(this.QUERYPARAM_PICTURES)) return 3;
    if (this.steps().includes(this.QUERYPARAM_PRICE))    return 2;
    if (this.steps().includes(this.QUERYPARAM_DETAIL))   return 1;
    return 0;
  });

  protected loadSteps(){
      const detail:   NavStepOptions = {name:"1", label:"Detalle", query_param:this.QUERYPARAM_DETAIL};
      const price:    NavStepOptions = {name:"2", label:"Precio",  query_param:this.QUERYPARAM_PRICE};
      const pictures: NavStepOptions = {name:"3", label:"Fotos",   query_param:this.QUERYPARAM_PICTURES};
      return [detail, price, pictures];
  }

  onPhotos(photos: (File | null)[] ) {
    this.photos.set(photos);
    // Validamos que el usuario ponga almenos la foto principal
    this.photosValid.set(this.photos()[0] !== null);
  }

  protected isAllValid(): boolean {
    return this.detailValid() && this.priceValid() && this.photosValid();
  }

  protected isCurrentStepValid = computed( () =>{
    if (this.currentStep() === 1) return this.detailValid();
    if (this.currentStep() === 2) return this.priceValid();
    if (this.currentStep() === 3) return this.photosValid();
    return false;
  })

  protected nextStep() {
    // Bloquea el avance si el paso actual no es válido
    if (!this.isCurrentStepValid()) {
      if (this.currentStep() === 2) this.detailShowErrors.update(n => n + 1);
      if (this.currentStep() === 3) this.priceShowErrors.update(n => n + 1);
      return;
    }

    const last = this.steps().at(-1);
    switch (last) {
      case this.QUERYPARAM_DETAIL:
        this.addQueryParamStep(this.QUERYPARAM_PRICE)
        break;
      case this.QUERYPARAM_PRICE:
        this.addQueryParamStep(this.QUERYPARAM_PICTURES)
        break;
      case this.QUERYPARAM_PICTURES:
        this.router.navigate(['/product/published/']);
        break;
      default:
        this.addQueryParamStep(this.QUERYPARAM_DETAIL)
       
        break;
    }
  }

  protected previousStep(){
    const last = this.steps().at(-1);
    switch (last) {
      case this.QUERYPARAM_PICTURES:
        this.removeQueryParamStep(this.QUERYPARAM_PICTURES)
        break;
      case this.QUERYPARAM_PRICE:
        this.removeQueryParamStep(this.QUERYPARAM_PRICE)
        break;
      case this.QUERYPARAM_DETAIL:
        this.removeQueryParamStep(this.QUERYPARAM_DETAIL)
        break;
      default:
        break;
    }
  }


  // Añadir un query param nuevo
  addQueryParamStep(value: string) {
    const currentSteps = this.actived_route.snapshot.queryParamMap.getAll('step');
    
    // para evitar duplicados
    if (currentSteps.includes(value)) return;

    this.router.navigate([], {
      queryParams: { step: [...currentSteps, value] },
      queryParamsHandling: 'merge'
    });
  }

  removeQueryParamStep(value: string) {
    const currentSteps = this.actived_route.snapshot.queryParamMap.getAll('step');
    
    // elimina el valor del array
    const newSteps = currentSteps.filter(step => step !== value);

    this.router.navigate([], {
      queryParams: { step: newSteps },
      queryParamsHandling: 'merge'
  });
   }

  private createArticle(status: string){
    const article: INewArticleWithPhoto = {
      usuarios_id: this.userId, estado_articulo_id: status, ...this.detailValue()!, ...this.priceValue()!,
      principal_index: 0,
      photos: this.photos()
    }
    this.isValidating.set(true);
    this.article.createArticleWithPhotos(article).subscribe({
      next: (data) => {
        if (data.error) {
          return;
        } else {
          this.isValidating.set(false);
          this.router.navigate([`product/published/${data.id}`]);
      }
      },
      error: (err) => {
      
        this.isValidating.set(false);
        this.showPublishArticleError()
        console.error(err);
      }
    });
   
  }

  protected showPublishArticleError(){
    void Swal.fire({
          title: 'Publicar Artículo',
          text: 'Error en la publicación del artículo',
          icon: 'error',
    });
  }

  protected onPublish() {
    this.createArticle(ArticleStatus.PUBLISHED);
  }

  protected onSaveDraft() {
    this.createArticle(ArticleStatus.DRAFT);
  }
}
