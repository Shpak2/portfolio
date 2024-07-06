import en from './lang/en';
import ua from './lang/ua';
import pl from './lang/pl';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en,
    ua,
    pl
  }
}))