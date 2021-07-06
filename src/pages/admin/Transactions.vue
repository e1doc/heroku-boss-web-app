<template>
  <div class="admin-container">
    <div class="admin-page-title flex-center">
      <font-awesome-icon icon="coins" class="admin-icon" />
      Transactions
    </div>
    <div class="admin-body flex-wrap">
      <transaction-table-menu type="transaction" />
      <div class="admin-content">
        <transaction-table v-if="currentTable === 'other_banks'" />
        <land-bank-transaction-table
          v-if="currentTable === 'online_payment'"
          type="admin"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TransactionTableMenu from "@/components/tables/TransactionTableMenu";
import TransactionTable from "@/components/tables/TransactionTable";
import LandBankTransactionTable from "@/components/tables/LandBankTransactionTable";
import { mapGetters } from "vuex";
export default {
  name: "Transactions",
  components: {
    TransactionTableMenu,
    TransactionTable,
    LandBankTransactionTable,
  },
  computed: {
    ...mapGetters(["currentTable", "currentType"]),
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
