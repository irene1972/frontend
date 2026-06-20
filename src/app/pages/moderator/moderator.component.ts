import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModeratorSidebarComponent } from '../../components/organisms/moderator-sidebar/moderator-sidebar.component';

@Component({
  selector: 'app-moderator',
  imports: [ModeratorSidebarComponent, RouterOutlet],
  templateUrl: './moderator.component.html',
  styleUrl: './moderator.component.css',
})
export class ModeratorComponent {

}
