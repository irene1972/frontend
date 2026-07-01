import { Component, computed, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Button } from "../../components/atoms/button/button";
import { ActivatedRoute, Router } from '@angular/router';
import { NavStep } from "../../components/organisms/navs/nav-step/nav-step";
import { NavStepOptions } from '../../components/organisms/navs/nav-step/nav-step.config';
import { PhotoUploader } from "../../components/organisms/photo-uploader/photo-uploader";
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ArticlePhotosService } from '../../services/article-photos.service';
import { FormGroup, Validators, ReactiveFormsModule, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DetailForm } from '../../components/organisms/detail-form/detail-form';
import { PriceForm } from '../../components/organisms/price-form/price-form';


@Component({
  selector: 'app-product-form-component',
  imports: [Button, NavStep, PhotoUploader, DetailForm, PriceForm, ReactiveFormsModule],
  templateUrl: './product-form-component.component.html',
  styleUrl: './product-form-component.component.css',
})
export class ProductFormComponentComponent implements OnInit{
  // Query parameters
  public readonly QUERYPARAM_NONE:     string = ""
  public readonly QUERYPARAM_DETAIL:   string = "detail"
  public readonly QUERYPARAM_PRICE:    string = "price"
  public readonly QUERYPARAM_PICTURES: string = "pictures"

  // Estado de validez de cada paso (actualizado vía output de los hijos)
  protected detailValid = signal(false);
  protected priceValid  = signal(false);
  protected photosValid = signal(false);
  protected detailShowErrors = signal(0);
  protected priceShowErrors  = signal(0);


  protected photos = signal<(File|null)[]>([]);

   //Services
  private router = inject(Router);
  private actived_route = inject(ActivatedRoute);
  private article_photos = inject(ArticlePhotosService)

  
  ngOnInit(): void {
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
    this.photosValid.set(photos.filter(p => p !== null).length >= 4);
  }

  private sendPhotos() {
    for(let photo of this.photos()) {
      if(photo){
        this.article_photos.postPhotoByArticleId(photo,1,2).subscribe({
          next: (data) => {
            if (data.error) {
              return;
            } else {
              console.log(data)
          }
          },
          error: (err) => {
            console.error(err);
            
          }
        });
      }
     
    }
  }
  protected isAllValid(): boolean {
    return this.detailValid() && this.priceValid() && this.photosValid();
  }

  protected isCurrentStepInvalid(): boolean {
    if (this.currentStep() === 1) return !this.detailValid();
    if (this.currentStep() === 2) return !this.priceValid();
    if (this.currentStep() === 3) return !this.photosValid();
    return false;
  }

  protected nextStep() {
    // Bloquea el avance si el paso actual no es válido
    if (this.isCurrentStepInvalid()) {
      if (this.currentStep() === 2) this.detailShowErrors.update(n => n + 1);
      if (this.currentStep() === 3) this.priceShowErrors.update(n => n + 1);
      return;
    }

    const last = this.steps().at(-1);
    console.log(last)
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
}
