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
    vueI18n: './i18n.config.ts',
    locales: ['en', 'ua', 'pl'],
    defaultLocale: 'en',
  },
})
