import { Component } from '@angular/core';
import { NLInicioHero } from '../../components/no_logueado/nl-inicio-hero/nl-inicio-hero';
import { NLInicio } from '../../components/no_logueado/nl-inicio/nl-inicio';
import { Heading } from '../../components/no_logueado/heading/heading';

@Component({
  selector: 'app-home-hero-component',
  imports: [NLInicioHero,NLInicio,Heading],
  templateUrl: './home-hero-component.html',
  styleUrl: './home-hero-component.css',
})
export class HomeHeroComponent {
  user:any={};

  ngOnInit(){
    const usuarioString = localStorage.getItem('usuarioBuy&Sell');
    if (usuarioString) {
      this.user = JSON.parse(usuarioString);
      

    }
  }
}
