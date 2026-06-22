import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbItem } from './breadcrum.types';



@Component({
  selector: 'app-breadcrum',
  imports: [RouterLink],
  templateUrl: './breadcrum.html',
  styleUrl: './breadcrum.css',
})
export class Breadcrum {
  items = input<BreadcrumbItem[]>();

  // === Al componente padre ===
  
  /* protected breadcrumbItems = computed(() => [
  { label: 'Inicio', route: '/' },
  { label: this.product()?.categoria, route: '/categoria/' + this.product()?.categorias_id },
  { label: this.product()?.titulo }
]); */
}
