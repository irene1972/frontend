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

  close(): void {
    this.closeMenu.emit();
    localStorage.removeItem('usuarioBuy&Sell');
    window.location.reload();
  }

}
