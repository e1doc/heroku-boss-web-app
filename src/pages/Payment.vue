<template>
  <section>
    <div class="meta-invoice-holder">
      <downloadable-invoice />
    </div>
    <modal
      name="paymentDetailsModal"
      height="auto"
      :adaptive="true"
      :classes="['vue-modal-2']"
      ><payment-details-modal
    /></modal>
    <div>
      <form
        action="https://epaymentportal.landbank.com/"
        method="POST"
        target="_blank"
        @submit="submit"
        ref="form"
      >
        <input type="hidden" name="MerchantCode" :value="merchantCode" />
        <input type="hidden" name="MerchantRefNo" :value="merchantRefNo" />
        <input type="hidden" name="Particulars" :value="particulars" />

        <input type="hidden" name="Amount" :value="amount" />
        <input type="hidden" name="PayorName" :value="payorName" />
        <input type="hidden" name="PayorEmail" :value="payorEmail" />
        <input type="hidden" name="ReturnURLOK" :value="returnUrlOk" />

        <input type="hidden" name="ReturnURLError" :value="returnUrlError" />
        <input type="hidden" name="Hash" :value="hash" />
        <!-- <input type="submit" value="POST TO EPP" /> -->
      </form>
    </div>
    <div class="meta-parent-box">
      <div class="container flex-wrap">
        <div class="meta-left-box">
          <payment-invoice-summary />
        </div>
        <div class="meta-right-box">
          <div class="meta-form-box">
            <div class="meta-title">Select Mode of Payment</div>
            <!-- <div class="meta-label">Select Mode of Payment</div> -->
            <!-- <bank-option/> -->
            <div class="meta-list flex-wrap">
              <div
                class="meta-list-item"
                v-if="isFeatureImplemented"
                :class="{ active: selectedPayment == 'landbank' }"
                @click="changePaymentType('landbank')"
              >
                <img class="meta-img" src="../assets/landbank-logo.png" />
              </div>
              <!-- <div
                class="meta-list-item"
                :class="{ active: selectedPayment == 'other_banks' }"
                @click="changePaymentType('other_banks')"
              >
                <img class="meta-img" src="../assets/bank-logo.png" />
              </div> -->
              <div
                class="meta-list-item"
                :class="{ active: selectedPayment == 'treasury_office' }"
                @click="changePaymentType('treasury_office')"
              >
                <img class="meta-img" src="../assets/lgu-treasury.png" />
              </div>
            </div>
            <radio-button />
            <!-- <div
              class="meta-button"
              @click="printInvoice()"
              v-if="
                paymentOption === 'counter' && currentPaymentType === 'landbank'
              "
            >
              <button-block>DOWNLOAD</button-block>
            </div> -->
            <div
              class="meta-button"
              v-if="
                paymentOption === 'online' && currentPaymentType === 'landbank'
              "
            >
              <button-block @click.native="submit">PROCEED</button-block>
            </div>
            <div
              class="meta-button"
              @click="redirectAppointment()"
              v-if="currentPaymentType === 'treasury_office'"
            >
              <button-block>PROCEED</button-block>
            </div>
            <!-- <div
              class="meta-button"
              v-if="currentPaymentType === 'other_banks'"
            >
              <button-block @click.native="showModal"
                >Upload Payment Details</button-block
              >
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import PaymentInvoiceSummary from "@/components/payment/PaymentInvoiceSummary";
import BankOption from "@/components/payment/BankOption";
import RadioButton from "@/components/payment/RadioButton";
import ButtonBlock from "@/components/ButtonBlock";
import DownloadableInvoice from "@/components/payment/DownloadableInvoice";
import PaymentDetailsModal from "@/components/payment/PaymentDetailsModal";
import { mapGetters } from "vuex";
import md5 from "crypto-js/md5";
const api_url = process.env.VUE_APP_API_URL;
export default {
  components: {
    PaymentInvoiceSummary,
    BankOption,
    RadioButton,
    ButtonBlock,
    DownloadableInvoice,
    PaymentDetailsModal,
  },
  computed: {
    ...mapGetters([
      "paymentOption",
      "currentPaymentType",
      "currentSoaObj",
      "userDetails",
    ]),
  },
  data() {
    return {
      printVisible: false,
      isPayment: true,
      selectedPayment: "landbank",
      isFeatureImplemented: true,
      merchantCode: "2020100015",
      merchantRefNo: "",
      particulars: "",
      amount: "",
      payorName: "",
      payorEmail: "",
      returnUrlOk: api_url + "/api/payment-success/",
      returnUrlError: api_url + "/api/payment-error/",
      hash: "",
    };
  },
  mounted() {
    this.$store.commit("setPrintInvoice", false);
    this.checkOrigin();
  },
  methods: {
    async checkOrigin() {
      const { origin, soa, token, type } = this.$route.params;
      //origin = web || mobile
      if (origin === "mobile") {
        await this.$store.dispatch("getSoaDetails", {
          id: soa,
          type: type,
          token: token,
        });
      }
      await this.setupFormData();
    },
    getQuarters() {
      let minQuarter = 0;
      let maxQuarter = this.currentSoaObj.quarter;

      if (this.currentSoaObj.bills && this.currentSoaObj.bills.length > 0) {
        this.currentSoaObj.bills.forEach((item) => {
          if (item.quarter < maxQuarter && minQuarter !== 0) {
            minQuarter = item.quarter;
          } else if (
            item.quarter < maxQuarter &&
            minQuarter !== 0 &&
            item.quarter < minQuarter
          ) {
            minQuarter = item.quarter;
          }
        });

        return minQuarter === maxQuarter && minQuarter !== 0
          ? minQuarter
          : minQuarter !== maxQuarter && minQuarter !== 0
          ? `${minQuarter}-${maxQuarter}`
          : maxQuarter;
      }
    },
    showModal() {
      this.$store.commit("setPaymentDetails", new FormData());
      this.$store.commit("setIsFileUploaded", false);
      this.$modal.show("paymentDetailsModal");
    },
    setupFormData() {
      let business_application = this.currentSoaObj.business_application;
      let building_application = this.currentSoaObj.building_application;
      this.amount = this.currentSoaObj.amount;
      this.merchantRefNo = this.currentSoaObj.reference_number;
      this.payorName = `${this.userDetails.first_name} ${this.userDetails.last_name}`;
      this.payorEmail = this.userDetails.email;
      let paymode =
        this.currentSoaObj.paymode === "A"
          ? "Annually"
          : this.currentSoaObj.paymode === "S"
          ? "Semi-Annually"
          : "Quarterly";
      if (this.currentSoaObj.application_type === "business") {
        const businessName =
          business_application.businessdetails.name != ""
            ? business_application.businessdetails.name
            : business_application.businessdetails.trade_name;
        this.particulars = `transaction_type=Business Tax;Account No.=${
          business_application.account_number
        };Business Name=${businessName};Payment Mode=${paymode};Quarter=${
          paymode === "Annualy" ? "1-4" : this.currentSoaObj.quarter
        }`;
      } else {
        let buildingBasicInfo = building_application.buildingbasicinformation;
        let declaredOwner = `${buildingBasicInfo.owner_first_name} ${buildingBasicInfo.owner_middle_name} ${buildingBasicInfo.owner_last_name}`;
        this.particulars = `transaction_type=Real Property Tax;Tax Declaration=${building_application.buildingdetails.tax_dec_no};Declared Owner=${declaredOwner};Payment Mode=${paymode};Quarter=${this.currentSoaObj.quarter};Total Amount=${this.currentSoaObj.amount}`;
      }
      console.log(this.particulars);
      this.hash = this.getHash();
    },
    submit() {
      this.$refs.form.submit();
      this.$router.push({ name: "Profile" });
      // window.open(
      //   "https://epaymentportal.landbank.com/pay1.php?code=Sll1bkZRa0ptUmhva2tzRGZXRW9KL1BFcUhmN2JhWThrTW1RcjdMZzlnND0=",
      //   "_blank"
      // );
    },
    getHash() {
      let amount = parseFloat(this.currentSoaObj.amount).toFixed(2);
      amount = amount * 100;
      return md5(
        this.merchantCode + this.merchantRefNo + parseInt(Math.round(amount))
      )
        .toString()
        .toLowerCase();
    },
    printInvoice() {
      this.$store.commit("setPrintInvoice", true);
    },
    redirectAppointment() {
      this.$router.push({ name: "AddAppointment" });
    },
    changePaymentType(type) {
      this.selectedPayment = type;
      this.$store.commit("setCurrentPaymentType", type);
    },
  },
};
</script>

