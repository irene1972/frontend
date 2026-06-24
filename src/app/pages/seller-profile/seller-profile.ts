import { Component, computed, inject, input, signal } from '@angular/core';
import { Sidebar } from '../../components/organisms/sidebar/sidebar';
import { SidebarVariant } from '../../components/organisms/sidebar/sidebar.config';
import { Breadcrum } from "../../components/molecules/breadcrum/breadcrum";
import { UserContact } from "../../components/molecules/user-contact/user-contact";
import { StatusCard } from "../../components/molecules/cards/status-card/status-card";
import { NavTab } from '../../components/molecules/nav-tab/nav-tab';
import { NavTabOptions } from '../../components/molecules/nav-tab/nav-tab.config';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ArticleCard } from "../../components/molecules/cards/article-card/article-card";

@Component({
  selector: 'app-seller-profile',
  imports: [Sidebar, Breadcrum, UserContact, StatusCard, NavTab, ArticleCard],
  templateUrl: './seller-profile.html',
  styleUrl: './seller-profile.css',
})
export class SellerProfile {
  //Input
  public userID = input<string>();
  public readonly QUERYPARAM_ON_SELL: string = "on_sell"
  public readonly QUERYPARAM_RATINGS: string = "ratings"

  private router = inject(Router);
  private actived_route = inject(ActivatedRoute);
  protected articles = signal<number[]>([1,2,3,4,5,6,7,8,9]);
  
 
  //Servicios
  public role = input<SidebarVariant>('user');
  
  user: any = {};

  

  ngOnInit() { 

    this.router.navigate([], {
        queryParams: { tab: this.QUERYPARAM_ON_SELL },
        queryParamsHandling: 'merge'  // conserva otros query params existentes
    });

    
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

  protected sellerTabs() {
    const selling: NavTabOptions = {name:"En Venta",query_param:this.QUERYPARAM_ON_SELL, notify:"0"};
    const ratings: NavTabOptions = {name:"Valoraciones",query_param:this.QUERYPARAM_RATINGS, notify:"0"};

    return [selling, ratings]
  }

  activeTab = toSignal(
    this.actived_route.queryParamMap.pipe(
        map(params => params.get('tab'))
    )
  );

}
