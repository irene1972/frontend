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
    const raw = localStorage.getItem('usuarioBuy&Sell');
    if (!raw) {
      this.router.navigate(['/']);
      return;
    }

    const user = JSON.parse(raw);

    if (user.rol === 'Administrador') {

      this.router.navigate(['/admin/panel/main']);

    } else if (user.rol === 'Moderador') {
      
      this.router.navigate(['/moderator/panel/main']);

    } else {

      this.router.navigate(['/']);
      
    }
  }
}
