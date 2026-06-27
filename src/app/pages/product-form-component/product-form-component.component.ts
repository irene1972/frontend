import { Component, inject, signal } from '@angular/core';
import { Button } from "../../components/atoms/button/button";
import { ActivatedRoute, Router } from '@angular/router';
import { NavStep } from "../../components/organisms/navs/nav-step/nav-step";
import { NavStepOptions } from '../../components/organisms/navs/nav-step/nav-step.config';

@Component({
  selector: 'app-product-form-component',
  imports: [Button, NavStep],
  templateUrl: './product-form-component.component.html',
  styleUrl: './product-form-component.component.css',
})
export class ProductFormComponentComponent {
  public readonly QUERYPARAM_NONE:     string = ""
  public readonly QUERYPARAM_DETAIL:   string = "detail"
  public readonly QUERYPARAM_PRICE:    string = "price"
  public readonly QUERYPARAM_PICTURES: string = "pictures"
  
   //Services
  private router = inject(Router);
  private actived_route = inject(ActivatedRoute);

  protected loadSteps(){
      const detail: NavStepOptions = {name:"1", label:"DETALLE", query_param:this.QUERYPARAM_DETAIL};
      const price: NavStepOptions = {name:"2", label:"PRECIO", query_param:this.QUERYPARAM_PRICE};
      const pictures: NavStepOptions = {name:"3", label:"FOTOS", query_param:this.QUERYPARAM_PICTURES};
      return [detail, price, pictures];
  }

  protected currentStep = signal<string>("");

  protected nextStep() {

    const steps = this.actived_route.snapshot.queryParamMap.getAll('step');
    const last = steps.at(-1)
    switch (last) {
      case this.QUERYPARAM_DETAIL:
        this.addQuerypParamStep(this.QUERYPARAM_PRICE)
        this.currentStep.set(this.QUERYPARAM_PRICE);
        break;
      case this.QUERYPARAM_PRICE:
        this.addQuerypParamStep(this.QUERYPARAM_PICTURES)
        this.currentStep.set(this.QUERYPARAM_PICTURES);
        break;
      case this.QUERYPARAM_PICTURES:
        break;
      default:
        this.addQuerypParamStep(this.QUERYPARAM_DETAIL)
        this.currentStep.set(this.QUERYPARAM_DETAIL);
        // código si no coincide ningún caso
        break;
    }
  }

  protected previousStep(){
    const steps = this.actived_route.snapshot.queryParamMap.getAll('step');
    const last = steps.at(-1)
    
    switch (last) {
      case this.QUERYPARAM_PICTURES:
        this.removeQueryParamStep(this.QUERYPARAM_PICTURES)
        this.currentStep.set(this.QUERYPARAM_PRICE);
        break;
      case this.QUERYPARAM_PRICE:
        this.removeQueryParamStep(this.QUERYPARAM_PRICE)
        this.currentStep.set(this.QUERYPARAM_DETAIL);
        break;
      case this.QUERYPARAM_DETAIL:
        this.removeQueryParamStep(this.QUERYPARAM_DETAIL)
        this.currentStep.set(this.QUERYPARAM_NONE);
        break;
      default:
        this.currentStep.set(this.QUERYPARAM_NONE);
        // código si no coincide ningún caso
        break;
    }
  }


  // Añadir un query param nuevo
  addQuerypParamStep(value: string) {
    const currentSteps = this.actived_route.snapshot.queryParamMap.getAll('step');
    
    // evita duplicados
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
