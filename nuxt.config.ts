import { LOCALE_SUPPORTED, DEFAULT_LOCALE, DEFAULT_TIMEZONE, ENABLE_DEVTOOLS } from './constants'
import { shortLocale } from './utils'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    'dayjs-nuxt',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/eslint',
    '@vueuse/nuxt',
  ],
  devtools: { enabled: ENABLE_DEVTOOLS },

  app: {
    head: {
      // Use for phones like iPhone with home indicator
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
    },
  },
  css: [
    '~/assets/css/main.css',
  ],
  compatibilityDate: '2024-11-01',

  // https://nuxt.com/modules/dayjs#optional-defaultlocale-customization
  dayjs: {
    locales: LOCALE_SUPPORTED.map(shortLocale) as any[],
    plugins: ['utc', 'timezone', 'relativeTime', 'duration', 'localeData'],
    defaultLocale: shortLocale(DEFAULT_LOCALE) as any,
    defaultTimezone: DEFAULT_TIMEZONE,
  },

  eslint: {
    config: {
      stylistic: {
        semi: false,
        indent: 2,
        quotes: 'single',
      },
    },
  },

  // https://fonts.nuxt.com/get-started/configuration#families
  fonts: {
    defaults: {
      weights: [400, 500, 700],
      styles: ['normal', 'italic'],
      subsets: [
        'vietnamese',
        'cyrillic-ext',
        'cyrillic',
        'greek-ext',
        'greek',
        'latin-ext',
        'latin',
      ],
    },
  },

  // https://i18n.nuxtjs.org/docs/getting-started/usage
  i18n: {
    vueI18n: './i18n.config.ts',
  },
})
