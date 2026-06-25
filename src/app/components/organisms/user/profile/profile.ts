import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../atoms/icon/icon';
import { StatusCard } from '../../../molecules/cards/status-card/status-card';
import { ArticleCard } from '../../../molecules/cards/article-card/article-card';
import { BadgeCondition } from '../../../atoms/badge/badge.types';
import { IArticle } from '../../../../interfaces/i-article';
import { ArticlesService } from '../../../../services/articles-service';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, Icon, StatusCard, ArticleCard],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private articlesService = inject(ArticlesService);
  private cd = inject(ChangeDetectorRef);

  // Cabecera. TODO: cablear users-service / ratings-service para datos reales.
  userId = 1;
  nombre = 'Manuel García';
  iniciales = 'MG';
  ratingAverage = 4.9;
  ratingTotal = 87;
  desde = 2026;

  // Artículos del usuario (datos reales, mismo patrón que la pantalla de Ventas de Irene)
  articulos: IArticle[] = [];

  // Stats. 'activos' se deriva de los artículos reales; el resto: TODO cablear services.
  ventas = 12;
  compras = 8;

  ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      const user = JSON.parse(usuarioString);
      this.userId = Number(user.id) || 1;
      if (user?.username) {
        this.nombre = user.username;
        this.iniciales = this.calcularIniciales(user.username);
      }
      this.articlesService.getArticlesByUser(this.userId).subscribe({
        next: (data) => {
          this.articulos = data ?? [];
          this.cd.detectChanges();
        },
        error: (err) => console.error('Error cargando artículos:', err),
      });
    }
  }

  // Nº de artículos activos (publicados), derivado de los datos reales
  get activos(): number {
    return this.articulos.filter((a) => a.estado_articulo_id === 'Publicado').length;
  }

  // Estado de conservación -> badge de la article-card (reutilizada de Irene)
  condicion(a: IArticle): BadgeCondition {
    return (a.estado_conservacion_id as BadgeCondition) ?? 'Como nuevo';
  }

  ubicacion(a: IArticle): string {
    return a.provincia?.nombre != null ? String(a.provincia.nombre) : '';
  }

  precio(a: IArticle): number {
    return Number(a.precio) || 0;
  }

  private calcularIniciales(nombre: string): string {
    const partes = nombre.trim().split(/\s+/);
    return ((partes[0]?.[0] ?? '') + (partes[1]?.[0] ?? '')).toUpperCase();
  }
}
