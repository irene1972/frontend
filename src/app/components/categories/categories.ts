import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../services/categories-service';
import { ICategory } from '../../interfaces/i-category';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  mensaje: string = '';
  tipo: boolean = false;
  categorias: ICategory[] = [];
  categoriesService = inject(CategoriesService);

  constructor(private cd: ChangeDetectorRef){}

  ngOnInit() {
    this.categoriesService.getAllCategories().subscribe((data) => {
      if (data.error) {
        this.mensaje = data.error;
        return;
      } else {
        console.log(data);
        this.categorias = data;
        this.cd.detectChanges();
      }
    });
  }

  borrar(id: number) {

  }
}
