if (process.client) {
  window.$ = window.jQuery = require("jquery");
}

import Vue from "vue";
import App from "./App.vue";
import createRouter from "./router";
import createStore from "./store";

import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure({ ...awsconfig, ssr: true });

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
