import { Component, Input } from '@angular/core';
import { Icon } from '../../../atoms/icon/icon';
import { IRating } from '../../../../interfaces/i-rating';

@Component({
  selector: 'app-rating-user',
  imports: [Icon],
  templateUrl: './rating-user.html',
  styleUrl: './rating-user.css',
})
export class RatingUser {
  @Input() valoracion!:IRating;
}
