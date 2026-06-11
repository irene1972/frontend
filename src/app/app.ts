import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/organisms/header/header';
import { Footer } from './shared/organisms/footer/footer';
import { PreFooter } from './shared/organisms/pre-footer/pre-footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, PreFooter],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
