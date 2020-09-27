<script>
import ScrollMagic from "scrollmagic-with-ssr";
import BaseNavigation from "./BaseNavigation";

export default {
  name: "MainNavigation",
  mixins: [BaseNavigation],
  mounted() {
    let triggerElement = document.getElementById("triggerElement");

    if (triggerElement) {
      var controller = new ScrollMagic.Controller();
      new ScrollMagic.Scene({
        offset: 0,
        // triggerElement: triggerElement,
        // triggerHook: 0.3,
        duration: 400,
      })
        .setClassToggle("#mainToolbar", "md-transparent")
        .addTo(controller);
    }
  },
};
</script>
