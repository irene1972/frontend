import { Component, Input } from '@angular/core';
import { Icon } from '../../../atoms/icon/icon';
import { IOrder } from '../../../../interfaces/i-order';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-review-user',
  imports: [Icon,DatePipe],
  templateUrl: './review-user.html',
  styleUrl: './review-user.css',
})
export class ReviewUser {
  @Input() pedido?: IOrder;

  get iniciales(): string {
    const nombre = this.pedido?.nombre?.[0] ?? '';
    const apellido = this.pedido?.apellidos?.[0] ?? '';
    return nombre + apellido;
  }

  get nombreMostrado(): string {
    if (!this.pedido?.nombre) return '';
    const apellido = this.pedido.apellidos?.[0] ?? '';
    return `${this.pedido.nombre} ${apellido}.`;
  }
}
