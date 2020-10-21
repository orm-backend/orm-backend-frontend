import Vue from "vue";
import VueRouter from "vue-router";
import { gsap, Cubic } from "gsap";

if (process.client) {
  const ScrollToPlugin = require("ScrollToPlugin");
  gsap.registerPlugin(ScrollToPlugin);
}

Vue.use(VueRouter);

// globals
import MainNavigation from "@/layout/MainNavigation.vue";
import BaseNavigation from "@/layout/BaseNavigation.vue";
import SidebarNavigation from "@/layout/SidebarNavigation.vue";
import MainFooter from "@/layout/MainFooter.vue";
import Landing from "@/views/Landing.vue";

// dynamic
// const Login = () =>
//   import(/* webpackChunkName: "login-page" */ "@/views/Login.vue");
// const Guides = () =>
//   import(/* webpackChunkName: "guides-page" */ "@/views/Guides.vue");
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
        classes: "md-primary-dark md-transparent md-fixed",
      },
    },
  },
  {
    path: "/login",
    name: "login",
    components: {
      header: BaseNavigation,
      default: () =>
        import(/* webpackChunkName: "login-page" */ "@/views/Login.vue"),
      footer: MainFooter,
    },
    props: {
      header: { classes: "md-primary-dark md-absolute" },
    },
  },
  {
    path: "/guides/:guide",
    name: "guides",
    components: {
      header: SidebarNavigation,
      default: () =>
        import(/* webpackChunkName: "guides-page" */ "@/views/Guides.vue"),
      footer: MainFooter,
    },
    props: {
      header: { classes: "md-primary-dark md-fixed" },
    },
  },
  // { path: "/admin" /* Ignore or pass on to server */ },
  // { path: "/logout" /* Ignore or pass on to server */ },
  {
    path: "*",
    name: "404",
    components: {
      header: BaseNavigation,
      default: () =>
        import(/* webpackChunkName: "404-page" */ "@/views/NotFound.vue"),
      footer: MainFooter,
    },
    props: {
      header: { classes: "md-primary-dark md-absolute" },
    },
  },
];

export default () => {
  const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior: (to, from, savedPosition) => {
      function scrollTo(target) {
        setTimeout(() => {
          gsap.to(window, {
            duration: 0.2,
            scrollTo: {
              y: target == "#features" ? $(window).height() - 80 : target,
              autoKill: true,
            },
            ease: Cubic.easeInOut,
          });
        }, 200);
      }

      if (to.hash) {
        if (document.readyState === "complete") {
          scrollTo(to.hash);
        } else {
          window.addEventListener("load", function (event) {
            scrollTo(to.hash);
          });
        }

        return false;
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
