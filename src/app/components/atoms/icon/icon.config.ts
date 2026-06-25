/** Component Type Definitions */
type IconErrors  = 'error-403' | 'error-404' | 'error-500';
type IconActions = 'check' | 'trash' | 'reload';
type IconGeneral = 'flag' | 'rise' | 'people' | 'person' | 'cube' | 'graph' | 'tag' | 'clock' | 'camera' | 'camera-round' | 'heart';
type IconProfile = 'profile' | 'profile-square' | 'profile-primary-circle' | 'profile-primary-square';
type IconDynamic = 'star' | 'star-inactived'|  'counter';

export type IconVariant = IconErrors | IconActions | IconGeneral | IconProfile | IconDynamic;

/** Component States */
export enum IconState {}

/** Component Configuration Interface */
interface IconConfig {}

type IconConfigMap = Record<IconVariant, IconConfig>

/** Component Configuration*/

/** Component Configuration Map*/
