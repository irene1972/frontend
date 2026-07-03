import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { NotificacionesService } from '../../../../services/notificaciones-service';
import { INotificacion, NotificacionTipo } from '../../../../interfaces/i-notificacion';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications implements OnInit {
  private readonly notificacionesService = inject(NotificacionesService);

  readonly listaNotificaciones = signal<INotificacion[]>([]);
  readonly totalNotificaciones = computed(() => this.listaNotificaciones().length);
  readonly sinLeer = computed(() =>
    this.listaNotificaciones().filter((notif) => Number(notif.leida) === 0).length
  );

  private usuarioId: number | null = null;

  ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      if (usuario?.id) {
        this.usuarioId = Number(usuario.id);
      }
    }

    if (this.usuarioId !== null) {
      this.notificacionesService.refreshSinLeer(this.usuarioId);
      this.cargarNotificaciones();
    }
  }

  esNoLeida(notif: INotificacion): boolean {
    return Number(notif.leida) === 0;
  }

  esLeida(notif: INotificacion): boolean {
    return Number(notif.leida) === 1;
  }

  iconoPorTipo(tipo: NotificacionTipo | string): string {
    switch (tipo) {
      case 'sale':
        return '€';
      case 'purchase':
        return '🛒';
      case 'review':
        return '⭐';
      case 'moderation':
        return '⚠️';
      default:
        return '•';
    }
  }

  formatFecha(fecha: string): string {
    const date = new Date(fecha);
    const now = new Date();
    const esHoy = date.toDateString() === now.toDateString();

    if (esHoy) {
      return new Intl.DateTimeFormat('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    }

    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      ...(date.getFullYear() !== now.getFullYear() ? { year: 'numeric' as const } : {}),
    }).format(date);
  }

  cargarNotificaciones(): void {
    const usuarioId = this.usuarioId;
    if (usuarioId === null) return;

    this.notificacionesService.getNotificaciones(usuarioId).subscribe({
      next: (data) => {
        this.listaNotificaciones.set(data);
      },
      error: (err) => console.error('Error al cargar notificaciones:', err),
    });
  }

  marcarNotificacion(notif: INotificacion): void {
    const usuarioId = this.usuarioId;
    if (usuarioId === null || !this.esNoLeida(notif)) return;

    this.notificacionesService.marcarComoLeida(usuarioId, notif.id).subscribe({
      next: () => {
        this.listaNotificaciones.update((items) =>
          items.map((item) => (item.id === notif.id ? { ...item, leida: 1 } : item))
        );
      },
      error: (err) => console.error('Error al marcar la notificación como leída:', err),
    });
  }
}
