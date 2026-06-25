import { Component, computed, input } from '@angular/core';
import { UserCard } from '../user-card';
import { Icon } from "../../../atoms/icon/icon";

/**
 * Molécula que muestra una valoración de usuario con comentario.
 *
 * Compone molecule-user-card como layout base, proyectando las estrellas
 * de rating, el tiempo transcurrido y el texto del comentario en sus
 * respectivos slots (default, [action], [comment]).
 *
 * El comentario se proyecta mediante ng-content desde el componente padre.
 *
 * @input name      - Nombre del usuario que valora
 * @input last_name - Apellido del usuario (se muestra solo la inicial en user-card)
 * @input rating    - Puntuación de 1 a 5. Rellena las estrellas activas
 * @input timestamp - Marca de tiempo (ms) de la valoración. Calcula el "hace X"
 *
 * @example
 * <!-- Valoración básica -->
 * <molecule-user-rating-comment name="Andrés" last_name="Pérez" [rating]="5" [timestamp]="1718900000000">
 *   Vendedor muy atento, el producto llegó en perfecto estado.
 * </molecule-user-rating-comment>
 */
@Component({
  selector: 'molecule-user-rating-comment',
  imports: [UserCard, Icon],
  templateUrl: './user-rating-comment.html',
  styleUrl: './user-rating-comment.css',
})
export class UserRatingComment {
private date = new Date();
public name = input<string>('Andrés');
public last_name = input<string>('Pérez');
public rating = input<number>(4);

public timestamp = input<number>(this.date.getTime());
protected rating_stars = [1,2,3,4,5];


protected dateSince = computed(() => {
  const seconds = Math.floor((this.date.getTime() - this.timestamp()) / 1000);

  if (seconds < 60)       return 'hace un momento';
  if (seconds < 3600)     return `hace ${Math.floor(seconds / 60)} minutos`;
  if (seconds < 86400)    return `hace ${Math.floor(seconds / 3600)} horas`;
  if (seconds < 604800)   return `hace ${Math.floor(seconds / 86400)} días`;
  if (seconds < 2592000)  return `hace ${Math.floor(seconds / 604800)} semanas`;
  if (seconds < 31536000) return `hace ${Math.floor(seconds / 2592000)} meses`;
  return `hace ${Math.floor(seconds / 31536000)} años`;
});
}
