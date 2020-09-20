<template>
  <header>
    <md-toolbar ref="mainToolbar" :class="classes" md-elevation="12">
      <div class="md-toolbar-row md-collapse-lateral">
        <div class="md-toolbar-section-start">
          <img
            alt="ORM Backend is a server-side solution based on Doctrine"
            class="brand-logo-icon"
            :src="logo"
            width="48"
          />
          <router-link
            to="/"
            class="brand-logo-title"
            title="Go to ORM Backend home page"
          >
            <brand-logo-text></brand-logo-text>
          </router-link>
        </div>
        <div class="md-toolbar-section-end">
          <md-button
            class="md-button md-button-link md-white md-simple md-toolbar-toggle"
            @click="showNavigation = true"
          >
            <md-icon class="md-size-2x">menu</md-icon>
          </md-button>

          <no-ssr>
            <DesctopMenu
              v-bind:is-authorized="userAuthorized"
              :logout="logout"
            ></DesctopMenu>
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
      <md-toolbar class="md-medium md-accent" md-elevation="12">
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
import DesctopMenu from "./menu/DesctopMenu.vue";
import MobileMenu from "./menu/MobileMenu.vue";

export default {
  components: {
    DesctopMenu,
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
    };
  },
  methods: {
    logout() {
      try {
        this.$store.dispatch("logout");
      } catch (e) {
        this.$store.state.message = e;
      }
    },
  },
  computed: {
    userAuthorized() {
      return this.$store.getters.isAuthorized;
    },
  },

  created() {
    this.$store.dispatch("checkAuth").catch((e) => {
      //this.$store.state.message = "Server connection error.";
      this.$store.state.message = e;
    });
  },
};
</script>
