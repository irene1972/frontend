// == TIPADO ==
/* Cada etiqueta tiene un tipo de funcionamiento según su variante.
- PRODUCTOS:
- new, asnew, good, acceptable y sale.
- TIPOS DE USUARIOS:
- pro-primary (naranja), pro-secondary (azul), verified (verde), seller-new (gris)
-  moderator (azul) , blocked (rojo).
- OTROS:
- delivered (verde) --> Se puede usar para etiqueta de mensaje: responde rápido
*/ 

export type BadgeCondition = 'Nuevo' | 'Como nuevo' | 'Buen estado' | 'Usado' | 'Dañado';

export type BadgeEstado = 'Borrador' | 'Publicado' | 'En_revision' | 'Retirado' | 'Reservado' | 'Vendido';

export type BadgeRol = 'Usuario' | 'Moderador' | 'Administrador';

export type BadgeVariant = BadgeCondition | BadgeEstado | BadgeRol | 'Bloqueado' | 'Verificado' | 'discount';


export type BadgeIcon = 'shield-check' | 'lightning-charge' | 'chat' | 'none';
export type BadgeIconPosition = 'left' | 'right';

// enum('Nuevo','Como nuevo','Buen estado','Usado','Dañado')