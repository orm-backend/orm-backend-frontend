<template>
  <header>
    <md-toolbar
      ref="mainToolbar"
      :class="classes"
      md-elevation="12"
      :color-on-scroll="colorOnScroll"
    >
      <div class="md-toolbar-row md-collapse-lateral">
        <div class="md-toolbar-section-start">
          <img
            alt="ORM Backend server-side solution based on Doctrine and Laravel"
            class="brand-logo-icon"
            :src="logo"
            width="48"
          />
          <router-link
            to="/"
            class="brand-logo-title"
            title="ORM Backend (Laravel Admin) home page"
          >
            <brand-logo-text></brand-logo-text>
          </router-link>
        </div>
        <div class="md-toolbar-section-end">
          <md-button
            class="md-button md-button-link md-white md-simple md-toolbar-toggle"
            @click="showNavigation = true"
            title="Open mobile menu"
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
let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 15);
  }
}

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
    colorOnScroll: {
      type: Number,
      default: 0,
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
    handleScroll() {
      let scrollValue =
        document.body.scrollTop || document.documentElement.scrollTop;
      this.currentScrollValue = scrollValue;

      if (this.colorOnScroll > 0 && scrollValue > this.colorOnScroll) {
        this.$refs.mainToolbar.$el.classList.remove("md-transparent");
      } else {
        this.$refs.mainToolbar.$el.classList.add("md-transparent");
      }
    },
    scrollListener() {
      resizeThrottler(this.handleScroll);
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
  mounted() {
    document.addEventListener("scroll", this.scrollListener, true);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollListener, true);
  },
};
</script>
