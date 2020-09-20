import Vue from "vue";
import http from "@/plugins/http-common";

Vue.prototype.$http = http;

export default {
  check: async function () {
    let response = await http.get("/user");
    return response;
  },

  logout: async function () {
    let response = await http.post("/logout", {});
    return response;
  },
};
