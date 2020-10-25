<template>
  <main style="opacity: 0">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
      integrity="sha256-h20CPZ0QyXlBuAw7A+KluUYx/3pK+c7lYEpqLTlxjYQ="
      crossorigin="anonymous"
    />
    <div class="outer-container content content-raised">
      <div class="inner-container md-layout guides-layout guides-layout-fixed">
        <div class="left-pane md-layout-item md-size-15" v-if="showLeftSidebar">
          <md-list>
            <md-list-item
              v-for="item in sidebar.menu"
              :class="item.link + '-link'"
              :key="item.link"
              :to="'#' + item.link"
              :title="item.title"
            >
              <span class="md-list-item-text">{{ item.title }}</span>
            </md-list-item>
          </md-list>
        </div>
        <div class="md-layout-item"></div>
        <div
          class="right-pane md-layout-item md-size-20"
          v-if="showRightSidebar"
        >
          <MobileMenu
            v-bind:is-authorized="userAuthorized"
            :logout="logout"
          ></MobileMenu>
        </div>
      </div>
      <div
        class="inner-container md-layout guides-layout guides-layout-content"
      >
        <div
          class="left-pane md-layout-item md-size-20"
          v-if="showLeftSidebar"
        ></div>
        <div class="md-layout-item content-pane">
          <transition name="guide" appear v-on:after-enter="afterEnter">
            <component
              ref="contentComponent"
              v-bind:is="currentGuide"
            ></component>
          </transition>
          <ShareIt
            :url="'https://www.orm-backend.com' + $route.fullPath"
            :title="pageTitle"
            :description="pageDescription"
          ></ShareIt>
        </div>
        <div
          class="right-pane md-layout-item md-size-20"
          v-if="showRightSidebar"
        ></div>
      </div>
    </div>
  </main>
</template>

<script>
import "@/assets/scss/pages/guide.scss";
import Vue from "vue";
import VueHighlightJS from "vue-highlightjs";
import ShareIt from "@/views/ShareIt";

Vue.use(VueHighlightJS);

export default {
  name: "Guides",
  components: {
    MobileMenu: () => import("@/layout/menu/MobileMenu.vue"),
    ShareIt: ShareIt,
    JsonQuery: () =>
      import(/* webpackChunkName: "guides-json-page" */ "./guides/Json"),
    Restful: () =>
      import(/* webpackChunkName: "guides-rest-page" */ "./guides/Services"),
    Acl: () => import(/* webpackChunkName: "guides-acl-page" */ "./guides/Acl"),
    LaravelAdmin: () =>
      import(/* webpackChunkName: "guides-admin-page" */ "./guides/Admin"),
    Oauth: () =>
      import(/* webpackChunkName: "guides-oauth-page" */ "./guides/Oauth"),
  },
  data() {
    return {
      menuVisible: true,
      windowWidth: 0,
      controller: null,
      scenes: [],
      pageTitle: "",
      pageDescription: "",
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
    onResize() {
      this.windowWidth = window.innerWidth;
      this.afterEnter();
    },
    afterEnter: function () {
      this.$refs.contentComponent.afterEnter();
      this.pageTitle = this.$refs.contentComponent.pageTitle;
      this.pageDescription = this.$refs.contentComponent.pageDescription;
    },
  },
  computed: {
    currentGuide() {
      return this.$route.params.guide;
    },
    showLeftSidebar() {
      return this.windowWidth > 960;
    },
    showRightSidebar() {
      return this.windowWidth > 1919;
    },
    sidebar() {
      return this.$store.getters["local/sidebar"];
    },
    userAuthorized() {
      return this.$store.getters["user/isAuthorized"];
    },
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    window.addEventListener("resize", this.onResize, true);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize, true);
  },
  metaInfo() {
    return {
      bodyAttrs: {
        class: "guide-page",
      },
    };
  },
};
</script>
