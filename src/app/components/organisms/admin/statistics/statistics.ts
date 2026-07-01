import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { StatisticsService } from '../../../../services/statistics-service';
import { Breadcrum } from '../../../molecules/breadcrum/breadcrum';
import { IUsuario } from '../../../../interfaces/i-usuario';
import { UsersService } from '../../../../services/users-service';

@Component({
  selector: 'app-statistics',
  imports: [Breadcrum],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})

export class Statistics {
  mensaje: string = '';
  tipo: boolean = false;
  estadisticas: any = {};
  ventas: any = {};
  statisticsService = inject(StatisticsService);
  usuarios: IUsuario[] = [];
  usersService = inject(UsersService);

  chart?: Chart;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe({
      next: (data) => {
        if (data.error) {
          this.mensaje = data.error;
          return;
        } else {
          this.usuarios = data;
          console.log(this.usuarios);
          this.cd.detectChanges();
        }
      },
      error: (err) => {
        console.error(err);

      }
    });

    const periodo: string = '1m';
    this.statisticsService.getStatisticsByPeriod(periodo)
      .subscribe(data => {

        this.estadisticas = data;
        this.cd.detectChanges();

        setTimeout(() => {
          this.crearGrafico();
        });
      });

    const meses: number = 6;
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

  protected breadcrumbItems = computed(() => [
    { label: 'Panel', route: '/admin/panel/' },
    { label: 'Estadísticas', route: '/admin/panel/statistics' }
  ]);
}