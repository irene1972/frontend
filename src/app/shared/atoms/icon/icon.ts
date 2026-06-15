import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IconVariant } from './icon.config';
import { STYLES } from './icon.styles';

/**
 * Átomo de icono reutilizable.
 *
 * ## Descripción
 * Renderiza un icono Bootstrap en tres modos según la variante:
 * - **Icono simple**: solo el icono, sin contenedor (ej. `check`, `trash`).
 * - **Icono con contenedor**: icono dentro de un círculo o cuadrado de color
 *   con etiqueta opcional debajo (ej. páginas de error `error-403`).
 * - **Avatar**: texto en lugar del icono mediante `text_icon` (ej. iniciales).
 *
 * ## Uso
 * El input `type` selecciona la variante de icono(icono, forma, colores y etiqueta).
 * El input `size` controla el tamaño: el contenedor escala al doble y la
 * etiqueta a la mitad, manteniendo siempre la proporción.
 * El input `text_icon` permite añadir un texto en el interior de un icono
 *
 * @example
 * ```html
 * <!-- Icono de error con círculo de color y etiqueta "403" -->
 * <atom-icon type="error-403" size="48px" />
 *
 * <!-- Icono simple sin contenedor -->
 * <atom-icon type="check" size="24px" />
 *
 * <!-- Avatar con iniciales en círculo -->
 * <atom-icon type="profile-primary-circle" text_icon="CM" size="40px" />
 * ```
 */
@Component({
  selector: 'atom-icon',
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})
export class Icon{
  /* Public inputs */
  public variant   = input<IconVariant>('error-403');
  public size      = input<string>('48px');
  public text_icon = input<string>('');

  /* Component Configuration*/

  /** Component State */

  /* Component Styles */
  protected containerClass = computed(() => {
    const style = STYLES[this.variant()].container + " container--"+ this.variant();
    return style;
  });

  protected iconClass = computed(() => {
    const style = STYLES[this.variant()].icon + " icon--"+ this.variant();
    return style;
  });

  protected icontextClass = computed(() => {
    const style = " icontext--"+ this.variant();
    return style;
  });

  protected labelClass = computed(() => {
    const style = STYLES[this.variant()].label + " label--"+ this.variant();
    return style;
  });

  protected label_text = computed(() => {
    const text = STYLES[this.variant()]?.label ?? '';
    return text;
  });
}