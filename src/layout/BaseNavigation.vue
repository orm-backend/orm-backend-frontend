<template>
  <header style="opacity: 0">
    <md-toolbar id="mainToolbar" :class="classes" md-elevation="12">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <router-link
            to="/"
            class="brand-logo"
            title="ORM based PHP backend with Laravel Admin and RESTful services"
          >
            <img
              alt="ORM based PHP backend with Laravel Admin and RESTful services"
              class="brand-logo-icon"
              :src="logo"
              width="48"
            />
            <!--brand-logo-text class="brand-logo-text"></brand-logo-text-->
            <span class="brand-logo-text">ORM Backend</span>
          </router-link>
        </div>
        <div class="md-toolbar-section-end">
          <md-button
            class="md-button md-button-link md-white md-simple md-toolbar-toggle"
            @click="showNavigation = true"
          >
            <md-icon>menu</md-icon>
          </md-button>

          <no-ssr>
            <MainMenu
              v-bind:is-authorized="userAuthorized"
              :logout="logout"
            ></MainMenu>
          </no-ssr>
        </div>
      </div>
    </md-toolbar>
    <md-drawer
      ref="mobileMenu"
      class="md-right"
      :md-active.sync="showNavigation"
      md-swipeable
    >
      <md-toolbar class="md-medium md-primary" md-elevation="12">
        <span class="md-title">ORM Backend</span>
      </md-toolbar>
      <MobileMenu
        v-bind:is-authorized="userAuthorized"
        :logout="logout"
      ></MobileMenu>
    </md-drawer>
  </header>
</template>

<script>
import MainMenu from "./menu/MainMenu.vue";
import MobileMenu from "./menu/MobileMenu.vue";

export default {
  components: {
    MainMenu,
    MobileMenu,
  },
  props: {
    logo: {
      type: String,
      default: require("@/assets/img/logo.png"),
    },
    classes: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showNavigation: false,
      showSidebar: false,
    };
  },
  methods: {
    logout() {
      try {
        this.$store.dispatch("user/logout");
      } catch (e) {
        this.$store.commit("local/snackbar", e);
      }
    },
  },
  computed: {
    userAuthorized() {
      return this.$store.getters["user/isAuthorized"];
    },
  },

  created() {
    this.$store.dispatch("user/fetch").catch((e) => {
      this.$store.commit("local/snackbar", "Server connection error.");
      //this.$store.commit("local/snackbar", e);
    });
  },
};
</script>
