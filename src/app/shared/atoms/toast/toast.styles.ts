import { ToastVariant } from  './toast.config'

/** Bootstrap Styles */
/** Component Configuration Interface */
interface HtmlElements {
  icon:    string;
  button?: string;
}

type ToastVariantMap = Record<ToastVariant, HtmlElements>;

export const STYLES: ToastVariantMap = {
  success: {
      icon: "bi bi-check-circle"
  },
  info:  {
    icon: "bi bi-info-circle",
  },
  warn:  {
    icon:"bi bi-exclamation-triangle",
  },
  error:  {
    icon:"bi bi-exclamation-circle",
  },
  trash:  {
    icon: "bi bi-trash-fill",
    button:"btn-link text-decoration-none",
  }
}