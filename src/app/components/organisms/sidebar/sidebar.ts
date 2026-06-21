import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderProfile } from '../../molecules/header-profile/header-profile';
import { SidebarVariant } from './sidebar.config';

@Component({
  selector: 'organism-sidebar',
  imports: [RouterLink, RouterLinkActive, HeaderProfile],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  public role = input<SidebarVariant>('user');
  
  user: any = {};

  ngOnInit(){
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
    }    
  }

  logout(): void {
    localStorage.removeItem('usuarioBuy&Sell');
    window.location.href = '/login';
  }
}




