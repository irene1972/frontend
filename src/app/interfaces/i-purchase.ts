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

export interface IPurchasePhoto {
  id: number;
  url_foto: string;
  principal: number;
  articulos_id: number;
}

export interface IUserPurchase extends IPurchase {
  nombre_articulo: string;
  fotos?: IPurchasePhoto[];
}

export interface ICreateOrderRequest {
  comprador_id: number;
  articulos_id: number;
  estado: PurchaseStatus;
  direccion_envio: string;
}

export interface ICreateOrderResponse {
  id: number;
  mensaje: string;
}
