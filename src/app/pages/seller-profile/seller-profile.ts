import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Sidebar } from '../../components/organisms/sidebar/sidebar';
import { SidebarVariant } from '../../components/organisms/sidebar/sidebar.config';
import { Breadcrum } from "../../components/molecules/breadcrum/breadcrum";
import { StatusCard } from "../../components/molecules/cards/status-card/status-card";
import { NavTab } from '../../components/molecules/nav-tab/nav-tab';
import { NavTabOptions } from '../../components/molecules/nav-tab/nav-tab.config';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ArticleCard } from '../../components/molecules/cards/article-card/article-card';
import { UserContact } from '../../components/molecules/user-card/user-contact/user-contact';
import { UserRatingComment } from "../../components/molecules/user-card/user-rating-comment/user-rating-comment";
import { UsersService } from '../../services/users-service';
import { RatingsService } from '../../services/ratings-service';
import { OrdersService } from '../../services/orders-service';
import { ArticlesService } from '../../services/articles-service';

@Component({
  selector: 'app-seller-profile',
  imports: [Sidebar, Breadcrum, UserContact, StatusCard, NavTab, ArticleCard, UserRatingComment],
  templateUrl: './seller-profile.html',
  styleUrl: './seller-profile.css',
})
export class SellerProfile {
  //Input
  public userID = input<string>("1");
  public readonly QUERYPARAM_ON_SELL: string = "on_sell"
  public readonly QUERYPARAM_RATINGS: string = "ratings"
  protected role = signal<SidebarVariant | null>(null);
  
  user: any = {}
  protected name       = signal<string>(' ');
  protected last_name  = signal<string>(' ');
  protected year       = signal<number>(0);
  protected published  = signal<string>(' ');
  protected selled     = signal<string>(' ');
  protected rating_avg = signal<string>(' ');
  protected ratings    = signal<any>(' ');
  protected articles   = signal<any[]>([]);
  

  protected routeReport  = computed(() => [`/user/report/user/${this.userID()}`]);
  protected routeContact = computed(() => [`/user/messages/${this.userID()}`]);
  protected breadcrumb_name = computed(() => (`${this.name()} ${this.last_name()[0]}.`));
  

  protected datetimeToTimestamp(rating: any){
    const datetime = new Date(rating.creada_en)
    return datetime.getTime()
  }
  
  //Services
  private router = inject(Router);
  private actived_route = inject(ActivatedRoute);
  private userService = inject(UsersService);
  private articleService = inject(ArticlesService)
  private ratingService = inject(RatingsService)
  private orderService = inject(OrdersService)

  ngOnInit() { 
    this.router.navigate([], {
        queryParams: { tab: this.QUERYPARAM_ON_SELL },
        queryParamsHandling: 'merge'  // conserva otros query params existentes
    });

    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
     console.log(this.user)
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
      console.log(this.user)
      this.role.set('user')
    }    
    this.loadUser();

    this.userService.getUserById(this.userID()).subscribe({
      next: (data) => {
        if (data.error) {
          return;
        } else {
          this.name.set(data.nombre);
          this.last_name.set(data.apellidos);
          this.year.set(data.created_at.substring(0,4))
        }
      },
      error: (err) => {
        console.error(err);
        
      }
    });

    this.ratingService.getAverageRatingsByUser(Number(this.userID())).subscribe({
        next: (data) => {
          if (data.error) {
            return;
          } else {
            this.rating_avg.set(String(data.puntuacion_media ?? "0"));
         }
        },
        error: (err) => {
          console.error(err);
          
        }
    });

    this.ratingService.getRatingsByUser(Number(this.userID())).subscribe({
        next: (data) => {
          if (data.error) {
            return;
          } else {
            this.ratings.set(data);
         }
        },
        error: (err) => {
          console.error(err);
          
        }
    });

    this.articleService.getArticlesByUser(Number(this.userID())).subscribe({
        next: (data) => {
          if (data.error) {
            return;
          } else {
            console.log(data)
            this.articles.set(data)
         }
        },
        error: (err) => {
          console.error(err);
          
        }
    });

    this.articleService.getCountArticlesByUser(Number(this.userID())).subscribe({
        next: (data) => {
          if (data.error) {
            return;
          } else {
            this.published.set(String(data.total_publicados ?? "0"));
         }
        },
        error: (err) => {
          console.error(err);
          
        }
    });

     this.orderService.getSalesByUser(Number(this.userID())).subscribe({
        next: (data) => {
          this.selled.set(String(data.total_ventas ?? ""))
        },
        error: (err) => {
          console.error(err);

        }
    });
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

  protected breadcrumbItems = () => [
    { label: 'Inicio', route: '/home' },
    { label: 'Vendedores', route: `/sellers`},
    { label: this.breadcrumb_name(), route: `/sellers/${this.userID()}`}
  ];

  protected sellerTabs() {
    const selling: NavTabOptions = {name:"En Venta",query_param:this.QUERYPARAM_ON_SELL, notify:"0"};
    const ratings: NavTabOptions = {name:"Valoraciones",query_param:this.QUERYPARAM_RATINGS, notify:"0"};

    return [selling, ratings]
  }

  protected activeTab = toSignal(
    this.actived_route.queryParamMap.pipe(
        map(params => params.get('tab'))
    )
  );

}
