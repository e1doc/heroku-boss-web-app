<template>
  <section>
    <div class="container">
      <div class="mt50 soa-header"> 
        <profile-table-menu type="soa" />
      </div>
      <div class="mt50 soa-table">
        <soa-table/>
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
    SoaTable
  },
};
</script>

<style lang="scss" scoped>
@media only screen and ( max-width : 768px ){
    .soa-header,
    .soa-table{
        margin-top: 30px;
    }
}
</style>
