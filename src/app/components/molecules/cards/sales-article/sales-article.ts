import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ArticlesService } from '../../../../services/articles-service';

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

  editar(): void {
    this.clicarEditar.emit(this.articleId);
  }
  pausar(): void {
    this.clicarPausar.emit(this.articleId);
  }
  eliminar(): void {
    this.clicarEliminar.emit(this.articleId);
  }
  actualizarAVendido(articleId:number){
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
    
            this.articlesService.updateArticleVendido(articleId,{estado:'Vendido'}).subscribe({
              next: (data) => {
                Swal.fire('Actualizado!', '', 'success');
                setTimeout(()=>{
                  window.location.reload();
                },1000);
              },
              error: (err) => {
                console.error(err);
                Swal.fire('Ha habido un error', '', 'info');
    
              }
            });
            
          }
        });
  }
}
