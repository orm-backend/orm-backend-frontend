<template>
  <div class="guide">
    <section id="developing">
      <md-empty-state
        md-icon="devices_other"
        md-label="Coming soon"
        md-description="Documentation is being developed now."
      >
      </md-empty-state>
      <!--p v-for="n in 5" :key="n">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil
        praesentium molestias a adipisci, dolore vitae odit, quidem consequatur
        optio voluptates asperiores pariatur eos numquam rerum delectus commodi
        perferendis voluptate?
      </p-->
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    afterEnter: function () {
      if (typeof this.scrollMagic == "function") {
        this.scrollMagic();
      }
    },
  },
  created() {
    this.$store.commit("local/sidebar", {
      menu: [
        {
          link: "developing",
          title: "Coming soon...",
        },
      ],
    });
  },
};
</script>
