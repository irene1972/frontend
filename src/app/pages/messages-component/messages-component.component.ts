import { Component, computed, signal } from '@angular/core';
import { ConversacionData } from '../../components/organisms/chat/chat.config';
import { MensajeData } from './messages.config';
import { Chat } from "../../components/organisms/chat/chat";

@Component({
  selector: 'app-messages-component',
  imports: [Chat],
  templateUrl: './messages-component.component.html',
  styleUrl: './messages-component.component.css',
})
export class MessagesComponentComponent {

  // Mock conversaciones ejemplo: 
  conversaciones = signal<ConversacionData[]>([
    { id: 1, nombre: 'Marta R.',  iniciales: 'MR', ultimoMensaje: '¿Sigue disponible la RTX?', hora: '10:24' },
    { id: 2, nombre: 'Pablo G.',  iniciales: 'PG', ultimoMensaje: 'Perfecto, quedamos mañana',  hora: 'Ayer'  },
    { id: 3, nombre: 'Elena V.',  iniciales: 'EV', ultimoMensaje: 'Te paso mi número',           hora: 'Ayer'  },
    { id: 4, nombre: 'Hugo M.',   iniciales: 'HM', ultimoMensaje: '¡Gracias!',                  hora: 'Lun'   },
  ]);

  selectedConversacion = signal<ConversacionData | null>(null);

  // mock converscion. se reemplazará con servcio
  private mensajesMock: Record<number, MensajeData[]> = {
    1: [
      { id: 1, emisor_id: 99, mensaje: 'Hola, ¿sigue disponible la RTX 4070 Ti?' },
      { id: 2, emisor_id: 0,  mensaje: '¡Sí! Sigue disponible.' },
      { id: 3, emisor_id: 99, mensaje: '¿Aceptarías 650 €?' },
      { id: 4, emisor_id: 0,  mensaje: 'Puedo dejarla en 670 €, está impecable.' },
    ],
    2: [
      { id: 1, emisor_id: 98, mensaje: '¿Cuándo podemos quedar?' },
      { id: 2, emisor_id: 0,  mensaje: 'Perfecto, quedamos mañana.' },
    ],
    3: [
      { id: 1, emisor_id: 0,  mensaje: 'Hola, ¿te interesa?' },
      { id: 2, emisor_id: 97, mensaje: 'Te paso mi número.' },
    ],
    4: [
      { id: 1, emisor_id: 96, mensaje: '¡Gracias!' },
    ],
  };

  mensajesActivos = computed(() => {
    const conv = this.selectedConversacion();
    if (!conv) return [];
    return this.mensajesMock[conv.id] ?? [];
  });
 
  selectConversacion(conv: ConversacionData) {
    this.selectedConversacion.set(conv);
  }

}
