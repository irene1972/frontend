import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Button } from '../../atoms/button/button';
import { canSendMessages, ConversacionData } from './chat.config';
import { MensajeData } from '../../../pages/messages-component/messages.config';
import { MessagingSocketService } from '../../../services/messaging-socket-service';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, Button],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  conversacion = input.required<ConversacionData>();
  mensajes = input<MensajeData[]>([]);

  closed = output<void>();
  mensajeEnviado = output<MensajeData>();

  private readonly socketService = inject(MessagingSocketService);

  @ViewChild('messagesContainer')
  messagesContainer?: ElementRef<HTMLDivElement>;

  loggedUserId = computed(() => {
    const raw = localStorage.getItem('usuarioBuy&Sell');
    return raw ? JSON.parse(raw).id : null;
  });

  canSend = computed(() => canSendMessages(this.conversacion().pedido_estado));

  nuevoMensaje = '';
  sending = false;

  constructor() {
    effect(() => {
      this.mensajes();
      queueMicrotask(() => this.scrollToBottom());
    });
  }

  cerrarChat(): void {
    this.closed.emit();
  }

  async enviarMensaje(): Promise<void> {
    const texto = this.nuevoMensaje.trim();
    if (!texto || !this.canSend() || this.sending) return;

    this.sending = true;

    try {
      const mensaje = await this.socketService.sendMessage(
        this.conversacion().id,
        texto
      );
      this.nuevoMensaje = '';
      this.mensajeEnviado.emit({
        id: mensaje.id,
        emisor_id: mensaje.emisor_id,
        mensaje: mensaje.mensaje,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'No se pudo enviar el mensaje';
      await Swal.fire('Error', message, 'error');
    } finally {
      this.sending = false;
    }
  }

  private scrollToBottom(): void {
    const element = this.messagesContainer?.nativeElement;
    if (!element) return;
    element.scrollTop = element.scrollHeight;
  }
}
