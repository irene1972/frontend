import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { UserMenuDrawerComponent } from './user-menu-drawer/user-menu-drawer.component';
import { Icon } from '../../../atoms/icon/icon';
import { MessagingSocketService } from '../../../../services/messaging-socket-service';
import { MessagesService } from '../../../../services/messages-service';
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

  readonly unreadTotal = this.messagingSocket.unreadTotal;

  userInitials = '';
  isMenuOpen = false;

  ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      this.userInitials = usuario.iniciales;
    }

    this.messagingSocket.connect();
    void this.loadUnreadCount();
  }

  private async loadUnreadCount(): Promise<void> {
    try {
      const { total } = await lastValueFrom(this.messagesService.getUnreadCount());
      this.messagingSocket.setUnreadCount(total);
    } catch {
      // sin badge si falla la carga inicial
    }
  }

  openMenu(): void {
    this.isMenuOpen = true;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
