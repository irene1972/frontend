import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-moderator-menu-drawer',
  imports: [RouterLink],
  templateUrl: './moderator-menu-drawer.component.html',
  styleUrl: './moderator-menu-drawer.component.css',
})
export class ModeratorMenuDrawerComponent {
  user: any = {};

  @Output() closeMenu = new EventEmitter<void>();

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
    }
  }

  close(): void {
    this.closeMenu.emit();
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }
}
