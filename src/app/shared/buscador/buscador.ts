import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.html',
  styleUrl: './buscador.css',
})
export class Buscador {
  textoBusqueda = '';

  elementos = [
    'Angular',
    'React',
    'Vue',
    'Svelte',
    'SolidJS'
  ];

  get resultados() {
    return this.elementos.filter(item =>
      item.toLowerCase().includes(this.textoBusqueda.toLowerCase())
    );
  }
}
