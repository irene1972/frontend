import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Component Type Definitions */
type IconErrors  = 'error-403' | 'error-404' | 'error-500';
type IconActions = 'check' | 'trash' | 'reload';
type IconGeneral = 'flag' | 'rise' | 'people' | 'person' | 'cube' | 'graph' | 'tag' | 'clock' | 'photo';
type IconProfile = 'profile' | 'profile-primary-circle' | 'profile-primary-square';

export type IconVariant = IconErrors | IconActions | IconGeneral | IconProfile;

/** Component Configuration Interface */
interface Config {
  icon?:      string;   // Bootstrap Icon
  shape?:     string;   // Container Shape (circle/square)
  iconColor?: string;   // Icon color
  bgColor?:   string;   // Container color
  bgShadow?:  string;   // Container Shadow
  label?:     string;   // Label text
}

/** Component Configuration Map*/
const CONFIG_SHAPE_CIRCLE = `d-flex align-items-center justify-content-center rounded-circle`;
const CONFIG_SHAPE_SQUARE = `d-flex align-items-center justify-content-center rounded-2`;
const CONFIG: Record<IconVariant, Config> = {
  'error-403': { icon: 'bi bi-lock',                   shape: CONFIG_SHAPE_CIRCLE, iconColor: 'var(--surface-card)', bgColor: 'var(--warn)',         label: '403' },
  'error-404': { icon: 'bi bi-search',                 shape: CONFIG_SHAPE_CIRCLE, iconColor: 'var(--surface-card)', bgColor: 'var(--primary-deep)', label: '404' },
  'error-500': { icon: 'bi bi-exclamation-triangle',   shape: CONFIG_SHAPE_CIRCLE, iconColor: 'var(--surface-card)', bgColor: 'var(--err)',          label: '500' },
  check:       { icon: 'bi bi-check',                  shape: CONFIG_SHAPE_CIRCLE, iconColor: 'var(--success)', bgColor: 'var(--success-bg)', bgShadow: '0 4px 20px color-mix(in srgb, var(--success) 60%, transparent)'},
  trash:       { icon: 'bi bi-trash3',                 shape: CONFIG_SHAPE_CIRCLE, iconColor: 'var(--err)', bgColor: 'var(--err-bg)'},
  reload:      { icon: 'bi bi-arrow-counterclockwise', shape: CONFIG_SHAPE_CIRCLE, iconColor: 'var(--success', bgColor: 'var(--success-bg)'},
  flag:        { icon: 'bi bi-flag',                   shape: CONFIG_SHAPE_SQUARE, iconColor: 'var(--secondary-cta', bgColor: 'var(--surface-container)'},
  rise:        { icon: 'bi bi-graph-up-arrow',         shape: CONFIG_SHAPE_SQUARE, iconColor: 'var(--secondary-cta', bgColor: 'var(--surface-container)'},
  people:      { icon: 'bi bi-people',                 shape: CONFIG_SHAPE_SQUARE, iconColor: 'var(--secondary-cta', bgColor: 'var(--surface-container)'},
  person:      { icon: 'bi bi-person',                 shape: CONFIG_SHAPE_SQUARE, iconColor: 'var(--secondary-cta', bgColor: 'var(--surface-container)'},
  cube:        { icon: 'bi bi-box',                    shape: CONFIG_SHAPE_SQUARE, iconColor: 'var(--secondary-cta', bgColor: 'var(--surface-container)'},
  graph:       { icon: 'bi bi-bar-chart-line-fill',    shape: CONFIG_SHAPE_SQUARE, iconColor: 'var(--secondary-cta', bgColor: 'var(--surface-container)'},
  tag:         { icon: 'bi bi-tag',                    shape: CONFIG_SHAPE_SQUARE, iconColor: 'var(--secondary-cta', bgColor: 'var(--surface-container)'},
  clock:       { icon: 'bi bi-clock',                  shape: CONFIG_SHAPE_SQUARE, iconColor: 'var(--secondary-cta', bgColor: 'var(--surface-container)'},
  photo:       { icon: 'bi bi-camera',                 shape: CONFIG_SHAPE_SQUARE, iconColor: 'var(--secondary-cta', bgColor: 'var(--surface-container)'},
  'profile':                { shape: CONFIG_SHAPE_CIRCLE, iconColor: 'var(--secondary-cta', bgColor: 'var(--surface-high)'},
  'profile-primary-circle': { shape: CONFIG_SHAPE_CIRCLE, iconColor: 'var(--surface-card)', bgColor: 'var(--secondary-cta)' },
  'profile-primary-square': { shape: CONFIG_SHAPE_SQUARE, iconColor: 'var(--surface-card)', bgColor: 'var(--secondary-cta)' },
};

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icon{
  /* Public inputs */
  type      = input<IconVariant>('error-403');
  size      = input<string>('48px');
  text_icon = input<string>('');

  /* Component Configuration*/
  private config = computed(() => CONFIG[this.type()]);
  protected label_text  = computed(() => this.config().label ?? '');

  /* Bootstrap Styles*/
  private icon_class  = computed(() => this.config().icon);
  private readonly shape_class = computed(() => this.config().shape ?? '');
  

  /* Component Styles */
  protected container_style = computed(() => ({
    'background-color': this.config().bgColor ?? '',
    'width':            `calc(${this.size()}*2)`,
    'height':           `calc(${this.size()}*2)`,
    'box-shadow':       this.config().bgShadow ?? '',
  }));

  protected icon_style = computed(() => ({
    'color':     this.config().iconColor ?? '',
    'font-size': `${this.size()}`
  }));

  protected icon_text_style = computed(() => ({
    'color':     this.config().iconColor ?? '',
    'font-size': `${this.size()}`
  }));

  protected label_style = computed(() => ({
    'color':     this.config().bgColor ?? '',
    'font-size': `calc(${this.size()}/2)`
  }));
}