import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GuestMenuDrawerComponent } from './guest-menu-drawer/guest-menu-drawer.component';

@Component({
  selector: 'app-guest-header',
  imports: [RouterLink, GuestMenuDrawerComponent],
  templateUrl: './guest-header.component.html',
  styleUrl: './guest-header.component.css',
})
export class GuestHeaderComponent {

  isMenuOpen = false;

  openMenu(): void {
    this.isMenuOpen = true;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

}
