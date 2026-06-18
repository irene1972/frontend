import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICategory } from '../../../../../interfaces/i-category';
import { CategoriesService } from '../../../../../services/categories-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-category',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-category.html',
  styleUrl: './create-category.css',
})
export class CreateCategory {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
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
      imagen: new FormControl('', [])
    }, []);
  }

  get nombre() {
    return this.miForm.get('nombre');
  }

  get descripcion() {
    return this.miForm.get('descripcion');
  }

  ngOnInit() {

  }
  loadData() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);

    const formData = new FormData();

    formData.append('nombre', this.miForm.value.nombre);
    formData.append('descripcion', this.miForm.value.descripcion);

    if (this.imagenFile) {
      formData.append('icono', this.imagenFile);
    }

    this.categoriesService.insertCategory(formData).subscribe({
      next: (data) => {
        console.log(data);

        if (data.error) {
          Swal.fire('Ha habido un error', '', 'info');
        } else {
          this.router.navigate(['/admin/panel/categories']);
        }
      },

      error: (err) => {
        console.log(err);
        Swal.fire('Ha habido un error', '', 'info');
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.imagenFile = input.files[0];
      console.log(this.imagenFile);
    }
  }
}
