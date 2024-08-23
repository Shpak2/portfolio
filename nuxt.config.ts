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
  }
})
