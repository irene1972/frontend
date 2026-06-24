import { Component, computed, inject, input, model, output, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NavTabOptions } from './nav-tab.config';
import { Icon } from '../../atoms/icon/icon';

@Component({
  selector: 'molecule-nav-tab',
  imports: [RouterLink, RouterLinkActive, Icon],
  templateUrl: './nav-tab.html',
  styleUrl: './nav-tab.css',
})
export class NavTab {
  public tabs = input<NavTabOptions[]>([])
  public click = output<number>();

  private router = inject(Router);

  protected currentTab = signal<number>(0);

  get currentRoute() {
    return this.router.url.split('?')[0];
  }
}
