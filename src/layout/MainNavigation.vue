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
          duration: 400,
        })
          .setClassToggle("#mainToolbar", "md-transparent")
          .addTo(controller);
      }
    },
  },
};
</script>
