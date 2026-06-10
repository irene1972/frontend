import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type UserRole = 'guest' | 'user' | 'moderator' | 'admin';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isLogged = true;
  role: UserRole = 'guest';

  userInitials = 'AA';

  get isGuest(): boolean {
    return !this.isLogged || this.role === 'guest';
  }

  get isUser(): boolean {
    return this.isLogged && this.role === 'user';
  }
  get isStaff(): boolean {
    return this.isLogged && (this.role === 'moderator' || this.role === 'admin');
  }

}
