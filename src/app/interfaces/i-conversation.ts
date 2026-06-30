import { PurchaseStatus } from './i-purchase';

export interface IConversationUser {
  id: number;
  nombre: string;
  apellidos: string;
  username: string;
}

export interface IConversationArticle {
  id: number;
  titulo: string;
}

export interface IConversation {
  id: number;
  pedidos_id: number;
  pedido_estado: PurchaseStatus;
  created_at: string;
  updated_at: string;
  articulo: IConversationArticle;
  otro_usuario: IConversationUser | null;
  ultimo_mensaje: string | null;
  ultimo_mensaje_en: string | null;
  no_leidos: number;
}

export interface IConversationSummary {
  id: number;
  pedidos_id: number;
}

export interface IUnreadCountResponse {
  total: number;
}
