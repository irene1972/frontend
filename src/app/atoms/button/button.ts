import { Component, computed, EventEmitter, Input, input, Output } from '@angular/core';
import { ButtonConfigState, ButtonRounded, ButtonVariant } from './button.types';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  //Inputs
  config_type= input<ButtonVariant>('primary');
  config_state = input<ButtonConfigState>('enabled');
  label = input<string>('Button');
  rounded = input<ButtonRounded>('full');
  shadow = input<boolean>(false);

  //Outputs 
  @Output() click: EventEmitter<MouseEvent> = new EventEmitter();

  //Clases computadas
  protected classes = computed(() => 
    `btn d-inline-flex align-items-center justify-content-center gap-2
     app-btn--${this.config_type()}
     app-btn--${this.config_state()}
     app-btn--rounded-${this.rounded()}
     ${this.shadow() ? 'app-btn--shadow' : ''}
    `
  );
  // Funciones
  onClick(event: MouseEvent) {
    if(this.config_state() === 'disabled') return;
    this.click.emit(event);
  }
}
