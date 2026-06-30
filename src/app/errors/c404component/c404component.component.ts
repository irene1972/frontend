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
