import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeBar } from '../../components/organisms/home-bar/home-bar';
import { Button } from '../../components/atoms/button/button';
import { Badge } from '../../components/atoms/badge/badge';
import { ButtonIcon } from '../../components/atoms/button-icon/button-icon';
import { Icon } from '../../components/atoms/icon/icon';
import { BadgeCondition } from '../../components/atoms/badge/badge.types';
import { ArticlesService } from '../../services/articles-service';
import { CategoriesService } from '../../services/categories-service';
import { ICategory } from '../../interfaces/i-category';
import { IExploreArticulo } from '../../interfaces/i-explore-articulos';
import { PUBLIC_ASSETS } from '../../constants/public-assets';

interface ExploreArticle {
  id: number;
  title: string;
  condition: BadgeCondition;
  location: string;
  sellerName: string;
  sellerLastName: string;
  sellerRole: 'pro' | 'new' | null;
  rating: number | null;
  reviewCount: number;
  price: number;
  priceOld?: number;
  sold?: boolean;
  imageUrl: string;
}

interface ExploreCategoryFilter {
  id: number;
  label: string;
  checked: boolean;
}

@Component({
  selector: 'app-explore-component',
  imports: [HomeBar, Button, Badge, ButtonIcon, Icon, FormsModule],
  templateUrl: './explore-component.html',
  styleUrl: './explore-component.css',
})
export class ExploreComponent implements OnInit {
  private router = inject(Router);
  private articlesService = inject(ArticlesService);
  private categoriesService = inject(CategoriesService);
  private cd = inject(ChangeDetectorRef);

  private readonly placeholderImage = PUBLIC_ASSETS.noPhoto;

  searchQuery = '';
  priceMin: number | null = null;
  priceMax: number | null = null;
  locationFilter = '';
  sortBy = 'relevancia';
  currentPage = 1;
  pageSize = 12;

  loading = false;
  errorMessage = '';

  trends = ['RTX 4080', 'Ryzen 9', 'DDR5', 'PS5'];

  categories: ExploreCategoryFilter[] = [];

  conditions = [
    { label: 'Nuevo' as BadgeCondition, checked: false },
    { label: 'Como nuevo' as BadgeCondition, checked: false },
    { label: 'Buen estado' as BadgeCondition, checked: false },
  ];

  sortOptions = [
    { value: 'relevancia', label: 'Relevancia' },
    { value: 'precio-asc', label: 'Precio: menor a mayor' },
    { value: 'precio-desc', label: 'Precio: mayor a menor' },
    { value: 'recientes', label: 'Más recientes' },
  ];

  articles: ExploreArticle[] = [];
  totalResults = 0;
  totalPages = 0;

  get showingFrom(): number {
    if (this.totalResults === 0) return 0;
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get showingTo(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalResults);
  }

  get canGoPrevious(): boolean {
    return this.currentPage > 1 && !this.loading;
  }

  get canGoNext(): boolean {
    return this.currentPage < this.totalPages && !this.loading;
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadArticles();
  }

  private loadCategories(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (data) => {
        if (Array.isArray(data)) {
          this.categories = data.map((category: ICategory) => ({
            id: category.id,
            label: category.nombre,
            checked: false,
          }));
          this.cd.detectChanges();
        }
      },
      error: (err) => console.error(err),
    });
  }

  loadArticles(page = 1, scroll = false): void {
    this.currentPage = page;
    this.loading = true;
    this.errorMessage = '';

    const selectedCategories = this.categories
      .filter((c) => c.checked)
      .map((c) => c.id);

    const selectedConditions = this.conditions
      .filter((c) => c.checked)
      .map((c) => c.label);

    this.articlesService
      .getArticlesExplore({
        pagina: this.currentPage,
        por_pagina: this.pageSize,
        q: this.searchQuery.trim() || undefined,
        categorias_id: selectedCategories.length
          ? selectedCategories.join(',')
          : undefined,
        precio_min: this.priceMin ?? undefined,
        precio_max: this.priceMax ?? undefined,
        estado_conservacion: selectedConditions.length
          ? selectedConditions.join(',')
          : undefined,
        ubicacion: this.locationFilter.trim() || undefined,
        ordenar: this.sortBy,
      })
      .subscribe({
        next: (response) => {
          this.articles = response.articulos.map((article) =>
            this.mapArticle(article)
          );
          this.totalResults = response.paginacion.total;
          this.totalPages = response.paginacion.total_paginas;
          this.loading = false;
          this.cd.detectChanges();
          if (scroll) {
            this.scrollToResults();
          }
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'No se pudieron cargar los artículos.';
          this.loading = false;
          this.cd.detectChanges();
        },
      });
  }

  private mapArticle(article: IExploreArticulo): ExploreArticle {
    const rol = article.vendedor.rol_vendedor;

    return {
      id: article.id,
      title: article.titulo,
      condition: article.estado_conservacion_id,
      location: article.ubicacion ?? '—',
      sellerName: article.vendedor.nombre,
      sellerLastName: article.vendedor.apellidos,
      sellerRole: rol === 'nuevo' ? 'new' : rol,
      rating: article.vendedor.valoracion.puntuacion_media,
      reviewCount: article.vendedor.valoracion.total_valoraciones,
      price: article.precio,
      priceOld: article.precio_anterior ?? undefined,
      sold: article.vendido,
      imageUrl: article.url_foto ?? this.placeholderImage,
    };
  }

  onSearch(): void {
    this.loadArticles(1);
  }

  onSortChange(): void {
    this.loadArticles(1);
  }

  applyTrend(trend: string): void {
    this.searchQuery = trend;
    this.onSearch();
  }

  clearFilters(): void {
    this.categories.forEach((c) => (c.checked = false));
    this.conditions.forEach((c) => (c.checked = false));
    this.priceMin = null;
    this.priceMax = null;
    this.locationFilter = '';
    this.loadArticles(1);
  }

  sellerInitials(article: ExploreArticle): string {
    return `${article.sellerName.charAt(0)}${article.sellerLastName.charAt(0)}`;
  }

  sellerDisplayName(article: ExploreArticle): string {
    return `${article.sellerName} ${article.sellerLastName.charAt(0)}.`;
  }

  ratingLabel(article: ExploreArticle): string {
    if (article.rating === null) {
      return 'Sin valoraciones';
    }
    return `${article.rating} · ${article.reviewCount} valoraciones`;
  }

  goToDetail(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages || page === this.currentPage || this.loading) {
      return;
    }
    this.loadArticles(page, true);
  }

  goToPreviousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  goToNextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  private scrollToResults(): void {
    document.querySelector('.results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
