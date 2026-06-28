import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../atoms/icon/icon';
import { Button } from '../../../atoms/button/button';
import { IFavoriteUser } from '../../../../interfaces/i-favorite-user';

@Component({
  selector: 'app-favorite-user',
  imports: [RouterLink,Icon,Button],
  templateUrl: './favorite-user.html',
  styleUrl: './favorite-user.css',
})
export class FavoriteUser {
  /*
  @Input() iniciales:string='US';
  @Input() nombre:string='User';
  @Input() estrellas:string='0';
  @Input() valoraciones:string='0';
  */
  @Input() texto_boton:string='Ver detalle';
  @Input() usuario!:IFavoriteUser;
  @Output() clicar = new EventEmitter<number>();

  onClick():void {
  this.clicar.emit(this.usuario.usuario_favorito_id);
}

}
