export interface IMessage {
  id: number;
  conversaciones_id: number;
  emisor_id: number;
  receptor_id: number;
  mensaje: string;
  leido: number;
  enviado_en: string;
}

export interface INewMessageEvent {
  conversacionId: number;
  mensaje: IMessage;
}

export interface IUnreadCountEvent {
  total: number;
}

export interface IMessagesReadEvent {
  conversacionId: number;
  lectorId: number;
}
