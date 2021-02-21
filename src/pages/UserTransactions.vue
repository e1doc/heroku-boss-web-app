<template>
  <section>
    <div class="container">
      <div class="page-title">My Payment Transactions</div>
      <div class="mt30 mb30 flex-wrap"><user-transaction-table-menu /></div>
      <div class="note">
        <strong>*Note:</strong>
        <br />
        1. Hard copy of official receipt will available for pick up at CTO
        records & Accountable section.
        <br />
        <br />
        2. For business transactions please get a copy of your business permit
        and business plate at BPL Office.
      </div>
      <user-transaction-table v-if="currentTable === 'other_banks'" />
      <landbank-transaction-table v-if="currentTable === 'landbank'" />
    </div>
  </section>
</template>

<script>
import UserTransactionTable from "@/components/tables/UserTransactionTable";
import UserTransactionTableMenu from "@/components/tables/UserTransactionTableMenu";
import LandBankTransactionTable from "@/components/tables/LandBankTransactionTable";
import { mapGetters } from "vuex";
export default {
  name: "UserTransactions",
  components: {
    UserTransactionTable,
    UserTransactionTableMenu,
    LandBankTransactionTable,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["currentType", "currentTable"]),
  },
  mounted() {
    if (
      this.currentTable !== "landbank" &&
      this.currentTable !== "other_banks"
    ) {
      this.$store.commit("setCurrentTable", "landbank");
    }
  },
  watch: {
    currentTable: {
      handler(newValue) {},
    },
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.note {
  font-size: 13px;
  text-align: left;
  line-height: 1.6;
  width: 100%;
  max-width: 800px;
  opacity: 0.7;
  margin-bottom: 30px;
}
.container {
  padding-top: 100px;
  .page-title {
    font-size: 27px;
    font-weight: bold;
    font-family: Raleway;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 50px 0;

    .page-title {
      font-size: 20px;
    }
  }
}
</style>
