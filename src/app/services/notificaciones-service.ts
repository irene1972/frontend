import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { INotificacion, INotificacionesSinLeer } from '../interfaces/i-notificacion';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private baseUrl = `${environment.apiUrl}/notificaciones`;
  httpClient = inject(HttpClient);

  getNotificaciones(usuarioId: number): Observable<INotificacion[]> {
    return this.httpClient.get<INotificacion[]>(`${this.baseUrl}/usuario/${usuarioId}`);
  }

  getContarSinLeer(usuarioId: number): Observable<INotificacionesSinLeer> {
    return this.httpClient.get<INotificacionesSinLeer>(`${this.baseUrl}/usuario/${usuarioId}/sin-leer`);
  }

  marcarComoLeidas(usuarioId: number): Observable<{ message: string }> {
    return this.httpClient.put<{ message: string }>(`${this.baseUrl}/usuario/${usuarioId}/leer`, {});
  }
}
