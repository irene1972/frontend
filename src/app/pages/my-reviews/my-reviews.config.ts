export interface ValoracionConUsuario {
  id:              number;
  puntuacion:      number;
  mensaje:         string;
  creada_en:       number;
  usuario_valorador: {
    nombre:    string;
    apellidos: string;
    iniciales: string;
  };
}