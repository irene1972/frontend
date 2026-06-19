import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-moderator-menu-drawer',
  imports: [RouterLink],
  templateUrl: './moderator-menu-drawer.component.html',
  styleUrl: './moderator-menu-drawer.component.css',
})
export class ModeratorMenuDrawerComponent {
  userInitials = 'MU';
  moderatorName = 'Moderator User'

  @Output() closeMenu = new EventEmitter<void>();

  ngOnInit(){
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      this.userInitials=usuario.iniciales;
      this.moderatorName=usuario.username;

    }
  }

  close(): void {
    this.closeMenu.emit();
  }
  logout(): void {
    localStorage.removeItem('usuarioBuy&Sell');
    window.location.href='/login';
  }
}
