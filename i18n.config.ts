import { DEFAULT_LOCALE, LOCALE_SUPPORTED, LOCALE } from './constants'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: LOCALE.EN,
  availableLocales: LOCALE_SUPPORTED,
}))
