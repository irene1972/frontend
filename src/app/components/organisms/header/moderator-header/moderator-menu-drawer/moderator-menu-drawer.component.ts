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

  close(): void {
    this.closeMenu.emit();
    /*localStorage.removeItem('usuarioBuy&Sell');
    window.location.href='/login';*/
  }
}
