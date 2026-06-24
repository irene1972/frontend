export interface IFavorite {
    id: number;
    titulo: string;
    descripcion: string;
    categorias_id:number;
    usuarios_id:number;
    precio:string;
    estado_articulo_id:string;
    estado_conservacion_id:string;
    total?:number;
    created_at?:string;
    updated_at?:string;
    nombre_vendedor?:string;
    apellidos_vendedor?:string;
    cantidad_valoraciones?:number;
    puntuacion?:string;
    url_foto?:string;
    provincia?:any;
}
