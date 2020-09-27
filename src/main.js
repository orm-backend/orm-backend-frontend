import Vue from "vue";
import App from "./App.vue";

import createRouter from "./router";
import createStore from "./store";

Vue.config.productionTip = false;

export default () => {
  const router = createRouter();
  const store = createStore();

  return new Vue({
    router,
    store,
    render: (h) => h(App),
  });
};
