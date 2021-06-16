<template>
  <section>
    <modal
      name="paymentViewDetailsModal"
      height="auto"
      :adaptive="true"
      :classes="['vue-modal-2']"
      ><payment-view-details-modal
    /></modal>
    <div>
      <div class="thead hide-in-mobile">
        <!-- <div class="th w10">ACC #</div> -->
        <div class="th">REF NO.</div>
        <div class="th">SOA</div>
        <div class="th" v-if="currentType == 'business'">ACCOUNT #</div>
        <div class="th" v-if="currentType !== 'business'">TD #</div>
        <div class="th">BANK</div>
        <div class="th">PAYOR</div>
        <div class="th">AMOUNT</div>
        <div class="th">PAYMENT DATE</div>
        <div class="th">STATUS</div>
        <div class="th">ACTION</div>
      </div>
      <div class="tbody" v-if="bankTransactions.length > 0">
        <div class="tr" v-for="(item, index) in bankTransactions" :key="index">
          <div class="td">{{ item.reference_no }}</div>
          <div class="td">{{ item.soa.reference_number }}</div>
          <div class="td" v-if="currentType == 'business'">
            <span class="td-label show-in-mobile">ACCOUNT #:</span>
            {{ item.soa.business_application.account_number }}
          </div>
          <div class="td" v-if="currentType !== 'business'">
            {{ item.soa.building_application.buildingdetails.tax_dec_no }}
          </div>
          <div class="td">{{ item.bank }}</div>
          <div class="td">
            {{ item.user.first_name }} {{ item.user.middle_name }}
            {{ item.user.last_name }}
          </div>
          <div class="td">
            PHP {{ formatCurrency(parseFloat(item.amount).toFixed(2)) }}
          </div>
          <div class="td">
            {{ item.payment_date | moment("MMMM DD YYYY") }}
          </div>
          <div class="td">
            {{ item.is_verified ? "VERIFIED" : "FOR VERIFICATION" }}
          </div>
          <div class="td" @click="showModal(item)" v-if="!item.is_verified">
            <div class="meta-verify">VERIFY</div>
          </div>
          <div class="td" @click="showModal(item)" v-if="item.is_verified">
            <div class="meta-verify">VIEW</div>
          </div>
        </div>
      </div>
      <div class="tbody" v-if="bankTransactions.length < 1">
        <div class="tr">
          <div class="td meta-no-data">No data available</div>
        </div>
      </div>
    </div>
    <paginate
      v-if="currentTable === 'online_payment'"
      :page-count="transactionPageCount"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :click-handler="transactionClickCallBack"
    >
    </paginate>
    <paginate
      v-if="currentTable === 'other_banks'"
      :page-count="transactionPageCount"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :click-handler="transactionClickCallBack"
    >
    </paginate>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import PaymentViewDetailsModal from "@/components/payment/PaymentViewDetailsModal";
export default {
  name: "TransactionTable",
  components: {
    PaymentViewDetailsModal,
  },
  computed: {
    ...mapGetters(["currentType", "bankTransactions", "transactionPageCount"]),
  },
  mounted() {
    this.$store.dispatch("getAllBankTransactions", { page: 1 });
  },
  methods: {
    showModal(data) {
      this.$store.commit("setCurrentBankTransaction", data);
      this.$modal.show("paymentViewDetailsModal");
      this.$store.commit("setIsFileUploaded", false);
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
      this.$store.dispatch("getAllBankTransactions", { page: pageNum });
    },
  },
};
</script>

<style lang="scss" scoped>
.disabled {
  border-color: gray !important;
  color: gray !important;
}
.disabled:hover {
  border-color: gray !important;
  color: gray !important;
  background: none !important;
}
.meta-verify {
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

@media only screen and (max-width: 860px) {
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
    padding: 15px 20px;
    width: calc(50% - 60px);
    float: left;
    margin: 0 10px 20px;
  }

  .tbody .tr .td {
    flex: unset;
    width: 100%;
    float: left;
    text-align: left;
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
