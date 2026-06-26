import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Icon } from '../../../atoms/icon/icon';
import { Button } from '../../../atoms/button/button';

@Component({
  selector: 'app-favorite-article',
  imports: [Icon,Button],
  templateUrl: './favorite-article.html',
  styleUrl: './favorite-article.css',
})
export class FavoriteArticle {
  @Input() texto_articulo!:string;
  @Input() ubicacion!:string | undefined;
  @Input() iniciales!:string | undefined;
  @Input() nombre!:string | undefined;
  @Input() estrellas!:string | undefined;
  @Input() valoraciones!:number | undefined;
  @Input() texto_boton!:string;
  @Input() articleId!:number;
  @Input() precio!:string | undefined;
  @Input() url_foto!:string | undefined;
  @Output() clicar = new EventEmitter<number>();

  ngOnInit(){
    console.log('irene');
    console.log(this.iniciales);
  }

  onClick():void {
  this.clicar.emit(this.articleId);
}
}
