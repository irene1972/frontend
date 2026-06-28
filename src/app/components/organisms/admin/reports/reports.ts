import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReportsService } from '../../../../services/reports-service';
import { ArticlesService } from '../../../../services/articles-service';
import { UsersService } from '../../../../services/users-service';

@Component({
  selector: 'app-reports',
  imports: [RouterLink],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports {
  reportsService = inject(ReportsService);
  articlesService = inject(ArticlesService);
  usersService = inject(UsersService);

  reportesAgrupados: any[] = [];

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

              this.usersService.getUserById(String(articulo.usuarios_id)).subscribe({
                next: (usuario) => {
                  grupo.usuario = usuario;
                  this.cd.detectChanges();
                },
                error: (error) => {
                  console.error('Error cargando usuario:', error);
                }
              });
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

  agruparPorArticulo(reportes: any[]) {
    const grupos: any = {};

    reportes.forEach((reporte) => {
      const articuloId = reporte.articulos_id;

      if (!grupos[articuloId]) {
        grupos[articuloId] = {
          articuloId,
          totalReportes: 0,
          reportes: [],
          articulo: null,
          usuario: null
        };
      }

      grupos[articuloId].reportes.push(reporte);
      grupos[articuloId].totalReportes++;
    });

    return Object.values(grupos);
  }

  getEstadoArticulo(estado: string): string {
    const estadoNormalizado = estado?.toLowerCase();

    if (estadoNormalizado === 'publicado') return 'Publicado';
    if (estadoNormalizado === 'retirado') return 'Retirado';
    if (estadoNormalizado === 'en_revision') return 'En revisión';
    if (estadoNormalizado === 'borrador') return 'Borrador';
    if (estadoNormalizado === 'reservado') return 'Reservado';

    return estado || 'Sin estado';
  }
}
