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

export type BadgeVariant = 'new' | 'asnew' | 'good' | 'acceptable' | 'pro-primary' | 'pro-secondary' | 'verified' | 'seller-new' | 'moderator' | 'blocked' | 'delivered' | 'sale';
export type BadgeIcon = 'shield-check' | 'lightning-charge' | 'chat' | 'none';
export type BadgeIconPosition = 'left' | 'right';