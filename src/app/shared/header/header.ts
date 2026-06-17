import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GuestHeaderComponent } from './guest-header/guest-header.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { AdminModeratorHeaderComponent } from './admin-moderator-header/admin-moderator-header.component';

type UserRole = 'guest' | 'user' | 'moderator' | 'admin';

@Component({
  selector: 'app-header',
  imports: [GuestHeaderComponent, UserHeaderComponent, AdminModeratorHeaderComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  isLogged = true;
  role!: UserRole;

  get isGuest(): boolean {
    return !this.isLogged || this.role === 'guest';
  }

  get isUser(): boolean {
    return this.isLogged && this.role === 'user';
  }
  get isStaff(): boolean {
    return this.isLogged && (this.role === 'moderator' || this.role === 'admin');
  }

  ngOnInit(){
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      switch(usuario.rol){
        case 'Administrador':
          this.role='admin';
          break;
        case 'Moderador':
          this.role='moderator';
          break;
        case 'Usuario':
          this.role='user';
          break;
        default:
          this.role='guest';
      }

    }else{
      this.role='guest';
    }
  }

}
