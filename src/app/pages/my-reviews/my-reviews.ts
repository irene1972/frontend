import { Component, inject, signal } from '@angular/core';
import { RatingsService } from '../../services/ratings-service';
import { Router, RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { UserRatingComment } from '../../components/molecules/user-card/user-rating-comment/user-rating-comment';
import { ValoracionConUsuario } from './my-reviews.config';
import { UsersService } from '../../services/users-service';

@Component({
  selector: 'app-my-reviews',
  imports: [UserRatingComment, RouterLink],
  templateUrl: './my-reviews.html',
  styleUrl: './my-reviews.css',
})
export class MyReviews {
  //servicios
  ratingsService = inject(RatingsService);
  userService = inject(UsersService)

  //router
  router = inject(Router)

  // variables
  reviews = signal<ValoracionConUsuario[]>([]);
  profileUser = signal<any | null>(null);

  // onInit
  ngOnInit() {
    this.loadReviews();
    this.loadAverageRating();
  }

  // === FUNCIONES ===

  // verificar logged user y obtener su id
  isLogged(){
    const raw = localStorage.getItem('usuarioBuy&Sell');
    if(!raw) {
      this.router.navigate(['/403error']);
      return false;
    } 
    const loggedUser = JSON.parse(raw);
    return loggedUser;
  }

  async loadReviews() {
    const loggedUser = this.isLogged();
    
    if(!loggedUser) return;
    const userId = loggedUser.id;
     try {
      const vals = await lastValueFrom(this.ratingsService.getRatingsByUser(userId));

      const valsConUsuario = await Promise.all(
        vals.map(async (val: any) =>{
          const usuario = await lastValueFrom(this.userService.getUserById(val.usuario_valorador_id));
          return {
            id: val.id,
            puntuacion: val.puntuacion,
            mensaje: val.mensaje,
            creada_en: new Date(val.creada_en).getTime(),
            usuario_valorador: {
              nombre: usuario.nombre,
              apellidos: usuario.apellidos,
              iniciales: `${usuario.nombre.charAt(0)}${usuario.apellidos.charAt(0)}`.toUpperCase()
          }
        };
      })
      )
      this.reviews.set(valsConUsuario);
      
     } catch (error) {
      this.router.navigate(['/500error']);
     }
  }

  async loadAverageRating() {
    const loggedUser = this.isLogged();
    if(!loggedUser) return;
    const userId = loggedUser.id;
    try {
      this.profileUser.set(await lastValueFrom(this.ratingsService.getAverageRatingsByUser(userId)));  
    } catch (error) {
      this.router.navigate(['/500error']);
    }
  }
}
