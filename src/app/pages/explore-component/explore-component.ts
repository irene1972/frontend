import { ChangeDetectorRef, Component, effect, inject, OnInit, signal, untracked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeBar } from '../../components/organisms/home-bar/home-bar';
import { Button } from '../../components/atoms/button/button';
import { BadgeCondition } from '../../components/atoms/badge/badge.types';
import { ArticlesService } from '../../services/articles-service';
import { CategoriesService } from '../../services/categories-service';
import { ICategory } from '../../interfaces/i-category';
import { IExploreArticulo } from '../../interfaces/i-explore-articulos';
import { lastValueFrom, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ArticleCard } from "../../components/molecules/cards/article-card/article-card";
import { ButtonIconStates } from '../../components/atoms/button-icon/button-icon.config';
import { FavoritesService } from '../../services/favorites-service';
import Swal from 'sweetalert2';
import { Toast } from "../../components/atoms/toast/toast";

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
  favId?: number | null;
  favState?: ButtonIconStates;
  imageUrl: string;
}

interface ExploreCategoryFilter {
  id: number;
  label: string;
  checked: boolean;
}

@Component({
  selector: 'app-explore-component',
  imports: [HomeBar, Button, FormsModule, ArticleCard, Toast],
  templateUrl: './explore-component.html',
  styleUrl: './explore-component.css',
})
export class ExploreComponent implements OnInit {
  private router = inject(Router);
  private activedRoute = inject(ActivatedRoute);
  private articlesService = inject(ArticlesService);
  private categoriesService = inject(CategoriesService);
  private favoritesService = inject(FavoritesService);
  private cd = inject(ChangeDetectorRef);

  private readonly placeholderImage =
    'https://placehold.co/400x300/E5EEFF/747683?text=Sin+imagen';

  protected readonly PRICE_MIN: number = 0;
  protected readonly PRICE_MAX: number = 1;
  searchQuery = '';
  priceMin = signal<number | null>(null);
  priceMax = signal<number | null>(null);
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

  articles = signal<ExploreArticle[]>([]);
  totalResults = 0;
  totalPages = 0;

  // Toast avisos de favoritos
  showToast = signal<boolean>(false);
  toastVariant = signal<'success' | 'info' | 'warn' | 'trash'>('success');
  toastMessage = signal<string>('');

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

