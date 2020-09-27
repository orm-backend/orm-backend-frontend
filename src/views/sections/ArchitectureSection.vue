<template>
  <div id="architecture" class="section">
    <div class="md-layout md-alignment-top-center">
      <div
        class="md-layout-item md-size-50 md-xlarge-size-30 md-small-size-100"
      >
        <h2 class="md-display-1">Architecture</h2>
        <p class="md-subheading">
          The figure below shows the interaction of project modules using an
          example of processing the HTTP request.
        </p>
      </div>
    </div>
    <div class="md-layout md-alignment-top-center">
      <div
        class="md-layout-item md-size-66 md-xlarge-size-35 md-large-size-50 md-xsmall-size-100"
      >
        <Architecture></Architecture>
      </div>
    </div>
  </div>
</template>

<script>
import Architecture from "@/svg/Architecture";

export default {
  components: {
    Architecture,
  },
};
</script>
