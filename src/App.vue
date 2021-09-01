<template>
  <div id="app">
    <div class="vld-parent">
      <loading :active.sync="isLoading" :can-cancel="true"></loading>
      <router-view />
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import HeaderNav from "@/components/HeaderNav";

import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    HeaderNav,
    Loading,
  },
  computed: {
    ...mapGetters([
      "isLoading",
      "showPrompt",
      "promptTitle",
      "promptMessage",
      "promptType",
      "promptHtml",
    ]),
  },
  methods: {
    ...mapActions(["closePrompt"]),
    showPrivacyDialog() {
      const isDismissed = localStorage.getItem("dismissPrivacyDialog");
      if (isDismissed === "true") {
        this.$store.commit("setShowPrivacyDialog", false);
      } else {
        this.$store.commit("setShowPrivacyDialog", true);
      }
    },
  },
  watch: {
    showPrompt: {
      deep: true,
      handler(isShow) {
        if (isShow) {
          this.$swal({
            title: this.promptTitle,
            text: this.promptMessage,
            html: this.promptHtml,
            icon: this.promptType,
            onClose: this.closePrompt(),
          });
        }
      },
    },
  },
  mounted() {
    this.showPrivacyDialog();
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap");
@import url("/css/main.scss");
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Raleway", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2b2b2b;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
