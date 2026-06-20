import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-admin-moderator-menu-drawer',
  imports: [RouterLink],
  templateUrl: './admin-moderator-menu-drawer.component.html',
  styleUrl: './admin-moderator-menu-drawer.component.css',
})
export class AdminModeratorMenuDrawerComponent {
  user: any = {};

  @Output() closeMenu = new EventEmitter<void>();

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
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
