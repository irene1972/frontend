import { ChangeDetectorRef, Component, inject, input } from '@angular/core';
import { StatisticsService } from '../../../../services/statistics-service';
import { StatusCard } from "../../../molecules/cards/status-card/status-card";
import { ManagementCard } from '../../../molecules/cards/management-card/management-card';

@Component({
  selector: 'app-panel',
  imports: [StatusCard, ManagementCard],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel {
  statisticsService = inject(StatisticsService);
  estadisticas: any = {};
  desktop = input<boolean>(false); 

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.statisticsService.getStatisticsByPeriod('1m').subscribe({
      next: (data) => {
        this.estadisticas = data;
        this.cd.detectChanges();
        console.log('Estadísticas:', data);
      },
      error: (error) => {
        console.error('Error al cargar estadísticas:', error);
      }
    });
  }
}
