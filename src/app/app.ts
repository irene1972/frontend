import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/organisms/header/header';
import { MobileBar } from './components/organisms/mobile-bar/mobile-bar';
import { Footer } from './components/organisms/footer/footer';
import { PreFooter } from './components/organisms/pre-footer/pre-footer';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, PreFooter, MobileBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}