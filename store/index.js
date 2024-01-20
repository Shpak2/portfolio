import { createStore } from 'vuex';
import * as theme from './theme';

export const store = createStore({
  modules: {
    theme,
  },
});