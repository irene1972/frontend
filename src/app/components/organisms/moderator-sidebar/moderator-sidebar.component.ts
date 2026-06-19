import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-moderator-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './moderator-sidebar.component.html',
  styleUrl: './moderator-sidebar.component.css',
})
export class ModeratorSidebarComponent {
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
