import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '../../components/atoms/button/button';
import { IArticle } from '../../interfaces/i-article';
import { CheckoutService } from '../../services/checkout-service';

type DeliveryMethod = 'home' | 'pickup';

@Component({
  selector: 'app-product-checkout-component',
  imports: [Button],
  templateUrl: './product-checkout-component.component.html',
  styleUrl: './product-checkout-component.component.css',
})
export class ProductCheckoutComponentComponent implements OnInit {
  productID = input<string>();

  private readonly router = inject(Router);
  private readonly checkoutService = inject(CheckoutService);

  product = signal<IArticle | null>(null);
  deliveryMethod = signal<DeliveryMethod>('home');

  readonly shippingHome = 4.99;
  readonly shippingPickup = 2.99;

  articlePrice = computed(() => {
    const price = this.product()?.precio;
    return price ? parseFloat(price) : 0;
  });

  shippingCost = computed(() =>
    this.deliveryMethod() === 'home' ? this.shippingHome : this.shippingPickup
  );

  total = computed(() => this.articlePrice() + this.shippingCost());

  productPhoto = computed(() => {
    const article = this.product();
    if (!article) return null;

    const principal =
      article.fotos?.find((foto) => foto.principal === 1) ?? article.fotos?.[0];

    return principal?.url_foto ?? article.url_foto ?? null;
  });

  ngOnInit(): void {
    const checkoutProduct = this.checkoutService.getCheckoutProduct();
    const routeId = this.productID();

    if (!checkoutProduct || routeId !== checkoutProduct.id.toString()) {
      this.router.navigate(['/product', routeId ?? '']);
      return;
    }

    this.product.set(checkoutProduct);
  }

  selectDelivery(method: DeliveryMethod): void {
    this.deliveryMethod.set(method);
  }

  formatPrice(value: number): string {
    return value.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  onPayNow(event: MouseEvent): void {
    // Integración de pago pendiente
  }
}
