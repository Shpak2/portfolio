export const state = () => ({
  isPlay: false,
  completeLoop: false
})

export const mutations = {
  setIsPlay(state, val) {
    state.isPlay = val;
  },
  setCompleteLoop(state, val) {
    state.completeLoop = val;
  }
};