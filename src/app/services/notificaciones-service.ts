import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  // Esta es la dirección de tu servidor Node.js
  private apiUrl = 'http://localhost:3000/api/notificaciones'; 

  constructor(private http: HttpClient) { }

  // 1. Pide la lista de notificaciones a tu base de datos de Railway
  getNotificaciones(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  // 2. Cuenta las notificaciones sin leer para poner el número en la campana
  getContarSinLeer(usuarioId: number): Observable<{ sinLeer: number }> {
    return this.http.get<{ sinLeer: number }>(`${this.apiUrl}/usuario/${usuarioId}/sin-leer`);
  }

  // 3. Cambia el estado en la base de datos a leídas (leida = 1)
  marcarComoLeidas(usuarioId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/usuario/${usuarioId}/leer`, {});
  }
}
