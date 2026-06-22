import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { IUserPurchase, PurchaseStatus } from '../../interfaces/i-purchase';
import { OrdersService } from '../../services/orders-service';

@Component({
  selector: 'app-user-my-purchases-component',
  imports: [],
  templateUrl: './user-my-purchases-component.component.html',
  styleUrl: './user-my-purchases-component.component.css',
})
export class UserMyPurchasesComponentComponent {
  private ordersService = inject(OrdersService);

  purchases: IUserPurchase[] = [];
  mensaje = '';
  loading = true;

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (!usuarioString) {
      this.loading = false;
      this.mensaje = 'Debes iniciar sesión para ver tus compras.';
      return;
    }

    const user = JSON.parse(usuarioString);
    this.loadPurchases(user.id);
  }

  private loadPurchases(userId: number): void {
    this.ordersService.getPurchasesByUser(userId).subscribe({
      next: (data) => {
        this.purchases = Array.isArray(data) ? data : [];
        this.loading = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.mensaje = 'No se pudieron cargar tus compras.';
        this.loading = false;
        this.cd.detectChanges();
      },
    });
  }

  getPurchaseDetail(purchase: IUserPurchase): string {
    const date = purchase.updated_at ?? purchase.fecha_pedido;
    const verb = this.getStatusVerb(purchase.estado);
    return `${verb} ${this.formatRelativeDate(date)}`;
  }

  getStatusLabel(estado: PurchaseStatus): string {
    const labels: Record<PurchaseStatus, string> = {
      Pendiente: 'PENDIENTE',
      Aceptado: 'ACEPTADO',
      Enviado: 'ENVIADO',
      Cancelado: 'CANCELADO',
      Completado: 'ENTREGADO',
    };
    return labels[estado];
  }

  getStatusClass(estado: PurchaseStatus): string {
    const classes: Record<PurchaseStatus, string> = {
      Pendiente: 'purchase-card__badge--pending',
      Aceptado: 'purchase-card__badge--accepted',
      Enviado: 'purchase-card__badge--transit',
      Cancelado: 'purchase-card__badge--cancelled',
      Completado: 'purchase-card__badge--delivered',
    };
    return classes[estado];
  }

  private getStatusVerb(estado: PurchaseStatus): string {
    const verbs: Record<PurchaseStatus, string> = {
      Pendiente: 'pedido',
      Aceptado: 'aceptado',
      Enviado: 'enviado',
      Cancelado: 'cancelado',
      Completado: 'entregado',
    };
    return verbs[estado];
  }

  private formatRelativeDate(value: string): string {
    const date = new Date(value);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return 'hoy';
    if (diffDays === 1) return 'ayer';
    if (diffDays < 7) return `hace ${diffDays} días`;

    const weeks = Math.floor(diffDays / 7);
    if (weeks === 1) return 'hace 1 semana';
    if (weeks < 5) return `hace ${weeks} semanas`;

    const months = Math.floor(diffDays / 30);
    if (months === 1) return 'hace 1 mes';
    return `hace ${months} meses`;
  }
}
