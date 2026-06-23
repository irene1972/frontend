import { Component, computed, input } from '@angular/core';
import { Sidebar } from '../../components/organisms/sidebar/sidebar';
import { SidebarVariant } from '../../components/organisms/sidebar/sidebar.config';
import { Breadcrum } from "../../components/molecules/breadcrum/breadcrum";
import { UserContact } from "../../components/molecules/user-contact/user-contact";
import { StatusCard } from "../../components/molecules/cards/status-card/status-card";

@Component({
  selector: 'app-seller-profile',
  imports: [ Sidebar, Breadcrum, UserContact, StatusCard],
  templateUrl: './seller-profile.html',
  styleUrl: './seller-profile.css',
})
export class SellerProfile {
  //Input
  public userID = input<string>();
  
  //Servicios
  public role = input<SidebarVariant>('user');
  
  user: any = {};

  

  ngOnInit() { 
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
    }    
    this.loadUser();
  }

  logout(): void {
    localStorage.removeItem('usuarioBuy&Sell');
    window.location.href = '/login';
  }

  //carga de producto y datos
  async loadUser() {
    const id = this.userID();
    if(!id) return;
  
  }

  protected username = computed(()=>{
    return "Carlos M.";
  }) 

  protected breadcrumbItems = () => [
    { label: 'Inicio', route: '/home' },
    { label: 'Vendedores', route: `/sellers`},
    { label: this.username(), route: `/sellers/${this.userID()}`}
  ];

}
