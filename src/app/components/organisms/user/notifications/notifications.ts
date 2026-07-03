import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionesService } from '../../../../services/notificaciones-service';
import { INotificacion } from '../../../../interfaces/i-notificacion';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications implements OnInit {
  private readonly notificacionesService = inject(NotificacionesService);

  listaNotificaciones: INotificacion[] = [];
  usuarioId: number | null = null;

  ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      if (usuario?.id) {
        this.usuarioId = Number(usuario.id);
      }
    }

    if (this.usuarioId !== null) {
      this.cargarNotificaciones();
    }
  }

  cargarNotificaciones(): void {
    const usuarioId = this.usuarioId;
    if (usuarioId === null) return;

    this.notificacionesService.getNotificaciones(usuarioId).subscribe({
      next: (data) => {
        this.listaNotificaciones = data;
        this.notificacionesService.marcarComoLeidas(usuarioId).subscribe();
      },
      error: (err) => console.error('Error al cargar notificaciones:', err)
    });
  }
}
