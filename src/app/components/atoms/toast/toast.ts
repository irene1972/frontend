import { Component, computed, input, output, signal, effect } from '@angular/core';
import { CONFIG, ToastVariant, ToastState } from './toast.config';
import { STYLES} from './toast.styles';

@Component({
  selector: 'atom-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  /** Public Inputs */
  public variant = input<ToastVariant>('success');
  public size = input<string>('200px'); 
  public message = input<string>('');
  public trigger = input<boolean>(false);

  /** Public Outputs */
  public undo = output<void>();

  public fadeToast = signal<boolean>(false);

  /** Component State */
  protected readonly ToastState = ToastState;
  protected state = signal<ToastState>(ToastState.NOT_EXIST);

  /** Public Outputs */

  /** Component Styles*/
  protected iconClass = computed(() => {
    const style = STYLES[this.variant()].icon + " icon--"+ this.variant();
    return style;
  });

  /** Component Methods */
  protected onClick(){
    this.state.set(ToastState.NOT_EXIST);
    this.undo.emit();
  }

  private triggerToast = effect(() => {
    if (this.trigger()) {
      const time_ms = CONFIG[this.variant()].time;
      this.createToast();
      setTimeout(() => {this.destroyToast();}, time_ms*1000);
    } 
  })

  private createToast(){
    this.fadeToast.set(true);
    this.state.set(ToastState.EXIST);
  } 

  private destroyToast(){
    this.fadeToast.set(false);
    this.state.set(ToastState.NOT_EXIST);
  } 
}
