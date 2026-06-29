import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CategoriesService } from '../../../services/categories-service';
import { ICategory } from '../../../interfaces/i-category';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './home-bar.html',
  styleUrl: './home-bar.css',
})
export class HomeBar {
  categorias: ICategory[] = [];
  categoriesService = inject(CategoriesService);

  constructor(private cd: ChangeDetectorRef){}

  /** Devuelve el icono de Bootstrap Icons segun el nombre de la categoria. */
  iconoCategoria(nombre: string): string {
    const key = (nombre ?? '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
    const mapa: Record<string, string> = {
      'audio': 'bi-headphones',
      'componentes': 'bi-cpu',
      'monitores': 'bi-display',
      'moviles': 'bi-phone',
      'portatiles': 'bi-laptop',
      'tablets': 'bi-tablet',
      'tarjetas graficas': 'bi-gpu-card',
    };
    return mapa[key] ?? 'bi-tag';
  }

  ngOnInit() {
    this.categoriesService.getAllCategories().subscribe({
      next: (data) => {
        if (data.error) {
        console.log(data.error);
        return;
      } else {
        console.log(data);
        this.categorias = data;
        this.cd.detectChanges();
      }
      },
      error: (err) => {
        console.error(err);
        
      }
    });
  }
}
