<template>
  <div id="architecture">
    <div class="md-layout">
      <div
        class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center"
      >
        <h2 class="md-display-1">Architecture</h2>
        <p class="md-subheading">
          The figure below shows the interaction of project modules using an
          example of processing the HTTP request.
        </p>
      </div>
    </div>
    <div class="md-layout architecture">
      <div
        class="md-layout-item md-size-66 md-xlarge-size-35 md-large-size-50 md-xsmall-size-100 mx-auto"
      >
        <u-animate-container>
          <u-animate
            name="fadeInUp"
            delay="0"
            duration="1s"
            :iteration="1"
            :offset="200"
            animateClass="animate__fadeInUp"
            :begin="false"
          >
            <Architecture></Architecture>
          </u-animate>
        </u-animate-container>
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
