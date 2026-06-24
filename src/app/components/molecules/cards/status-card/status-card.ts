import { Component, computed, input } from '@angular/core';
import { StatusCardAlign } from './status-card.config';

@Component({
  selector: 'molecule-status-card',
  imports: [],
  templateUrl: './status-card.html',
  styleUrl: './status-card.css',
})
export class StatusCard {
/* Public inputs */
  align   = input<StatusCardAlign>('right');
  status  = input<string>('status');
  text    = input<string>('text');
}
