import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { IArticle } from '../../../interfaces/i-article';
import { ArticlesService } from '../../../services/articles-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nl-inicio',
  imports: [RouterLink],
  templateUrl: './nl-inicio.html',
  styleUrl: './nl-inicio.css',
})
export class NLInicio {
  mensaje: string = '';
  tipo: boolean = false;
  recents: IArticle[] = [];
  bestSellers:IArticle[] = [];
  articlesService = inject(ArticlesService);

  constructor(private cd: ChangeDetectorRef){}

  ngOnInit() {
    this.articlesService.getArticlesRecentlyUploaded().subscribe((data) => {
      if (data.error) {
        this.mensaje = data.error;
        return;
      } else {
        console.log(data);
        this.recents = data;
        this.cd.detectChanges();
      }
    });
    
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
