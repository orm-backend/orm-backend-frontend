<template>
  <div
    id="desctopMenu"
    class="md-collapse"
    :is-authorized="isAuthorized"
    :logout="logout"
  >
    <div class="md-collapse-wrapper">
      <md-list>
        <li class="md-list-item">
          <a
            href="javascript:void(0)"
            class="md-list-item-router md-list-item-container md-button-clean dropdown"
            title="ORM Backend server-side solution, core features"
          >
            <div class="md-list-item-content">
              <drop-down direction="down">
                <md-button
                  slot="title"
                  class="md-button md-button-link md-white md-simple dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <i class="material-icons">flight_land</i>
                  <p>Landing</p>
                </md-button>
                <ul class="dropdown-menu dropdown-with-icons">
                  <li>
                    <router-link
                      to="/#features"
                      title="Laravel Admin panel, CRUD, ACL, OAuth and more..."
                    >
                      <i class="material-icons">featured_play_list</i>
                      <p>Features</p>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      to="/#installation"
                      title="How to install Doctrine based solution"
                    >
                      <i class="material-icons">get_app</i>
                      <p>Installation</p>
                    </router-link>
                  </li>
                  <li>
                    <router-link
                      to="/#architecture"
                      title="ORM Backend architecture"
                    >
                      <i class="material-icons">apartment</i>
                      <p>Architecture</p>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/#feedback" title="Give feedback">
                      <i class="material-icons">feedback</i>
                      <p>Feedback</p>
                    </router-link>
                  </li>
                </ul>
              </drop-down>
            </div>
          </a>
        </li>
        <li class="md-list-item">
          <a
            href="javascript:void(0)"
            class="md-list-item-router md-list-item-container md-button-clean dropdown"
            title="ORM Backend core modules documentation"
          >
            <div class="md-list-item-content">
              <drop-down direction="down">
                <md-button
                  slot="title"
                  class="md-button md-button-link md-white md-simple dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <i class="material-icons">pages</i>
                  <p>Documentation</p>
                </md-button>
                <ul class="dropdown-menu dropdown-with-icons">
                  <li>
                    <router-link
                      to="/docs/json"
                      title="JSON Query Language implementation"
                    >
                      <i class="material-icons">code</i>
                      <p>JSON Query Language</p>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/docs/rest" title="REST / CRUD services">
                      <i class="material-icons">language</i>
                      <p>REST services</p>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/docs/oauth" title="OAuth2 integration">
                      <i class="material-icons">security</i>
                      <p>OAuth</p>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/docs/acl" title="ACL implementation">
                      <i class="material-icons">policy</i>
                      <p>ACL</p>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/docs/admin" title="Laravel Admin panel">
                      <i class="material-icons">dashboard</i>
                      <p>Admin panel</p>
                    </router-link>
                  </li>
                </ul>
              </drop-down>
            </div>
          </a>
        </li>
        <li class="md-list-item">
          <a
            class="md-list-item-router md-list-item-container md-button-clean dropdown"
          >
            <md-button
              slot="title"
              class="md-button md-button-link md-white md-simple"
            >
              <router-link
                to="/login"
                title="Sign in Laravel Admin panel"
                v-if="!isAuthorized"
              >
                <i class="material-icons">account_circle</i>
                <p>Demo</p>
              </router-link>
              <a
                :href="process.env.VUE_APP_ADMIN_PATH"
                title="Go to Laravel Admin panel"
                v-if="isAuthorized"
              >
                <i class="material-icons">account_circle</i>
                <p>Demo</p>
              </a>
            </md-button>
          </a>
        </li>
        <li class="md-list-item" v-if="isAuthorized">
          <a
            href="/logout"
            class="md-list-item-router md-list-item-container md-button-clean dropdown"
          >
            <md-button
              slot="title"
              class="md-button md-button-link md-white md-simple"
            >
              <a href="/logout" @click.prevent="logout">
                <i class="material-icons">exit_to_app</i>
                <p>Sign out</p>
              </a>
            </md-button>
          </a>
        </li>
      </md-list>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isAuthorized: Boolean,
    logout: Function,
  },
};
</script>
