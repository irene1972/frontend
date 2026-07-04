import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { IArticle } from '../../../../interfaces/i-article';
import { IUsuario } from '../../../../interfaces/i-usuario';
import { Router } from '@angular/router';
import { FavoriteArticle } from '../../../molecules/cards/favorite-article/favorite-article';
import { FavoritesService } from '../../../../services/favorites-service';
import { IFavorite } from '../../../../interfaces/i-favorite';
import { IFavoriteUser } from '../../../../interfaces/i-favorite-user';

@Component({
  selector: 'app-favorites',
  imports: [FavoriteArticle],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  activeTab: 'articulos' | 'usuarios' = 'articulos';
  articles:IArticle[]=[];
  users:IUsuario[]=[];
  user!:IUsuario;
  favoritesService = inject(FavoritesService);
  favoritos: IFavorite[] = [];
  usuarios:IFavoriteUser[]=[];

  constructor(private router: Router,private cd: ChangeDetectorRef) {}

  ngOnInit(){
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);

      this.favoritesService.getAllFavoritesByUser(Number(this.user.id)).subscribe({
        next: (data) => {
          this.favoritos = data;

          this.cd.detectChanges();
        },
        error: (error) => {
          console.error('Error cargando artículo:', error);
        }
      });

      this.favoritesService.getAllFavoritesUsersByUser(Number(this.user.id)).subscribe({
        next: (data) => {
          this.usuarios = data;

          this.cd.detectChanges();
        },
        error: (error) => {
          console.error('Error cargando artículo:', error);
        }
      });
    }
  }
  irADetalleUsuario(id:number):void{
    this.router.navigate(['/usuario/detalle',id]);
  }
  irADetalleArticulo(id:number):void{
    this.router.navigate(['/product',id]);
  }
}
