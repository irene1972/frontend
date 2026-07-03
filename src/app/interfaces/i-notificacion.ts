export type NotificacionTipo = 'sale' | 'review' | 'moderation';

export interface INotificacion {
  id: number;
  usuarios_id: number;
  articulos_id: number;
  tipo: NotificacionTipo;
  titulo: string;
  mensaje: string;
  leida: number;
  created_at: string;
}

export interface INotificacionesSinLeer {
  sinLeer: number;
}
