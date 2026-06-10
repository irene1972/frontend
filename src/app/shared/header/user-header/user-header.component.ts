import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { UserMenuDrawerComponent } from './user-menu-drawer/user-menu-drawer.component';

@Component({
  selector: 'app-user-header',
  imports: [RouterLink, UserMenuDrawerComponent],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css',
})
export class UserHeaderComponent {

  userInitials = 'AA';
  isMenuOpen = false;

  openMenu(): void {
    this.isMenuOpen = true;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

}
