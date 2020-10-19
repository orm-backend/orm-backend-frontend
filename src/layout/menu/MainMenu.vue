<template>
  <div id="desctopMenu" :is-authorized="isAuthorized" :logout="logout">
    <md-menu
      md-size="small"
      md-align-trigger
      title="ORM Backend server-side solution, core features"
    >
      <md-button md-menu-trigger>
        <md-icon>flight_land</md-icon>
        <p>Landing</p>
      </md-button>
      <md-menu-content>
        <md-menu-item
          to="/#features"
          title="Laravel Admin panel, RESTful services, ACL, OAuth and more..."
        >
          <md-icon>featured_play_list</md-icon>
          <span>Features</span>
        </md-menu-item>
        <md-menu-item to="/#concept" title="ORM Backend concept">
          <md-icon>emoji_objects</md-icon>
          <span>Concept</span>
        </md-menu-item>
        <md-menu-item to="/#architecture" title="ORM Backend architecture">
          <md-icon>apartment</md-icon>
          <span>Architecture</span>
        </md-menu-item>
        <md-menu-item
          to="/#installation"
          title="How to install Doctrine based solution"
        >
          <md-icon>get_app</md-icon>
          <span>Installation</span>
        </md-menu-item>
        <md-menu-item to="/#feedback" title="Give feedback">
          <md-icon>feedback</md-icon>
          <span>Feedback</span>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
    <md-menu md-align-trigger>
      <md-button md-menu-trigger title="ORM Backend core modules documentation">
        <md-icon>pages</md-icon>
        <p>Guides</p>
      </md-button>
      <md-menu-content>
        <md-menu-item to="/guides/json" title="Json Query implementation">
          <md-icon>code</md-icon>
          <span>Json Query</span>
        </md-menu-item>
        <md-menu-item to="/guides/rest" title="RESTful Services">
          <md-icon>language</md-icon>
          <span>RESTful Services</span>
        </md-menu-item>
        <md-menu-item to="/guides/oauth" title="OAuth2 integration">
          <md-icon>security</md-icon>
          <span>OAuth</span>
        </md-menu-item>
        <md-menu-item to="/guides/acl" title="ACL implementation">
          <md-icon>policy</md-icon>
          <span>ACL</span>
        </md-menu-item>
        <md-menu-item to="/guides/admin" title="Laravel Admin panel">
          <md-icon>dashboard</md-icon>
          <span>Laravel Admin</span>
        </md-menu-item>
      </md-menu-content>
    </md-menu>
    <no-ssr>
      <button
        type="button"
        class="md-button md-theme-default"
        @click="goToAdmin"
        v-if="isAuthorized"
      >
        <div class="md-ripple">
          <div class="md-button-content">
            <i class="md-icon md-icon-font md-theme-default">account_circle</i
            ><span>Demo</span>
          </div>
        </div>
      </button>
      <button
        type="button"
        class="md-button md-theme-default"
        @click="logout"
        v-if="isAuthorized"
      >
        <div class="md-ripple">
          <div class="md-button-content">
            <i class="md-icon md-icon-font md-theme-default">exit_to_app</i
            ><span>Sign out</span>
          </div>
        </div>
      </button>
      <md-button to="/login" v-if="!isAuthorized">
        <md-icon>account_circle</md-icon>
        <span>Demo</span>
      </md-button>
    </no-ssr>
  </div>
</template>

<script>
export default {
  props: {
    isAuthorized: Boolean,
    logout: Function,
  },
  data() {
    return {
      adminPath: process.env.VUE_APP_URL + process.env.VUE_APP_ADMIN_PATH,
    };
  },
  methods: {
    goToAdmin() {
      window.location.href = this.adminPath;
    },
  },
};
</script>
