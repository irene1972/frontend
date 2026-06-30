import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  IConversation,
  IConversationSummary,
  IUnreadCountResponse,
} from '../interfaces/i-conversation';
import { IMessage } from '../interfaces/i-message';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private baseUrl = `${environment.apiUrl}/conversaciones/`;
  private httpClient = inject(HttpClient);

  getMyConversations(): Observable<IConversation[]> {
    return this.httpClient.get<IConversation[]>(`${this.baseUrl}mias`);
  }

  getUnreadCount(): Observable<IUnreadCountResponse> {
    return this.httpClient.get<IUnreadCountResponse>(`${this.baseUrl}no-leidos/count`);
  }

  getByPedidoId(pedidoId: number): Observable<IConversationSummary> {
    return this.httpClient.get<IConversationSummary>(`${this.baseUrl}pedido/${pedidoId}`);
  }

  getMessages(conversacionId: number): Observable<IMessage[]> {
    return this.httpClient.get<IMessage[]>(`${this.baseUrl}${conversacionId}/mensajes`);
  }
}
