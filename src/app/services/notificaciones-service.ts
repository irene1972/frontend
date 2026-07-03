import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  // Esta es la dirección de tu servidor Node.js
  private baseUrl = `${environment.apiUrl}/notificaciones`;
  httpClient = inject(HttpClient);

  // 1. Pide la lista de notificaciones a tu base de datos de Railway
  getNotificaciones(usuarioId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/usuario/${usuarioId}`);
  }

  // 2. Cuenta las notificaciones sin leer para poner el número en la campana
  getContarSinLeer(usuarioId: number): Observable<{ sinLeer: number }> {
    return this.httpClient.get<{ sinLeer: number }>(`${this.baseUrl}/usuario/${usuarioId}/sin-leer`);
  }

  // 3. Cambia el estado en la base de datos a leídas (leida = 1)
  marcarComoLeidas(usuarioId: number): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/usuario/${usuarioId}/leer`, {});
  }
}
