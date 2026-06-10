import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-admin-moderator-header',
  imports: [RouterLink],
  templateUrl: './admin-moderator-header.component.html',
  styleUrl: './admin-moderator-header.component.css',
})
export class AdminModeratorHeaderComponent {
  
  userInitials = 'AA';
  
  isMenuOpen = false;

  openMenu(): void {
    this.isMenuOpen = true;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
    
}
