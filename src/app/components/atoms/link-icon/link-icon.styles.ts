import { LinkIconVariant, LinkIconConfig } from './link-icon.config';

/** Bootstrap Styles Configuration */
/** HTML Dinamic Elements*/
interface HtmlElements {
  link?: string;
  icon: string;
  iconText?: string;
}

/** Bootstrap Style Component Configuration*/
type ButtonVariantMap = Record<LinkIconVariant, HtmlElements>;
const STYLE_LINK = "d-flex flex-fill flex-column align-items-center justify-content-center"
const STYLE_LINK_CIRCLE = STYLE_LINK + " rounded-circle border-0";

export const STYLES: ButtonVariantMap = {
  home:  {
    link:  STYLE_LINK,
    icon: "bi bi-house-door-fill mobile-icon",
  },
  search: {
    link:  STYLE_LINK,
    icon: "bi bi-search",
  },
  sell: {
    link:  STYLE_LINK_CIRCLE,
    icon: "bi bi-plus-lg",
  },
  message: {
    link:  STYLE_LINK,
    icon: "bi bi-chat-fill",
  },
  profile: {
    link:  STYLE_LINK,
    icon: "bi bi-person-fill",
  },
  pencil: {
    icon: "bi bi-pen",
  },
  trash: {
    icon: "bi bi-trash3",
  },
  clip: {
    icon: "bi bi-paperclip",
  },
  bell: {
    icon: "bi bi-bell",
  },
  microphone: {
    icon: "bi bi-mic",
  },
  camera: {
    icon: "bi bi-camera",
  },
  'arrow-left': {
    icon: "bi bi-arrow-left",
  },
  'arrow-right': {
    icon: "bi bi-arrow-right",
  },
  'arrow-left-circle': {
    link:  STYLE_LINK_CIRCLE,
    icon: "bi bi-arrow-left",
  },
  'arrow-right-circle': {
    link:  STYLE_LINK_CIRCLE,
    icon: "bi bi-arrow-right",
  }
}