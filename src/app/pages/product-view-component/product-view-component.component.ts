import { Component, inject, input, signal } from '@angular/core';
import { Button } from "../../components/atoms/button/button";
import { ArticlesService } from '../../services/articles-service';
import { IArticle } from '../../interfaces/i-article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-view-component',
  imports: [Button],
  templateUrl: './product-view-component.component.html',
  styleUrl: './product-view-component.component.css',
})
export class ProductViewComponentComponent {
  productID = input<string>();
  articleService = inject(ArticlesService);
  product = signal<IArticle | null>(null);
  router = inject(Router);

  ngOnInit() {
    console.log(this.productID());
    
    this.loadProduct();
  }

  async loadProduct() {
    const id = this.productID();
    if(!id) return;
    try {
      this.product.set(await this.articleService.getArticleById(id))
      console.log(this.product());
      
    } catch (error) {
      this.router.navigate(['/**'])
    }
  }
}
