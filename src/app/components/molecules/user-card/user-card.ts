import { Component, input } from '@angular/core';
import { Icon } from "../../atoms/icon/icon";
import { BadgeVariant } from '../../atoms/badge/badge.types';
import { IconVariant } from '../../atoms/icon/icon.config';

/**
 * Molécula de layout base para tarjetas de usuario.
 *
 * Muestra el avatar con iniciales, nombre abreviado y acciones opcionales.
 * Actúa como contenedor estructural para variantes especializadas mediante ng-content.
 *
 * @input variant     - Icono a mostrar
 * @input name        - Nombre del usuario (se muestra completo)
 * @input last_name   - Apellido del usuario (se muestra solo la inicial)
 * @input role        - Variante de badge para el rol. Si es null, no se renderiza
 * @input shadow      - Activa la sombra de la tarjeta
 * @input transparent - Activa el fondo. Por defecto true (sin fondo)
 * 
 * @example
 * <!-- Uso básico -->
 * <molecule-user-card name="Carlos" last_name="Martínez" />
 *
 * <!-- Como layout para una variante -->
 * <molecule-user-card>
 *   <div class="p-3 mb-2 bg-primary text-white">content</div>
 *   <div action  class="p-3 mb-2 bg-primary text-white">content comment</div>
 *   <div comment class="d-flex w-100 flex-row p-3 mb-2 bg-primary flex-grow-1 text-white">content actions</div>
 * </molecule-user-card>
 */
@Component({
  selector: 'molecule-user-card',
  imports: [Icon],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard {
  public variant     = input<IconVariant>("profile-primary-circle");
  public name        = input<string>("Carlos");
  public last_name   = input<string>("Martínez");
  public role        = input<BadgeVariant | null>();
  public shadow      = input<boolean>(false);
  public transparent = input<boolean>(false);
}
