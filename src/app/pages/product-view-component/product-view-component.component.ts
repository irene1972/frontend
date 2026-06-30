import { Component, computed, inject, input, signal } from '@angular/core';
import { Button } from "../../components/atoms/button/button";
import { ArticlesService } from '../../services/articles-service';
import { IArticle } from '../../interfaces/i-article';
import { Router } from '@angular/router';
import { Badge } from "../../components/atoms/badge/badge";
import { TimeAgoPipe } from '../../shared/pipes/time-ago-pipe';
import { Breadcrum } from "../../components/molecules/breadcrum/breadcrum";
import { RatingsService } from '../../services/ratings-service';
import { lastValueFrom } from 'rxjs';
import { UsersService } from '../../services/users-service';
import { UserRatingCardData } from '../../components/molecules/user-card/user-rating-card/user-rating-card.config';
import { UserRatingCard } from "../../components/molecules/user-card/user-rating-card/user-rating-card";
import { ArticlePhotoService } from '../../services/article-photo-service';
import { IArticlePhoto } from '../../interfaces/i-article-photo.interface';
import { HomeBar } from "../../components/organisms/home-bar/home-bar";
import { ReportModal } from "../../components/molecules/report-modal/report-modal";
import { CheckoutService } from '../../services/checkout-service';
import { FavoritesService } from '../../services/favorites-service';

@Component({
  selector: 'app-product-view-component',
  imports: [Button, TimeAgoPipe, Badge, Breadcrum, UserRatingCard, HomeBar, ReportModal],
  templateUrl: './product-view-component.component.html',
  styleUrl: './product-view-component.component.css',
})
export class ProductViewComponentComponent {
  //Input
  productID = input<string>();
  
  //Servicios
  articleService = inject(ArticlesService);
  ratingsService = inject(RatingsService);
  userService = inject(UsersService);
  articlePhotoService = inject(ArticlePhotoService);
  favoritesService = inject(FavoritesService);

  //Datos Vendedor
  vendedorData = signal<UserRatingCardData | null>(null);
  ratingData: any[] = [];

  //Fotos
  fotos = signal<IArticlePhoto[]>([]);
  selectedPhoto = signal<IArticlePhoto | null>(null);
  
  //producto
  product = signal<IArticle | null>(null);

  //favorito
  favoritoId = signal<number | null>(null);
  
  private router = inject(Router);
  private checkoutService = inject(CheckoutService);

  ngOnInit() { 
    this.loadProduct();
    this.checkFavorito();
  }

  //carga de producto y datos
  async loadProduct() {
    const id = this.productID();
    if(!id) return;
    try {
      this.product.set(await lastValueFrom(this.articleService.getArticleById(Number(id))));

      const sellerId = this.product()?.usuarios_id;
      if(!sellerId) return;

      // Seller data e imgs 

      const [seller, sellerRatings, fotos] = await Promise.all([
        lastValueFrom(this.userService.getUserById((  sellerId).toString() )),
        lastValueFrom(this.ratingsService.getAverageRatingsByUser(sellerId)),
        lastValueFrom(this.articlePhotoService.getFotosByArticuloId(Number(id)))
      ]) 

      //fav
      await this.checkFavorito();

      //fotos
      this.fotos.set(fotos);
      const principal = fotos.find((f) => f.principal === 1) ?? fotos[0] ?? null;
      this.selectedPhoto.set(principal);

     
      const iniciales = `${seller.nombre.charAt(0)}${seller.apellidos.charAt(0)}`.toUpperCase();
      this.vendedorData.set({
        username:  seller.username,
        iniciales,
        promedio:  sellerRatings   // { usuario_id, puntuacion_media, total_valoraciones }
      });

    } catch (error) {
      this.router.navigate(['/**'])
    }
  }

  // isOwner
  isOwner = computed(() => {
    const raw = localStorage.getItem('usuarioBuy&Sell');
    if(!raw) return false;
    const user = JSON.parse(raw);
    return user.id === this.product()?.usuarios_id;
  });

  // breadcrumb items

  protected breadcrumbItems = computed(() => [
  { label: 'Inicio', route: '/' },
  { label: 'Productos'},
  { label: this.product()?.titulo }
  ]);

  breadcrumbItemsOwner = computed(() => [
  { label: 'Inicio', route: '/' },
  { label: 'Mis ventas', route: '/profile' },
  { label: this.product()?.titulo }
  ]);

  selectFoto(foto: IArticlePhoto) {
    this.selectedPhoto.set(foto);
  }

  //favoritos
  async checkFavorito(){
    const raw = localStorage.getItem('usuarioBuy&Sell');
    if (!raw) return;
    const userId = JSON.parse(raw).id;

    try {
      const favs = await lastValueFrom(this.favoritesService.getAllFavoritesByUser(userId));     
      const favorito = favs.find((fav: any) => fav.id === Number(this.productID()));
      
      this.favoritoId.set(favorito?.favoritos_id || null);
      
    } catch (error) {
      this.router.navigate(['/500error']);
    }
  }

  async toggleFav() {
    const raw = localStorage.getItem('usuarioBuy&Sell');
    if (!raw) return;
    const userId = JSON.parse(raw).id;

    try {
      if (this.favoritoId() === null) {
        const res = await lastValueFrom(
          this.favoritesService.addFavorite(userId, Number(this.productID()))
        );
        this.favoritoId.set(res.id);
      } else {
        await lastValueFrom(this.favoritesService.deleteFavorite(this.favoritoId()!));
        this.favoritoId.set(null);
        
      }
    } catch (error: any) {
      this.router.navigate(['/500error']);
    }
}

  // Modal reporte

  showReportModal = signal<boolean>(false);

  // Eventos compra

  onContactar(event: MouseEvent) {
    this.router.navigate(['/profile'])
  }
  onComprar(event: MouseEvent) {
    const article = this.product();
    if (!article) return;

    this.checkoutService.setCheckoutProduct(article);
    this.router.navigate(['/user/product/checkout', article.id]);
  }
  onInformar(event: MouseEvent) {
    this.showReportModal.set(true);
  }

  // eventos propietario

  onEditar(event: MouseEvent) {
    this.router.navigate(['/product/edit', this.productID()])
  }
  onMarcarComoVendido(event: MouseEvent) {
    //servicio para marcar como vendido
  }
  onPausarArticulo(event: MouseEvent) {
    //servicio para pausar articulo
  }
  onEliminarArticulo(event: MouseEvent) {
    //servicio para eliminar articulo
  }
}
