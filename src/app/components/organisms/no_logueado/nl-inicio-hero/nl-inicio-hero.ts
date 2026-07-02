import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { IArticle } from '../../../../interfaces/i-article';
import { ArticlesService } from '../../../../services/articles-service';
import { RouterLink } from '@angular/router';
import { PUBLIC_ASSETS } from '../../../../constants/public-assets';

@Component({
  selector: 'app-nl-inicio-hero',
  imports: [RouterLink],
  templateUrl: './nl-inicio-hero.html',
  styleUrl: './nl-inicio-hero.css',
})
export class NLInicioHero {
  readonly assets = PUBLIC_ASSETS;
  mensaje: string = '';
  tipo: boolean = false;
  bestSellers:IArticle[] = [];
  articlesService = inject(ArticlesService);
  user:any={};

  constructor(private cd: ChangeDetectorRef){}

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
    }

    this.articlesService.getArticlesBestSellers().subscribe({
      next: (data) => {
        if (data.error) {
        this.mensaje = data.error;
        return;
      } else {
        this.bestSellers = data.articulos;
        this.cd.detectChanges();
      }
      },
      error: (err) => {
        console.error(err);
        
      }
    });
  }
}
