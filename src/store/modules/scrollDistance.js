const state = {
  scrollDistance: 0,
};
const getters = {
  getScrollDistance(state) {
    return state.scrollDistance;
  },
};
const mutations = {
  refreshScrollDistance(state, newDistance) {
    state.scrollDistance = newDistance;
  },
};
const actions = {
  updateScrollDistance({ commit }, newDistance) {
    commit("refreshScrollDistance", newDistance);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
