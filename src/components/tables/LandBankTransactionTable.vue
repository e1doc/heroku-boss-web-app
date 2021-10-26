<template>
  <section>
    <modal
      name="landBankViewDetailsModal"
      height="auto"
      :adaptive="true"
      :classes="['vue-modal-2']"
      ><landbank-details-modal
    /></modal>
    <div>
      <div class="thead hide-in-mobile">
        <!-- <div class="th w10">ACC #</div> -->
        <div class="th">EPP REF NO.</div>
        <div class="th">SOA</div>
        <div class="th" v-if="currentType == 'business'">ACCOUNT #</div>
        <div class="th" v-if="currentType !== 'business'">TD #</div>
        <div class="th">PAYOR</div>
        <div class="th">AMOUNT</div>
        <div class="th">STATUS</div>
        <div class="th">ACTION</div>
      </div>
      <div class="tbody" v-if="landBankTransactions.length > 0">
        <div
          class="tr"
          v-for="(item, index) in landBankTransactions"
          :key="index"
        >
          <div class="td">
            <span class="td-label show-in-mobile">REFERENCE NO. :</span>
            {{ item.epp_ref_no }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">SOA :</span>
            {{ item.merchant_ref_no.reference_number }}
          </div>
          <div
            class="td"
            v-if="
              currentType == 'business' &&
              item.merchant_ref_no.business_application
            "
          >
            <span class="td-label show-in-mobile">ACCOUNT #:</span>
            {{ item.merchant_ref_no.business_application.account_number }}
          </div>
          <div
            class="td"
            v-if="
              currentType !== 'business' &&
              item.merchant_ref_no.building_application
            "
          >
            <span class="td-label show-in-mobile">TD #:</span>
            {{
              item.merchant_ref_no.building_application.buildingdetails
                .tax_dec_no
            }}
          </div>

          <div class="td">
            <span class="td-label show-in-mobile">PAYOR'S NAME :</span>
            {{ item.merchant_ref_no.user.first_name }}
            {{ item.merchant_ref_no.user.middle_name }}
            {{ item.merchant_ref_no.user.last_name }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">AMOUNT :</span>
            PHP {{ formatCurrency(parseFloat(item.amount).toFixed(2)) }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">STATUS :</span>
            {{ getStatus(item.status) }}
          </div>
          <div class="td" @click="showModal(item)">
            <div class="meta-view">VIEW</div>
          </div>
        </div>
      </div>
      <div class="tbody" v-if="landBankTransactions.length < 1">
        <div class="tr">
          <div class="td meta-no-data">No data available</div>
        </div>
      </div>
    </div>
    <paginate
      :page-count="pageCount"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :click-handler="transactionClickCallBack"
      v-if="landBankTransactions.length > 0"
    >
    </paginate>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import PaymentViewDetailsModal from "@/components/payment/PaymentViewDetailsModal";
import LandbankDetailsModal from "@/components/payment/LandbankDetailsModal.vue";
export default {
  name: "LandBankTransactionTable",
  components: {
    PaymentViewDetailsModal,
    LandbankDetailsModal,
  },
  props: {
    type: {
      type: String,
      default: "user",
    },
  },
  watch: {
    currentType: {
      async handler(newValue) {
        await this.$store.commit("setLoading", true);
        if (this.type == "user") {
          await this.$store.dispatch("getAllUserLandBankTransactions", {
            page: 1,
          });
        }
        await this.$store.commit("setLoading", false);
      },
    },
  },
  computed: {
    ...mapGetters([
      "currentType",
      "bankTransactions",
      "landBankTransactions",
      "currentTable",
      "pageCount",
    ]),
  },
  data() {
    return {
      landbank_status: [
        { label: "00", value: "Successful" },
        { label: "01", value: "Invalid merchant code" },
        { label: "02", value: "Invalid merchant reference number" },
        { label: "03", value: "0 or negative amount" },
        { label: "04", value: "Null payors name" },
        { label: "05", value: "Null returnURLok" },
        { label: "06", value: "Null returnURLerror" },
        { label: "07", value: "Invalid hash" },
        { label: "08", value: "Service unavailable" },
        { label: "09", value: "Transaction in process" },
        { label: "10", value: "Cancelled transaction" },
        { label: "11", value: "EPP offline" },
        { label: "12", value: "Invalid transaction type" },
        { label: "13", value: "Invalid particulars" },
        { label: "14", value: "Duplicate transaction" },
      ],
    };
  },
  mounted() {
    this.$store.commit("setCurrentType", "business");
    if (this.type == "user") {
      this.$store.dispatch("getAllUserLandBankTransactions", { page: 1 });
    } else {
      this.$store.dispatch("getAllLandBankTransactions", { page: 1 });
    }
  },
  methods: {
    getStatus(status) {
      let item = this.landbank_status.find((item) => item.label == status);
      return item.value;
    },
    showModal(data) {
      this.$store.commit("setCurrentLandBankTransaction", data);
      this.$modal.show("landBankViewDetailsModal");
    },
    formatCurrency(str) {
      var parts = str.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (parts.length < 2) {
        parts.push("00");
      }
      return parts.join(".");
    },
    async transactionClickCallBack(pageNum) {
      if (this.type === "user") {
        this.$store.dispatch("getAllUserLandBankTransactions", {
          page: pageNum,
        });
      } else {
        this.$store.dispatch("getAllLandBankTransactions", { page: pageNum });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.meta-view {
  color: #1492e6;
  font-weight: bold;
  cursor: pointer;
}
.meta-no-data {
  width: 100% !important;
}
section {
  width: 100%;
}
.w10 {
  width: 10%;
}
.w15 {
  width: 25%;
}
.w25 {
  width: 25%;
}
.w30 {
  width: 30%;
}
.w35 {
  width: 35%;
}
.w45 {
  width: 45%;
}
.thead {
  display: flex;
  flex-direction: row;
  background: #ffffff;
  border-radius: 8px 8px 0px 0px;
  border-bottom: 2px #e23a36 solid;
  box-shadow: 0px 10px 20px rgba(127, 127, 127, 0.1);
  .th {
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    padding: 20px 0px;
    flex: 1;
  }
}
.tbody {
  flex-direction: column;
  margin-top: 10px;
  .tr {
    display: flex;
    flex-direction: row;
    background: #ffffff;
    box-shadow: 0px 10px 20px rgba(127, 127, 127, 0.1);
    border-radius: 8px;
    margin-top: 3px;
    padding-left: 10px;
    padding-right: 10px;
    .td {
      font-size: 14px;
      font-family: "Proxima Nova Rg";
      text-align: center;
      padding: 17px 0px;
      flex: 1;
    }
  }
}

/*
MOBILE RESPONSIVENESS ------------------------------------------- */

span.td-label.show-in-mobile {
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #000c114d;
}

.show-in-mobile {
  display: none;
}

@media only screen and (max-width: 991px) {
  .show-in-mobile {
    display: block;
  }

  .thead {
    display: none;
  }

  .tbody {
    flex-direction: unset;
    margin-top: 0;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .tbody .tr {
    // background: #eef8ff;
    flex-wrap: wrap;
    flex-direction: unset;
    padding: 15px 20px 30px;
    width: calc(50% - 60px);
    float: left;
    margin: 0 10px 20px;
  }

  .tbody .tr .td {
    flex: unset;
    width: 100%;
    float: left;
    text-align: left;
    padding: 17px 0px 0px;
  }
}

@media only screen and (max-width: 650px) {
  .tbody .tr {
    width: 100%;
    float: left;
    margin: 0 0 20px;
  }
}
</style>
