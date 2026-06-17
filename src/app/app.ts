import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { MobileBar } from './shared/mobile-bar/mobile-bar';
import { Footer } from './shared/footer/footer';
import { PreFooter } from './shared/pre-footer/pre-footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, PreFooter, MobileBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}