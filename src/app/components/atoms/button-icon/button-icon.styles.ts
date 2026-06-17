import {  ButtonIconVariant, ButtonIconConfig } from  './button-icon.config'

/** Bootstrap Styles Configuration */
/** HTML Dinamic Elements*/
interface HtmlElements {
  btn:  Object;
  icon: ButtonIconConfig;
  iconText?: string;
  label?: string;
}

/** Bootstrap Style Component Configuration*/
type ButtonVariantMap = Record<ButtonIconVariant, HtmlElements>;

const BOOTSTRAP_STYLE_BTN = "btn d-flex flex-column align-items-center justify-content-center"
const BOOTSTRAP_STYLE_BTN_CIRCLE = BOOTSTRAP_STYLE_BTN + " rounded-circle border-0";
const BOOTSTRAP_STYLE_BTN_SQUARE = BOOTSTRAP_STYLE_BTN + " rounded-square border-0";
const BOOTSTRAP_STYLE_BTN_SQUARE_ROUNDED = BOOTSTRAP_STYLE_BTN + " rounded-square rounded-4 border-3";

export const BOOTSTRAP_STYLES: ButtonVariantMap = {
  like: {
    btn: BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: {
        actived: "bi bi-heart-fill",
        inactived: "bi bi-heart"
    },
    label: "",
  },
  home:  {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-house-fill",
    }, 
    label: "INICIO",
  },
  search: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-search",
    }, 
    label: "BUSCAR",
  },
  sell: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon:{ 
        actived: "bi bi-plus-lg",
    },
    label: "VENDER",
  },
  message: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon:{ 
        actived: "bi bi-chat-fill",
    },  
    label: "MENSAJES",
  },
  profile: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon:{ 
        actived: "bi bi-person-fill",
    },
    label: "PERFIL",
  },
  star: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-star-fill",
        inactived: "bi bi-star",
    }, 
    label: "",
  },
  pencil: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-pen",
    }, 
    label: "",
  },
  trash: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-trash3",
    }, 
    label: "",
  },
  clip: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-paperclip",
    }, 
    label: "",
  },
  bell: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-bell-fill",
        inactived: "bi bi-bell",
    }, 
    label: "",
  },
  microphone: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-mic",
    }, 
    label: "",
  },
  photo: {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-camera",
    }, 
    label: "",
  },
  'arrow-left': {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-arrow-left",
    }, 
    label: "",
  },
  'arrow-right': {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-arrow-right",
    }, 
    label: "",
  },
  'arrow-left-circle': {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-arrow-left",
    }, 
    label: "",
  },
  'arrow-right-circle': {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { 
        actived: "bi bi-arrow-right",
    }, 
    label: "",
  },
  'trash-button': {
    btn:  BOOTSTRAP_STYLE_BTN_SQUARE,
    icon: { 
        actived: "bi bi-trash3",
    }, 
    label: "",
  },
  'add-photo': {
    btn:  BOOTSTRAP_STYLE_BTN_SQUARE_ROUNDED,
    icon: { 
        actived: "bi bi-arrow-right",
    }, 
    label: "",
  },
  'add-photo-icon': {
    btn:  BOOTSTRAP_STYLE_BTN_SQUARE_ROUNDED,
    icon: { 
        actived: "bi bi-camera",
    }, 
    iconText: "SUBIR",
  },
  'profile-img': {
    btn:  BOOTSTRAP_STYLE_BTN_CIRCLE,
    icon: { }, 
  }
}