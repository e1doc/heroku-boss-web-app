<template>
  <section>
    <div class="container">
      <div class="page-title">My Payment Transactions</div>
      <div class="mt30 mb30"><user-transaction-table-menu /></div>
      <user-transaction-table />
    </div>
  </section>
</template>

<script>
import UserTransactionTable from "@/components/tables/UserTransactionTable";
import UserTransactionTableMenu from "@/components/tables/UserTransactionTableMenu";
import { mapGetters } from "vuex";
export default {
  name: "Appointment",
  components: {
    UserTransactionTable,
    UserTransactionTableMenu,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.container {
  padding-top: 100px;
  .page-title {
    font-size: 27px;
    font-weight: bold;
    font-family: Raleway;
    text-align: center;
  }
}
</style>
