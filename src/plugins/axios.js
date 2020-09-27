// import something here

import Vue from "vue";
import axios from "axios";

// We create our own axios instance and set a custom base URL.
// Note that if we wouldn't set any config here we do not need
// a named export, as we could just `import axios from 'axios'`
const http = axios.create({
  baseURL: process.env.VUE_APP_URL,
  headers: {
    Accept: "application/json",
  },
  withCredentials: "include",
});

// for use inside Vue files through this.$axios
Vue.prototype.$http = http;

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
// export default async (/* { app, router, Vue ... } */) => {
// something to do
// }

// Here we define a named export
// that we can later use inside .js files:
export { http };
