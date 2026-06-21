import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sales-article',
  imports: [NgStyle,RouterLink,NgClass],
  templateUrl: './sales-article.html',
  styleUrl: './sales-article.css',
})
export class SalesArticle {
  @Input() titulo:string='NVIDIA RTX 4080';
  @Input() publicado:number=5;
  @Input() estado_articulo:string='Publicado';
  @Input() precio:number=850;
  @Input() vendido:any={nombre:'Carlos M.',tiempo:'1 semana'};
}
