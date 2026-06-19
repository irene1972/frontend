import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { IArticle } from '../../../interfaces/i-article';
import { ArticlesService } from '../../../services/articles-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nl-inicio-hero',
  imports: [RouterLink],
  templateUrl: './nl-inicio-hero.html',
  styleUrl: './nl-inicio-hero.css',
})
export class NLInicioHero {
  mensaje: string = '';
  tipo: boolean = false;
  bestSellers:IArticle[] = [];
  articlesService = inject(ArticlesService);

  constructor(private cd: ChangeDetectorRef){}

  ngOnInit() {
    this.articlesService.getArticlesBestSellers().subscribe((data) => {
      if (data.error) {
        this.mensaje = data.error;
        return;
      } else {
        console.log(data.articulos);
        this.bestSellers = data.articulos;
        this.cd.detectChanges();
      }
    });
  }
}
