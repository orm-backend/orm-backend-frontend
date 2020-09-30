<template>
  <md-list
    :is-authorized="isAuthorized"
    :logout="logout"
    :md-expand-single="true"
  >
    <md-divider class="md-inset"></md-divider>
    <md-list-item to="/#features" title="ORM Backend solution core features">
      <md-icon>featured_play_list</md-icon>
      <span class="md-list-item-text">Features</span>
    </md-list-item>

    <md-divider class="md-inset"></md-divider>
    <md-list-item
      to="/#installation"
      title="Install ORM Backend to your project"
    >
      <md-icon>get_app</md-icon>
      <span class="md-list-item-text">Installation</span>
    </md-list-item>

    <md-divider class="md-inset"></md-divider>
    <md-list-item to="/#architecture" title="How it works?">
      <md-icon>apartment</md-icon>
      <span class="md-list-item-text">Architecture</span>
    </md-list-item>

    <md-divider class="md-inset"></md-divider>
    <md-list-item to="/#feedback" title="What do you think of ORM Backend?">
      <md-icon>message</md-icon>
      <span class="md-list-item-text">Feedback</span>
    </md-list-item>

    <md-divider class="md-inset"></md-divider>
    <md-list-item
      md-expand
      title="ORM Backend documentation"
      :md-expanded.sync="expandGuides"
    >
      <md-icon>view_module</md-icon>
      <span class="md-list-item-text">Guides</span>
      <md-list slot="md-expand">
        <md-divider class="md-inset"></md-divider>
        <md-list-item
          class="md-inset"
          to="/guides/json"
          title="JSON Query implementation"
        >
          <md-icon>code</md-icon>
          <span class="md-list-item-text">JSON Query</span>
        </md-list-item>

        <md-divider class="md-inset"></md-divider>
        <md-list-item
          class="md-inset"
          to="/guides/rest"
          title="JSON CRUD secrices"
        >
          <md-icon>language</md-icon>
          <span class="md-list-item-text">REST services</span>
        </md-list-item>

        <md-divider class="md-inset"></md-divider>
        <md-list-item
          class="md-inset"
          to="/guides/oauth"
          title="OAuth2 intergation whith Laravel Admin panel"
        >
          <md-icon>security</md-icon>
          <span class="md-list-item-text">OAuth</span>
        </md-list-item>

        <md-divider class="md-inset"></md-divider>
        <md-list-item
          class="md-inset"
          to="/guides/acl"
          title="ACL extended implementation"
        >
          <md-icon>policy</md-icon>
          <span class="md-list-item-text">ACL</span>
        </md-list-item>

        <md-divider class="md-inset"></md-divider>
        <md-list-item
          class="md-inset"
          to="/guides/admin"
          title="Laravel Admin panel"
        >
          <md-icon>dashboard</md-icon>
          <span class="md-list-item-text">Admin panel</span>
        </md-list-item>
      </md-list>
    </md-list-item>

    <md-divider class="md-inset"></md-divider>
    <md-list-item
      @click="goToAdmin"
      v-if="isAuthorized"
      title="Go to Laravel Admin panel"
    >
      <md-icon>account_box</md-icon>
      <div class="md-list-item-text">
        <span class="md-list-item-text">Demo</span>
      </div>
    </md-list-item>
    <md-list-item to="/login" v-else title="LogIn Laravel Admin panel">
      <md-icon>account_box</md-icon>
      <div class="md-list-item-text">
        <span class="md-list-item-text">Demo</span>
      </div>
    </md-list-item>

    <md-divider class="md-inset" v-if="isAuthorized"></md-divider>
    <md-list-item @click.prevent="logout" v-if="isAuthorized">
      <md-icon>exit_to_app</md-icon>
      <div class="md-list-item-text">
        <span class="md-list-item-text">Sign out</span>
      </div>
    </md-list-item>
    <md-divider class="md-inset"></md-divider>
  </md-list>
</template>
<script>
export default {
  props: {
    type: String,
    isAuthorized: Boolean,
    logout: Function,
  },
  data() {
    return {
      year: new Date().getFullYear(),
      adminPath: process.env.VUE_APP_URL + process.env.VUE_APP_ADMIN_PATH,
    };
  },
  methods: {
    goToAdmin() {
      window.location.href = this.adminPath;
    },
  },
  computed: {
    expandGuides: {
      get: function () {
        return this.$route.name == "guides";
      },
      set: function (value) {
        // nothing
      },
    },
  },
};
</script>
