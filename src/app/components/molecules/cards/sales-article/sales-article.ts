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
  @Input() publicado!: string | undefined;
  @Input() estado_articulo!: string;
  @Input() precio!: string;
  @Input() vendido!: string | undefined;
  @Input() articleId!: number;
  @Input() url_foto!: string;
  @Output() clicarEditar = new EventEmitter<number>();
  @Output() clicarEliminar = new EventEmitter<number>();
  @Output() clicarPausar = new EventEmitter<number>();

  editar(): void {
    this.clicarEditar.emit(this.articleId);
  }
  pausar(): void {
    this.clicarPausar.emit(this.articleId);
  }
  eliminar(): void {
    this.clicarEliminar.emit(this.articleId);
  }
}
