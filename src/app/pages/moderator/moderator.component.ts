import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "../../components/organisms/sidebar/sidebar";

@Component({
  selector: 'app-moderator',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './moderator.component.html',
  styleUrl: './moderator.component.css',
})
export class ModeratorComponent {

}
