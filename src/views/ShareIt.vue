<template>
  <div :url="url" :title="title" :description="description">
    <div class="share-network-list">
      <ShareNetwork
        v-for="network in networks"
        :network="network.network"
        :key="network.network"
        :url="url"
        :title="title"
        :description="description"
      >
        <i :class="network.icon"></i>
      </ShareNetwork>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueSocialSharing from "vue-social-sharing";

Vue.use(VueSocialSharing);

export default {
  props: {
    url: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  data() {
    return {
      networks: [
        {
          network: "email",
          name: "Email",
          icon: "far fah fa-lg fa-envelope",
          color: "#333333",
        },
        {
          network: "whatsapp",
          name: "Whatsapp",
          icon: "fab fah fa-lg fa-whatsapp",
          color: "#25d366",
        },
        {
          network: "facebook",
          name: "Facebook",
          icon: "fab fah fa-lg fa-facebook-f",
          color: "#1877f2",
        },
        {
          network: "linkedin",
          name: "LinkedIn",
          icon: "fab fah fa-lg fa-linkedin",
          color: "#007bb5",
        },
        // {
        //   network: "skype",
        //   name: "Skype",
        //   icon: "fab fah fa-lg fa-skype",
        //   color: "#00aff0",
        // },
        // {
        //   network: "sms",
        //   name: "SMS",
        //   icon: "far fah fa-lg fa-comment-dots",
        //   color: "#333333",
        // },
        {
          network: "telegram",
          name: "Telegram",
          icon: "fab fah fa-lg fa-telegram-plane",
          color: "#0088cc",
        },
        {
          network: "twitter",
          name: "Twitter",
          icon: "fab fah fa-lg fa-twitter",
          color: "#1da1f2",
        },
        // {
        //   network: "viber",
        //   name: "Viber",
        //   icon: "fab fah fa-lg fa-viber",
        //   color: "#59267c",
        // },
      ],
    };
  },
};
</script>

<style lang="scss">
.share-network-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  a {
    flex: none;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      text-decoration: none;
      opacity: 0.7;
    }
  }

  .fah {
    padding: 12px;
    flex: 0 1 auto;
  }

  span {
    padding: 0 10px;
    flex: 1 1 0%;
    font-weight: 500;
  }
}
</style>
