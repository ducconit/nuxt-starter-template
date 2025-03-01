export enum LOCALE {
  VI = 'vi-VN',
  EN = 'en-US',
}

export const LOCALE_SUPPORTED = [LOCALE.VI, LOCALE.EN]
export const DEFAULT_LOCALE = import.meta.env.DEFAULT_LOCALE || LOCALE.VI

export const DEFAULT_TIMEZONE = 'Asia/Ho_Chi_Minh'
