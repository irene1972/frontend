import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArticlesService } from '../../../../services/articles-service';
import { IArticle } from '../../../../interfaces/i-article';
import { CategoriesService } from '../../../../services/categories-service';
import { ICategory } from '../../../../interfaces/i-category';
import { PhotosService } from '../../../../services/photos-service';
import { IPhoto } from '../../../../interfaces/i-photo';

@Component({
  selector: 'app-edit-article',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './edit-article.html',
  styleUrl: './edit-article.css',
})
export class EditArticle {
  /* TODO: volver atrás */
  miForm: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  articlesService = inject(ArticlesService);
  articulo!: IArticle;
  categoriesService = inject(CategoriesService);
  categorias: ICategory[] = [];
  photosService = inject(PhotosService);
  fotos: IPhoto[] = [];
  id!: string;

  constructor(private cd: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) {
    this.miForm = new FormGroup({
      titulo: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      categoria: new FormControl('', [
        Validators.required
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      precio: new FormControl('', [
        Validators.required
      ]),
      ubicacion: new FormControl('', [
        Validators.required
      ]),
      provincia: new FormControl({ value: '', disabled: true }, [])
    }, []);
  }
  get titulo() {
    return this.miForm.get('titulo');
  }
  get categoria() {
    return this.miForm.get('categoria');
  }
  get descripcion() {
    return this.miForm.get('descripcion');
  }
  get precio() {
    return this.miForm.get('precio');
  }
  get ubicacion() {
    return this.miForm.get('ubicacion');
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log(this.id);

    this.articlesService.getArticleById(Number(this.id)).subscribe({
      next: (data) => {
        this.articulo = data;
        console.log(this.articulo);

        this.miForm.patchValue({
          titulo: this.articulo?.titulo,
          categoria: this.articulo?.categorias_id,
          descripcion: this.articulo?.descripcion,
          precio: this.articulo?.precio,
          ubicacion: this.articulo?.cp,
          provincia: this.articulo?.provincia?.nombre
        });


        this.photosService.getAllPhotosByArticle(this.articulo.id).subscribe({
          next: (data) => {
            this.fotos = data;
            console.log(this.fotos);

            this.cd.detectChanges();
          },
          error: (error) => {
            console.error('Error cargando la categoría:', error);
          }
        });

        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando artículo:', error);
      }
    });

    this.categoriesService.getAllCategories().subscribe({
      next: (data) => {
        this.categorias = data;
        console.log(this.categorias);

        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando la categoría:', error);
      }
    });



  }
  loadData() {
    if (!this.miForm.valid) {
      this.miForm.markAllAsTouched();
      return;
    }

    this.miForm.value.usuarios_id = this.articulo.usuarios_id;
    this.miForm.value.estado_conservacion_id = this.articulo.estado_conservacion_id;
    this.miForm.value.estado_articulo_id = this.articulo.estado_articulo_id;

    console.log(this.miForm.value);
    console.log(this.articulo);

    this.articlesService.updateArticleAndCP(Number(this.id), this.miForm.value).subscribe({
      next: (data) => {
        console.log('Actualizado correctamente');
        this.router.navigate(['/user/panel/sales']);
      },
      error: (error) => {
        console.error('Error cargando artículo:', error);
      }
    });

  }
  hideProvincia() {
    this.miForm.patchValue({
      provincia: ''
    });
    this.cd.detectChanges();
  }

  putProvincia() {
    if (this.miForm.value.ubicacion === this.articulo.cp) {
      this.miForm.patchValue({
        provincia: this.articulo.provincia?.nombre
      });
      this.cd.detectChanges();
    }
  }
}
