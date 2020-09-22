<template>
  <main>
    <div class="inner-container">
      <!-- md-drawer :md-active.sync="menuVisible" md-persistent="full">
        <md-toolbar class="md-accent" md-elevation="0">
          <div class="md-toolbar-section-start">
            <md-button
              class="md-button md-button-link md-white md-simple"
              @click="menuVisible = !menuVisible"
            >
              <md-icon>menu</md-icon>
            </md-button>
          </div>
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button
              class="md-icon-button md-dense"
              @click="menuVisible = !menuVisible"
            >
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-drawer -->
      <md-empty-state
        md-icon="devices_other"
        md-label="Coming soon"
        md-description="Documentation is being developed now."
      >
      </md-empty-state>
    </div>
  </main>
</template>

<script>
export default {
  name: "Documentation",
  data() {
    return {
      menuVisible: true,
    };
  },
  computed: {
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
  /*   mounted() {
    window.OWATracker.trackPageView();
  }, */
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
        class: "module-page",
      },
    };
  },
};
</script>
