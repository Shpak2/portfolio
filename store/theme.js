export const state = () => ({
  darkMode: false,
});

export const mutations = {
  toggleDarkMode(state) {
    state.darkMode = !state.darkMode;
    localStorage.setItem('darkMode', state.darkMode);
  },
  loadDarkMode(state) {
    const darkMode = localStorage.getItem('darkMode');
    state.darkMode = darkMode !== null ? darkMode === 'true' : false;
  },
};
