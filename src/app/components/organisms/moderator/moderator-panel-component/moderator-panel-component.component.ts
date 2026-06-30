import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ReportsService } from '../../../../services/reports-service';
import { StatusCard } from '../../../molecules/cards/status-card/status-card';
import { ManagementCard } from '../../../molecules/cards/management-card/management-card';

@Component({
  selector: 'app-moderator-panel-component',
  imports: [StatusCard, ManagementCard],
  templateUrl: './moderator-panel-component.component.html',
  styleUrl: './moderator-panel-component.component.css',
})
export class ModeratorPanelComponentComponent {
  reportsService = inject(ReportsService);

  user: any = {};

  pendientes = 0;
  resueltos = 0;
  abiertosHoy = 0;

  constructor(private cd: ChangeDetectorRef){}

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');

    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
    }

    this.reportsService.getAllReports().subscribe({
      next: (reportes) => {
        console.log('Reportes:', reportes);
      
        const hoy = new Date().toISOString().split('T')[0];
      
        this.pendientes = reportes.filter((reporte: any) => {
          const estado = reporte.estado?.toLowerCase();
        
          return estado === 'pendiente' || estado === 'revisado';
        }).length;
      
        this.resueltos = reportes.filter((reporte: any) => {
          const estado = reporte.estado?.toLowerCase();
        
          return estado === 'aceptado' || estado === 'descartado';
        }).length;
      
        this.abiertosHoy = reportes.filter((reporte: any) =>
          reporte.created_at?.split('T')[0] === hoy
        ).length;

        this.cd.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando reportes:', error);
      }
    });
  }
}
