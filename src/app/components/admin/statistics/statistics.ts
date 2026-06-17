import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { StatisticsService } from '../../../services/statistics-service';

@Component({
  selector: 'app-statistics',
  imports: [RouterLink],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})

export class Statistics {
  mensaje: string = '';
  tipo: boolean = false;
  estadisticas: any = {};
  ventas:any={};
  statisticsService = inject(StatisticsService);

  chart?: Chart;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    const periodo:string='1m';
    this.statisticsService.getStatisticsByPeriod(periodo)
      .subscribe(data => {

        this.estadisticas = data;
        this.cd.detectChanges();

        setTimeout(() => {
          this.crearGrafico();
        });
      });

      const meses:number=6;
      this.statisticsService.getMonthlySales(meses)
      .subscribe(data => {

        this.ventas = data;
        this.cd.detectChanges();

        setTimeout(() => {
          this.crearGrafico();
        });
      });
  }

  crearGrafico() {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('salesChart', {
      type: 'bar',
      data: {
        labels: this.ventas.data.labels,
        datasets: [{
          label: this.ventas.data.datasets[0].label,
          data: this.ventas.data.datasets[0].data,
          backgroundColor: '#003594'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}