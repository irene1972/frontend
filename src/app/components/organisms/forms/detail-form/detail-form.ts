import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IArticleDetail } from '../../../../interfaces/i-article';
import { CategoriesService } from '../../../../services/categories-service';
import { ICategory } from '../../../../interfaces/i-category';
import { ConservationStatus } from '../../../../enums/conservation-status.enum';

@Component({
  selector: 'organism-detail-form',
  imports: [ReactiveFormsModule,],
  templateUrl: './detail-form.html',
  styleUrl: './detail-form.css',
})
export class DetailForm {
  public readonly conservStatus = Object.values(ConservationStatus);;

  public showErrors = input<number>(0);
  
  public formValid = output<boolean>();
  public formValue = output<IArticleDetail>();
  public categories = signal<ICategory[]>([]);

  
  protected dataForm = new FormGroup({ 
    titulo: new FormControl('',{nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
    categorias_id: new FormControl(0, { nonNullable: true, validators: Validators.required }),
    estado_conservacion_id: new FormControl('nuevo', { nonNullable: true, validators: Validators.required }),
    descripcion: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(10)] }),
  });

  // Services
  private serv_categories = inject(CategoriesService);

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
    this.formValue.emit(this.dataForm.getRawValue());

    this.dataForm.statusChanges.subscribe(() => {
      this.formValid.emit(this.dataForm.valid);
    });

    this.dataForm.valueChanges.subscribe(() => {
      this.formValue.emit(this.dataForm.getRawValue());
    });
    // Load Categories
    this.serv_categories.getAllCategories().subscribe({
      next: (data) => {
        if (data.error) {
          return;
        } else {
          this.categories.set(data);
        }
      },
      error: (err) => {
        console.log(err)
      }
    })

  }

  markAllAsTouched(): void {
    this.dataForm.markAllAsTouched();
  }
}

