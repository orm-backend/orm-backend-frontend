<template>
  <div :style="styles">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "parallax",
  props: {
    breakpoint: {
      default: "1024",
      type: String,
    },
    timeout: {
      default: 10,
      type: Number,
    },
  },
  data() {
    return {
      styles: {},
      timer: null,
    };
  },
  methods: {
    handleScroll(scrollY) {
      if (!this.timeout) {
        this.updateStyle(scrollY);
      } else if (!this.timer) {
        this.updateStyle(scrollY);

        this.timer = setTimeout(() => {
          clearTimeout(this.timer);
          this.timer = null;
        }, this.timeout);
      }
    },
    updateStyle(scrollY) {
      let ty = scrollY / 2.5;

      this.styles = {
        transform: `translate3d(0, ${ty}px, 0)`,
      };
    },
  },
  mounted() {
    let self = this;

    window.addEventListener("scroll", function () {
      if (window.innerWidth > parseInt(self.breakpoint) - 1) {
        let scrollY =
          this.scrollY < window.innerHeight ? this.scrollY : window.innerHeight;
        self.handleScroll(scrollY);
      }
    });
  },
};
</script>
