<template>
  <div class="admin-container">
    <div class="admin-page-title flex-center">
      <font-awesome-icon icon="comment-alt" class="admin-icon" />
      Inquiries
    </div>
    <div class="admin-body flex-wrap">
      <user-inquiry-table-menu type="profile" />
      <div class="admin-content">
        <user-inquiry-table />
      </div>
    </div>
  </div>
</template>

<script>
import UserInquiryTableMenu from "@/components/tables/UserInquiryTableMenu";
import UserInquiryTable from "@/components/tables/UserInquiryTable";
import { mapGetters } from "vuex";
export default {
  name: "Inquiries",
  components: {
    UserInquiryTableMenu,
    UserInquiryTable,
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("setCurrentType", 'business');
    next();
  },
  computed: {
    ...mapGetters(["currentTable"]),
  },
};
</script>

<style lang="scss" scoped>
div.admin-container {
  width: 100%;
  div.admin-page-title {
    color: #1492e6;
    font-size: 30px;
    font-weight: bold;
    line-height: 29px;
    text-transform: capitalize;
    margin-bottom: 50px;
    margin-top: 50px;
    justify-content: center;
    .admin-icon {
      color: #1492e6;
      font-size: 35px;
      margin-right: 15px;
    }
  }
  div.admin-body {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50px;
    div.admin-search {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    div.admin-content {
      width: 100%;
      margin-top: 35px;
    }
  }
}

@media only screen and (max-width: 1380px) {
  div.admin-container div.admin-page-title {
    font-size: 28px;
    margin-bottom: 40px;
  }
}
</style>
