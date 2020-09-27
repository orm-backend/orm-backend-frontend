<template>
  <main>
    <div class="outer-container content content-raised">
      <div class="inner-container md-layout guides-layout">
        <div class="left-pane md-layout-item md-size-15" v-if="showLeftSidebar">
          <md-list>
            <md-list-item
              v-for="item in sidebar.menu"
              :key="item.link"
              :to="item.link"
              :title="item.title"
            >
              <span class="md-list-item-text">{{ item.title }}</span>
              <md-divider></md-divider>
            </md-list-item>
          </md-list>
        </div>
        <div class="content-pane md-layout-item">
          <md-empty-state
            id="anchor1"
            md-icon="devices_other"
            md-label="Coming soon"
            md-description="Documentation is being developed now."
          >
          </md-empty-state>
        </div>
        <div
          class="right-pane md-layout-item md-size-15"
          v-if="showRightSidebar"
        >
          <MobileMenu
            v-bind:is-authorized="userAuthorized"
            :logout="logout"
          ></MobileMenu>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import "@/assets/scss/pages/guide.scss";

export default {
  name: "Documentation",
  components: {
    MobileMenu: () => import("@/layout/menu/MobileMenu.vue"),
  },
  data() {
    return {
      menuVisible: true,
      windowWidth: 0,
    };
  },
  created() {
    this.$store.commit("local/sidebar", {
      title: "Coming soon",
      menu: [
        {
          link: "#anchor1",
          title: "Coming soon...",
        },
      ],
    });
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
    },
  },
  computed: {
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

      switch (this.$route.params.modulename) {
        case "json":
          title = "Json Query | ORM Backend";
          break;
        case "rest":
          title = "CRUD Services | ORM Backend";
          break;
        case "oauth":
          title = "OAuth Integration | ORM Backend";
          break;
        case "acl":
          title = "Access Control List | ORM Backend";
          break;
        case "admin":
          title = "Laravel Admin Panel | ORM Backend";
          break;
      }

      return title;
    },
    pageDescription() {
      let description = null;

      switch (this.$route.params.modulename) {
        case "json":
          description = `It is used to build a DQL query with cleanup, validation, and 
          strong typing of the input values.`;
          break;
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
