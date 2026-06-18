import { Component } from '@angular/core';
import { NLInicio } from '../../components/no_logueado/nl-inicio/nl-inicio';
import { Heading } from '../../components/no_logueado/heading/heading';
import { HomeBar } from '../../shared/home-bar/home-bar';

@Component({
  selector: 'app-home-component',
  imports: [NLInicio,Heading,HomeBar],
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
