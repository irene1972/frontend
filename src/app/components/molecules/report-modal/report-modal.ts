import { Component, EventEmitter, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Molécula modal para reportar un artículo o un usuario.
 *
 * ## Uso
 * ```html
 * <molecule-report-modal
 *   [isOpen]="showReportModal()"
 *   [productId]="productID()!"
 *   [sellerId]="vendedorData()!.promedio.usuario_id"
 *   (closed)="showReportModal.set(false)"
 * />
 * ```
 */

@Component({
  selector: 'molecule-report-modal',
  imports: [],
  templateUrl: './report-modal.html',
  styleUrl: './report-modal.css',
})
export class ReportModal {
  // Input
  isOpen = input<boolean>();
  productId = input<string>();
  /*
  === Input para reportar un usuario ===
  sellerId = input<number>();
  */

  // Output
  closed = output<void>();

  private router = inject(Router);

  // Funciones 

  onReportArticle() {
    this.closed.emit();
    this.router.navigate(['/user/report/product', this.productId()]);
  }

  /*
  === Nav a report user page ===
  onReportUser() {
    this.closed.emit();
    this.router.navigate(['/user/report/user', this.sellerId()]);
  } 
  */

  onCancel() {
    this.closed.emit();
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('report-modal__overlay')){
      this.closed.emit();
    }
  }
}
