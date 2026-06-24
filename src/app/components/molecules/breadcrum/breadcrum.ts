import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbItem } from './breadcrum.types';



@Component({
  selector: 'molecule-breadcrum',
  imports: [RouterLink],
  templateUrl: './breadcrum.html',
  styleUrl: './breadcrum.css',
})
export class Breadcrum {
  public items    = input<BreadcrumbItem[]>();

  protected previous = computed(( )=> {
    const items = this.items();
    return items?.[items.length-2].route;
  });
  // === Al componente padre ===
  
  /* protected breadcrumbItems = computed(() => [
  { label: 'Inicio', route: '/' },
  { label: this.product()?.categoria, route: '/categoria/' + this.product()?.categorias_id },
  { label: this.product()?.titulo }
]); */
}
