import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Icon } from '../../../atoms/icon/icon';
import { Button } from '../../../atoms/button/button';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../../../services/favorites-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favorite-article',
  imports: [Icon,Button,RouterLink],
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

  favoritesService = inject(FavoritesService);

  onClick():void {
  this.clicar.emit(this.articleId);
}
  removerFavorito(){
    console.log(this.articleId);
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      //
      this.favoritesService.deleteFavoriteByArticleIdAndUserId(this.articleId,usuario.id).subscribe({
                next: (data) => {
                  /*Swal.fire('Eliminado!', '', 'success');*/
                  window.location.reload();
                },
                error: (err) => {
                  console.error(err);
                  Swal.fire('Ha habido un error', '', 'info');
      
                }
              });
    }
    
  }
}
