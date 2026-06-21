import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sales-article',
  imports: [RouterLink, NgClass],
  templateUrl: './sales-article.html',
  styleUrl: './sales-article.css',
})
export class SalesArticle {
  @Input() titulo!: string;
  @Input() publicado!: string;
  @Input() estado_articulo!: string;
  @Input() precio!: string;
  @Input() vendido!: any;
  @Input() articleId!: number;
  @Output() clicarEditar = new EventEmitter<number>();
  @Output() clicarEliminar = new EventEmitter<number>();
  @Output() clicarPausar = new EventEmitter<number>();

  editar(): void {
    this.clicarEditar.emit(this.articleId);
  }
  pausar(): void {
    console.log('hijo -> pausar');
    console.log('articleId:', this.articleId);
    this.clicarPausar.emit(this.articleId);
    console.log('EMITIDO PAUSAR');
  }
  eliminar(): void {
    this.clicarEliminar.emit(this.articleId);
  }
}
