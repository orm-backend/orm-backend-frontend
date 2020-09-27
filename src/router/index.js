import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// globals
import MainNavigation from "@/layout/MainNavigation.vue";
import BaseNavigation from "@/layout/BaseNavigation.vue";
import SidebarNavigation from "@/layout/SidebarNavigation.vue";
import MainFooter from "@/layout/MainFooter.vue";
import Landing from "@/views/Landing.vue";

// dynamic
const Login = () =>
  import(/* webpackChunkName: "login-page" */ "@/views/Login.vue");
const Guides = () =>
  import(/* webpackChunkName: "module-page" */ "@/views/Guides.vue");
// const NotFound = () =>
//   import(/* webpackChunkName: "404-page" */ "@/views/NotFound.vue");

const routes = [
  {
    path: "/",
    name: "landing",
    components: {
      header: MainNavigation,
      default: Landing,
      footer: MainFooter,
    },
    props: {
      header: {
        colorOnScroll: 400,
        classes: "md-medium md-primary-dark md-transparent md-fixed",
      },
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
    },
  },
  {
    path: "/guides/:modulename",
    name: "guides",
    components: {
      header: SidebarNavigation,
      default: Guides,
      footer: MainFooter,
    },
    props: {
      header: { classes: "md-medium md-primary-dark md-absolute" },
    },
  },
  // { path: "/admin" /* Ignore or pass on to server */ },
  // { path: "/logout" /* Ignore or pass on to server */ },
  // {
  //   path: "*",
  //   name: "404",
  //   components: {
  //     header: BaseNavigation,
  //     default: NotFound,
  //     footer: MainFooter,
  //   },
  //   props: {
  //     header: { classes: "md-medium md-primary-dark md-absolute" },
  //   },
  // },
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

  if (process.client) {
    router.afterEach(() => {
      var overlay = document.getElementsByClassName("md-overlay");

      if (overlay && overlay.length) {
        overlay[0].click();
      }

      window.OWATracker.trackPageView();
    });
  }

  return router;
};
