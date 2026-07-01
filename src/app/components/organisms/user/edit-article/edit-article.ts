import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArticlesService } from '../../../../services/articles-service';
import { IArticle } from '../../../../interfaces/i-article';
import { CategoriesService } from '../../../../services/categories-service';
import { ICategory } from '../../../../interfaces/i-category';
import { PhotosService } from '../../../../services/photos-service';
import { IPhoto } from '../../../../interfaces/i-photo';
import { ArticlePhotoService } from '../../../../services/article-photo-service';

@Component({
  selector: 'app-edit-article',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './edit-article.html',
  styleUrl: './edit-article.css',
})
export class EditArticle {
  miForm: FormGroup;
  miForm2: FormGroup;
  mensaje: string = '';
  tipo: boolean = false;
  articlesService = inject(ArticlesService);
  articulo!: IArticle;
  categoriesService = inject(CategoriesService);
  categorias: ICategory[] = [];
  photosService = inject(PhotosService);
  fotos: IPhoto[] = [];
  id!: string;
  imagenFile!: File | null;
  articlePhotoService=inject(ArticlePhotoService);

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
    this.miForm2 = new FormGroup({
      principal: new FormControl('', []),
      imagen: new FormControl('', []),
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

    this.articlesService.getArticleById(Number(this.id)).subscribe({
      next: (data) => {
        this.articulo = data;

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

    this.articlesService.updateArticleAndCP(Number(this.id), this.miForm.value).subscribe({
      next: (data) => {
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
  onFileSelected(event: Event){
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.imagenFile = input.files[0];
      
    }
  }
  loadData2(article_id:number) {
    console.log(article_id);
    if (!this.miForm2.valid) {
      this.miForm.markAllAsTouched();
      return;
    }
    console.log(this.miForm2.value);

    const formData = new FormData();

    formData.append('principal', (this.miForm2.value.principal)?'1':'0');
    formData.append('articulos_id', article_id.toString());

    /*cambiar el nombre de icono */
    if (this.imagenFile) {
      formData.append('photo', this.imagenFile);
    }
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    } 

        this.articlePhotoService.insertFoto(formData).subscribe({
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
}
