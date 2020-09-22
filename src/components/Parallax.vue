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
    scrollListener(e) {
      if (window.innerWidth > parseInt(this.breakpoint) - 1) {
        let scrollY =
          window.scrollY < window.innerHeight
            ? window.scrollY
            : window.innerHeight;
        this.handleScroll(scrollY);
      }
    },
  },
  mounted() {
    document.addEventListener("scroll", this.scrollListener, true);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollListener, true);
  },
};
</script>
