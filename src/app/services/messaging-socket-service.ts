import { Injectable, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import {
  IMessage,
  IMessagesReadEvent,
  INewMessageEvent,
  IUnreadCountEvent,
} from '../interfaces/i-message';

type SocketAck<T> = (response: T) => void;

interface SocketAckResponse<T = unknown> {
  ok: boolean;
  error?: string;
  data?: T;
}

@Injectable({
  providedIn: 'root',
})
export class MessagingSocketService {
  private socket: Socket | null = null;
  private readonly unreadCount = signal(0);

  readonly unreadTotal = this.unreadCount.asReadonly();

  connect(): void {
    if (this.socket?.connected) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    this.socket = io(environment.socketUrl, {
      auth: { token },
      transports: ['websocket', 'polling'],
    });

    this.socket.on('no-leidos:actualizar', (payload: IUnreadCountEvent) => {
      this.unreadCount.set(payload.total);
    });

    this.socket.on('connect_error', (error) => {
      console.error('Error de conexión Socket.io:', error.message);
    });
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }

  setUnreadCount(total: number): void {
    this.unreadCount.set(total);
  }

  onMensajeNuevo(callback: (event: INewMessageEvent) => void): () => void {
    this.socket?.on('mensaje:nuevo', callback);
    return () => this.socket?.off('mensaje:nuevo', callback);
  }

  onMensajesLeidos(callback: (event: IMessagesReadEvent) => void): () => void {
    this.socket?.on('mensajes:leidos', callback);
    return () => this.socket?.off('mensajes:leidos', callback);
  }

  joinConversacion(conversacionId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.socket?.connected) {
        reject(new Error('Socket no conectado'));
        return;
      }

      this.socket.emit(
        'conversacion:unirse',
        { conversacionId },
        (response: SocketAckResponse) => {
          if (response?.ok) {
            resolve();
          } else {
            reject(new Error(response?.error ?? 'No se pudo unir a la conversación'));
          }
        }
      );
    });
  }

  leaveConversacion(conversacionId: number): void {
    this.socket?.emit('conversacion:salir', { conversacionId });
  }

  markConversacionRead(conversacionId: number): void {
    this.socket?.emit('conversacion:leer', { conversacionId });
  }

  sendMessage(conversacionId: number, mensaje: string): Promise<IMessage> {
    return new Promise((resolve, reject) => {
      if (!this.socket?.connected) {
        reject(new Error('Socket no conectado'));
        return;
      }

      this.socket.emit(
        'mensaje:enviar',
        { conversacionId, mensaje },
        (response: SocketAckResponse<IMessage>) => {
          if (response?.ok && response.data) {
            resolve(response.data);
          } else {
            reject(new Error(response?.error ?? 'No se pudo enviar el mensaje'));
          }
        }
      );
    });
  }
}
