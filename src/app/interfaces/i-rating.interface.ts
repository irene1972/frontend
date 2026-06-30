export interface IRating {
    id: number;
    puntuacion: number;
    mensaje: string;
    articulos_id: number;
    usuario_valorador_id: number;
    creada_en: string;
}

