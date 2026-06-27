import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { IArticle } from '../../../../interfaces/i-article';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nl-inicio',
  imports: [RouterLink],
  templateUrl: './nl-inicio.html',
  styleUrl: './nl-inicio.css',
})
export class NLInicio {
  private router = inject(Router);

  @Input() best_sellers:IArticle[] = [];
  @Input() recents:IArticle[] = [];

  constructor(private cd: ChangeDetectorRef){}

  goToExplore(): void {
    this.router.navigate(['/explore']);
  }
}
