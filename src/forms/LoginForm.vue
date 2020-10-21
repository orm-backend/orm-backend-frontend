<template>
  <validation-observer ref="validator" v-slot="{ handleSubmit }">
    <form
      @submit.prevent="handleSubmit(onSubmit)"
      :name="name"
      :method="method"
      :action="action"
      :enctype="enctype"
      novalidate
    >
      <md-card>
        <md-card-header class="md-primary-dark">
          <md-card-header-text>
            <div class="md-title">Sign In To Laravel Admin</div>
          </md-card-header-text>
          <md-card-media>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="48"
              viewBox="0 0 24 24"
              width="48"
            >
              <path
                fill="#ffffff"
                d="M10.3,7.7L10.3,7.7c-0.39,0.39-0.39,1.01,0,1.4l1.9,1.9H3c-0.55,0-1,0.45-1,1v0c0,0.55,0.45,1,1,1h9.2l-1.9,1.9 c-0.39,0.39-0.39,1.01,0,1.4l0,0c0.39,0.39,1.01,0.39,1.4,0l3.59-3.59c0.39-0.39,0.39-1.02,0-1.41L11.7,7.7 C11.31,7.31,10.69,7.31,10.3,7.7z M20,19h-7c-0.55,0-1,0.45-1,1v0c0,0.55,0.45,1,1,1h7c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-7 c-0.55,0-1,0.45-1,1v0c0,0.55,0.45,1,1,1h7V19z"
              />
            </svg>
          </md-card-media>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter feadback-form">
            <div class="md-layout-item md-size-50 md-xsmall-size-100">
              <validation-provider
                vid="email"
                name="Email"
                rules="required|email"
                v-slot="{ errors }"
                slim
                bails
              >
                <md-field :class="{ 'md-invalid': errors.length }" md-clearable>
                  <md-icon>contact_mail</md-icon>
                  <label>Email</label>
                  <md-input
                    name="email"
                    type="email"
                    v-model="fields.email"
                    maxlength="250"
                    required
                    :disabled="disabled"
                    autocomplete="username"
                  ></md-input>
                  <span class="md-error">{{ errors[0] }}</span>
                </md-field>
              </validation-provider>
            </div>
            <div class="md-layout-item md-size-50 md-xsmall-size-100">
              <validation-provider
                vid="password"
                name="Password"
                rules="required|min:6|max:250"
                v-slot="{ errors }"
                slim
                bails
              >
                <md-field :class="{ 'md-invalid': errors.length }">
                  <md-icon>vpn_key</md-icon>
                  <label>Password</label>
                  <md-input
                    name="password"
                    type="password"
                    v-model="fields.password"
                    maxlength="250"
                    required
                    :disabled="disabled"
                    autocomplete="current-password"
                  ></md-input>
                  <span class="md-error">{{ errors[0] }}</span>
                </md-field>
              </validation-provider>
            </div>
            <div class="md-layout-item md-size-100">
              <md-switch
                name="remember"
                value="1"
                class="md-primary"
                v-model="fields.remember"
                :disabled="disabled"
                >Remember me</md-switch
              >
            </div>
          </div>
        </md-card-content>
        <md-card-actions>
          <div class="terms">
            This site is protected by reCAPTCHA and the Google
            <a href="https://policies.google.com/privacy" target="_blank"
              >Privacy Policy</a
            >
            and
            <a href="https://policies.google.com/terms" target="_blank"
              >Terms of Service</a
            >
            apply.
          </div>
          <md-button
            type="submit"
            class="md-primary md-raised"
            :disabled="disabled"
            >Sign in</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </validation-observer>
</template>

<script>
import Submitter from "./submitter";

export default {
  mixins: [Submitter],
  props: {
    name: String,
    method: {
      type: String,
      default: "post",
    },
    action: {
      type: String,
      required: true,
    },
    enctype: {
      type: String,
      default: "application/x-www-form-urlencoded",
    },
  },
  data() {
    return {
      fields: {
        password: null,
        email: null,
        remember: false,
      },
      disabled: false,
    };
  },
  methods: {
    onSubmit: async function () {
      window.OWATracker.trackAction(
        "Submit",
        "Login",
        "Form submission started",
        10
      );

      var success = await this.$refs.validator.validate();

      if (success) {
        window.OWATracker.trackAction(
          "Submit",
          "Login",
          "Form validated successfully",
          20
        );

        this.disabled = true;
        let data = this.fields;

        if (!data.remember) {
          delete data.remember;
        }

        try {
          const response = await this.submit(this.action, data, "Login");

          if (response.success) {
            this.$store.dispatch("user/fetch");
            window.location.href = response.redirect;
          } else {
            if (response.message) {
              this.$store.commit("local/snackbar", response.message);
            }

            if (response.errors) {
              this.$refs.validator.setErrors(response.errors);
            }
          }
        } catch (e) {
          window.OWATracker.trackAction("Submit", "Exception", e);
          this.$store.commit("local/snackbar", e);
        } finally {
          this.disabled = false;
        }
      }
    },
  },
};
</script>
