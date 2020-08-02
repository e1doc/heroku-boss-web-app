<template>
  <section>
    <div class="container">
      <div class="mt50">
        <profile-table-menu type="soa" />
      </div>
      <div class="mt50">
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

<style lang="scss" scoped></style>