<style lang="scss" scoped>
.meta-invoice-holder {
  position: absolute;
  opacity: 0;
  top: -500px;
  z-index: -1;
}
section {
  div.meta-parent-box {
    width: 100%;
    min-height: calc(100vh - 81px);
    display: flex;
    flex-wrap: wrap;
    padding-top: 50px;
    div.container {
      max-width: 1320px;
      div.meta-left-box {
        width: 35%;
      }
      div.meta-right-box {
        width: calc(65% - 45px);
        margin-left: 45px;
        div.meta-form-box {
          min-height: 600px;
          background-color: #eaf6ff;
          border-radius: 20px;
          padding: 60px 80px;
          box-shadow: 0 10px 20px rgba(127, 127, 127, 0.1);
          .meta-title {
            font-size: 24px;
            font-weight: bold;
            line-height: 50px;
            margin-bottom: 25px;
            margin-left: -20px;
          }
          .meta-label {
            font-size: 14px;
            color: #2699fb;
            line-height: 20px;
            margin-bottom: 15px;
          }
          .meta-button {
            text-align: center;
          }
        }
      }
    }
  }
}

.meta-list {
  margin-bottom: 20px;
  .meta-list-item {
    max-width: 138px;
    margin-right: 15px;
    margin-bottom: 15px;
    cursor: pointer;
    img.meta-img {
      max-height: 60px;
      padding: 12px;
      border: 2px solid transparent;
      border-radius: 5px;
    }
  }
}

