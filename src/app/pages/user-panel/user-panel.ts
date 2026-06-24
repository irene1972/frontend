import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserSidebar } from '../../components/organisms/user-sidebar/user-sidebar';
import { HomeBar } from '../../components/organisms/home-bar/home-bar';

@Component({
  selector: 'app-user-panel',
  imports: [UserSidebar,RouterOutlet,HomeBar],
  templateUrl: './user-panel.html',
  styleUrl: './user-panel.css',
})
export class UserPanel {

}
