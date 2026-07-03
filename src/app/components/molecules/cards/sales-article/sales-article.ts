import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ArticlesService } from '../../../../services/articles-service';
import { OrdersService } from '../../../../services/orders-service';

@Component({
  selector: 'app-sales-article',
  imports: [RouterLink, NgClass],
  templateUrl: './sales-article.html',
  styleUrl: './sales-article.css',
})
export class SalesArticle {
  @Input() titulo!: string;
  @Input() publicado!: string | undefined;
  @Input() estado_articulo!: string;
  @Input() precio!: string | number;
  @Input() vendido!: string | undefined;
  @Input() articleId!: number;
  @Input() url_foto!: string;
  @Output() clicarEditar = new EventEmitter<number>();
  @Output() clicarEliminar = new EventEmitter<number>();
  @Output() clicarPausar = new EventEmitter<number>();
  articlesService = inject(ArticlesService);
  ordersService = inject(OrdersService);
  pedido: any = {};

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    if (this.estado_articulo === 'Vendido') {
      this.ordersService.getLastOrderByArticleId(this.articleId).subscribe({
        next: (data) => {
          this.pedido = data;
          console.log(data);
          this.cd.detectChanges();
        },
        error: (error) => {
          console.error('Error cargando datos:', error);
        }
      });
    }

  }

  editar(): void {
    this.clicarEditar.emit(this.articleId);
  }
  pausar(): void {
    this.clicarPausar.emit(this.articleId);
  }
  eliminar(): void {
    this.clicarEliminar.emit(this.articleId);
  }
  actualizarAVendido(articleId: number) {
    Swal.fire({
      title: '¿Estás seguro de marcar este producto como vendido?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#ff0000',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(articleId);

        this.articlesService.updateArticleVendido(articleId, { estado: 'Vendido' }).subscribe({
          next: (data) => {
            Swal.fire('Actualizado!', '', 'success');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Ha habido un error', '', 'info');

          }
        });

      }
    });
  }
  modificarEstado(articleId: number, event: Event) {
    const estado = (event.target as HTMLSelectElement).value;

    console.log('Artículo:', articleId);
    console.log('Estado seleccionado:', estado);
    console.log(this.pedido.id);
    this.ordersService.updateOrder(this.pedido.id, { estado }).subscribe({
      next: (data) => {
        Swal.fire('Estado actualizado', '', 'success');
      },
      error: (error) => {
        console.error(error);
        Swal.fire('Ha habido un error', '', 'info');
      }
    });
  }
}
