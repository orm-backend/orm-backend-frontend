<script>
const ScrollMagic = process.client ? require("ScrollMagic") : null;

if (process.client && process.env.NODE_ENV === "development") {
  require("debug.addIndicators");
}

export default {
  data() {
    return {
      controller: null,
      scenes: [],
      pageTitle: "",
      pageDescription: "",
      menu: [],
    };
  },
  methods: {
    afterEnter: function () {
      this.scrollMagic();
    },
    scrollMagic: function () {
      if (!this.controller) {
        this.controller = new ScrollMagic.Controller({
          globalSceneOptions: { triggerHook: 0 },
        });

        this.menu.forEach((item) => {
          let el = document.querySelector("#" + item.link);
          let scene = new ScrollMagic.Scene({
            triggerElement: "#" + item.link,
            duration: $(el).outerHeight(true),
            triggerHook: 0,
            offset: 0,
          }).setClassToggle(
            "." + item.link + "-link > a",
            "router-link-active"
          );
          this.controller.addScene(scene);
          this.scenes.push(scene);
        });
      } else {
        this.$nextTick(() => {
          this.scenes.forEach((scene) => {
            scene.duration($(scene.triggerElement()).outerHeight(true));
            scene.refresh();
          });
          this.controller.update(true);
        });
      }
    },
  },
  created() {
    this.$store.commit("local/sidebar", {
      title: this.pageTitle,
      menu: this.menu,
    });
  },
  beforeDestroy() {
    if (this.controller) {
      this.controller.destroy();
    }
  },
  metaInfo() {
    return {
      title: this.pageTitle,
      meta: [
        {
          vmid: "og:title",
          property: "og:title",
          content: this.pageTitle,
        },
        {
          vmid: "description",
          name: "description",
          content: this.pageDescription,
        },
        {
          vmid: "og:description",
          property: "og:description",
          content: this.pageDescription,
        },
      ],
    };
  },
};
</script>
