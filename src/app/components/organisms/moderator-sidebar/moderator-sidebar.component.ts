import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { RatingsService } from '../../../services/ratings-service';

@Component({
  selector: 'app-moderator-sidebar',
  imports: [RouterLink],
  templateUrl: './moderator-sidebar.component.html',
  styleUrl: './moderator-sidebar.component.css',
})
export class ModeratorSidebarComponent {
  mensaje: string = '';
  tipo: boolean = false;
  user: any = {};
  ratingsService = inject(RatingsService);
  ratings: any = {};

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(){
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
      
      this.ratingsService.getRatingsByUser(this.user.id).subscribe((data) => {
      if (data.error) {
        this.mensaje = data.error;
        return;
      } else {
        console.log(data);
        this.ratings = data;
        this.cd.detectChanges();
      }
    });

    }    
  }
}
