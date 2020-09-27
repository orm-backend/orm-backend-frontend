<template>
  <main>
    <div class="outer-container inner-container">
      <div class="md-layout md-alignment-center-left">
        <div class="md-layout-item md-size-40 md-small-size-100">
          <blockquote>
            <p>Enter the following details to login demo account:</p>
            <p><small>Email:</small> <code>demo@orm-backend.com</code></p>
            <p><small>Password:</small> <code>doctrine</code></p>
          </blockquote>
        </div>
        <div class="md-layout-item md-size-60 md-small-size-100">
          <LoginForm action="/signin"></LoginForm>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import LoginForm from "@/forms/LoginForm";
import "@/assets/scss/pages/login.scss";

export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      firstname: null,
      email: null,
      password: null,
    };
  },
  props: {
    logo: {
      type: String,
      default: require("@/assets/img/logo.png"),
    },
  },
  /*   mounted() {
	window.OWATracker.trackPageView();
  }, */
  metaInfo: {
    title: "Login to Laravel Admin panel",
    meta: [
      {
        vmid: "description",
        name: "description",
        content:
          "Login to a backend solution based on Doctrine ORM and integrated with the popular Laravel framework.",
      },
      {
        vmid: "og:description",
        property: "og:description",
        content:
          "Login to a backend solution based on Doctrine ORM and integrated with the popular Laravel framework.",
      },
    ],
    bodyAttrs: {
      class: "login-page",
    },
  },
};
</script>

<style lang="css"></style>
