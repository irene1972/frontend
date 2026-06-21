import { Component, computed, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LinkIcon } from '../../atoms/link-icon/link-icon';
import { filter } from 'rxjs';

@Component({
  selector: 'app-mobile-bar',
  imports: [LinkIcon],
  templateUrl: './mobile-bar.html',
  styleUrl: './mobile-bar.css',
})
export class MobileBar {
  private router = inject(Router);
  private url = signal('');

  hiddenRoutes = ['/admin', '/moderator'];

  showComponent = computed<boolean>(() => {
    return !this.hiddenRoutes.some(route => this.url().startsWith(route))
  })

  constructor(){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.url.set((event as NavigationEnd).url)
    })
  }

 
}
