<template>
  <main>
    <div class="outer-container inner-container">
      <div class="md-layout md-alignment-center-center">
        <div class="md-layout-item">
          <div class="md-empty-state md-theme-default">
            <div class="md-empty-state-container">
              <h1>404</h1>
              <hr />
              <h2>Page not found</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import "@/assets/scss/pages/404.scss";

export default {
  metaInfo: {
    bodyAttrs: {
      class: "not-found",
    },
  },
};
</script>
