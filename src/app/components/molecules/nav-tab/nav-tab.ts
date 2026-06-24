import { Component, input, output, signal } from '@angular/core';
import { NavTabPage } from './nav-tab.config';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'molecule-nav-tab',
  imports: [RouterLink],
  templateUrl: './nav-tab.html',
  styleUrl: './nav-tab.css',
})
export class NavTab {
  public tabs = input<string[]>() 
  public click = output<number>();

  protected currentTab = signal<number>(0);

  protected activeTab(index: number) {
    this.click.emit(index)
  
  }
}
