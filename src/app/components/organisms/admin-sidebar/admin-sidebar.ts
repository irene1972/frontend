import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RatingsService } from '../../../services/ratings-service';

@Component({
  selector: 'app-admin-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.css',
})
export class AdminSidebar {
  user: any = {};

  ngOnInit(){
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
    }    
  }

  logout(): void {
    localStorage.removeItem('usuarioBuy&Sell');
    window.location.href = '/login';
  }
}
