<template>
  <validation-observer ref="validator">
    <form
      v-on:submit.prevent="onSubmit"
      :name="name"
      :method="method"
      :action="action"
      :enctype="enctype"
      novalidate
    >
      <md-card>
        <md-card-header class="md-primary-dark">
          <md-card-header-text>
            <div class="md-title">Feedback</div>
          </md-card-header-text>
          <md-card-media>
            <md-icon class="md-size-2x">message</md-icon>
          </md-card-media>
        </md-card-header>
        <md-card-content>
          <div class="md-layout feadback-form">
            <div class="md-layout-item md-size-50 md-small-size-100">
              <validation-provider
                vid="username"
                name="Your Name"
                rules="alpha"
                v-slot="{ errors }"
                slim
                bails
              >
                <md-field :class="{ 'md-invalid': errors.length }" md-clearable>
                  <md-icon>face</md-icon>
                  <label>Your Name</label>
                  <md-input
                    name="username"
                    v-model="fields.username"
                    maxlength="250"
                    :disabled="disabled"
                  ></md-input>
                  <span class="md-error">{{ errors[0] }}</span>
                </md-field>
              </validation-provider>
            </div>
            <div class="md-layout-item md-size-50 md-small-size-100">
              <validation-provider
                vid="email"
                name="Your Email"
                rules="required|email"
                v-slot="{ errors }"
                slim
                bails
              >
                <md-field :class="{ 'md-invalid': errors.length }" md-clearable>
                  <md-icon>contact_mail</md-icon>
                  <label>Your Email</label>
                  <md-input
                    name="email"
                    type="email"
                    v-model="fields.email"
                    maxlength="250"
                    required
                    :disabled="disabled"
                  ></md-input>
                  <span class="md-error">{{ errors[0] }}</span>
                </md-field>
              </validation-provider>
            </div>
            <div class="md-layout-item md-size-100">
              <validation-provider
                vid="message"
                name="Message"
                rules="required"
                v-slot="{ errors }"
                slim
                bails
              >
                <md-field :class="{ 'md-invalid': errors.length }" md-clearable>
                  <label>Message</label>
                  <md-textarea
                    name="message"
                    v-model="fields.message"
                    maxlength="500"
                    required
                    :disabled="disabled"
                  ></md-textarea>
                  <md-icon>description</md-icon>
                  <span class="md-error">{{ errors[0] }}</span>
                </md-field>
              </validation-provider>
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
            >Send Message</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </validation-observer>
</template>

<script>
export default {
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
        username: null,
        email: null,
        message: null,
      },
      disabled: false,
    };
  },
  methods: {
    clear: function () {
      this.fields.username = null;
      this.fields.email = null;
      this.fields.message = null;
      this.$refs.validator.reset();
    },
    onSubmit: async function () {
      window.OWATracker.trackAction(
        "Submit",
        "Feedback",
        "Form submission started",
        10
      );
      var success = await this.$refs.validator.validate();

      if (success) {
        window.OWATracker.trackAction(
          "Submit",
          "Feedback",
          "Form validated successfully",
          20
        );
        var self = this;
        this.disabled = true;

        grecaptcha.ready(async () => {
          try {
            var token = await grecaptcha.execute(
              "6Ld-EM0ZAAAAAJhHpv0B6NwZ4mjQ1pndRlQzyAAQ",
              {
                action: self.action,
              }
            );

            window.OWATracker.trackAction(
              "Submit",
              "Feedback",
              "Captcha token received",
              30
            );
            let data = self.fields;
            data["recaptcha-token"] = token;

            if (!data.remember) {
              delete data.remember;
            }

            var response = await self.$http.post(self.action, data);

            if (response.success) {
              window.OWATracker.trackAction(
                "Submit",
                "Feedback",
                "Form submitted successfully",
                100
              );
              self.$store.state.message = response.message
                ? response.message
                : "Message sent successfully.";
              self.clear();
            } else if (response.errors || response.message) {
              window.OWATracker.trackAction(
                "Submit",
                "Feedback",
                "Form submit error"
              );
              if (response.message) {
                self.$store.state.message = response.message;
              }

              if (response.errors) {
                self.$refs.validator.setErrors(response.errors);
              }
            } else {
              throw new Error(
                "Something went wrong on api server. Received an empty response."
              );
            }
          } catch (e) {
            window.OWATracker.trackAction(
              "Submit",
              "Exception",
              "Feedback form submit exception"
            );
            self.$store.state.message = e;
          } finally {
            self.disabled = false;
          }
        });
      }
    },
  },
};
</script>
