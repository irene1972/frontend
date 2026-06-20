import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { ReportsService } from '../../../../services/reports-service';

@Component({
  selector: 'app-incidents-component',
  imports: [RouterLink],
  templateUrl: './incidents-component.component.html',
  styleUrl: './incidents-component.component.css',
})
export class IncidentsComponentComponent {
  reportsService = inject(ReportsService);
  router = inject(Router);

  reportes: any[] = [];

  constructor(private cd: ChangeDetectorRef){}

  ngOnInit() {
    this.cargarReportes();
  }

  cargarReportes() {
    this.reportsService.getAllReports().subscribe({
      next: (data) => {
        this.reportes = data.filter((reporte: any) => {
          const estado = reporte.estado?.toLowerCase();
          return estado === 'pendiente' || estado === 'revisado';
        });
        
        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando reportes:', error);
      }
    });
  }

  abrirReporte(reporte: any) {
    const estado = reporte.estado?.toLowerCase();

    if (estado === 'pendiente') {
      const reporteActualizado = {
        ...reporte,
        estado: 'Revisado'
      };

      this.reportsService.updateReport(reporte.id, reporteActualizado).subscribe({
        next: () => {
          this.router.navigate(['/moderator/panel/incident', reporte.id]);
        },
        error: (error) => {
          console.error('Error actualizando reporte:', error);
        }
      });
    } else {
      this.router.navigate(['/moderator/panel/incident', reporte.id]);
    }
  }

}
