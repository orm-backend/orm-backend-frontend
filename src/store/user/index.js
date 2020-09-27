//import auth from "@/plugins/auth";

import { http } from "@/plugins/axios";

const state = () => ({
  id: undefined,
  name: undefined,
  email: undefined,
});

const actions = {
  async fetch(context) {
    const response = await http.get("/user");
    context.commit("set", response.data);
  },

  async logout(context) {
    const response = await http.get("/token");

    if (!response.status === 200 || !response.data.csrf_token) {
      context.commit("user/set", {});
      throw new Error("Could not obtain CSRF token.");
    }

    await http.post("/logout", { _token: response.data.csrf_token });
    context.commit("set", {});
  },
};

const mutations = {
  set(state, user) {
    state.id = user.id;
    state.name = user.name;
    state.email = user.email;
  },
};

const getters = {
  isAuthorized: (state) => {
    return !!state.id;
  },

  get: (state) => {
    return state;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
