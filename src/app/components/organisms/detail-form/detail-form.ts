import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'organism-detail-form',
  imports: [ReactiveFormsModule],
  templateUrl: './detail-form.html',
  styleUrl: './detail-form.css',
})
export class DetailForm {
  showErrors = input<number>(0);
   
  formValid = output<boolean>();

  dataForm = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    categoria: new FormControl('', Validators.required),
    estado: new FormControl('nuevo', Validators.required),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  constructor() {
    effect(() => {
      if (this.showErrors() > 0) {
        this.dataForm.markAllAsTouched();
      }
    });
  }

   ngOnInit(): void {
    // Emite el estado inicial y en cada cambio
    this.formValid.emit(this.dataForm.valid);
    this.dataForm.statusChanges.subscribe(() => {
      this.formValid.emit(this.dataForm.valid);
    });
  }

  markAllAsTouched(): void {
    this.dataForm.markAllAsTouched();
  }
}
