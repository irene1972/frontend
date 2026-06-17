import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ICategory } from '../../../interfaces/i-category';
import { CategoriesService } from '../../../services/categories-service';

@Component({
  selector: 'app-edit-category',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  id:string='';
  categoria!: ICategory;
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

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log(this.id);
    this.categoriesService.getCategoryById(Number(this.id)).subscribe((data) => {
      console.log(data);

      if (data.error) {
        this.mensaje = data.error;
          return;
      } else {
        this.categoria = data;
        console.log(this.categoria);
        this.cd.detectChanges();
        this.miForm.patchValue({
          nombre: this.categoria?.nombre,
          descripcion: this.categoria?.descripcion
        });
       
        
      }
    });
  }
  loadData(){
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm.value);

    this.categoriesService.updateCategory(Number(this.id),this.miForm.value).subscribe((data) => {
      if (data.error) {
        this.mensaje = data.error;
        return;
      } else {
        this.mensaje=data.mensaje;
        window.location.href='/admin/panel/categories';
      }
    });
  }
}
