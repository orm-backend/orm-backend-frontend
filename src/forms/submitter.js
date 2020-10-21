import { http } from "@/plugins/axios";

const Submitter = {
  methods: {
    submit: async function (action, data, formName) {
      await grecaptcha.ready(() => {});
      var token = await grecaptcha.execute(
        "6Ld-EM0ZAAAAAJhHpv0B6NwZ4mjQ1pndRlQzyAAQ",
        {
          action: action,
        }
      );

      // window.OWATracker.trackAction(
      //   "Submit",
      //   formName,
      //   "Captcha token received",
      //   30
      // );
      gtag("event", formName, {
        event_category: "Submit",
        event_label: "Captcha token received",
        value: 1,
      });

      let response = await http.get("/token");

      if (!response.status === 200 || !response.data.csrf_token) {
        throw new Error("Could not obtain CSRF token.");
      }

      data["recaptcha-token"] = token;
      data._token = response.data.csrf_token;
      response = await http.post(action, data);

      if (response.status === 200 && response.data.success) {
        // window.OWATracker.trackAction(
        //   "Submit",
        //   formName,
        //   "Form submitted successfully.",
        //   100
        // );
        gtag("event", formName, {
          event_category: "Submit",
          event_label: "Form submitted successfully",
          value: 1,
        });

        return response.data;
      } else if (response.data.errors || response.data.message) {
        //window.OWATracker.trackAction("Submit", formName, "Validation errors.");
        gtag("event", formName, {
          event_category: "Submit",
          event_label: "Validation errors",
        });

        return response.data;
      } else {
        throw new Error(
          "Something went wrong on api server. Received an empty response."
        );
      }
    },
  },
};

export default Submitter;
