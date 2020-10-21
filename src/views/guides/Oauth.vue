<template>
  <div class="guide">
    <section>
      <h1>{{ pageTitle }}</h1>
      <p>
        ORM Backend provides Laravel Passport integration with Doctrine ORM.
        This integration allows you to manage tokens through a graphical
        interface in the
        <router-link to="/guides/admin" title="Laravel Admin"
          >Laravel Admin</router-link
        >
        panel.
      </p>
    </section>
  </div>
</template>

<script>
import GuideBase from "./GuideBase";

export default {
  mixins: [GuideBase],
  data() {
    return {
      pageTitle: "OAuth token management in Laravel Admin",
      pageDescription:
        "Integration of the OAuth2 authorization framework. Bearer token management in Laravel Admin panel.",
      menu: [],
    };
  },
};
</script>
