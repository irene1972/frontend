import { Component, computed, inject, signal } from '@angular/core';
import { Button } from "../../components/atoms/button/button";
import { ActivatedRoute, Router } from '@angular/router';
import { NavStep } from "../../components/organisms/navs/nav-step/nav-step";
import { NavStepOptions } from '../../components/organisms/navs/nav-step/nav-step.config';
import { PhotoUploader } from "../../components/organisms/photo-uploader/photo-uploader";
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ArticlePhotosService } from '../../services/article-photos.service';
import { FormGroup, Validators, ReactiveFormsModule, FormControl, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-product-form-component',
  imports: [Button, NavStep, PhotoUploader, ReactiveFormsModule],
  templateUrl: './product-form-component.component.html',
  styleUrl: './product-form-component.component.css',
})
export class ProductFormComponentComponent {
  // Query parameters
  public readonly QUERYPARAM_NONE:     string = ""
  public readonly QUERYPARAM_DETAIL:   string = "detail"
  public readonly QUERYPARAM_PRICE:    string = "price"
  public readonly QUERYPARAM_PICTURES: string = "pictures"

  protected photos = signal<(File|null)[]>([]);

   //Services
  private router = inject(Router);
  private actived_route = inject(ActivatedRoute);
  private article_photos = inject(ArticlePhotosService)

  // Step 1: Datos del artículo
  dataForm = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    categoria: new FormControl('', Validators.required),
    estado: new FormControl('nuevo', Validators.required),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  // Step 2: Precio y ubicación
  priceForm = new FormGroup({
    precio: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    ubicacion: new FormControl('', Validators.required),
  });

  // Step 3: Fotos
  photoForm = new FormGroup({
    files: new FormControl<File[]>([], [Validators.required, this.minPhotosValidator(4)]),
  });

  // Validador custom: exige un mínimo de fotos
  private minPhotosValidator(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const files = (control.value ?? []) as File[];
      return files.length >= min ? null : { minPhotos: { required: min, actual: files.length } };
    };
  }

  dataFormStatus = toSignal(this.dataForm.statusChanges, { initialValue: this.dataForm.status });
  priceFormStatus = toSignal(this.priceForm.statusChanges, { initialValue: this.priceForm.status });
  photosFormStatus = toSignal(this.photoForm.statusChanges, { initialValue: this.photoForm.status });



  protected loadSteps(){
      const detail:   NavStepOptions = {name:"1", label:"Detalle", query_param:this.QUERYPARAM_DETAIL};
      const price:    NavStepOptions = {name:"2", label:"Precio",  query_param:this.QUERYPARAM_PRICE};
      const pictures: NavStepOptions = {name:"3", label:"Fotos",   query_param:this.QUERYPARAM_PICTURES};
      return [detail, price, pictures];
  }

  protected steps = toSignal(
    this.actived_route.queryParamMap.pipe(
        map(params => params.getAll('step'))
    ),
    { initialValue:[] }
  );

  protected currentStep = computed(() => {
    if (this.steps().includes(this.QUERYPARAM_PICTURES)) return 4;
    if (this.steps().includes(this.QUERYPARAM_PRICE)) return 3;
    if (this.steps().includes(this.QUERYPARAM_DETAIL)) return 2;
    return 1;
  });


  onPhotos(photos: (File | null)[] ) {
    this.photos.set(photos);
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

  protected nextStep() {
    const last = this.steps().at(-1);
    console.log(last)
    switch (last) {
      case this.QUERYPARAM_DETAIL:
        this.addQueryParamStep(this.QUERYPARAM_PRICE)
        break;
      case this.QUERYPARAM_PRICE:
        this.addQueryParamStep(this.QUERYPARAM_PICTURES)
        this.sendPhotos();
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

  isCurrentStepInvalid(): boolean {
    
    const status =
      this.currentStep() === 2 ? this.dataFormStatus() :
      this.currentStep() === 3 ? this.priceFormStatus() :
      this.currentStep() === 4 ? this.photosFormStatus() :
      'VALID';

    console.log(this.currentStep())
    console.log(status)
    return status === 'INVALID';
  }


}
