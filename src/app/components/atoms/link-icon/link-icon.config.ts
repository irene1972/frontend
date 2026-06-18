/** Component Type Definitions */
type LinkIconNavbar  = 'home'   | 'search'  | 'sell'  | 'message' | 'profile';
type LinkIconSimple  = 'pencil' | 'trash'   | 'clip'  | 'bell'    | 'microphone' | 'camera';
type LinkIconGeneral = 'arrow-left' | 'arrow-right' | 'arrow-left-circle' | 'arrow-right-circle'

export type LinkIconVariant = LinkIconNavbar | LinkIconSimple | LinkIconGeneral;

/** Component States */
export enum LinkIconStates {
    ACTIVED   = "actived",
    HOVER     = "hover",
    INACTIVED = "inactived"
}

/** Component Configuration Interface */
export interface LinkIconConfig {
    actived?:   string;
    hover?:     string;
    inactived?: string;
    animation?: string;
}