  constructor() {
    effect(() => {
      this.selectedCategory();   // dependencia: se re-ejecuta al cambiar la URL
      untracked(() => this.applyCategoryAndLoad()); // Untracked para que no se registren las signals de dentro de esta función
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  protected selectedCategory = toSignal(
    this.activedRoute.queryParamMap.pipe(
      map(params => Number(params.get('categoria')) || null)
    ),
    { initialValue: null }
  );

  private applyCategoryAndLoad(): void {
    if (this.categories.length === 0) return;
    const categoryId = this.selectedCategory();
    this.categories.forEach(c => (c.checked = c.id === categoryId));
    void this.loadArticles(1);
    this.cd.detectChanges();
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
          this.applyCategoryAndLoad();
        }
      },
      error: (err) => console.error(err),
    });
  }

  // userId
  private getUserId(): number {
    const raw = localStorage.getItem('usuarioBuy&Sell');
    if (!raw) return 0;
    return Number(JSON.parse(raw).id);
  }

  async loadArticles(page = 1, scroll = false): Promise<void> {
    const userId = this.getUserId();
    this.currentPage = page;
    this.loading = true;
    this.errorMessage = '';

    const selectedCategories = this.categories
      .filter((c) => c.checked)
      .map((c) => c.id);

    const selectedConditions = this.conditions
      .filter((c) => c.checked)
      .map((c) => c.label);

    // Favoritos UNA sola vez por carga (lista vacía si no hay sesión o si falla)
    const favs: any[] = userId
      ? await lastValueFrom(this.favoritesService.getAllFavoritesByUser(userId)).catch(() => [])
      : [];

    this.articlesService
      .getArticlesExplore({
        pagina: this.currentPage,
        por_pagina: this.pageSize,
        q: this.searchQuery.trim() || undefined,
        categorias_id: selectedCategories.length
          ? selectedCategories.join(',')
          : undefined,
        precio_min: this.priceMin() ?? undefined,
        precio_max: this.priceMax() ?? undefined,
        estado_conservacion: selectedConditions.length
          ? selectedConditions.join(',')
          : undefined,
        ubicacion: this.locationFilter.trim() || undefined,
        ordenar: this.sortBy,
        usuario_id: userId,
      })
      .subscribe({
        next: (response) => {
          this.articles.set(response.articulos.map((a) => this.mapArticle(a, favs)));
          this.totalResults = response.paginacion.total;
          this.totalPages = response.paginacion.total_paginas;
          this.loading = false;
          this.cd.detectChanges(); // para totalResults/totalPages/loading (no son signals)
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

  // Favoritos: toggle desde la card
  async toggleFav(article: ExploreArticle): Promise<void> {
    const raw = localStorage.getItem('usuarioBuy&Sell');

    if (!raw) {
      // Sin sesión: preguntamos si quiere iniciar sesión
      const result = await Swal.fire({
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión para guardar artículos en favoritos.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Iniciar sesión',
        cancelButtonText: 'Cancelar',
      });
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      }
      return;
    }
    const userId = JSON.parse(raw).id;

    try {
      if (article.favState === ButtonIconStates.INACTIVED) {
        const res = await lastValueFrom(
          this.favoritesService.addFavorite(userId, article.id)
        );
        this.updateArticleFav(article.id, res.id, ButtonIconStates.ACTIVED);
        this.lanzarToast('success', 'El artículo ha sido añadido a la lista de favoritos');
      } else {
        await lastValueFrom(this.favoritesService.deleteFavorite(article.favId!));
        this.updateArticleFav(article.id, null, ButtonIconStates.INACTIVED);
        this.lanzarToast('info', 'Artículo eliminado de favoritos');
      }
    } catch (error) {
      this.router.navigate(['/500error']);
    }
  }

  // Reemplaza el artículo por una copia con el nuevo estado de favorito (inmutable)
  private updateArticleFav(id: number, favId: number | null, favState: ButtonIconStates): void {
    this.articles.update((list) =>
      list.map((a) => (a.id === id ? { ...a, favId, favState } : a))
    );
  }

  // Dispara el toast reutilizando el patrón del proyecto (señal trigger)
  private lanzarToast(variant: 'success' | 'info' | 'warn' | 'trash', message: string): void {
    this.toastVariant.set(variant);
    this.toastMessage.set(message);
    this.showToast.set(false);
    setTimeout(() => this.showToast.set(true), 10);
  }

  private mapArticle(article: IExploreArticulo, favs: any[]): ExploreArticle {
    const rol = article.vendedor.rol_vendedor;
    const fav = favs.find((f: any) => f.id === article.id);

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
      favId: fav?.favoritos_id ?? null,
      favState: fav ? ButtonIconStates.ACTIVED : ButtonIconStates.INACTIVED,
      imageUrl: article.url_foto ?? this.placeholderImage,
    };
  }

  onSearch(): void {
    void this.loadArticles(1);
  }

  onSortChange(): void {
    void this.loadArticles(1);
  }

  onPriceMinChange(value: number | null): void {
    if (value !== null && value < this.PRICE_MIN) {
      this.priceMin.set(this.PRICE_MIN);
    } else {
      this.priceMin.set(value);
    }
  }

  onPriceMaxChange(value: number | null): void {
    if (value !== null && value < this.PRICE_MAX) {
      this.priceMax.set(this.PRICE_MAX);
    } else {
      this.priceMax.set(value);
    }
  }

  applyTrend(trend: string): void {
    this.searchQuery = trend;
    this.onSearch();
  }

  clearFilters(): void {
    this.categories.forEach((c) => (c.checked = false));
    this.conditions.forEach((c) => (c.checked = false));
    this.priceMin.set(null);
    this.priceMax.set(null);
    this.locationFilter = '';
    void this.loadArticles(1);
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
    void this.loadArticles(page, true);
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