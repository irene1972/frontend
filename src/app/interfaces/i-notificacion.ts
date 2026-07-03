export type NotificacionTipo = 'sale' | 'purchase' | 'review' | 'moderation';

export interface INotificacion {
  id: number;
  usuarios_id: number;
  articulos_id: number;
  tipo: NotificacionTipo;
  titulo: string;
  mensaje: string;
  redirect_url: string | null;
  leida: number;
  created_at: string;
}

export interface INotificacionesSinLeer {
  sinLeer: number;
}

export interface INotificacionLeidaResponse {
  message: string;
  sinLeer: number;
}
