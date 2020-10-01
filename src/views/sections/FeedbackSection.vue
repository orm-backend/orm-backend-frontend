<template>
  <div id="feedback" class="section">
    <div class="md-layout md-alignment-top-center">
      <div
        class="md-layout-item md-size-50 md-xlarge-size-30 md-small-size-100"
      >
        <h2 class="md-display-1">Work with us</h2>
        <p class="md-subheading">
          If this project is interesting to you, we would be very glad to know
          your opinion. We will respond get back to you in a couple of hours.
        </p>
      </div>
    </div>
    <div class="md-layout md-alignment-top-center">
      <div
        class="md-layout-item md-size-70 md-xlarge-size-50 md-medium-size-80 md-small-size-90 md-xsmall-size-100"
      >
        <FeedbackForm action="/feedback"></FeedbackForm>
      </div>
    </div>
  </div>
</template>

<script>
import FeedbackForm from "@/forms/FeedbackForm";

export default {
  components: {
    FeedbackForm,
  },
};
</script>
