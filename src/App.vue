<template>
  <div id="app" class="wrapper" ref="app">
    <transition name="header" appear v-on:before-enter="onBeforeEnter">
      <router-view name="header" ref="header" />
    </transition>
    <transition
      name="fade"
      appear
      v-on:before-enter="onBeforeEnter"
      v-on:after-enter="onAfterMainEnter"
      v-on:before-leave="onBeforeMainLeave"
    >
      <router-view ref="main" />
    </transition>
    <transition name="header" appear v-on:before-enter="onBeforeEnter">
      <router-view name="footer" ref="footer" />
    </transition>
    <no-ssr>
      <md-snackbar
        md-position="center"
        :md-duration="5000"
        :md-active.sync="showSnackbar"
        md-persistent
      >
        <span>{{ $store.getters["local/snackbar"] }}</span>
        <a
          href="javascript:;"
          @click="$store.commit('local/snackbar', null)"
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
import "@/assets/scss/material.scss";

import Vue from "vue";
import VueMeta from "vue-meta";
import VueMaterial from "vue-material";
import VueCookie from "vue-cookie";
import NoSSR from "vue-no-ssr";
import BackgroundImage from "@/plugins/background-image";

Vue.use(VueMeta);
Vue.use(VueCookie);
Vue.use(VueMaterial);

Vue.component("no-ssr", NoSSR);

import {
  ValidationProvider,
  ValidationObserver,
  setInteractionMode,
} from "vee-validate/dist/vee-validate.full";

setInteractionMode("eager");
Vue.component("validation-provider", ValidationProvider);
Vue.component("validation-observer", ValidationObserver);
Vue.directive("background-image", BackgroundImage);

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
    onBeforeEnter: function (el) {
      $(el).removeAttr("style");
    },
    onAfterMainEnter: function () {
      this.$nextTick().then(() => {
        if (typeof this.$refs.header.init === "function") {
          this.$refs.header.init();
        }
      });
    },
    onBeforeMainLeave: function () {
      $("body > .md-menu-content").hide();
    },
  },
  computed: {
    showSnackbar: {
      cache: false,
      get: function () {
        return !!this.$store.state.local.snackbar;
      },
      set: function (value) {
        this.$store.commit("local/snackbar", null);
      },
    },
  },
  mounted() {
    this.isNotAccepted = this.$cookie.get("cookie-policy-showed") == null;
  },
  metaInfo() {
    return {
      title: "PHP starter-kit based on Doctrine ORM and Laravel Framework",
      htmlAttrs: {
        lang: "en",
      },
      noscript: [{ innerHTML: "This website requires JavaScript." }],
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "Out of the box solution that provides Laravel Admin panel, RESTful services, Json Query, ACL, OAuth2 and more. No coding required, only Doctrine mappings.",
        },
        {
          vmid: "og:url",
          property: "og:url",
          content: process.env.VUE_APP_URL + this.$route.path,
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
            process.env.VUE_APP_URL +
            require("@/assets/img/orm-backend-og.jpg"),
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
            "Out of the box solution that provides Laravel Admin panel, RESTful services, Json Query, ACL, OAuth2 and more. No coding required, only Doctrine mappings.",
        },
      ],
    };
  },
};
</script>
