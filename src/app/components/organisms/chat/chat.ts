import { Component, computed, input, output } from '@angular/core';
import { ConversacionData } from './chat.config';
import { MensajeData } from '../../../pages/messages-component/messages.config';
import { FormsModule } from '@angular/forms';
import { Button } from "../../atoms/button/button";


@Component({
  selector: 'app-chat',
  imports: [FormsModule, Button,],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  /*=== INPUTS ===*/
  conversacion = input.required<ConversacionData>();
  mensajes = input<MensajeData[]>();
  
  
  /*===CERRAR CHAT===*/
  closed = output<void>();

  cerrarChat() {
    this.closed.emit();
  }

  /*===ID USUARIO LOGGADO===*/
  loggedUserId = computed(() => {
    const raw = localStorage.getItem('usuarioBuy&Sell');
    return raw ? JSON.parse(raw).id : null;
  })
  /*=== INPUT NUEVO MENSAJE===*/
  nuevoMensaje = '';
  /*===ENVIAR MENSAJE===*/
  enviarMensaje() {
    const texto = this.nuevoMensaje.trim();
    if (!texto) return;
    // nackend y servivio
    console.log(texto);
    this.nuevoMensaje = '';
  }
  
}
