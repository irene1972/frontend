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

@Component({
  selector: 'app-product-view-component',
  imports: [Button, TimeAgoPipe, Badge, Breadcrum, UserRatingCard],
  templateUrl: './product-view-component.component.html',
  styleUrl: './product-view-component.component.css',
})
export class ProductViewComponentComponent {
  productID = input<string>();

  articleService = inject(ArticlesService);
  ratingsService = inject(RatingsService);
  userService = inject(UsersService);
  vendedorData = signal<UserRatingCardData | null>(null);
  
  product = signal<IArticle | null>(null);
  ratingData: any[] = [];
  private router = inject(Router);

  ngOnInit() { 
    this.loadProduct();
  }

  async loadProduct() {
    const id = this.productID();
    if(!id) return;
    try {
      this.product.set(await this.articleService.getArticleById(id))

      const sellerId = this.product()?.usuarios_id;
      if(!sellerId) return;

      // Seller data

      const [seller, sellerRatings] = await Promise.all([
        lastValueFrom(this.userService.getUserById((  sellerId).toString() )),
        lastValueFrom(this.ratingsService.getRatingsByUser(sellerId))
      ]) 
      
      // Iniciales desde nombre + apellidos
      const iniciales = `${seller.nombre.charAt(0)}${seller.apellidos.charAt(0)}`.toUpperCase();
  
      // objeto para la molécula
      this.vendedorData.set({
        username:  seller.username,
        iniciales,
        promedio:  sellerRatings   // { usuario_id, puntuacion_media, total_valoraciones }
      });

      console.log(this.vendedorData());
      
      
    } catch (error) {
      this.router.navigate(['/**'])
    }
  }

  protected breadcrumbItems = computed(() => [
  { label: 'Inicio', route: '/' },
  { label: this.product()?.categorias_id?.toString(), route: '/categoria/' + this.product()?.categorias_id },
  { label: this.product()?.titulo }
]);

  onContactar(event: MouseEvent) {
    this.router.navigate(['/profile'])
  }
  onComprar(event: MouseEvent) {
    this.router.navigate(['/product/checkout', this.productID()])
  }
  onInformar(event: MouseEvent) {
    this.router.navigate(['/home'])
  }
}
