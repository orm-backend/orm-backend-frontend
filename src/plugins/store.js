import Vue from "vue";
import Vuex from "vuex";
import auth from "@/plugins/auth";

Vue.use(Vuex);

const state = () => ({
  user: null,
  authorized: false,
  message: null,
});

const actions = {
  checkAuth(context) {
    return auth.check().then((response) => {
      context.commit("setUser", response.user);
    });
  },

  logout(context) {
    return auth.logout().then(() => {
      context.commit("setUser", null);
    });
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
    state.authorized = user != null;
  },
  setMessage(state, message) {
    state.message = message;
  },
};

const getters = {
  isAuthorized: (state) => {
    return state.authorized;
  },

  user: (state) => {
    return state.user;
  },

  message: (state) => {
    return state.message;
  },
};

export default () => {
  const store = new Vuex.Store({
    state: state,
    actions: actions,
    mutations: mutations,
    getters: getters,
  });

  return store;
};
