import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-admin-moderator-menu-drawer',
  imports: [RouterLink],
  templateUrl: './admin-moderator-menu-drawer.component.html',
  styleUrl: './admin-moderator-menu-drawer.component.css',
})
export class AdminModeratorMenuDrawerComponent {
  userInitials = 'AU';
  adminName = 'Admin User'

  @Output() closeMenu = new EventEmitter<void>();

  ngOnInit(){
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      this.userInitials=usuario.iniciales;
      this.adminName=usuario.username;

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
