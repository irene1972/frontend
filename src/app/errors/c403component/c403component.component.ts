import { Component, inject } from '@angular/core';
import { Button } from "../../components/atoms/button/button";
import { Router } from '@angular/router';

@Component({
  selector: 'app-c403component',
  imports: [Button],
  templateUrl: './c403component.component.html',
  styleUrl: './c403component.component.css',
})
export class C403componentComponent {
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
