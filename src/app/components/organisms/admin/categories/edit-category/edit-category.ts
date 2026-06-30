import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../../../../../interfaces/i-category';
import { CategoriesService } from '../../../../../services/categories-service';
import { Breadcrum } from '../../../../molecules/breadcrum/breadcrum';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule, Breadcrum],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  id: string = '';
  categoria!: ICategory;
  categoriesService = inject(CategoriesService);
  imagenFile!: File | null;

  constructor(private route: ActivatedRoute, private cd: ChangeDetectorRef, private router: Router) {
    this.miForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      imagen: new FormControl('', []),
    }, []);
  }

  get nombre() {
    return this.miForm.get('nombre');
  }

  get descripcion() {
    return this.miForm.get('descripcion');
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.categoriesService.getCategoryById(Number(this.id)).subscribe({
      next: (data) => {
        if (data.error) {
          this.mensaje = data.error;
          return;
        } else {
          this.categoria = data;
          this.cd.detectChanges();
          this.miForm.patchValue({
            nombre: this.categoria?.nombre,
            descripcion: this.categoria?.descripcion
          });


        }
      },
      error: (err) => {
        console.error(err);

      }
    });
  }
  loadData() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    

    const formData = new FormData();

    formData.append('nombre', this.miForm.value.nombre);
    formData.append('descripcion', this.miForm.value.descripcion);

    if (this.imagenFile) {
      formData.append('icono', this.imagenFile);
    }
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    } 

        this.categoriesService.updateCategory(Number(this.id),formData).subscribe({
          next: (data) => {
            if (data.error) {
            this.mensaje = data.error;
            return;
          } else {
            this.mensaje=data.mensaje;
            window.location.href='/admin/panel/categories';
          }
          },
          error: (err) => {
            console.error(err);
            
          }
        });
        
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.imagenFile = input.files[0];
      
    }
  }
  protected breadcrumbItems = computed(() => [
    { label: 'Panel', route: '/admin/panel/' },
    { label: 'Categorías', route: '/admin/panel/categories' },
    { label: 'Editar', route: '/admin/panel/categories/edit' }
  ]);

}
