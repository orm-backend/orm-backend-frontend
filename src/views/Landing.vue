<template>
  <main>
    <parallax class="page-header" v-bind:timeout="0" :style="headerStyle">
      <div class="md-layout">
        <div
          class="md-layout-item md-size-50 md-xlarge-size-80 md-xsmall-size-100"
        >
          <h1>
            <brand-logo-text></brand-logo-text>
          </h1>
          <h4>
            It is not a framework or CMS. It is a ready-made back-end solution
            based on Doctrine ORM and integrated with the popular Laravel
            Framework.
          </h4>
          <br />
          <md-button
            class="md-primary md-raised"
            @click="scrollToSection('#features')"
          >
            <span>Read more</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="32"
              viewBox="0 0 24 24"
              width="32"
            >
              <g><rect fill="none" height="24" width="24" /></g>
              <g>
                <g fill="#ffffff">
                  <rect height="2" width="9" x="13" y="7" />
                  <rect height="2" width="9" x="13" y="15" />
                  <rect height="2" width="6" x="16" y="11" />
                  <polygon points="13,12 8,7 8,11 2,11 2,13 8,13 8,17" />
                </g>
              </g>
            </svg>
          </md-button>
        </div>
      </div>
    </parallax>
    <div class="outer-container content content-raised">
      <div class="inner-container">
        <div class="section">
          <FeaturesSection></FeaturesSection>
        </div>
        <div class="section">
          <InstallationTopSection></InstallationTopSection>
        </div>
        <div class="section">
          <InstallationBottomSection></InstallationBottomSection>
        </div>
        <div class="section">
          <ArchitectureSection></ArchitectureSection>
        </div>
        <div class="section">
          <FeedbackSection></FeedbackSection>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
/* import FeaturesSection from "./sections/FeaturesSection";
import ArchitectureSection from "./sections/ArchitectureSection";
import InstallationTopSection from "./sections/InstallationTopSection";
import InstallationBottomSection from "./sections/InstallationBottomSection";
import FeedbackSection from "./sections/FeedbackSection";
import Parallax from "@/components/Parallax"; */

export default {
  /*   components: {
    FeaturesSection,
    InstallationTopSection,
    InstallationBottomSection,
    ArchitectureSection,
    FeedbackSection,
    Parallax,
  }, */
  components: {
    FeaturesSection: () =>
      import(
        /* webpackChunkName: "landing-page" */ "./sections/FeaturesSection"
      ),
    InstallationTopSection: () =>
      import(
        /* webpackChunkName: "landing-page" */ "./sections/InstallationTopSection"
      ),
    InstallationBottomSection: () =>
      import(
        /* webpackChunkName: "landing-page" */ "./sections/InstallationBottomSection"
      ),
    ArchitectureSection: () =>
      import(
        /* webpackChunkName: "landing-page" */ "./sections/ArchitectureSection"
      ),
    FeedbackSection: () =>
      import(
        /* webpackChunkName: "landing-page" */ "./sections/FeedbackSection"
      ),
    Parallax: () =>
      import(/* webpackChunkName: "landing-page" */ "@/components/Parallax"),
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/Technology-06.jpg"),
    },
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
      };
    },
  },
  methods: {
    scrollToSection(id) {
      this.$scrollTo(id);
    },
  },
  /*   mounted() {
	window.OWATracker.trackPageView();
  }, */
  metaInfo: {
    bodyAttrs: {
      class: "landing-page",
    },
  },
};
</script>
