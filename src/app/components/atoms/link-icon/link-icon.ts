import { Component, computed, input, signal } from '@angular/core';
import { LinkIconStates, LinkIconVariant } from './link-icon.config';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { STYLES } from './link-icon.styles';

@Component({
  selector: 'atom-link-icon',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './link-icon.html',
  styleUrl: './link-icon.css',
})
export class LinkIcon {
 /* Public inputs */
  variant    = input<LinkIconVariant>('home');
  size       = input<string>('28px');
  text       = input<string>('');
  icon_text  = input<string>('');
  link       = input<string | unknown[] | null>(null);
  
  /* Component Computed Styles */
  protected linkClass = computed(() => {
    const style = STYLES[this.variant()].link + ` link--${this.variant()}`
    return style;
  });

  protected iconClass = computed(() => {
    const style = STYLES[this.variant()].icon + ` icon--${this.variant()}`
    return style;
  });

  protected textClass = computed(() =>  {
    const style = `text--${this.variant()}`
    return style;
  });
}
