import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SalesArticle } from '../../../molecules/cards/sales-article/sales-article';
import { IArticle } from '../../../../interfaces/i-article';
import { ArticlesService } from '../../../../services/articles-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sales',
  imports: [SalesArticle],
  templateUrl: './sales.html',
  styleUrl: './sales.css',
})
export class Sales {
  vendido: any = { nombre: 'Carlos M.', tiempo: '1 semana' };
  activeTab: 'En venta' | 'Vendidos' = 'En venta';
  articlesService = inject(ArticlesService);
  articulos: IArticle[] = [];
  articulos_filtrados:IArticle[]=[];

  constructor(private cd: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    this.cd.detectChanges();

    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      const user = JSON.parse(usuarioString);

      this.articlesService.getArticlesByUser(Number(user.id)).subscribe({
        next: (data) => {
          this.articulos = data;
          this.articulos_filtrados=this.articulos.filter(
            (a) => a.estado_articulo_id === 'Vendido'
          );

          this.cd.detectChanges();
        },
        error: (error) => {
          console.error('Error cargando artículo:', error);
        }
      });
    }

  }

  tiempoTranscurrido(fechaInicio: string | undefined): string | undefined {
    const ahora = new Date();
    if (fechaInicio) {

      const diferenciaMs = ahora.getTime() - new Date(fechaInicio).getTime();

      const segundos = Math.floor(diferenciaMs / 1000);
      const minutos = Math.floor(segundos / 60);
      const horas = Math.floor(minutos / 60);
      const dias = Math.floor(horas / 24);
      const semanas = Math.floor(dias / 7);
      const meses = Math.floor(dias / 30.44);
      const anios = Math.floor(dias / 365.25);

      if (anios > 0) return `${anios} ${anios === 1 ? 'año' : 'años'}`;
      if (meses > 0) return `${meses} ${meses === 1 ? 'mes' : 'meses'}`;
      if (semanas > 0) return `${semanas} ${semanas === 1 ? 'semana' : 'semanas'}`;
      if (dias > 0) return `${dias} ${dias === 1 ? 'día' : 'días'}`;
      if (horas > 0) return `${horas} ${horas === 1 ? 'hora' : 'horas'}`;
      if (minutos > 0) return `${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;

      return `${segundos} ${segundos === 1 ? 'segundo' : 'segundos'}`;
    }else{
      return `indefinido`;
    }
  }

  editar(id: number): void {
    this.router.navigate(['/user/panel/article/edit', id]);
  }
  
  eliminar(id: number) {
      Swal.fire({
        title: '¿Estás seguro de eliminar el artículo?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: '#ff0000',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.articlesService.deleteArticle(id).subscribe((data) => {
  
            if (data.error) {
              Swal.fire('Ha habido un error', '', 'info');
            } else {
              /*Swal.fire('Eliminado!', '', 'success');*/
              window.location.reload();
              
  
            }
          });
        }
      });
    }
  pausar(id: number): void {
  }
}
