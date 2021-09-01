<template>
  <div class="meta-dialog-container">
    <div class="meta-body">
      <div class="meta-close" @click="closeDialog()">
        <font-awesome-icon
          icon="times"
          class="close-icon"
          @click="slidemenu = false"
        />
      </div>
      <p>
        When you use our website and electronically communicate with us,
        depending on your settings, we may use cookies, web beacons, small data
        text files, or similar technologies to identify your device and record
        your preferences, with your consent. For information on how we protect
        your privacy, please read our
        <span
          ><router-link to="/privacy-policy">Privacy Policy</router-link>.</span
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PivacyDialog",
  methods: {
    closeDialog() {
      this.$store.commit("setShowPrivacyDialog", false);
      localStorage.setItem("dismissPrivacyDialog", true);
    },
  },
};
</script>

<style lang="scss">
.meta-dialog-container {
  position: fixed;
  display: flex;
  flex-direction: column;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin: 0 auto;
  width: 70%;
  box-shadow: 0 0 1rem -0.3rem;
  .meta-body {
    padding: 15px;
    position: relative;
    .meta-close {
      text-align: right;
      cursor: pointer;
      .close-icon {
        font-size: 25px;
      }
    }
    p {
      line-height: 1.5;
      margin-top: 10px;
    }
  }
}

@media (max-width: 580px) {
  .meta-dialog-container {
    width: 90% !important;
    top: 40%;
    bottom: unset;
    border-radius: 15px;
  }
}
</style>