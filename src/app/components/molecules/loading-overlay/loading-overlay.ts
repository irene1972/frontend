import { Component, input } from '@angular/core';

@Component({
  selector: 'molecule-loading-overlay',
  imports: [],
  templateUrl: './loading-overlay.html',
  styleUrl: './loading-overlay.css',
})
export class LoadingOverlay {
  isLoading = input.required<boolean>();
  message = input<string>('Cargando...');
}
