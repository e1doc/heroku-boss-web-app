<template>
  <div class="admin-header">
    <div class="admin-container">
      <div class="admin-text">ADMINISTRATOR</div>
      <div class="admin-icon" @click="logout">
        <font-awesome-icon icon="power-off" class="icon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNav",
  methods: {
    logout() {
      this.$swal({
        text: "Are you sure you want to logout?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.value) {
          this.$store.commit("setAdminIsAuthenticated", false);
          this.$store.commit("resetUIState");
          this.$store.commit("resetAuthState");
          this.$store.commit("resetBusinessState");
          this.$store.commit("resetPropertyState");
          this.$router.push({ name: "AdminLogin" });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
div.admin-header {
  background-color: #fcfcfc;
  float: right;
  width: calc(100% - 290px);
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;
  .admin-container {
    background-color: #fff;
    box-shadow: 0px 10px 20px #0000000d;
    border-radius: 8px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 12px 30px;
    margin: 15px;
    .admin-text {
      font-size: 15px;
      font-weight: bold;
      line-height: 29px;
      width: 50%;
      float: left;
    }
    .admin-icon {
      width: 50%;
      float: right;
      text-align: right;
      .icon {
        font-size: 19px;
        cursor: pointer;
        transition: 0.4s;
      }
      .icon:hover {
        color: #e23a36;
      }
    }
  }
}
</style>
