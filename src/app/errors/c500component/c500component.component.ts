import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '../../components/atoms/button/button';

@Component({
  selector: 'app-c500component',
  imports: [Button],
  templateUrl: './c500component.component.html',
  styleUrl: './c500component.component.css',
})
export class C500componentComponent {
  router = inject(Router);
  gotoHome() {
    this.router.navigate(['/']);
  }
}
