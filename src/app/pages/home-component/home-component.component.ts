import { Component } from '@angular/core';
import { NLInicio } from '../../components/no_logueado/nl-inicio/nl-inicio';
import { Heading } from '../../components/no_logueado/heading/heading';
import { HomeBar } from '../../shared/home-bar/home-bar';
import { Buscador } from '../../shared/buscador/buscador';

@Component({
  selector: 'app-home-component',
  imports: [NLInicio,Heading,HomeBar,Buscador],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css',
})
export class HomeComponentComponent {
  user:any={};
  textoBusqueda:string='';
  placeholder:string='Buscar movil, portatil, tablet...';

  ngOnInit(){
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
      

    }
  }
}
