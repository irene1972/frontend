import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  INotificacion,
  INotificacionLeidaResponse,
  INotificacionesSinLeer,
} from '../interfaces/i-notificacion';

@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  private baseUrl = `${environment.apiUrl}/notificaciones`;
  private readonly httpClient = inject(HttpClient);
  private readonly sinLeerSubject = new BehaviorSubject<number>(0);

  readonly sinLeer$ = this.sinLeerSubject.asObservable();

  getNotificaciones(usuarioId: number): Observable<INotificacion[]> {
    return this.httpClient.get<INotificacion[]>(`${this.baseUrl}/usuario/${usuarioId}`);
  }

  getContarSinLeer(usuarioId: number): Observable<INotificacionesSinLeer> {
    return this.httpClient.get<INotificacionesSinLeer>(
      `${this.baseUrl}/usuario/${usuarioId}/sin-leer`
    );
  }

  refreshSinLeer(usuarioId: number): void {
    this.getContarSinLeer(usuarioId).subscribe({
      next: ({ sinLeer }) => this.sinLeerSubject.next(sinLeer),
      error: () => this.sinLeerSubject.next(0),
    });
  }

  marcarComoLeida(usuarioId: number, notificacionId: number): Observable<INotificacionLeidaResponse> {
    return this.httpClient
      .put<INotificacionLeidaResponse>(
        `${this.baseUrl}/usuario/${usuarioId}/${notificacionId}/leer`,
        {}
      )
      .pipe(tap(({ sinLeer }) => this.sinLeerSubject.next(sinLeer)));
  }

  marcarComoLeidas(usuarioId: number): Observable<{ message: string }> {
    return this.httpClient
      .put<{ message: string }>(`${this.baseUrl}/usuario/${usuarioId}/leer`, {})
      .pipe(tap(() => this.sinLeerSubject.next(0)));
  }
}
