import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { IArticle } from '../../../../interfaces/i-article';
import { ArticlesService } from '../../../../services/articles-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nl-inicio',
  imports: [RouterLink],
  templateUrl: './nl-inicio.html',
  styleUrl: './nl-inicio.css',
})
export class NLInicio {
  
  @Input() best_sellers:IArticle[] = [];
  @Input() recents:IArticle[] = [];
  
}
