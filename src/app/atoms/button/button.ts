import { Component, computed, EventEmitter, input, Output } from '@angular/core';
import { ButtonConfigState } from './button.types';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  //Inputs
  config_state = input<ButtonConfigState>('enabled');

  //Outputs 
  @Output() click: EventEmitter<MouseEvent> = new EventEmitter();

  //Clases computadas
  protected classes = computed(() => 
    `btn btn-warning app-btn--${this.config_state()}`
  );
  // Funciones
  onClick(event: MouseEvent) {
    if(this.config_state() === 'disabled') return;
    this.click.emit(event);
  }
}
