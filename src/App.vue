<template>
  <div id="app" class="wrapper" ref="app" :style="wrapperStyle">
    <router-view name="header" />
    <router-view />
    <router-view name="footer" />
    <no-ssr>
      <md-snackbar
        md-position="center"
        :md-duration="5000"
        :md-active.sync="showSnackbar"
        md-persistent
      >
        <span>{{ $store.state.message }}</span>
        <a
          href="javascript:;"
          @click="$store.state.message = null"
          class="text-primary-light"
          >Close</a
        >
      </md-snackbar>
      <md-snackbar
        md-position="center"
        :md-duration="Infinity"
        :md-active.sync="isNotAccepted"
        md-persistent
      >
        <span
          >We serve cookie on this site to analyze traffic, remember your
          preferences, and your experience.</span
        >
        <a
          href="https://policies.google.com/technologies/cookies"
          class="text-primary-light"
          target="_blank"
          >More</a
        >
        <a
          href="javascript:;"
          @click.prevent="acceptCookie"
          class="text-primary-light"
          >Ok</a
        >
      </md-snackbar>
    </no-ssr>
  </div>
</template>
<script>
import "vue-material/dist/vue-material.min.css";
import "@/assets/scss/material-kit.scss";

import Vue from "vue";
import VueMeta from "vue-meta";
import VueMaterial from "vue-material";
import VueCookie from "vue-cookie";
import VueScrollTo from "vue-scrollto";
import { UAnimateContainer, UAnimate } from "vue-wow";

import BrandLogoText from "@/svg/BrandLogoText";
import DropDown from "./components/Dropdown.vue";
import { directive as ClickOutside } from "vue-clickaway";
import NoSSR from "vue-no-ssr";

Vue.use(VueMeta);
Vue.use(VueCookie);
Vue.use(VueMaterial);
Vue.use(VueScrollTo);

Vue.component("u-animate-container", UAnimateContainer);
Vue.component("u-animate", UAnimate);
Vue.component("brand-logo-text", BrandLogoText);
Vue.component("drop-down", DropDown);
Vue.component("no-ssr", NoSSR);
Vue.directive("click-outside", ClickOutside);

import {
  ValidationProvider,
  ValidationObserver,
  setInteractionMode,
} from "vee-validate/dist/vee-validate.full";

setInteractionMode("eager");
Vue.component("validation-provider", ValidationProvider);
Vue.component("validation-observer", ValidationObserver);

export default {
  name: "App",
  data() {
    return {
      isNotAccepted: true,
    };
  },
  methods: {
    acceptCookie: function () {
      this.$cookie.set("cookie-policy-showed", 1, { expires: "1Y" });
      this.isNotAccepted = false;
    },
  },
  computed: {
    showSnackbar: {
      get: function () {
        return !!this.$store.getters.message;
      },
      set: function () {
        this.$store.state.message = null;
      },
    },
    wrapperStyle() {
      if (this.$route.name == "login" || this.$route.name == "404") {
        return {
          backgroundColor: `rgb(20, 50, 125)`,
          backgroundImage: `url(${require("@/assets/img/Technology-06.jpg")})`,
        };
      }

      return {};
    },
  },
  mounted() {
    this.isNotAccepted = this.$cookie.get("cookie-policy-showed") == null;
  },
  metaInfo: {
    title: process.env.VUE_APP_NAME,
    htmlAttrs: {
      lang: "en",
    },
    noscript: [{ innerHTML: "This website requires JavaScript." }],
    meta: [
      {
        vmid: "description",
        name: "description",
        content:
          "The powerful server-side solution based on Doctrine ORM and integrated with the popular Laravel Framework.",
      },
      {
        vmid: "og:url",
        property: "og:url",
        content: process.env.VUE_APP_URL + "/",
      },
      {
        vmid: "og:type",
        property: "og:type",
        content: "website",
      },
      {
        vmid: "og:title",
        property: "og:title",
        content: process.env.VUE_APP_NAME,
      },
      {
        vmid: "og:image",
        property: "og:image",
        content:
          process.env.VUE_APP_URL + require("@/assets/img/orm-backend-og.jpg"),
      },
      {
        property: "og:image:type",
        content: "image/jpeg",
        vmid: "og:image:type",
      },
      {
        property: "og:image:width",
        content: "1200",
        vmid: "og:image:width",
      },
      {
        property: "og:image:height",
        content: "627",
        vmid: "og:image:height",
      },
      {
        property: "og:image:alt",
        content:
          "Abstract " + process.env.VUE_APP_NAME + " Logo with a caption",
        vmid: "og:image:alt",
      },
      {
        vmid: "og:description",
        property: "og:description",
        content:
          "The powerful server-side solution based on Doctrine ORM and integrated with the popular Laravel Framework.",
      },
    ],
  },
};
</script>
