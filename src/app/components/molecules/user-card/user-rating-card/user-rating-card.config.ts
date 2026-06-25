export interface UserRatingCardData {
  username:  string;
  iniciales: string;
  promedio: {
    usuario_id:         number;
    puntuacion_media:   number | null;
    total_valoraciones: number;
  };
}