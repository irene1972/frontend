import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sales-article',
  imports: [RouterLink,NgClass],
  templateUrl: './sales-article.html',
  styleUrl: './sales-article.css',
})
export class SalesArticle {
  @Input() titulo!:string;
  @Input() publicado!:string;
  @Input() estado_articulo!:string;
  @Input() precio!:string;
  @Input() vendido!:any;
}
