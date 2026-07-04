import { BadgeCondition } from '../components/atoms/badge/badge.types';

export interface IExploreValoracion {
  puntuacion_media: number | null;
  total_valoraciones: number;
}

export interface IExploreVendedor {
  id: number;
  nombre: string;
  apellidos: string;
  username: string;
  rol_vendedor: 'pro' | 'nuevo' | null;
  valoracion: IExploreValoracion;
}

export interface IExploreCategoria {
  id: number;
  nombre: string;
}

export interface IExploreArticulo {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  precio_anterior: number | null;
  estado_conservacion_id: BadgeCondition;
  estado_articulo_id: string;
  vendido: boolean;
  categorias_id: number;
  categoria: IExploreCategoria | null;
  url_foto: string | null;
  ubicacion: string | null;
  vendedor: IExploreVendedor;
}

export interface IExplorePaginacion {
  pagina: number;
  por_pagina: number;
  total: number;
  total_paginas: number;
}

export interface IExploreArticulosParams {
  pagina?: number;
  por_pagina?: number;
  q?: string;
  categorias_id?: string;
  precio_min?: number;
  precio_max?: number;
  estado_conservacion?: string;
  ubicacion?: string;
  ordenar?: string;
  usuario_id?:number;
}

export interface IExploreArticulosResponse {
  articulos: IExploreArticulo[];
  paginacion: IExplorePaginacion;
}
