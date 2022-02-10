<template>
  <section>
    <div class="container">
      <div class="page-title">My Payment Transactions</div>
      <div class="mt30 mb30 flex-wrap"><user-transaction-table-menu /></div>
      <div class="note">
        <strong>*Note:</strong>
        <br />
        You have two (2) options in getting the hard copy of your documents
        (O.R, Business Permits or Building Permits):
        <br />
        <br />
        <div class="text-bold">Pick Up</div>
        <div class="meta-steps">
          <div>
            1. For Business Permits, please get a copy of your Business Permit,
            O.R and Business Plate at BPL Office.
          </div>
          <div>
            2. For other payment transactions, hard copy of Official Receipt
            will available for pick up at CTO records & Accountable section
            (Treasury Office).
          </div>
        </div>
        <div class="text-bold">Delivery via courier</div>
        <div class="meta-steps">
          <div>
            You can book your pickup via Grab, Lalamove and similar services.
            Note that this option is available only from Monday to Friday. Your
            rider should be in the BPL Office within the hours of 8:00AM to
            5:00PM.
          </div>
          <div>
            After booking your selected courier, kindly send notification SMS to
            BPLO contact persons to make sure your documents are prepared in
            advance. Include your tracking reference number in your SMS message.
          </div>
          <div>
            To schedule delivery of your Permit and O.R. via courier, kindly
            indicate the following as your Delivery details::
          </div>
        </div>
        <div class="flex-column">
          <div class="meta-delivery-details-table">
            <div class="meta-items-holder">
              <div class="meta-items">
                <div class="text-bold flex-grow">Pin Location:</div>
                <div class="flex-grow">Bacoor Government Center</div>
              </div>
              <div class="meta-items">
                <div class="text-bold flex-grow">Floor #:</div>
                <div class="flex-grow">1st Floor BPL Office</div>
              </div>
              <div class="meta-items">
                <div class="text-bold flex-grow">Contact Person:</div>
                <div class="flex-grow">Dina Dumali, Laarnie Jolipas</div>
              </div>
              <div class="meta-items">
                <div class="text-bold flex-grow">Contact Number:</div>
                <div class="flex-grow">09277046336, 09473213781</div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-column">
          <div class="text-bold">Note to driver:</div>
          <div class="meta-notes-holder">
            <div class="meta-items-holder">
              <!-- <div class="meta-items">
                <div class="text-bold">
                  <ul>
                    <li>For Real Property</li>
                  </ul>
                </div>
                <div>
                  Indicate your <b>SOA Number / Tax Declaration Number</b>
                </div>
              </div> -->
              <div class="meta-items">
                <div class="text-bold">
                  <ul>
                    <li>For Business Permit</li>
                  </ul>
                </div>
                <div>
                  Indicate your <b>SOA Number / Business Account Number</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <user-transaction-table v-if="currentTable === 'other_banks'" />
      <land-bank-transaction-table v-if="currentTable === 'landbank'" />
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
.meta-delivery-details-table {
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  width: 50%;
}
.meta-items-holder {
  flex: 1 1;
  width: 50%;
  .meta-items {
    display: flex;
    flex-direction: row;
    margin-bottom: 5px;
    div {
      text-align: left;
      flex: 1 1;
    }
  }
}
.meta-notes-holder {
  margin-left: 30px;
}
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

.meta-steps {
  margin-bottom: 10px;
  margin-left: 20px;
  div {
    margin: 5px 0px;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 50px 0;

    .page-title {
      font-size: 20px;
    }
  }
  .meta-items {
    flex-direction: column !important;
  }
}
</style>
