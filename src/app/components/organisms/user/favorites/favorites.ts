import { Component } from '@angular/core';
import { IArticle } from '../../../../interfaces/i-article';
import { IUsuario } from '../../../../interfaces/i-usuario';

@Component({
  selector: 'app-favorites',
  imports: [],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  activeTab: 'articulos' | 'usuarios' = 'articulos';
  articles:IArticle[]=[];
  users:IUsuario[]=[];
  user!:IUsuario;

  ngOnInit(){
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
    }
  }
}
