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
    this.router.navigate(['/']);
  }
}
