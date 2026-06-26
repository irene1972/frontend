import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../../../services/categories-service';
import { ICategory } from '../../../../interfaces/i-category';
import Swal from 'sweetalert2';
import { Breadcrum } from '../../../molecules/breadcrum/breadcrum';

@Component({
  selector: 'app-categories',
  imports: [RouterLink, Breadcrum],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  mensaje: string = '';
  tipo: boolean = false;
  categorias: ICategory[] = [];
  categoriesService = inject(CategoriesService);

  /*paginación */
  paginaActual = 1;
  elementosPorPagina = 9;

  constructor(private cd: ChangeDetectorRef) { }

  /*Paginación */
  get categoriasPaginadas(): ICategory[] {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;

    return this.categorias.slice(inicio, fin);
  }

  get totalPaginas(): number {
    return Math.ceil(
      this.categorias.length / this.elementosPorPagina
    );
  }

  get paginas(): number[] {
    const paginas: number[] = [];

    for (let i = 1; i <= this.totalPaginas; i++) {
      paginas.push(i);
    }

    return paginas;
  }
  /************ */

  ngOnInit() {

    this.categoriesService.getAllCategories().subscribe({
      next: (data) => {
        console.log(data);
        this.categorias = data;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.mensaje = err;
        return;
      }
    });
  }

  borrar(id: number) {
    Swal.fire({
      title: '¿Estás seguro de eliminar la categoría?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#ff0000',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.categoriesService.deleteCategory(id).subscribe({
          next: (data) => {
            /*Swal.fire('Eliminado!', '', 'success');*/
            window.location.reload();
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Ha habido un error', '', 'info');

          }
        });
      }
    });
  }

  /*Paginación */
  cambiarPagina(pagina: number) {
    this.paginaActual = pagina;
  }
  /********* */

  protected breadcrumbItems = computed(() => [
    { label: 'Panel', route: '/admin/panel/' },
    { label: 'Categorías', route: 'categories' }
  ]);
}
