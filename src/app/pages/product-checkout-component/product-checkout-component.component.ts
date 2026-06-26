import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { Button } from '../../components/atoms/button/button';
import { IArticle } from '../../interfaces/i-article';
import { CheckoutService } from '../../services/checkout-service';
import { OrdersService } from '../../services/orders-service';
import { UsersService } from '../../services/users-service';

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
  private readonly ordersService = inject(OrdersService);
  private readonly usersService = inject(UsersService);

  product = signal<IArticle | null>(null);
  deliveryMethod = signal<DeliveryMethod>('home');
  isSubmitting = signal(false);

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

  async onPayNow(event: MouseEvent): Promise<void> {
    const article = this.product();
    if (!article || this.isSubmitting()) return;

    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (!usuarioString) {
      this.router.navigate(['/login']);
      return;
    }

    const user = JSON.parse(usuarioString);

    if (user.id === article.usuarios_id) {
      await Swal.fire('No puedes comprar tu propio artículo', '', 'error');
      return;
    }

    this.isSubmitting.set(true);

    try {
      const direccionEnvio = await this.resolveShippingAddress(user.id);
      if (!direccionEnvio) {
        await Swal.fire(
          'Dirección requerida',
          'Actualiza tu dirección en el perfil para continuar con el envío a domicilio.',
          'warning'
        );
        return;
      }

      const order = await lastValueFrom(
        this.ordersService.createOrder({
          comprador_id: user.id,
          articulos_id: article.id,
          estado: 'Pendiente',
          direccion_envio: direccionEnvio,
        })
      );

      this.checkoutService.clearCheckoutProduct();
      await Swal.fire('¡Compra realizada!', order.mensaje, 'success');
      this.router.navigate(['/user/panel/my-purchases']);
    } catch {
      await Swal.fire(
        'Error',
        'No se pudo completar la compra. Inténtalo de nuevo.',
        'error'
      );
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private async resolveShippingAddress(userId: number): Promise<string | null> {
    if (this.deliveryMethod() === 'pickup') {
      return 'Punto de recogida';
    }

    const user = await lastValueFrom(this.usersService.getUserById(userId.toString()));
    const direccion = user?.direccion?.trim();
    return direccion || null;
  }
}
