<template>
  <div :style="styles">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "parallax",
  props: {
    enabled: {
      type: Boolean,
      default: true,
    },
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
      let ty = Math.round(scrollY / 2.5);

      this.styles = {
        transform: `translate(0, ${ty}px) translate3d(0, 0, 0)`,
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
    if (this.enabled) {
      document.addEventListener("scroll", this.scrollListener, true);
    }
  },
  beforeDestroy() {
    if (this.enabled) {
      document.removeEventListener("scroll", this.scrollListener, true);
    }
  },
};
</script>
