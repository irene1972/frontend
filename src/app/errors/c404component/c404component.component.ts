import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '../../components/atoms/button/button';

@Component({
  selector: 'app-c404component',
  imports: [Button],
  templateUrl: './c404component.component.html',
  styleUrl: './c404component.component.css',
})
export class C404componentComponent {
  router = inject(Router);
  gotoHome() {
    this.router.navigate(['/']);
  }
}
