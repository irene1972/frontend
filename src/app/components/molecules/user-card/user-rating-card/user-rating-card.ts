import { Component, computed, input } from '@angular/core';
import { Icon } from '../../../atoms/icon/icon';
import { UserRatingCardData } from './user-rating-card.config';

/**
 * Molécula que muestra el avatar, nombre y valoración media de un vendedor.
 *
 * ## Descripción
 * Componente: recibe todos los datos ya resueltos desde el padre (`ProductView`).
 * Compone el átomo `atom-icon` dos veces:
 * - Avatar con iniciales (`profile-primary-square`).
 * - Estrella de valoración (`star`).
 *
 * Gestiona el caso `puntuacion_media: null` mostrando "Sin valoraciones".
 *
 * ## Uso
 * ```html
 * <molecule-user-rating-card [user]="vendedorData" />
 * ```
 */

@Component({
  selector: 'molecule-user-rating-card',
  imports: [Icon],
  templateUrl: './user-rating-card.html',
  styleUrl: './user-rating-card.css',
})
export class UserRatingCard {
  /*Inputs*/
  public user = input.required<UserRatingCardData | null>();

  protected hasRating = computed(() =>
    this.user()?.promedio.puntuacion_media != null
  );
 
  protected ratingLabel = computed(() => {
    if (!this.user()) return '';
    if (!this.hasRating()) return 'Sin valoraciones';
    const score = this.user()!.promedio.puntuacion_media!.toFixed(1);
    const total = this.user()!.promedio.total_valoraciones;
    return `${score} (${total} valoraciones)`;
  });

}
