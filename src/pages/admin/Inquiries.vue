<template>
  <div class="admin-container">
    <div class="admin-page-title flex-center">
      <font-awesome-icon icon="comment-alt" class="admin-icon" />
      Inquiries
    </div>
    <div class="admin-body flex-wrap">
      <inquiry-table-menu type="profile" />
      <div class="admin-content">
        <inquiry-table />
      </div>
    </div>
  </div>
</template>

<script>
import InquiryTableMenu from "@/components/tables/InquiryTableMenu";
import InquiryTable from "@/components/tables/InquiryTable";
import { mapGetters } from "vuex";
export default {
  name: "Inquiries",
  components: {
    InquiryTableMenu,
    InquiryTable,
  },
  beforeRouteLeave(to, from, next) {
    if (to.name !== "ReplyInquiry") {
      this.$store.commit("setCurrentType", "business");
      this.$store.commit("setCurrentPageNum", 1);
      this.$store.commit("setCurrentTable", "inquiries");
    }
    next();
  },
  computed: {
    ...mapGetters(["currentTable"]),
  },
  mounted() {
    if (
      this.currentTable !== "inquiries" &&
      this.currentTable !== "remarks" &&
      this.currentTable !== "delinquent"
    ) {
      this.$store.commit("setCurrentTable", "inquiries");
    }
    window.scrollTo(0, 0);
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
    margin-bottom: 90px;
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
