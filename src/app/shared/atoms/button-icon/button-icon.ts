import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal } from '@angular/core';
import { ButtonIconVariant, ButtonIconStates} from  './button-icon.config'
import { BOOTSTRAP_STYLES } from './button-icon.styles'

/**
 * Atom Button icon type
 *
 * ## Description
 * Button Icon component used for implement predefined icons like button
 * 
 * ## Use
 * input `variant` select variant of the button like: like, home, search, etc.
 * input `size` select the size of the icon button in pixels: 10px, 40px, 100px, etc.
 * input 'text_icon' input string to add text inside button instead of icon svg.
 * @example
 * ```html
 * <!-- Button Icon Like " -->
 * <atom-icon variant="like" size="48px"/>
 * 
 * * <!-- Button Icon Profile " -->
 * <atom-icon variant="profile" size="48px text_icon="John"/>
 * ```
 */

@Component({
  selector: 'atom-button-icon',
  imports: [],
  templateUrl: './button-icon.html',
  styleUrl: './button-icon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonIcon {
  /* Public inputs */
  variant   = input<ButtonIconVariant>('like');
  size      = input<string>('400px');
  text_icon = input<string>('');

  /* Public outputs */
  clicked   = output<boolean>();
  
  /* Component State*/
  private state = signal<ButtonIconStates>(ButtonIconStates.INACTIVED);
  
  /* Component Computed Styles */
  protected btnClass = computed(() =>  {
    const variant = BOOTSTRAP_STYLES[this.variant()].btn;
    const style = `${variant} btn-icon btn--${this.variant()} ${this.state()}`
    return style;
  });

  protected iconClass = computed(() => {
    const variant = BOOTSTRAP_STYLES[this.variant()].icon;
    const style = `${variant?.[this.state()] ?? variant?.['default']} icon--${this.variant()} ${this.state()}`
    return style;
  });

  protected labelClass = computed(() =>  {
    const style = `label--text ${this.state()}`
    return style;
  });

  /* Component Computed Text */
  protected label_text  = computed(() => {  
    const text = BOOTSTRAP_STYLES[this.variant()].label;
    return text;
  });

  protected label_icon_text = computed(() => {  
    const text = BOOTSTRAP_STYLES[this.variant()].iconText;
    return text;
  });

  
  /** Methods */
  protected onClick(): void {
    this.state.update(state => (state === ButtonIconStates.ACTIVED) ? ButtonIconStates.INACTIVED:ButtonIconStates.ACTIVED );
    console.log(this.state());
  }
}