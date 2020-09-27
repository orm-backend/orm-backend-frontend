import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

import user from "./user";
import local from "./local";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      user: user,
      local: local,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    //strict: process.env.NODE_ENV === "development",
    plugins: process.env.NODE_ENV === "development" ? [createLogger()] : [],
  });

  return Store;
}
