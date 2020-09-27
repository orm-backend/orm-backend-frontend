const state = () => ({
  snackbar: undefined,
  sidebar: {
    title: undefined,
    menu: [],
  },
});

const actions = {};

const mutations = {
  snackbar(state, payload) {
    state.snackbar = payload;
  },
  sidebar(state, payload) {
    state.sidebar = payload;
  },
};

const getters = {
  snackbar: (state) => {
    return state.snackbar;
  },
  sidebar: (state) => {
    return state.sidebar;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
