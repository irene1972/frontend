import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HomeBar } from '../../components/organisms/home-bar/home-bar';
import { Button } from '../../components/atoms/button/button';
import { Sidebar } from '../../components/organisms/sidebar/sidebar';

@Component({
  selector: 'app-c404component',
  imports: [HomeBar, Button, Sidebar],
  templateUrl: './c404component.component.html',
  styleUrl: './c404component.component.css',
})
export class C404componentComponent {
  router = inject(Router);
  gotoHome() {
    this.router.navigate(['/']);
  }
}
