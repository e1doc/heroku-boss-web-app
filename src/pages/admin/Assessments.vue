<template>
  <div class="admin-container">
    <div class="admin-page-title flex-center">
      <font-awesome-icon icon="users" class="admin-icon" />
      Assessments
    </div>
    <div class="admin-body">
      <div class="admin-search">
        <assessment-table-menu type="adminApplications" />
      </div>
      <div class="admin-content"><assessment-table /></div>
    </div>
  </div>
</template>

<script>
import AssessmentTableMenu from "@/components/tables/AssessmentTableMenu";
import AssessmentTable from "@/components/admin/AssessmentTable";
export default {
  name: "Assessments",
  components: {
    AssessmentTable,
    AssessmentTableMenu,
  },
  created() {
    this.$store.commit("setCurrentType", "business");
    this.$store.commit("setCurrentTable", "for_assessment");
    this.$store.commit("setIsAssessmentActive", true);
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