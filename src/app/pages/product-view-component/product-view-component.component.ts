import { Component, computed, inject, input, signal } from '@angular/core';
import { Button } from "../../components/atoms/button/button";
import { ArticlesService } from '../../services/articles-service';
import { IArticle } from '../../interfaces/i-article';
import { Router } from '@angular/router';
import { Badge } from "../../components/atoms/badge/badge";
import { TimeAgoPipe } from '../../shared/pipes/time-ago-pipe';
import { Breadcrum } from "../../components/molecules/breadcrum/breadcrum";

@Component({
  selector: 'app-product-view-component',
  imports: [Button, TimeAgoPipe, Badge, Breadcrum],
  templateUrl: './product-view-component.component.html',
  styleUrl: './product-view-component.component.css',
})
export class ProductViewComponentComponent {
  productID = input<string>();
  articleService = inject(ArticlesService);
  product = signal<IArticle | null>(null);
  private router = inject(Router);

  ngOnInit() { 
    this.loadProduct();
  }

  async loadProduct() {
    const id = this.productID();
    if(!id) return;
    try {
      this.product.set(await this.articleService.getArticleById(id))
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
