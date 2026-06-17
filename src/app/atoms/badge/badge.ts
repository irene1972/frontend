import { Component, computed, input } from '@angular/core';
import { BadgeIcon, BadgeIconPosition, BadgeVariant } from './badge.types';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class Badge {
  // === INPUTS === 
  variant = input<BadgeVariant>('new');
  label = input<string>('');
  icon = input<BadgeIcon>('none');
  iconPosition = input<BadgeIconPosition>('left');

  // === COMPUTED ===
  protected classes = computed(() => 
    `app-badge app-badge--${this.variant()}`
  );
}
