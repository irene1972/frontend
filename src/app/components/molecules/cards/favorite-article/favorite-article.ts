import { Component, Input } from '@angular/core';
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
  @Input() ubicacion!:string;
  @Input() iniciales!:string;
  @Input() nombre!:string;
  @Input() estrellas!:string;
  @Input() valoraciones!:string;
  @Input() texto_boton!:string;
}
