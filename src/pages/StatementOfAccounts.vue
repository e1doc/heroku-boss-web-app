<template>
  <section>
    <div class="container">
      <div class="mt50 soa-header">
        <profile-table-menu type="soa" />
      </div>
      <div class="mt50 soa-table">
        <soa-table />
      </div>
    </div>
  </section>
</template>

<script>
import ProfileTableMenu from "@/components/tables/ProfileTableMenu";
import SoaTable from "@/components/tables/SoaTable";
export default {
  name: "StatementOfAccounts",
  components: {
    ProfileTableMenu,
    SoaTable,
  },
  mounted() {
    this.$store.commit("setCurrentTable", "soa");
    this.$store.commit("setSoaFilter", "business");
  },
};
</script>

<style lang="scss" scoped>
section {
  min-height: calc(100vh - 321px);
  padding-bottom: 30px;
}
@media only screen and (max-width: 768px) {
  .soa-header,
  .soa-table {
    margin-top: 30px;
  }
  .container {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
