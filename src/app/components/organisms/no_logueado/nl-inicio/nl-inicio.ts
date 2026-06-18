import { Component } from '@angular/core';

@Component({
  selector: 'app-nl-inicio',
  imports: [],
  templateUrl: './nl-inicio.html',
  styleUrl: './nl-inicio.css',
})
export class NLInicio {
  items = Array.from({ length: 4 }, (_, i) => i + 1);
}
