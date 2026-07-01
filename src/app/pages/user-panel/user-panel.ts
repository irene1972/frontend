import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeBar } from '../../components/organisms/home-bar/home-bar';
import { Sidebar } from '../../components/organisms/sidebar/sidebar';

@Component({
  selector: 'app-user-panel',
  imports: [RouterOutlet,HomeBar,Sidebar],
  templateUrl: './user-panel.html',
  styleUrl: './user-panel.css',
})
export class UserPanel {

}
