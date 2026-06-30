import { Component, effect, input, OnInit, output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'organism-price-form',
  imports: [ReactiveFormsModule],
  templateUrl: './price-form.html',
  styleUrl: './price-form.css',
})
export class PriceForm implements OnInit {
 showErrors = input<number>(0);
 
 formValid = output<boolean>();

  priceForm = new FormGroup({
    precio: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    ubicacion: new FormControl('', Validators.required),
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
    this.priceForm.statusChanges.subscribe(() => {
      this.formValid.emit(this.priceForm.valid);
    });
  }

  markAllAsTouched(): void {
    this.priceForm.markAllAsTouched();
  }
}
