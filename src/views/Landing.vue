<template>
  <main>
    <div
      id="page-header"
      class="page-header"
      v-bind:timeout="5"
      v-background-image="backgroundImage"
      style="opacity: 0"
    >
      <div class="brand-description">
        <h1>ORM Backend</h1>
        <h4>
          It is not a framework or CMS. It is a ready-made backend solution
          based on Doctrine ORM and integrated with the popular Laravel
          Framework. Admin dashboard, CRUD services, ACL and much more right out
          of the box.
        </h4>
        <md-button class="md-primary md-raised" to="#features">
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
    <div id="triggerElement" class="outer-container content content-raised">
      <div class="inner-container">
        <FeaturesTopSection></FeaturesTopSection>
        <ConceptSection></ConceptSection>
        <FeaturesBottomSection></FeaturesBottomSection>
        <ArchitectureSection></ArchitectureSection>
        <InstallationTopSection></InstallationTopSection>
        <InstallationBottomSection></InstallationBottomSection>
        <FeedbackSection></FeedbackSection>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  components: {
    FeaturesTopSection: () =>
      import(
        /* webpackChunkName: "landing-page" */ "./sections/FeaturesTopSection"
      ),
    FeaturesBottomSection: () =>
      import(
        /* webpackChunkName: "landing-page" */ "./sections/FeaturesBottomSection"
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
    ConceptSection: () =>
      import(
        /* webpackChunkName: "landing-page" */ "./sections/ConceptSection"
      ),
  },

  data() {
    return {
      backgroundImage: require("@/assets/img/Technology-06.jpg"),
    };
  },

  metaInfo: {
    bodyAttrs: {
      class: "landing-page",
    },
  },
};
</script>
