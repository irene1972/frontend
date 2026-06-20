import { Component, computed, input } from '@angular/core';
import { BadgeIcon, BadgeIconPosition, BadgeVariant } from './badge.types';

@Component({
  selector: 'atom-badge',
  imports: [],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class Badge {
  // === INPUTS === 
  variant = input<string>('Como nuevo');
  icon = input<BadgeIcon>('none');
  iconPosition = input<BadgeIconPosition>('left');

   // === COMPUTED ===
  protected label = computed(() => 
    this.variant().replace(/_/g, ' ')  
  );

  protected cssVariant = computed(() => {
  console.log('variant:', this.variant());
  return this.variant()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
});

  // === COMPUTED ===
  protected classes = computed(() => 
    `app-badge app-badge--${this.cssVariant()}`
  );
}
