import { Injectable, signal } from '@angular/core';
import { IArticle } from '../interfaces/i-article';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private readonly product = signal<IArticle | null>(null);

  setCheckoutProduct(article: IArticle): void {
    this.product.set(article);
  }

  getCheckoutProduct(): IArticle | null {
    return this.product();
  }

  clearCheckoutProduct(): void {
    this.product.set(null);
  }
}
