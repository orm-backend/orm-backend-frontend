<template>
  <main>
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

export default {
  name: "Guides",
  components: {
    MobileMenu: () => import("@/layout/menu/MobileMenu.vue"),
    Json: () => import("./guides/Json"),
    Rest: () => import("./guides/ComingSoon"),
    Acl: () => import("./guides/ComingSoon"),
    Admin: () => import("./guides/ComingSoon"),
    Oauth: () => import("./guides/ComingSoon"),
  },
  data() {
    return {
      menuVisible: true,
      windowWidth: 0,
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
    pageTitle() {
      let title = null;

      switch (this.$route.params.guide) {
        case "rest":
          title = "CRUD Services";
          break;
        case "oauth":
          title = "OAuth Integration";
          break;
        case "acl":
          title = "Access Control List";
          break;
        case "admin":
          title = "Laravel Admin Panel";
          break;
      }

      return title;
    },
    pageDescription() {
      let description = null;

      switch (this.$route.params.guide) {
        case "rest":
          description = `Ready-made CRUD services. Which allows you to 
          filter objects by properties of related objects by the received 
          parameters in JSON or URL encoding.`;
          break;
        case "oauth":
          description = `Integration of the OAuth 2.0 authorization framework. Bearer 
          token management in the admin panel.`;
          break;
        case "acl":
          description = `User and group management. Group and entity permission management.`;
          break;
        case "admin":
          description = `When you create a mapping for a new entity, it automatically 
          becomes managed and available in the admin panel and REST services. No coding
          required.`;
          break;
      }

      return description;
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
      title: this.pageTitle,
      meta: [
        {
          vmid: "og:title",
          property: "og:title",
          content: this.pageTitle,
        },
        {
          vmid: "description",
          name: "description",
          content: this.pageDescription,
        },
        {
          vmid: "og:description",
          property: "og:description",
          content: this.pageDescription,
        },
      ],
      bodyAttrs: {
        class: "guide-page",
      },
    };
  },
};
</script>
