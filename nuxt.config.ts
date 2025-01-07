// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt3-vuex-module',
    '@nuxtjs/i18n',
  ],
  components: true,
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/mixins.scss" as *;',
        },
      },
    },
  },
  css: [
    '@/assets/scss/normalize.scss',
    '@/assets/scss/main.scss',
  ],
  generate: {
    routes: ['/', '/ua', '/pl'],
  },
  i18n: {
    vueI18n: '@/i18n.config.ts',
    locales: ['en', 'ua', 'pl'],
    defaultLocale: 'en',
  },
  runtimeConfig: {
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPassword: process.env.SMTP_PASSWORD,
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
    public: {
      recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY
    }
  },
  pages: false,
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }
      ],
      meta: [
        { name: 'msapplication-TileColor', content: '#da532c' },
        { name: 'theme-color', content: '#ffffff' },
      ],
    },
  }
})
