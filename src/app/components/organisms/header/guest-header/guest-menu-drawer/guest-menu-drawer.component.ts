import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-guest-menu-drawer',
  imports: [RouterLink],
  templateUrl: './guest-menu-drawer.component.html',
  styleUrl: './guest-menu-drawer.component.css',
})
export class GuestMenuDrawerComponent {

  @Output() closeMenu = new EventEmitter<void>();

  close(): void {
    this.closeMenu.emit();
  }

}
