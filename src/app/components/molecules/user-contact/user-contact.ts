import { Component, input, output } from '@angular/core';
import { Icon } from '../../atoms/icon/icon';
import { Badge } from '../../atoms/badge/badge';
import { Button } from '../../atoms/button/button';
import { Router, RouterLink } from '@angular/router';
import { IUsuario } from '../../../interfaces/i-usuario';
import { UsersService } from '../../../services/users-service';

@Component({
  selector: 'molecule-user-contact',
  imports: [RouterLink, Icon, Badge, Button, RouterLink],
  templateUrl: './user-contact.html',
  styleUrl: './user-contact.css',
})
export class UserContact {
  public name = input<string>("");
  public last_name = input<string>("");
  public year = input<number>(2026);
  public estado = input<number>(2026);
  public routeReport  = input<string[]>(['']); 
  public routeContact  = input<string[]>(['']); 
}


