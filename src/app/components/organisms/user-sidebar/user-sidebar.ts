import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RatingsService } from '../../../services/ratings-service';

@Component({
  selector: 'app-user-sidebar',
  imports: [RouterLink],
  templateUrl: './user-sidebar.html',
  styleUrl: './user-sidebar.css',
})
export class UserSidebar {
  mensaje: string = '';
  tipo: boolean = false;
  user: any = {};
  ratingsService = inject(RatingsService);
  ratings: any = {};
  puntuacion_media = '';

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);

      this.ratingsService.getAverageRatingsByUser(this.user.id).subscribe({
        next: (data) => {
          if (data.error) {
            this.mensaje = data.error;
            return;
          } else {
            this.ratings = data;
            this.puntuacion_media = this.ratings.puntuacion_media.toFixed(1);
            this.cd.detectChanges();
          }
        },
        error: (err) => {
          console.error(err);

        }
      });


    }
  }
  logout() {
    localStorage.removeItem('usuarioBuy&Sell');
    window.location.href = '/login';
  }
}
