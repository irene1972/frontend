import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-user-menu-drawer',
  imports: [RouterLink],
  templateUrl: './user-menu-drawer.component.html',
  styleUrl: './user-menu-drawer.component.css',
})
export class UserMenuDrawerComponent {

  userInitials = 'UN';
  userName = "User Name"
  userRating = 4.8

  @Output() closeMenu = new EventEmitter<void>();

  closeMenuOnly(): void {
    this.closeMenu.emit();
  }

  logout(): void {
    localStorage.removeItem('usuarioBuy&Sell');
    window.location.href = '/login';
  }

}
