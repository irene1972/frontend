// === TIPO DE BOTON === //
/* En la variante de boton encontramos:
- Primario: color naranja.
- Secundario: color azul.
- Outline: borde azul con color transparente => acciones secundarias de poco énfasis.
- Link: estilo de enlace.
- Dashed: borde discontinuo para tipo de botón de creación.
- Activate: color verde para acciones de activación.
- Retire: color rojo para acciones de eliminación (retirada).
- Block: botón de rojo completo para acciones principales (bloquear).
*/

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'link' | 'dashed' | 'activate' | 'retire' | 'block' ;

// === ESTADO DE CONFIGURACIÓN DEL BOTÓN === //
export type ButtonConfigState = 'enabled' | 'disabled';

// === TIPO DE REDONDEO === //
/* En la variante de redondeo encontramos:
- Full: borde completamente redondo.
- Semi: borde semirredondo. */

export type ButtonRounded = 'full' | 'semi';

// === ICONOGRAFIA === //
/* En el buttonIcon se define todos los iconos disponibles, que se añadiran mediante una clase de bootstrap en el componente button con el label i.
En el buttonIconPosition se define la posición del icono, que puede ser a la izquierda o a la derecha del texto del botón. 
*/
export type ButtonIcon = 'cart' | 'google' | 'like' | 'plus-lg' | 'trash' | 'arrow-right' | 'arrow-left' | 'load' | 'none';
export type ButtonIconPosition = 'left' | 'right';