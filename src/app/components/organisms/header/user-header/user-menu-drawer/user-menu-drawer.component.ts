import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { RouterLink } from "@angular/router";
import { RatingsService } from '../../../../../services/ratings-service';

@Component({
  selector: 'app-user-menu-drawer',
  imports: [RouterLink],
  templateUrl: './user-menu-drawer.component.html',
  styleUrl: './user-menu-drawer.component.css',
})
export class UserMenuDrawerComponent {

  userInitials = 'UN';
  userName = "User Name"
  userRating = 0
  ratingsService = inject(RatingsService);

  @Output() closeMenu = new EventEmitter<void>();

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(){
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      this.userInitials=usuario.iniciales;
      this.userName=usuario.username;

      this.ratingsService.getAverageRatingsByUser(usuario.id).subscribe((data) => {
      if (data.error) {
        console.log(data.error);
        return;
      } else {
        console.log(data);
        this.userRating = data.puntuacion_media.toFixed(1);
        this.cd.detectChanges();
      }
    });

    }
  }

  closeMenuOnly(): void {
    this.closeMenu.emit();
  }

  logout(): void {
    localStorage.removeItem('usuarioBuy&Sell');
    window.location.href = '/login';
  }

}
