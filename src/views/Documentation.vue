<template>
  <main>
    <div class="inner-container">
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
  metaInfo: {
    bodyAttrs: {
      class: "module-page",
    },
  },
};
</script>
