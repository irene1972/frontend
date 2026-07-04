import { Component, computed, effect, inject, input, signal, untracked } from '@angular/core';
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
import { IArticlePhoto } from '../../interfaces/i-article-photo.interface';
import { HomeBar } from "../../components/organisms/home-bar/home-bar";
import { ReportModal } from "../../components/molecules/report-modal/report-modal";
import { CheckoutService } from '../../services/checkout-service';
import { FavoritesService } from '../../services/favorites-service';
import { Toast } from '../../components/atoms/toast/toast';
import Swal from 'sweetalert2';
import { ArticlePhotosService } from '../../services/article-photos.service';
import { Role } from '../../enums/role.enum';
import { ButtonIcon } from "../../components/atoms/button-icon/button-icon";
import { ButtonIconStates } from '../../components/atoms/button-icon/button-icon.config';


@Component({
  selector: 'app-product-view-component',
  imports: [Button, TimeAgoPipe, Badge, Breadcrum, UserRatingCard, HomeBar, ReportModal, Toast, ButtonIcon],
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
  photoService = inject(ArticlePhotosService);
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
  favoritoId = null;
  favoriteState = signal<ButtonIconStates>(ButtonIconStates.WAIT);


  //toast avisos de favoritos
  showToast = signal<boolean>(false);
  toastVariant = signal<'success' | 'info' | 'warn' | 'trash'>('success');
  toastMessage = signal<string>('');
  
  private router = inject(Router);
  private checkoutService = inject(CheckoutService);

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
        lastValueFrom(this.ratingsService.getAverageRatingsByUser(sellerId)),
        lastValueFrom(this.photoService.getPhotosByArticleId(Number(id)))
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

  // edit estado
  async productSelled() {
    const id = this.productID();
    if (!id) return;

    const articulo = this.product();
    if (!articulo) return;

    const payload = {
      usuarios_id:            articulo.usuarios_id,
      titulo:                 articulo.titulo,
      descripcion:            articulo.descripcion,
      categorias_id:          articulo.categorias_id,
      precio:                 articulo.precio,
      estado_conservacion_id: articulo.estado_conservacion_id,
      estado_articulo_id:     'Vendido',
      cp:                     articulo.cp,
    };

    try {
      await lastValueFrom(this.articleService.updateArticle(Number(id), payload));
      this.product.set({ ...articulo, estado_articulo_id: 'Vendido' });
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // delete 
  async deleteProduct() {
    const id = this.productID();
    if (!id) return;
    try {
      await lastValueFrom(this.articleService.deleteArticle(Number(id)));
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // isOwner
  isOwner = computed(() => {
    const raw = localStorage.getItem('usuarioBuy&Sell');
    if(!raw) return false;
    const user = JSON.parse(raw);
    
    return Number(user.id) === Number(this.product()?.usuarios_id);
  });

  // breadcrumb items
  protected breadcrumbItems = computed(() => [
  { label: 'Inicio', route: '/' },
  { label: 'Productos', route: '/explore'},
  { label: this.product()?.titulo }
  ]);

  breadcrumbItemsOwner = computed(() => [
  { label: 'Inicio', route: '/' },
  { label: 'Mis productos', route: '/user/panel/sales' },
  { label: this.product()?.titulo }
  ]);

  selectFoto(foto: IArticlePhoto) {
    this.selectedPhoto.set(foto);
  }

  private isGuest(){
    const raw = localStorage.getItem('usuarioBuy&Sell');
    if (!raw) return "guest";
    const rol = JSON.parse(raw).rol;  
    return !(rol===Role.USUARIO || rol===Role.MODERADOR || rol===Role.ADMINISTRADOR);
  }

  //favoritos
  async checkFavorito(){
    const raw = localStorage.getItem('usuarioBuy&Sell');
    if (!raw) return;
    const userId = JSON.parse(raw).id;

    try {
      /* Devuelve todos los artículos favoritos de un usuario concreto */
      const articleFavs = await lastValueFrom(this.favoritesService.getAllFavoritesByUser(userId));   // obtenemos los articulos favoritos de un usuario
      const articleFav = articleFavs.find((article: any) => article.id === Number(this.productID())); // buscamos si nuestro articuo se encuentra en la lista de favoritos
    
      this.favoritoId = articleFav?.favoritos_id || null;
      this.favoriteState.set(articleFav ? ButtonIconStates.ACTIVED : ButtonIconStates.INACTIVED)
   
    } catch (error) {
      this.router.navigate(['/500error']);
    }
  }

  async toggleFav() {
    const raw = localStorage.getItem('usuarioBuy&Sell');
    
    if (!raw) {
      // Sin sesion: preguntamos si quiere iniciar sesion
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
      if (this.favoriteState() === ButtonIconStates.INACTIVED) {
        const res = await lastValueFrom(this.favoritesService.addFavorite(userId, Number(this.productID())));
        this.favoritoId = res.id;
        this.favoriteState.set(ButtonIconStates.ACTIVED);
        this.lanzarToast('success', 'El artículo ha sido añadido a la lista de favoritos');
      } else if (this.favoriteState() === ButtonIconStates.ACTIVED){
        await lastValueFrom(this.favoritesService.deleteFavorite(this.favoritoId!));
        this.favoritoId = null;
        this.favoriteState.set(ButtonIconStates.INACTIVED);
        this.lanzarToast('info', 'Artículo eliminado de favoritos');
      } 
    } catch (error: any) {
      this.router.navigate(['/500error']);
    }
  }

  // Dispara el toast reutilizando el patron del proyecto (senal trigger)
  private lanzarToast(variant: 'success' | 'info' | 'warn' | 'trash', message: string) {
    this.toastVariant.set(variant);
    this.toastMessage.set(message);
    this.showToast.set(false);
    setTimeout(() => this.showToast.set(true), 10);
  }

  // Modal reporte
  showReportModal = signal<boolean>(false);

  // Eventos compra
  onContactar(event: MouseEvent) {
    void Swal.fire({
      title: 'Mensajes',
      text: 'Compra el artículo para chatear con el vendedor.',
      icon: 'info',
    });
  }
  onComprar(event: MouseEvent) {
    if(this.isGuest()){
      this.router.navigate(['/login']);
    } else {
      const article = this.product();
      if (!article) return;
      this.checkoutService.setCheckoutProduct(article);
      this.router.navigate(['/user/product/checkout', article.id]);
    }
  }

  onInformar(event: MouseEvent) {
    if(this.isGuest()){
      this.router.navigate(['/login'])
    } else {
      this.showReportModal.set(true);
    }
  }

  // eventos propietario
  onEditar(event: MouseEvent) {
    this.router.navigate(['/user/panel/article/edit', this.productID()])
  }
  onMarcarComoVendido(event: MouseEvent) {
    this.productSelled();
  }
  onEliminarArticulo(event: MouseEvent) {
    //servicio para eliminar articulo
    this.deleteProduct();
  }

  navigateToVendorProfile(){
    if(this.isGuest()){
      this.router.navigate(['/login'])
    } else {
      this.router.navigate([`/user/sellers/${this.vendedorData()?.promedio.usuario_id}`])
    }
  }
}


