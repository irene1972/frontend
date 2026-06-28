import { Component, input, output } from '@angular/core';
import { Badge } from "../../../atoms/badge/badge";
import { Button } from "../../../atoms/button/button";
import { RouterLink } from '@angular/router';
import { UserCard } from "../user-card";

@Component({
  selector: 'molecule-user-contact',
  imports: [Badge, Button, RouterLink, UserCard],
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


