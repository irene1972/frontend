import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonIcon } from '../../atoms/button-icon/button-icon';

@Component({
  selector: 'app-mobile-bar',
  imports: [RouterLink, RouterLinkActive, ButtonIcon],
  templateUrl: './mobile-bar.html',
  styleUrl: './mobile-bar.css',
})
export class MobileBar {

}
