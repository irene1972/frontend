import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Sidebar } from '../../components/organisms/sidebar/sidebar';
import { SidebarVariant } from '../../components/organisms/sidebar/sidebar.config';
import { Breadcrum } from "../../components/molecules/breadcrum/breadcrum";
import { StatusCard } from "../../components/molecules/cards/status-card/status-card";
import { NavTab } from '../../components/organisms/navs/nav-tab/nav-tab';
import { NavTabOptions } from '../../components/organisms/navs/nav-tab/nav-tab.config';
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
import { ArticleStatus } from '../../enums/article-status.enum';
import { AuthService } from '../../services/auth.service';
import { FavoritesService } from '../../services/favorites-service';
import { lastValueFrom } from 'rxjs';
import { ButtonIconStates } from '../../components/atoms/button-icon/button-icon.config';
import Swal from 'sweetalert2';

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
  protected articlesPublished = computed(() => this.articles().filter(a => a.estado_articulo_id === ArticleStatus.PUBLISHED));

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
  private favoritesService = inject(FavoritesService);
  private authService = inject(AuthService)
  

   // userId
  private getUserId(): number {
    const raw = localStorage.getItem('usuarioBuy&Sell');
    if (!raw) return 0;
    return Number(JSON.parse(raw).id);
  }

  async ngOnInit() { 
    this.router.navigate([], {
        queryParams: { tab: this.QUERYPARAM_ON_SELL },
        queryParamsHandling: 'merge'  // conserva otros query params existentes
    });

    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
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


      // Favoritos UNA sola vez por carga (lista vacía si no hay sesión o si falla)
    const user_id = this.getUserId(); 
    const favs: any[] = user_id ? await lastValueFrom(this.favoritesService.getAllFavoritesByUser(user_id)).catch(() => []): [];
    
    this.articleService.getArticlesByUser(Number(this.userID())).subscribe({
        next: (data) => {
          if (data.error) {
            return;
          } else {
            const my_data = data.map((d: any)=> this.mapArticle(d, favs) ); 
            this.articles.set(my_data)
            
        
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

  // Favoritos: toggle desde la card
  async toggleFav(article: any): Promise<void> {
      const raw = localStorage.getItem('usuarioBuy&Sell');
  
      if (!raw) {
        // Sin sesión: preguntamos si quiere iniciar sesión
        const result = await Swal.fire({
          title: 'Inicia sesión',
          text: 'Debes iniciar sesión para guardar artículos en favoritos.',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Iniciar sesión',
          cancelButtonText: 'Cancelar',
        });
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
        return;
      }
      const userId = JSON.parse(raw).id;
  
      try {
        if (article.favState === ButtonIconStates.INACTIVED) {
          const res = await lastValueFrom(
            this.favoritesService.addFavorite(userId, article.id)
          );
          this.updateArticleFav(article.id, res.id, ButtonIconStates.ACTIVED);
          this.lanzarToast('success', 'El artículo ha sido añadido a la lista de favoritos');
        } else {
          await lastValueFrom(this.favoritesService.deleteFavorite(article.favId!));
          this.updateArticleFav(article.id, null, ButtonIconStates.INACTIVED);
          this.lanzarToast('info', 'Artículo eliminado de favoritos');
        }
      } catch (error) {
        this.router.navigate(['/500error']);
      }
  }
  
  // Toast avisos de favoritos
  showToast = signal<boolean>(false);
  toastVariant = signal<'success' | 'info' | 'warn' | 'trash'>('success');
  toastMessage = signal<string>('');

    // Reemplaza el artículo por una copia con el nuevo estado de favorito (inmutable)
  private updateArticleFav(id: number, favId: number | null, favState: ButtonIconStates): void {
    this.articles.update((list) =>
      list.map((a) => (a.id === id ? { ...a, favId, favState } : a))
    );
  }

  // Dispara el toast reutilizando el patrón del proyecto (señal trigger)
  private lanzarToast(variant: 'success' | 'info' | 'warn' | 'trash', message: string): void {
    this.toastVariant.set(variant);
    this.toastMessage.set(message);
    this.showToast.set(false);
    setTimeout(() => this.showToast.set(true), 10);
  }


  logout(): void {
    this.authService.logout();
  }

  private mapArticle(article: any, favs: any[]) {
    const fav = favs.find((f: any) => f.id === article.id);
    return {...article, favId:fav?.favoritos_id ?? null, favState:fav ? ButtonIconStates.ACTIVED : ButtonIconStates.INACTIVED}
  }

 //carga de producto y datos
  async loadUser() {
    const id = this.userID();
    if(!id) return;
  
  }

  protected breadcrumbItems = () => [
    { label: 'Inicio', route: '/home' },
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