.meta-list-item:nth-child(n + 4) {
  margin-right: 0;
}

.meta-list-item.active img.meta-img {
  border-color: #039be5;
}

@media only screen and (max-width: 1180px) {
  section div.meta-parent-box {
    padding-bottom: 50px;
  }

  section div.meta-parent-box div.container div.meta-left-box {
    width: 45%;
  }

  section div.meta-parent-box div.container div.meta-right-box {
    width: calc(55% - 30px);
    margin-left: 30px;
  }

  section
    div.meta-parent-box
    div.container
    div.meta-right-box
    div.meta-form-box {
    padding: 30px 30px 50px 50px;
  }
}

@media only screen and (max-width: 860px) {
  section div.meta-parent-box {
    padding-top: 20px;
  }

  section div.meta-parent-box div.container div.meta-left-box {
    width: 100%;
  }

  section div.meta-parent-box div.container div.meta-right-box {
    width: 100%;
    margin-left: 0;
  }

  .meta-invoice-holder {
    overflow: hidden;
    width: 100%;
  }

  section
    div.meta-parent-box
    div.container
    div.meta-right-box
    div.meta-form-box
    .meta-title {
    font-size: 20px;
    margin-left: 0;
  }

  .container {
    margin-bottom: 0 !important;
  }

  section
    div.meta-parent-box
    div.container
    div.meta-right-box
    div.meta-form-box {
    padding: 40px 50px;
  }
}

@media only screen and (max-width: 480px) {
  section div.meta-parent-box {
    padding-top: 30px;
  }
  section
    div.meta-parent-box
    div.container
    div.meta-right-box
    div.meta-form-box {
    padding: 30px 30px 40px;
    min-height: auto;
    margin-top: 20px;
  }

  section
    div.meta-parent-box
    div.container
    div.meta-right-box
    div.meta-form-box
    .meta-title {
    font-size: 18px;
    line-height: 1.6;
  }

  .meta-list .meta-list-item img.meta-img {
    max-height: 40px;
  }
}

@media only screen and (max-width: 350px) {
  section
    div.meta-parent-box
    div.container
    div.meta-right-box
    div.meta-form-box {
    padding: 30px 15px;
  }
}
</style>
