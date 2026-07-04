/** Component Type Definitions */
export type ButtonIconVariant = 'like' | 'star' | 'trash-button' | 'add-photo' | 'add-photo-icon' | 'profile-img' 

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
    animation?: string;
}


