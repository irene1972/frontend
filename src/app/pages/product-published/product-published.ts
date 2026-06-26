import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HomeBar } from '../../components/organisms/home-bar/home-bar';
import { IArticle } from '../../interfaces/i-article';
import { ArticlesService } from '../../services/articles-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-published',
  imports: [HomeBar],
  templateUrl: './product-published.html',
  styleUrl: './product-published.css',
})
export class ProductPublished {
  mensaje: string = '';
  tipo: boolean = false;
  articulo!: IArticle;
  articlesService = inject(ArticlesService);

  constructor(private cd: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('productID')!;
    console.log(id);

    this.articlesService.getArticleById(Number(id)).subscribe({
      next: (data) => {
        console.log(data);
        this.articulo = data;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.mensaje = err;
        return;
      }
    });
  }
}
