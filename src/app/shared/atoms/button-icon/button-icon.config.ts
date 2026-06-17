/** Component Type Definitions */
type ButtonIconLike    = 'like';
type ButtonIconNavbar  = 'home' | 'search' | 'sell' | 'message' | 'profile';
type ButtonIconSelect  = 'star';
type ButtonIconSimple  = 'pencil' | 'trash' | 'clip' | 'bell' | 'microphone' | 'photo';
type ButtonIconGeneral = 'arrow-left' | 'arrow-right' | 'arrow-left-circle' | 'arrow-right-circle' | 'trash-button' | 'add-photo' | 'add-photo-icon' | 'profile-img' 

export type ButtonIconVariant = ButtonIconLike | ButtonIconNavbar | ButtonIconSelect | ButtonIconSimple | ButtonIconGeneral;

/** Component States */
export enum ButtonIconStates {
    ACTIVED   = "actived",
    HOVER     = "hover",
    INACTIVED = "inactived"
}

/** Component Configuration Interface */
export interface ButtonIconConfig {
    actived?:   string;
    hover?:     string;
    inactived?: string;
}



