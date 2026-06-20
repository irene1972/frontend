import { Component, input } from '@angular/core';
import { Icon } from "../../atoms/icon/icon";

@Component({
  selector: 'molecule-header-profile',
  imports: [Icon],
  templateUrl: './header-profile.html',
  styleUrl: './header-profile.css',
})
export class HeaderProfile {
 /* Public inputs */
  public username = input<string>("Admin")
  public initials    = input<string>("AA")
  public rating_average = input<string>("")
  public rating_total   = input<string>("")
  public role = input<string>("Admin")
}
