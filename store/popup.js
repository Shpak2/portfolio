export const state = () => ({
  show: false,
  project: 0,
  mode: 'desktop'
})

export const mutations = {
  setShowPopup(state, val) {
    state.show = val;
  },
  setProjectPopup(state, val) {
    state.project = val;
  },
  setModePopup(state, val) {
    state.mode = val;
  }
};