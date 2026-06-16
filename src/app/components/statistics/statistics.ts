import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-statistics',
  imports: [RouterLink],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css',
})

export class Statistics implements AfterViewInit {

  ngAfterViewInit() {
    new Chart('salesChart', {
      type: 'bar',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
          label: 'Ventas',
          data: [1200, 1800, 1500, 2200, 2800, 3100],
          backgroundColor: '#003594'
        }]
      }
    });
  }
}