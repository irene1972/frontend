import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ConversacionData } from '../../components/organisms/chat/chat.config';
import { Chat } from '../../components/organisms/chat/chat';
import { IConversation } from '../../interfaces/i-conversation';
import { IMessage, INewMessageEvent } from '../../interfaces/i-message';
import { MessagesService } from '../../services/messages-service';
import { MessagingSocketService } from '../../services/messaging-socket-service';
import { MensajeData } from './messages.config';

@Component({
  selector: 'app-messages-component',
  imports: [Chat],
  templateUrl: './messages-component.component.html',
  styleUrl: './messages-component.component.css',
})
export class MessagesComponentComponent implements OnInit, OnDestroy {
  private readonly messagesService = inject(MessagesService);
  private readonly socketService = inject(MessagingSocketService);
  private readonly route = inject(ActivatedRoute);

  conversaciones = signal<ConversacionData[]>([]);
  selectedConversacion = signal<ConversacionData | null>(null);
  mensajesActivos = signal<MensajeData[]>([]);
  loading = signal(true);
  error = signal('');

  private unsubscribeMensaje: (() => void) | null = null;
  private unsubscribeLeidos: (() => void) | null = null;

  ngOnInit(): void {
    this.socketService.connect();
    this.unsubscribeMensaje = this.socketService.onMensajeNuevo((event) =>
      this.handleNuevoMensaje(event)
    );
    this.unsubscribeLeidos = this.socketService.onMensajesLeidos(() => {
      this.loadConversaciones();
    });

    void this.loadConversaciones();

    this.route.queryParamMap.subscribe((params) => {
      const pedidoId = Number(params.get('pedido'));
      if (pedidoId > 0) {
        void this.openByPedidoId(pedidoId);
      }
    });
  }

  ngOnDestroy(): void {
    const selected = this.selectedConversacion();
    if (selected) {
      this.socketService.leaveConversacion(selected.id);
    }
    this.unsubscribeMensaje?.();
    this.unsubscribeLeidos?.();
  }

  async selectConversacion(conv: ConversacionData): Promise<void> {
    const previous = this.selectedConversacion();
    if (previous && previous.id !== conv.id) {
      this.socketService.leaveConversacion(previous.id);
    }

    this.selectedConversacion.set(conv);
    this.mensajesActivos.set([]);

    try {
      await this.socketService.joinConversacion(conv.id);
      const mensajes = await lastValueFrom(this.messagesService.getMessages(conv.id));
      this.mensajesActivos.set(mensajes.map(this.mapMensaje));
      this.socketService.markConversacionRead(conv.id);
      this.patchConversacion(conv.id, { no_leidos: 0 });
    } catch {
      this.error.set('No se pudieron cargar los mensajes.');
    }
  }

  onMensajeEnviado(mensaje: MensajeData): void {
    this.mensajesActivos.update((items) => {
      if (items.some((item) => item.id === mensaje.id)) return items;
      return [...items, mensaje];
    });
    this.updateConversacionPreview(mensaje);
  }

  private async loadConversaciones(): Promise<void> {
    this.loading.set(true);
    this.error.set('');

    try {
      const data = await lastValueFrom(this.messagesService.getMyConversations());
      this.conversaciones.set(data.map((item) => this.mapConversacion(item)));
    } catch {
      this.error.set('No se pudieron cargar las conversaciones.');
      this.conversaciones.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  private async openByPedidoId(pedidoId: number): Promise<void> {
    try {
      const conversacion = await lastValueFrom(
        this.messagesService.getByPedidoId(pedidoId)
      );
      let conv = this.conversaciones().find((item) => item.id === conversacion.id);

      if (!conv) {
        await this.loadConversaciones();
        conv = this.conversaciones().find((item) => item.id === conversacion.id);
      }

      if (conv) {
        await this.selectConversacion(conv);
      }
    } catch {
      this.error.set('No se encontró la conversación de este pedido.');
    }
  }

  private handleNuevoMensaje(event: INewMessageEvent): void {
    const selected = this.selectedConversacion();
    if (selected && event.conversacionId === selected.id) {
      this.mensajesActivos.update((items) => {
        if (items.some((item) => item.id === event.mensaje.id)) return items;
        return [...items, this.mapMensaje(event.mensaje)];
      });
    }

    this.updateConversacionPreview(event.mensaje, event.conversacionId);
    void this.refreshUnreadCount();
  }

  private updateConversacionPreview(mensaje: MensajeData | IMessage, conversacionId?: number): void {
    const convId = conversacionId ?? this.selectedConversacion()?.id;
    if (!convId) return;

    const loggedUserId = this.getLoggedUserId();
    const incrementUnread =
      mensaje.emisor_id !== loggedUserId && this.selectedConversacion()?.id !== convId;

    this.conversaciones.update((items) =>
      items
        .map((item) => {
          if (item.id !== convId) return item;
          return {
            ...item,
            ultimoMensaje: mensaje.mensaje,
            hora: this.formatMessageTime(
              'enviado_en' in mensaje ? mensaje.enviado_en : new Date().toISOString()
            ),
            no_leidos: incrementUnread ? item.no_leidos + 1 : item.no_leidos,
          };
        })
        .sort((a, b) => {
          if (a.id === convId) return -1;
          if (b.id === convId) return 1;
          return 0;
        })
    );
  }

  private patchConversacion(conversacionId: number, patch: Partial<ConversacionData>): void {
    this.conversaciones.update((items) =>
      items.map((item) => (item.id === conversacionId ? { ...item, ...patch } : item))
    );
  }

  private async refreshUnreadCount(): Promise<void> {
    try {
      const { total } = await lastValueFrom(this.messagesService.getUnreadCount());
      this.socketService.setUnreadCount(total);
    } catch {
      // ignorar fallo puntual del badge
    }
  }

  private mapConversacion(conv: IConversation): ConversacionData {
    const otro = conv.otro_usuario;
    const iniciales = otro
      ? `${otro.nombre.charAt(0)}${otro.apellidos.charAt(0)}`.toUpperCase()
      : '??';
    const nombre = otro
      ? `${otro.nombre} ${otro.apellidos.charAt(0)}.`
      : 'Usuario';

    return {
      id: conv.id,
      pedidos_id: conv.pedidos_id,
      pedido_estado: conv.pedido_estado,
      nombre,
      iniciales,
      ultimoMensaje: conv.ultimo_mensaje ?? 'Sin mensajes aún',
      hora: conv.ultimo_mensaje_en
        ? this.formatMessageTime(conv.ultimo_mensaje_en)
        : '',
      no_leidos: conv.no_leidos,
      articuloTitulo: conv.articulo.titulo,
    };
  }

  private mapMensaje = (mensaje: IMessage): MensajeData => ({
    id: mensaje.id,
    emisor_id: mensaje.emisor_id,
    mensaje: mensaje.mensaje,
  });

  private getLoggedUserId(): number | null {
    const raw = localStorage.getItem('usuarioBuy&Sell');
    return raw ? JSON.parse(raw).id : null;
  }

  private formatMessageTime(value: string): string {
    const date = new Date(value);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    }

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Ayer';
    }

    return date.toLocaleDateString('es-ES', { weekday: 'short' });
  }
}
