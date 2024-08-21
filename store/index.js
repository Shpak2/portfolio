import { createStore } from 'vuex';
import * as theme from './theme';
import * as preloader from './preloader';
import * as popup from './popup';

export const store = createStore({
  modules: {
    theme,
    preloader,
    popup
  },
});

export const state = () => ({
  activeItem: 'home',
  allowMouseScroll: true,
  hoverElement: false
});

export const mutations = {
  setActiveItem(state, itemKey) {
    state.activeItem = itemKey;
  },
  setAllowMouseScroll(state, value) {
    state.allowMouseScroll = value;
  },
  setHover(state, value) {
    state.hoverElement = value;
  },
};
