import { IArticlePhoto } from './i-article-photo.interface';

interface Provincia {
    codigo: number;
    nombre: number;
}

export interface IArticleDetail {
  titulo: string;
  categorias_id: number;
  estado_conservacion_id:string;
  descripcion: string;
}

export interface IArticlePrice {
  precio: number | string;
  ubicacion?: string;
  provincia?:Provincia;
}


export interface INewArticleWithPhoto  extends IArticleDetail, IArticlePrice {
    usuarios_id: number;
    estado_articulo_id:string;
    principal_index: number;
    photos: (File | null)[];
}


export interface IArticle extends IArticleDetail, IArticlePrice {
    id: number;
    usuarios_id: number;
    estado_articulo_id:string;
    cp?:string;
    updated_at: string;
    created_at?:string;
    comprador_nombre?:string;
    comprador_apellidos?:string;
    url_foto?:string;
    fotos?: IArticlePhoto[];
}