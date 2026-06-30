import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../atoms/icon/icon';
import { StatusCard } from '../../../molecules/cards/status-card/status-card';
import { ArticleCard } from '../../../molecules/cards/article-card/article-card';
import { IArticle } from '../../../../interfaces/i-article';
import { ArticlesService } from '../../../../services/articles-service';
import { UsersService } from '../../../../services/users-service';
import { RatingsService } from '../../../../services/ratings-service';
import { OrdersService } from '../../../../services/orders-service';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, Icon, StatusCard, ArticleCard],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private articlesService = inject(ArticlesService);
  private usersService = inject(UsersService);
  private ratingsService = inject(RatingsService);
  private ordersService = inject(OrdersService);

  // Cabecera (datos reales del backend; por defecto hasta que respondan los servicios)
  userId = 1;
  nombre = signal('');
  iniciales = signal('');
  ratingAverage = signal(0);
  ratingTotal = signal(0);
  desde = signal(2026);

  // Articulos del usuario (datos reales, mismo patron que la pantalla de Ventas de Irene)
  articulos = signal<IArticle[]>([]);

  // Stats reales (derivadas de los endpoints del equipo)
  ventas = signal(0);
  compras = signal(0);
  activos = signal(0);

  ngOnInit(): void {
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (!usuarioString) {
      return;
    }
    const user = JSON.parse(usuarioString);
    this.userId = Number(user.id) || 1;

    // Cabecera: nombre completo, iniciales y anio de alta (GET /usuarios/:id)
    this.usersService.getUserById(String(this.userId)).subscribe({
      next: (u) => {
        const nombreCompleto = [u?.nombre, u?.apellidos].filter(Boolean).join(' ').trim();
        const nombreFinal = nombreCompleto || u?.username || 'Usuario';
        this.nombre.set(nombreFinal);
        this.iniciales.set(this.calcularIniciales(nombreFinal));
        if (u?.created_at) {
          this.desde.set(new Date(u.created_at).getFullYear());
        }
      },
      error: (err) => console.error('Error cargando usuario:', err),
    });

    // Valoracion media + total recibidas (GET /valoraciones/usuario/:id/promedio)
    this.ratingsService.getRatingsByUser(this.userId).subscribe({
      next: (r) => {
        this.ratingAverage.set(Number(r?.puntuacion_media ?? 0));
        this.ratingTotal.set(Number(r?.total_valoraciones ?? 0));
      },
      error: (err) => console.error('Error cargando valoraciones:', err),
    });

    // Ventas (GET /pedidos/usuario/:id/ventas -> total_ventas)
    this.ordersService.getOrdersByUser(this.userId).subscribe({
      next: (v) => {
        this.ventas.set(Number(v?.total_ventas ?? 0));
      },
      error: (err) => console.error('Error cargando ventas:', err),
    });

    // Compras (GET /pedidos/usuario/:id -> array de pedidos como comprador)
    this.ordersService.getPurchasesByUser(this.userId).subscribe({
      next: (compras) => {
        this.compras.set(Array.isArray(compras) ? compras.length : 0);
      },
      error: (err) => console.error('Error cargando compras:', err),
    });

    // Articulos activos / publicados (GET /articulos/usuario/:id/publicados -> total_publicados)
    this.articlesService.getCountArticlesByUser(this.userId).subscribe({
      next: (a) => {
        this.activos.set(Number(a?.total_publicados ?? 0));
      },
      error: (err) => console.error('Error cargando publicados:', err),
    });

    // Rejilla "Mis articulos publicados" (GET /articulos/get-all/usuario/:id)
    this.articlesService.getArticlesByUser(this.userId).subscribe({
      next: (data) => {
        this.articulos.set(data ?? []);
      },
      error: (err) => console.error('Error cargando articulos:', err),
    });
  }

  precio(a: IArticle): number {
    return Number(a.precio) || 0;
  }

  private calcularIniciales(nombre: string): string {
    const partes = nombre.trim().split(/\s+/);
    return ((partes[0]?.[0] ?? '') + (partes[1]?.[0] ?? '')).toUpperCase();
  }
}