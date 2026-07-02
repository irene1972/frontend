import { Component, inject, input, signal } from '@angular/core';
import { NavStepOptions } from './nav-step.config';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

/**
 * Organismo que muestra el progreso de completado mediante unos cuadrados numerados.
 *
 * Lee automáticamente el query param ?step= de la URL para determinar
 * qué pasos están activos. No navega ni controla el flujo — solo pinta el estado.
 * La página es la responsable de actualizar los query params al avanzar de paso.
 *
 * @input steps - Lista de pasos a mostrar. Por defecto: DETALLES, PRECIO y FOTOS.
 *
 * @example
 * <!-- Uso con pasos por defecto -->
 * <organism-nav-step />
 *
 * @example
 * <!-- Uso con pasos personalizados -->
 * <organism-nav-step
 *   [steps]="[
 *     { name: '1', label: 'CUENTA',    query_param: 'account' },
 *     { name: '2', label: 'DIRECCIÓN', query_param: 'address' },
 *     { name: '3', label: 'PAGO',      query_param: 'payment' },
 *   ]"
 * />
 */
@Component({
  selector: 'organism-nav-step',
  imports: [],
  templateUrl: './nav-step.html',
  styleUrl: './nav-step.css',
})
export class NavStep {
  // Public Inputs
  public steps = input<NavStepOptions[]>([{name:"1",label:"DETALLES",query_param:"detail"}, {name:"2",label:"PRECIO",query_param:"price"},{name:"3",label:"FOTOS",query_param:"photo"}]);
 

  // Services
  private activatedRoute = inject(ActivatedRoute);

  protected current = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map(params => {
        const steps = params.getAll('step');
        return steps[steps.length - 1] ?? ''; // último elemento, o '' si no hay ninguno
      })
    ),
    { initialValue: '' }
  );

  // Signal query params change detection
  protected activeSteps = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map(params => {
        const parameters = params.getAll('step')

        return parameters;
      })
    ),
    { initialValue: [] as string[] }
  );
}
