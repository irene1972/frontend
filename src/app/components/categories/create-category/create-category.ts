import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICategory } from '../../../interfaces/i-category';
import { CategoriesService } from '../../../services/categories-service';
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

  constructor(private route: ActivatedRoute, private cd: ChangeDetectorRef, private router: Router) {
    this.miForm = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
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
    this.miForm.value;

    this.categoriesService.insertCategory(this.miForm.value).subscribe((data) => {

      if (data.error) {
        Swal.fire('Ha habido un error', '', 'info');
      } else {
        //Swal.fire('Guardado!', '', 'success');
        this.router.navigate(['/admin/panel/categories']);
      }
    });
  }
}
