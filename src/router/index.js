import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// globals
import MainNavbar from "@/layout/MainNavbar.vue";
import BaseNavigation from "@/layout/BaseNavigation.vue";
import MainFooter from "@/layout/MainFooter.vue";
import Landing from "@/views/Landing.vue";

// dynamic
const Login = () =>
  import(/* webpackChunkName: "login-page" */ "@/views/Login.vue");
const Documentation = () =>
  import(/* webpackChunkName: "module-page" */ "@/views/Documentation.vue");
const NotFound = () =>
  import(/* webpackChunkName: "404-page" */ "@/views/NotFound.vue");

const routes = [
  {
    path: "/",
    name: "landing",
    components: {
      header: MainNavbar,
      default: Landing,
      footer: MainFooter,
    },
    props: {
      header: {
        colorOnScroll: 400,
        classes: "md-medium md-primary-dark md-transparent md-fixed",
      },
      default: { header: require("@/assets/img/Technology-06.web.jpg") },
    },
  },
  {
    path: "/login",
    name: "login",
    components: {
      header: BaseNavigation,
      default: Login,
      footer: MainFooter,
    },
    props: {
      header: { classes: "md-medium md-primary-dark md-absolute" },
      default: { background: require("@/assets/img/Technology-06.web.jpg") },
    },
  },
  {
    path: "/docs/:modulename",
    name: "docs",
    components: {
      header: BaseNavigation,
      default: Documentation,
      footer: MainFooter,
    },
    props: {
      header: { classes: "md-medium md-primary-dark md-absolute" },
    },
  },
  { path: "/admin" /* Ignore or pass on to server */ },
  {
    path: "*",
    name: "404",
    components: {
      header: BaseNavigation,
      default: NotFound,
    },
    props: {
      header: { classes: "md-medium md-transparent md-fixed" },
      default: { header: require("@/assets/img/Technology-06.web.jpg") },
    },
  },
];

export default () => {
  const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior: (to) => {
      if (to.hash) {
        return { selector: to.hash };
      } else {
        return { x: 0, y: 0 };
      }
    },
  });

  /*  router.afterEach(() => {
    var overlay = document.getElementsByClassName("md-overlay");

    if (overlay && overlay.length) {
      overlay[0].click();
    }
  });*/

  return router;
};
