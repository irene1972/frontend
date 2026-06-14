/** Component Type Definitions */
export type ToastVariant = 'success' | 'info' | 'warn' | 'error' | 'trash'

/** Component State */
export enum ToastState {
    EXIST   = 'exist',
    NOT_EXIST = 'notExist'
}

/** Component Configuration Interface */
interface ToastConfig {
  time:    number;
}

type ToastVariantMap = Record<ToastVariant, ToastConfig>;

export const CONFIG: ToastVariantMap = {
  success: {
    time: 3
  },
  info:  {
    time: 4
  },
  warn:  {
    time:5
  },
  error:  {
    time:5
  },
  trash:  {
    time: 4
  }
}

