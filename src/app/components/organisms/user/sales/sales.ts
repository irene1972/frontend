import { NgStyle } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SalesArticle } from '../../../molecules/cards/sales-article/sales-article';

@Component({
  selector: 'app-sales',
  imports: [SalesArticle],
  templateUrl: './sales.html',
  styleUrl: './sales.css',
})
export class Sales {
  vendido: any = { nombre: 'Carlos M.', tiempo: '1 semana' };
  activeTab: 'En venta' | 'Vendidos' = 'En venta';
  fecha_publicacion: Date = new Date('2025-01-01');
  tiempo: string='';

  constructor(private cd: ChangeDetectorRef,private router: Router){}

  ngOnInit() {
    this.tiempo=this.tiempoTranscurrido(this.fecha_publicacion);
    this.cd.detectChanges();
  }

  tiempoTranscurrido(fechaInicio: Date):string {
    const ahora = new Date();

  const diferenciaMs = ahora.getTime() - fechaInicio.getTime();

  const segundos = Math.floor(diferenciaMs / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  const semanas = Math.floor(dias / 7);
  const meses = Math.floor(dias / 30.44);
  const anios = Math.floor(dias / 365.25);

  if (anios > 0) return `${anios} ${anios === 1 ? 'año' : 'años'}`;
  if (meses > 0) return `${meses} ${meses === 1 ? 'mes' : 'meses'}`;
  if (semanas > 0) return `${semanas} ${semanas === 1 ? 'semana' : 'semanas'}`;
  if (dias > 0) return `${dias} ${dias === 1 ? 'día' : 'días'}`;
  if (horas > 0) return `${horas} ${horas === 1 ? 'hora' : 'horas'}`;
  if (minutos > 0) return `${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`;

  return `${segundos} ${segundos === 1 ? 'segundo' : 'segundos'}`;
  }

  irADetalleArticulo(id:number):void{
    this.router.navigate(['/articulo/detalle',id]);
  }
  eliminar(id:number):void{
    console.log('Eliminar: '+id);
  }
  pausar(id:number):void{
    console.log('Pausar: '+id);
  }
}
