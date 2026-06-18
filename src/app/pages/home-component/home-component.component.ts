import { Component } from '@angular/core';
import { NLInicio } from '../../components/organisms/no_logueado/nl-inicio/nl-inicio';
import { USInicio } from '../../components/organisms/logueado/us-inicio/us-inicio';
import { Heading } from '../../components/organisms/no_logueado/heading/heading';

@Component({
  selector: 'app-home-component',
  imports: [NLInicio,USInicio,Heading],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css',
})
export class HomeComponentComponent {
  user:any={};

  ngOnInit(){
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
      

    }
  }
}
