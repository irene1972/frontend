import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RatingsService } from '../../../../services/ratings-service';
import { ISummaryRating } from '../../../../interfaces/i-summary-rating';
import { RatingUser } from '../../../molecules/cards/rating-user/rating-user';
import { IRating } from '../../../../interfaces/i-rating';

@Component({
  selector: 'app-ratings-user',
  imports: [RatingUser],
  templateUrl: './ratings-user.html',
  styleUrl: './ratings-user.css',
})
export class RatingsUser {
  valoraciones!:ISummaryRating;
  detalleValoraciones:IRating[]=[];
  ratingsService = inject(RatingsService);

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(){
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);

      this.ratingsService.getRatingsByUser(usuario.id).subscribe({
      next: (data) => {
        console.log(data);
        this.valoraciones = data;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
        return;
      }
    });

    this.ratingsService.getDetailRatingsByUser(usuario.id).subscribe({
      next: (data) => {
        console.log(data);
        this.detalleValoraciones = data;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
        return;
      }
    });
    }

    
  }
}
