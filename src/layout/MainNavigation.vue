<script>
const ScrollMagic = process.client ? require("ScrollMagic") : null;
import BaseNavigation from "./BaseNavigation";

export default {
  name: "MainNavigation",
  mixins: [BaseNavigation],
  methods: {
    init: function () {
      if ($("#triggerElement").length) {
        const controller = new ScrollMagic.Controller();
        new ScrollMagic.Scene({
          offset: 0,
          duration: 80,
        })
          .setClassToggle("#mainToolbar", "md-transparent")
          .addTo(controller);

        new ScrollMagic.Scene({
          // triggerElement: "#features",
          // triggerHook: 0.9,
          offset: 80,
          //duration: 80,
        })
          .setClassToggle("#page-header", "hide-page-header")
          .addTo(controller);
      }
    },
  },
};
</script>
