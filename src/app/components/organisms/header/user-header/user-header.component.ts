import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { UserMenuDrawerComponent } from './user-menu-drawer/user-menu-drawer.component';
import { Icon } from '../../../atoms/icon/icon';
import { MessagingSocketService } from '../../../../services/messaging-socket-service';
import { MessagesService } from '../../../../services/messages-service';
import { NotificacionesService } from '../../../../services/notificaciones-service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-header',
  imports: [CommonModule, RouterLink, UserMenuDrawerComponent, Icon],
  providers: [NotificacionesService],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css',
})
export class UserHeaderComponent implements OnInit {
  private readonly messagingSocket = inject(MessagingSocketService);
  private readonly messagesService = inject(MessagesService);
  private readonly notificacionesService = inject(NotificacionesService);

  readonly unreadTotal = this.messagingSocket.unreadTotal;

  numSinLeer = 0;
  usuarioId = 1;
  userInitials = '';
  isMenuOpen = false;

  ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      this.userInitials = usuario.iniciales;
      if (usuario.id) {
        this.usuarioId = usuario.id;
      }
    }

    this.messagingSocket.connect();
    void this.loadUnreadCount();
    this.loadNotificacionesCount();
  }

  private async loadUnreadCount(): Promise<void> {
    try {
      const { total } = await lastValueFrom(this.messagesService.getUnreadCount());
      this.messagingSocket.setUnreadCount(total);
    } catch {
    }
  }

  private loadNotificacionesCount(): void {
    this.notificacionesService.getContarSinLeer(this.usuarioId).subscribe({
      next: (res: any) => {
        this.numSinLeer = res.sinLeer;
      },
      error: (err: any) => console.error(err)
    });
  }

  openMenu(): void {
    this.isMenuOpen = true;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
