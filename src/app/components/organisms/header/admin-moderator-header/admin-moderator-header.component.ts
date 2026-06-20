import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AdminModeratorMenuDrawerComponent } from './admin-moderator-menu-drawer/admin-moderator-menu-drawer.component';

@Component({
  selector: 'app-admin-moderator-header',
  imports: [RouterLink, AdminModeratorMenuDrawerComponent],
  templateUrl: './admin-moderator-header.component.html',
  styleUrl: './admin-moderator-header.component.css',
})
export class AdminModeratorHeaderComponent {
  userInitials:string = '';
  
  isMenuOpen = false;

  ngOnInit(){
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      this.userInitials=usuario.iniciales;

    }
  }

  openMenu(): void {
    this.isMenuOpen = true;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
    
}
