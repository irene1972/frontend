import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SalesArticle } from '../../../molecules/cards/sales-article/sales-article';

@Component({
  selector: 'app-sales',
  imports: [SalesArticle],
  templateUrl: './sales.html',
  styleUrl: './sales.css',
})
export class Sales {
  activeTab: 'En venta' | 'Vendidos' = 'En venta';
}
