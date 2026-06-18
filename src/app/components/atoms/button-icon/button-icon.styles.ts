import {  ButtonIconVariant, ButtonIconConfig } from  './button-icon.config'

/** Bootstrap Styles Configuration */
/** HTML Dinamic Elements*/
interface HtmlElements {
  link?: string;
  btn?:  Object;
  icon: ButtonIconConfig;
  iconText?: string;
  label?: string;
}

/** Bootstrap Style Component Configuration*/
type ButtonVariantMap = Record<ButtonIconVariant, HtmlElements>;

const STYLE_BTN = "btn d-flex flex-column align-items-center justify-content-center"
const STYLE_BTN_CIRCLE = STYLE_BTN + " rounded-circle border-0";
const STYLE_BTN_SQUARE = STYLE_BTN + " rounded-square border-0";
const STYLE_BTN_SQUARE_ROUNDED = STYLE_BTN + " rounded-square rounded-4 border-3";

export const BOOTSTRAP_STYLES: ButtonVariantMap = {
  like: {
    btn: STYLE_BTN_CIRCLE,
    icon: {
        actived: "bi bi-heart-fill",
        inactived: "bi bi-heart"
    }
  },
  home:  {
    link:  STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-house-door-fill mobile-icon",
    }, 
    label: "INICIO",
  },
  search: {
    btn:  STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-search",
    }, 
    label: "BUSCAR",
  },
  sell: {
    btn:  STYLE_BTN_CIRCLE,
    icon:{ 
        actived: "bi bi-plus-lg",
    },
    label: "VENDER",
  },
  message: {
    btn:  STYLE_BTN_CIRCLE,
    icon:{ 
        actived: "bi bi-chat-fill",
    },  
    label: "MENSAJES",
  },
  profile: {
    btn:  STYLE_BTN_CIRCLE,
    icon:{ 
        actived: "bi bi-person-fill",
    },
    label: "PERFIL",
  },
  star: {
    btn:  STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-star-fill",
        inactived: "bi bi-star",
    }, 
    label: "",
  },
  pencil: {
    btn:  STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-pen",
    }, 
    label: "",
  },
  trash: {
    btn:  STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-trash3",
    }, 
    label: "",
  },
  clip: {
    btn:  STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-paperclip",
    }, 
    label: "",
  },
  bell: {
    btn:  STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-bell-fill",
        inactived: "bi bi-bell",
    }, 
    label: "",
  },
  microphone: {
    btn:  STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-mic",
    }, 
    label: "",
  },
  photo: {
    btn:  STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-camera",
    }, 
    label: "",
  },
  'arrow-left': {
    btn:  STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-arrow-left",
    }, 
    label: "",
  },
  'arrow-right': {
    btn:  STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-arrow-right",
    }, 
    label: "",
  },
  'arrow-left-circle': {
    btn:  STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-arrow-left",
    }, 
    label: "",
  },
  'arrow-right-circle': {
    btn:  STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-arrow-right",
    }, 
    label: "",
  },
  'trash-button': {
    btn:  STYLE_BTN_SQUARE,
    icon: { 
        actived: "bi bi-trash3",
    }, 
    label: "",
  },
  'add-photo': {
    btn:  STYLE_BTN_SQUARE_ROUNDED,
    icon: { 
        actived: "bi bi-arrow-right",
    }, 
    label: "",
  },
  'add-photo-icon': {
    btn:  STYLE_BTN_SQUARE_ROUNDED,
    icon: { 
        actived: "bi bi-camera",
    }, 
    iconText: "SUBIR",
  },
  'profile-img': {
    btn:  STYLE_BTN_CIRCLE,
    icon: { }, 
  }
}