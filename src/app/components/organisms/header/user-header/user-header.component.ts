import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { UserMenuDrawerComponent } from './user-menu-drawer/user-menu-drawer.component';
import { Icon } from '../../../atoms/icon/icon';

@Component({
  selector: 'app-user-header',
  imports: [RouterLink, UserMenuDrawerComponent, Icon],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css',
})
export class UserHeaderComponent {

  userInitials:string = '';
  isMenuOpen = false;

  ngOnInit(){
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      this.userInitials=usuario.iniciales;

    }
  }

  openMenu(): void {
    this.isMenuOpen = true;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

}
