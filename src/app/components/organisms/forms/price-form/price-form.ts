import { Component, effect, input, OnInit, output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { IArticlePrice } from '../../../../interfaces/i-article';


@Component({
  selector: 'organism-price-form',
  imports: [ReactiveFormsModule],
  templateUrl: './price-form.html',
  styleUrl: './price-form.css',
})
export class PriceForm implements OnInit {
 showErrors = input<number>(0);
 
 formValid = output<boolean>();
 formValue = output<IArticlePrice>();

  priceForm = new FormGroup({
    precio: new FormControl<number>(0, {nonNullable: true,validators:[Validators.required, Validators.min(1),Validators.pattern(/^\d+(\.\d{1,2})?$/)]}),
  });


  constructor() {
    // Cuando el padre cambia showErrors, marcamos todo como touched
    effect(() => {
      if (this.showErrors() > 0) {
        this.priceForm.markAllAsTouched();
      }
    });
  }

  ngOnInit(): void {
    this.formValid.emit(this.priceForm.valid);
    this.formValue.emit(this.priceForm.getRawValue());

    this.priceForm.statusChanges.subscribe(() => {
      this.formValid.emit(this.priceForm.valid);
    });

    this.priceForm.statusChanges.subscribe(() => {
      this.formValue.emit(this.priceForm.getRawValue());
    });

  }

  markAllAsTouched(): void {
    this.priceForm.markAllAsTouched();
  }
}
