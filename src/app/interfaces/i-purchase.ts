export type PurchaseStatus =
  | 'Pendiente'
  | 'Aceptado'
  | 'Enviado'
  | 'Cancelado'
  | 'Completado';

export interface IPurchase {
  id: number;
  comprador_id: number;
  articulos_id: number;
  fecha_pedido: string;
  estado: PurchaseStatus;
  direccion_envio: string;
  created_at: string;
  updated_at: string;
}

export interface IUserPurchase extends IPurchase {
  nombre_articulo: string;
}
