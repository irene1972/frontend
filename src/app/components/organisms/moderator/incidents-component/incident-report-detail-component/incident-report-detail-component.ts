import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReportsService } from '../../../../../services/reports-service';
import { ArticlesService } from '../../../../../services/articles-service';
import { UsersService } from '../../../../../services/users-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-incident-report-detail-component',
  imports: [RouterLink, FormsModule],
  templateUrl: './incident-report-detail-component.html',
  styleUrl: './incident-report-detail-component.css',
})
export class IncidentReportDetailComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  reportsService = inject(ReportsService);
  articlesService = inject(ArticlesService);
  usersService = inject(UsersService);

  articuloId!: number;
  reporteId!: number;

  reporte: any = null;
  articulo: any = null;
  usuarioReportante: any = null;
  usuarioReportado: any = null;

  nota: string = '';

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.articuloId = Number(this.route.snapshot.paramMap.get('articuloId'));
    this.reporteId = Number(this.route.snapshot.paramMap.get('reporteId'));

    this.cargarReporte();
  }

  cargarReporte() {
    this.reportsService.getReportById(this.reporteId).subscribe({
      next: (data) => {
        this.reporte = data;

        this.cargarArticulo();
        this.cargarUsuarios();

        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando reporte:', error);
      }
    });
  }

  cargarArticulo() {
    this.articlesService.getArticleById(this.reporte.articulos_id).subscribe({
      next: (data) => {
        this.articulo = data;
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando artículo:', error);
      }
    });
  }

  cargarUsuarios() {
    this.usersService.getUserById(String(this.reporte.usuario_reportante_id)).subscribe({
      next: (data) => {
        this.usuarioReportante = data;
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando usuario reportante:', error);
      }
    });

    this.usersService.getUserById(String(this.reporte.usuario_reportado_id)).subscribe({
      next: (data) => {
        this.usuarioReportado = data;
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando usuario reportado:', error);
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

  aceptarReporte() {
    const reporteActualizado = {
      ...this.reporte,
      estado: 'Aceptado'
    };

    this.reportsService.updateReport(this.reporteId, reporteActualizado).subscribe({
      next: () => {
        this.router.navigate(['/moderator/panel/incident', this.articuloId]);
      },
      error: (error) => {
        console.error('Error aceptando reporte:', error);
      }
    });
  }

  descartarReporte() {
    const reporteActualizado = {
      ...this.reporte,
      estado: 'Descartado'
    };

    this.reportsService.updateReport(this.reporteId, reporteActualizado).subscribe({
      next: () => {
        this.router.navigate(['/moderator/panel/incident', this.articuloId]);
      },
      error: (error) => {
        console.error('Error descartando reporte:', error);
      }
    });
  }
}