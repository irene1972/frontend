import { Component, input } from '@angular/core';
import { Icon } from '../../../atoms/icon/icon';
import { IconVariant } from '../../../atoms/icon/icon.config';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'molecule-management-card',
  imports: [Icon, RouterLink],
  templateUrl: './management-card.html',
  styleUrl: './management-card.css',
})
export class ManagementCard {
  /* Public inputs */
  public icon    = input<IconVariant | null>(null)
  public link    = input<string>("home/")
  public title   = input<string>("title")
  public text    = input<string>("text")
  public shadow  = input<boolean>(true)
  public notify  = input<string>("1")
}
