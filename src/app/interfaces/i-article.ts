import { IArticlePhoto } from './i-article-photo.interface';

interface Provincia {
    codigo: number;
    nombre: number;
}

export interface IArticle {
    id: number;
    usuarios_id: number;
    titulo:string;
    descripcion: string;
    categorias_id:number;
    precio:string;
    estado_conservacion_id:string;
    estado_articulo_id:string;
    updated_at: string;
    provincia?:Provincia;
    cp?:string;
    created_at?:string;
    comprador_nombre?:string;
    comprador_apellidos?:string;
    url_foto?:string;
    fotos?: IArticlePhoto[];
}
