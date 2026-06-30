import { PurchaseStatus } from '../../../interfaces/i-purchase';

export interface ConversacionData {
  id: number;
  pedidos_id: number;
  pedido_estado: PurchaseStatus;
  nombre: string;
  iniciales: string;
  ultimoMensaje: string;
  hora: string;
  no_leidos: number;
  articuloTitulo: string;
}

export const canSendMessages = (estado: PurchaseStatus): boolean =>
  estado !== 'Completado' && estado !== 'Cancelado';
