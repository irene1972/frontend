import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserSidebar } from '../../components/organisms/user-sidebar/user-sidebar';

@Component({
  selector: 'app-user-panel',
  imports: [UserSidebar,RouterOutlet],
  templateUrl: './user-panel.html',
  styleUrl: './user-panel.css',
})
export class UserPanel {

}
