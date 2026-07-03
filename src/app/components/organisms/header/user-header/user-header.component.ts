import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { UserMenuDrawerComponent } from './user-menu-drawer/user-menu-drawer.component';
import { Icon } from '../../../atoms/icon/icon';
import { MessagingSocketService } from '../../../../services/messaging-socket-service';
import { MessagesService } from '../../../../services/messages-service';
import { NotificacionesService } from '../../../../services/notificaciones-service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-header',
  imports: [RouterLink, UserMenuDrawerComponent, Icon],
  templateUrl: './user-header.component.html',
  styleUrl: './user-header.component.css',
})
export class UserHeaderComponent implements OnInit {
  private readonly messagingSocket = inject(MessagingSocketService);
  private readonly messagesService = inject(MessagesService);
  private readonly notificacionesService = inject(NotificacionesService);

  readonly unreadTotal = this.messagingSocket.unreadTotal;
  readonly sinLeer = toSignal(this.notificacionesService.sinLeer$, { initialValue: 0 });

  userInitials = '';
  isMenuOpen = false;

  ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    let usuarioId: number | null = null;

    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      this.userInitials = usuario.iniciales ?? '';
      if (usuario?.id) {
        usuarioId = Number(usuario.id);
      }
    }

    this.messagingSocket.connect();
    void this.loadUnreadCount();

    if (usuarioId !== null) {
      this.notificacionesService.refreshSinLeer(usuarioId);
    }
  }

  private async loadUnreadCount(): Promise<void> {
    try {
      const { total } = await lastValueFrom(this.messagesService.getUnreadCount());
      this.messagingSocket.setUnreadCount(total);
    } catch {
    }
  }

  openMenu(): void {
    this.isMenuOpen = true;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
