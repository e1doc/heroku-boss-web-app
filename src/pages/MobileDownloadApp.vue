<template>
  <div class="meta-parent-box">
    <div class="meta-message-holder">
      <h3 class="meta-message">{{ message }}</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MobileDownloadApp",
  data() {
    return {
      message: "Please wait, your file is now downloading...",
    };
  },
  mounted() {
    this.getMobileAppLink();
  },
  methods: {
    async getMobileAppLink() {
      const baseUrl = process.env.VUE_APP_API_URL;
      console.log(`${baseUrl}/api/active-mobile-build`);
      const link = document.createElement("a");
      const response = await axios.get(`${baseUrl}/api/active-mobile-build`);

      const filename = response.data.file.replace("/bacoor/", "/");
      link.href = filename;
      console.log(filename);
      link.download = filename;
      link.click();
    },
  },
};
</script>

<style lang="scss" scoped>
div.meta-parent-box {
  width: 100%;
  margin-top: 50px;
  padding-bottom: 50px;
  .meta-form-holder {
    position: absolute;
    opacity: 0;
    top: -500px;
    z-index: -1;
  }
  .meta-message-holder {
    display: flex;
    padding: 13px;
    flex: 1;
    .meta-message {
      text-align: center;
    }
  }
}
</style>