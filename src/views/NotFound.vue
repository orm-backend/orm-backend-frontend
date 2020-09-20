<template>
  <main class="not-found">
    <div class="inner-container">
      <div class="md-empty-state md-theme-default">
        <div class="md-empty-state-container">
          <h1>404</h1>
          <hr />
          <h2>Page not found</h2>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  /*   mounted() {
    OWATracker.trackPageView();
  }, */
  metaInfo: {
    bodyAttrs: {
      class: "login-page",
    },
  },
};
</script>
