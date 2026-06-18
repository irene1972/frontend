import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.html',
  styleUrl: './buscador.css',
})
export class Buscador {
  @Input() placeholder: string = '';
  @Output() buscar = new EventEmitter<string>();

  onInput(event: Event) {
  const valor = (event.target as HTMLInputElement).value;
  this.buscar.emit(valor);
}
}
