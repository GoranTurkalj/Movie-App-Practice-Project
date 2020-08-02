const state = {
  alertPrompt: false,
};
const getters = {
  getAlertPrompt: function(state) {
    return state.alertPrompt;
  },
};
const mutations = {
  openAlertPrompt(state) {
    state.alertPrompt = true;
  },
  closeAlertPrompt(state) {
    state.alertPrompt = false;
  },
};

export default {
  state,
  getters,
  mutations,
};
