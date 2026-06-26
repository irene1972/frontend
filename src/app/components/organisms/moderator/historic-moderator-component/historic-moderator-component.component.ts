import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReportsService } from '../../../../services/reports-service';
import { ArticlesService } from '../../../../services/articles-service';

@Component({
  selector: 'app-historic-moderator-component',
  imports: [RouterLink],
  templateUrl: './historic-moderator-component.component.html',
  styleUrl: './historic-moderator-component.component.css',
})
export class HistoricModeratorComponentComponent {
  reportsService = inject(ReportsService);
  articlesService = inject(ArticlesService);

  user: any = {};
  historial: any[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');

    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
    }

    this.cargarHistorial();
  }

  cargarHistorial() {
    this.reportsService.getAllReports().subscribe({
      next: (reportes) => {
        this.historial = reportes
          .filter((reporte: any) => {
            const estado = reporte.estado?.toLowerCase();
            return estado === 'aceptado' || estado === 'descartado';
          })
          .sort((a: any, b: any) =>
            new Date(b.updated_at || b.created_at).getTime() -
            new Date(a.updated_at || a.created_at).getTime()
          );

        this.historial.forEach((item: any) => {
          this.articlesService.getArticleById(item.articulos_id).subscribe({
            next: (articulo) => {
              item.articulo = articulo;
              this.cd.detectChanges();
            },
            error: (error) => {
              console.error('Error cargando artículo:', error);
            }
          });
        });

        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando historial:', error);
      }
    });
  }

  getAccion(reporte: any): string {
    const estado = reporte.estado?.toLowerCase();
  
    if (estado === 'aceptado') return 'Reporte aceptado';
    if (estado === 'descartado') return 'Reporte descartado';
  
    return 'Gestionado';
  }

  getFecha(fecha: string): string {
    if (!fecha) return '';

    const date = new Date(fecha);
    const hoy = new Date();

    const esHoy = date.toDateString() === hoy.toDateString();

    const ayer = new Date();
    ayer.setDate(hoy.getDate() - 1);

    const esAyer = date.toDateString() === ayer.toDateString();

    const hora = date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });

    if (esHoy) return `Hoy ${hora}`;
    if (esAyer) return `Ayer ${hora}`;

    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short'
    });
  }
}
