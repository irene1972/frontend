import { Component, input } from '@angular/core';
import { NavStepOptions } from './nav-step.config';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'organism-nav-step',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-step.html',
  styleUrl: './nav-step.css',
})
export class NavStep {
  public steps      = input<NavStepOptions[]>([{name:"1",label:"DETALLES",query_param:"detail"}, {name:"2",label:"PRECIO",query_param:"price"},{name:"3",label:"FOTOS",query_param:"photo"}]);
  public activeStep = input<string>('');
}
