import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { GuestHeaderComponent } from './guest-header/guest-header.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { AdminModeratorHeaderComponent } from './admin-moderator-header/admin-moderator-header.component';
import { ModeratorHeaderComponent } from './moderator-header/moderator-header.component';
import { filter } from 'rxjs';

type UserRole = 'guest' | 'user' | 'moderator' | 'admin';

@Component({
  selector: 'app-header',
  imports: [GuestHeaderComponent, UserHeaderComponent, AdminModeratorHeaderComponent, ModeratorHeaderComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  isLogged = true;
  role!: UserRole;

  // admin en moderador panel
  isAdminInModeratorPanel = false;

  constructor(private router: Router){}

  get isGuest(): boolean {
    return !this.isLogged || this.role === 'guest';
  }

  get isUser(): boolean {
    return this.isLogged && this.role === 'user';
  }
  get isAdmin(): boolean {
    return this.isLogged && this.role === 'admin' && !this.isAdminInModeratorPanel;
  }
  get isModerator(): boolean {
    return (this.isLogged && this.role === 'moderator') || (this.isLogged && this.role === 'admin' && this.isAdminInModeratorPanel);
  }

  ngOnInit(){
    this.setRole();
    this.checkRoute(this.router.url);

    //cambio de ruta
    this.router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe((event) => {
      this.checkRoute(event.urlAfterRedirects)
    })
  }

  private setRole(){
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

  private checkRoute(url: string){
    this.isAdminInModeratorPanel = this.role === 'admin' && url.startsWith('/moderator');
  }

}
