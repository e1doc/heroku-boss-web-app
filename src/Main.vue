<template>
  <div>
    <div id="main">
      <header-nav />
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HeaderNav from "@/components/HeaderNav";
import DownloadableInvoice from "@/components/payment/DownloadableInvoice";
export default {
  components: {
    HeaderNav,
    DownloadableInvoice,
  },
  computed: {
    ...mapGetters(["printInvoice"]),
  },
  mounted(){
    this.$store.dispatch('getUserDetails')
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap");
@import url("/css/main.scss");
* {
  margin: 0;
  padding: 0;
}
#main {
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
