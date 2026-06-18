import { Component } from '@angular/core';
import { AdminSidebar } from '../../components/organisms/admin-sidebar/admin-sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [AdminSidebar,RouterOutlet],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

}
