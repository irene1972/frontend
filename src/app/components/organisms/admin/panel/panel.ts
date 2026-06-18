import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { StatisticsService } from '../../../../services/statistics-service';

@Component({
  selector: 'app-panel',
  imports: [RouterLink],
  templateUrl: './panel.html',
  styleUrl: './panel.css',
})
export class Panel {
  statisticsService = inject(StatisticsService);
  estadisticas: any = {};

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
