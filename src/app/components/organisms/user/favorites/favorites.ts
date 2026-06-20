import { Component } from '@angular/core';
import { IArticle } from '../../../../interfaces/i-article';
import { IUsuario } from '../../../../interfaces/i-usuario';
import { Router, RouterLink } from '@angular/router';
import { FavoriteUser } from '../../../molecules/cards/favorite-user/favorite-user';
import { FavoriteArticle } from '../../../molecules/cards/favorite-article/favorite-article';

@Component({
  selector: 'app-favorites',
  imports: [RouterLink,FavoriteUser,FavoriteArticle],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  activeTab: 'articulos' | 'usuarios' = 'articulos';
  articles:IArticle[]=[];
  users:IUsuario[]=[];
  user!:IUsuario;

  constructor(private router: Router) {}

  ngOnInit(){
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
    }
  }
  irADetalleUsuario(id:number):void{
    this.router.navigate(['/usuario/detalle',id]);
  }
  irADetalleArticulo(id:number):void{
    this.router.navigate(['/articulo/detalle',id]);
  }
}
