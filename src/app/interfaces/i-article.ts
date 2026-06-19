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
    provincia?:Provincia;
}
