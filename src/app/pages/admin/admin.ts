import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "../../components/organisms/sidebar/sidebar";
import { SidebarVariant } from "../../components/organisms/sidebar/sidebar.config";

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

}
