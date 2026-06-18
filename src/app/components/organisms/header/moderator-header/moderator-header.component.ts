import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AdminModeratorMenuDrawerComponent } from "../admin-moderator-header/admin-moderator-menu-drawer/admin-moderator-menu-drawer.component";
import { ModeratorMenuDrawerComponent } from './moderator-menu-drawer/moderator-menu-drawer.component';

@Component({
  selector: 'app-moderator-header',
  imports: [RouterLink, ModeratorMenuDrawerComponent],
  templateUrl: './moderator-header.component.html',
  styleUrl: './moderator-header.component.css',
})
export class ModeratorHeaderComponent {
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
