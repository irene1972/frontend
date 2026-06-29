import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { ReportsService } from '../../../../services/reports-service';
import { ArticlesService } from '../../../../services/articles-service';

@Component({
  selector: 'app-incidents-component',
  imports: [RouterLink],
  templateUrl: './incidents-component.component.html',
  styleUrl: './incidents-component.component.css',
})
export class IncidentsComponentComponent {
  reportsService = inject(ReportsService);
  articlesService = inject(ArticlesService);
  router = inject(Router);

  reportesAgrupados: any[] = [];

  paginaActual = 1;
  reportesPorPagina = 10;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.cargarReportes();
  }

  cargarReportes() {
    this.reportsService.getAllReports().subscribe({
      next: (reportes) => {
        this.reportesAgrupados = this.agruparPorArticulo(reportes);

        this.reportesAgrupados.forEach((grupo: any) => {
          this.articlesService.getArticleById(grupo.articuloId).subscribe({
            next: (articulo) => {
              grupo.articulo = articulo;
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
        console.error('Error cargando reportes:', error);
      }
    });
  }

  agruparPorArticulo(reportes: any[]): any[] {
    const grupos: any = {};

    reportes.forEach((reporte) => {
      const articuloId = reporte.articulos_id;

      if (!grupos[articuloId]) {
        grupos[articuloId] = {
          articuloId,
          totalReportes: 0,
          reportes: [],
          estadoGeneral: 'Pendiente'
        };
      }

      grupos[articuloId].reportes.push(reporte);
      grupos[articuloId].totalReportes++;
    });

    return Object.values(grupos)
      .filter((grupo: any) =>
        grupo.reportes.some((reporte: any) => {
          const estado = reporte.estado?.toLowerCase();
          return estado === 'pendiente' || estado === 'revisado';
        })
      )
      .map((grupo: any) => {
        const tieneRevisado = grupo.reportes.some((reporte: any) =>
          reporte.estado?.toLowerCase() === 'revisado'
        );

        return {
          ...grupo,
          estadoGeneral: tieneRevisado ? 'En revisión' : 'Pendiente'
        };
      });
  }

  get reportesPaginados() {
    const inicio = (this.paginaActual - 1) * this.reportesPorPagina;
    const fin = inicio + this.reportesPorPagina;

    return this.reportesAgrupados.slice(inicio, fin);
  }

  get totalPaginas() {
    return Math.ceil(this.reportesAgrupados.length / this.reportesPorPagina);
  }

  get paginas() {
    return Array.from({ length: this.totalPaginas }, (_, index) => index + 1);
  }

  cambiarPagina(pagina: number) {
    if (pagina < 1 || pagina > this.totalPaginas) return;

    this.paginaActual = pagina;
  }

  paginaAnterior() {
    this.cambiarPagina(this.paginaActual - 1);
  }

  paginaSiguiente() {
    this.cambiarPagina(this.paginaActual + 1);
  }

  abrirReporte(grupo: any) {
    this.router.navigate(['/moderator/panel/incident', grupo.articuloId]);
  }
}