import { createStore } from 'vuex';
import * as theme from './theme';

export const store = createStore({
  modules: {
    theme,
  },
});

export const state = () => ({
  activeItem: 'home',
});

export const mutations = {
  setActiveItem(state, itemKey) {
    state.activeItem = itemKey;
  },
};