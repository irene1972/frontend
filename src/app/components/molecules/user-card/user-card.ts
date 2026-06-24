import { Component, input } from '@angular/core';
import { Icon } from "../../atoms/icon/icon";
import { Badge } from "../../atoms/badge/badge";
import { BadgeVariant } from '../../atoms/badge/badge.types';

@Component({
  selector: 'molecule-user-card',
  imports: [Icon, Badge],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  public name        = input<string>("Carlos");
  public last_name   = input<string>("Martínez");
  public role        = input<BadgeVariant | null>();
  public arrow       = input<boolean>(false);
  public shadow      = input<boolean>(false);
  public transparent = input<boolean>(true);
}
