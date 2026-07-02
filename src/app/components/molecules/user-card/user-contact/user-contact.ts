import { Component, input } from '@angular/core';
import { Badge } from "../../../atoms/badge/badge";
import { UserCard } from "../user-card";

@Component({
  selector: 'molecule-user-contact',
  imports: [Badge, UserCard],
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


