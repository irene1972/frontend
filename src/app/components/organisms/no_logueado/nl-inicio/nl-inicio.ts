import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { IArticle } from '../../../../interfaces/i-article';
import { Router, RouterLink } from '@angular/router';
import { PUBLIC_ASSETS } from '../../../../constants/public-assets';

@Component({
  selector: 'app-nl-inicio',
  imports: [RouterLink],
  templateUrl: './nl-inicio.html',
  styleUrl: './nl-inicio.css',
})
export class NLInicio {
  readonly assets = PUBLIC_ASSETS;
  private router = inject(Router);
  user:any={};

  @Input() best_sellers:IArticle[] = [];
  @Input() recents:IArticle[] = [];

  constructor(private cd: ChangeDetectorRef){}

  ngOnInit(){
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
    }
  }

  goToExplore(): void {
    this.router.navigate([`/explore`]);
  }
}
