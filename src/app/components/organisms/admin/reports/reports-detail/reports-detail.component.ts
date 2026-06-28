import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ReportsService } from '../../../../../services/reports-service';
import { ArticlesService } from '../../../../../services/articles-service';


@Component({
  selector: 'app-reports-detail',
  imports: [RouterLink],
  templateUrl: './reports-detail.component.html',
  styleUrl: './reports-detail.component.css',
})
export class ReportsDetailComponent {
  route = inject(ActivatedRoute);
  reportsService = inject(ReportsService);
  articlesService = inject(ArticlesService);

  articuloId!: number;
  articulo: any = null;
  reportesArticulo: any[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.articuloId = Number(this.route.snapshot.paramMap.get('articuloId'));

    this.cargarArticulo();
    this.cargarReportes();
  }

  cargarArticulo() {
    this.articlesService.getArticleById(this.articuloId).subscribe({
      next: (articulo) => {
        this.articulo = articulo;
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando artículo:', error);
      }
    });
  }

  cargarReportes() {
    this.reportsService.getAllReports().subscribe({
      next: (reportes) => {
        this.reportesArticulo = reportes.filter((reporte: any) =>
          Number(reporte.articulos_id) === Number(this.articuloId)
        );

        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando reportes:', error);
      }
    });
  }

  getEstadoFront(estado: string): string {
    const estadoNormalizado = estado?.toLowerCase();

    if (estadoNormalizado === 'pendiente') return 'Pendiente';
    if (estadoNormalizado === 'revisado') return 'En revisión';
    if (estadoNormalizado === 'aceptado') return 'Aceptado';
    if (estadoNormalizado === 'descartado') return 'Descartado';

    return estado;
  }

  getFecha(fecha: string): string {
    if (!fecha) return '';

    const fechaReporte = new Date(fecha);
    const hoy = new Date();

    const mismoDia =
      fechaReporte.getDate() === hoy.getDate() &&
      fechaReporte.getMonth() === hoy.getMonth() &&
      fechaReporte.getFullYear() === hoy.getFullYear();

    if (mismoDia) {
      return `Hoy ${fechaReporte.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      })}`;
    }

    return fechaReporte.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short'
    });
  }
}
