import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { IArticle } from '../../../../interfaces/i-article';
import { IUsuario } from '../../../../interfaces/i-usuario';
import { Router, RouterLink } from '@angular/router';
import { FavoriteUser } from '../../../molecules/cards/favorite-user/favorite-user';
import { FavoriteArticle } from '../../../molecules/cards/favorite-article/favorite-article';
import { FavoritesService } from '../../../../services/favorites-service';
import { IFavorite } from '../../../../interfaces/i-favorite';

@Component({
  selector: 'app-favorites',
  imports: [FavoriteUser,FavoriteArticle],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  /*TODO: servicio para US-08bis */
  activeTab: 'articulos' | 'usuarios' = 'articulos';
  articles:IArticle[]=[];
  users:IUsuario[]=[];
  user!:IUsuario;
  favoritesService = inject(FavoritesService);
  favoritos: IFavorite[] = [];

  constructor(private router: Router,private cd: ChangeDetectorRef) {}

  ngOnInit(){
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);

      this.favoritesService.getAllFavoritesByUser(Number(this.user.id)).subscribe({
        next: (data) => {
          this.favoritos = data;
         
          console.log(this.favoritos);

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
    this.router.navigate(['/articulo/detalle',id]);
  }
}
