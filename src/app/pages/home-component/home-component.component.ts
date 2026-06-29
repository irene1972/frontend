import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { NLInicio } from "../../components/organisms/no_logueado/nl-inicio/nl-inicio";
import { Heading } from "../../components/organisms/no_logueado/heading/heading";
import { HomeBar } from "../../components/organisms/home-bar/home-bar";
import { Buscador } from "../../components/molecules/buscador/buscador";
import { IArticle } from "../../interfaces/i-article";
import { ArticlesService } from "../../services/articles-service";


@Component({
  selector: 'app-home-component',
  imports: [NLInicio,Heading,HomeBar,Buscador],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css',
})
export class HomeComponentComponent {
  mensaje: string = '';
  tipo: boolean = false;
  textoBusqueda:string='';
  placeholder:string='Buscar movil, portatil, tablet...';
  bestSellers:IArticle[] = [];
  recents: IArticle[] = [];
  articlesService = inject(ArticlesService);

  constructor(private cd: ChangeDetectorRef){}

  get bestSellersFiltrados(): IArticle[] {
    if (!this.textoBusqueda.trim()) {
      return this.bestSellers;
    }
  
    const texto = this.textoBusqueda.toLowerCase();
  
    return this.bestSellers.filter(bestSeller =>
      bestSeller.titulo?.toLowerCase().includes(texto) ||
      bestSeller.descripcion?.toLowerCase().includes(texto)
    );
  }

  get recentsFiltrados(): IArticle[] {
    if (!this.textoBusqueda.trim()) {
      return this.recents;
    }
  
    const texto = this.textoBusqueda.toLowerCase();
  
    return this.recents.filter(recent =>
      recent.titulo?.toLowerCase().includes(texto) ||
      recent.descripcion?.toLowerCase().includes(texto)
    );
  }

  ngOnInit(){

    this.articlesService.getArticlesRecentlyUploaded().subscribe({
      next: (data) => {
        if (data.error) {
        this.mensaje = data.error;
        return;
      } else {
        this.recents = data;
        this.cd.detectChanges();
      }
      },
      error: (err) => {
        console.error(err);
        
      }
    });

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
