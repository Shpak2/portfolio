export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const localeStorageKey = 'userLocale';
    const supportedLocales = ['en', 'ua', 'pl'];

    let userLocale = localStorage.getItem(localeStorageKey);
    console.log('Current user locale:', userLocale);

    if (!userLocale) {
      const browserLanguage = navigator.language.split('-')[0];
      userLocale = supportedLocales.includes(browserLanguage) ? browserLanguage : 'en';
      localStorage.setItem(localeStorageKey, userLocale);
      console.log('Detected browser language:', browserLanguage);
    }

    if (
      userLocale !== 'en' &&
      !to.path.startsWith(`/${userLocale}`) &&
      to.path !== '/'
    ) {
      console.log('Redirecting to:', `/${userLocale}${to.fullPath}`);
      return navigateTo(`/${userLocale}${to.fullPath}`);
    }
  }
});
