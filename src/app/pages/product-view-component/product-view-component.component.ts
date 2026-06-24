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
import { UserRatingCardData } from '../../components/molecules/user-rating-card/user-rating-card.config';
import { UserRatingCard } from "../../components/molecules/user-rating-card/user-rating-card";
import { ArticlePhotoService } from '../../services/article-photo-service';
import { IArticlePhoto } from '../../interfaces/i-article-photo.interface';
import { ButtonIcon } from '../../components/atoms/button-icon/button-icon';
import { HomeBar } from "../../components/organisms/home-bar/home-bar";
import { ReportModal } from "../../components/molecules/report-modal/report-modal";

@Component({
  selector: 'app-product-view-component',
  imports: [Button, TimeAgoPipe, Badge, Breadcrum, UserRatingCard, ButtonIcon, HomeBar, ReportModal],
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

  //Datos Vendedor
  vendedorData = signal<UserRatingCardData | null>(null);
  ratingData: any[] = [];

  //Fotos
  fotos = signal<IArticlePhoto[]>([]);
  selectedPhoto = signal<IArticlePhoto | null>(null);
  
  //producto
  product = signal<IArticle | null>(null);
  
  private router = inject(Router);

  ngOnInit() { 
    this.loadProduct();
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
        lastValueFrom(this.ratingsService.getRatingsByUser(sellerId)),
        lastValueFrom(this.articlePhotoService.getFotosByArticuloId(Number(id)))
      ]) 

      //fotos
      this.fotos.set(fotos);
      const principal = fotos.find(f => f.principal === 1) ?? fotos[0] ?? null;
      this.selectedPhoto.set(principal);
      
      // Iniciales desde nombre + apellidos
      const iniciales = `${seller.nombre.charAt(0)}${seller.apellidos.charAt(0)}`.toUpperCase();
  
      // objeto para la molécula
      this.vendedorData.set({
        username:  seller.username,
        iniciales,
        promedio:  sellerRatings   // { usuario_id, puntuacion_media, total_valoraciones }
      });

      console.log(this.vendedorData());
      console.log(this.fotos());
      
      
      
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

  // Modal reporte

  showReportModal = signal<boolean>(false);

  // Eventos compra

  onContactar(event: MouseEvent) {
    this.router.navigate(['/profile'])
  }
  onComprar(event: MouseEvent) {
    this.router.navigate(['/product/checkout', this.productID()])
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
