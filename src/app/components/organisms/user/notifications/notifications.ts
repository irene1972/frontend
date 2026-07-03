import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NotificacionesService } from '../../../../services/notificaciones-service';

@Component({
  selector: 'app-notifications',
  standalone: true, 
  imports: [CommonModule],
  providers: [NotificacionesService], 
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications implements OnInit {
  private readonly notificacionesService = inject(NotificacionesService);
  private readonly cdr = inject(ChangeDetectorRef);

  listaNotificaciones: any[] = [];
  usuarioId: number = 41; 

  ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      if (usuario && usuario.id) {
        this.usuarioId = usuario.id; 
      }
    }
    
    setTimeout(() => {
      this.cargarNotificaciones();
    }, 0);
  }

  cargarNotificaciones(): void {
    // CORRECCIÓN: Le pasamos el usuarioId a la función para que coincida con el backend nuevo
    this.notificacionesService.getNotificaciones(this.usuarioId).subscribe({
      next: (data: any[]) => {
        this.listaNotificaciones = data;
        this.cdr.detectChanges(); 
        
        this.notificacionesService.marcarComoLeidas(this.usuarioId).subscribe();
      },
      error: (err: any) => console.error('Error al cargar notificaciones:', err)
    });
  }
}
