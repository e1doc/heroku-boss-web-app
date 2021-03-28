<template>
  <div class="admin-container">
    <div class="admin-page-title flex-center">
      <font-awesome-icon icon="users" class="admin-icon" />
      Applications
    </div>
    <div class="admin-body">
      <div class="admin-search">
        <transaction-table-menu type="adminApplications" />
      </div>
      <div class="admin-content"><admin-application-table /></div>
    </div>
  </div>
</template>

<script>
import TransactionTableMenu from "@/components/tables/TransactionTableMenu";
import AdminApplicationTable from "@/components/admin/AdminApplicationTable";
import { mapGetters } from "vuex";
export default {
  name: "Applications",
  components: {
    AdminApplicationTable,
    TransactionTableMenu,
  },
  computed: {
    ...mapGetters(["currentType"]),
  },
  beforeRouteLeave(to, from, next) {
    if (this.currentType === "business") {
      if (to.name !== "ApproveBusinessApplication") {
        this.$store.commit("setCurrentPageNum", 1);
      }
    } else {
      if (to.name !== "ApproveBuildingApplication") {
        this.$store.commit("setCurrentPageNum", 1);
      }
    }
    next();
  },
  created() {
    this.$store.commit("setIsBuildingAssessment", false);
    this.$store.commit("setIsBusinessAssessment", false);
    this.$store.commit("setIsAssessmentActive", false);
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
    margin-bottom: 40px;
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