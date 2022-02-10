<template>
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
  </form>
</template>

<script>
import axios from "axios";
const api_url = process.env.VUE_APP_API_URL;
import { mapGetters } from "vuex";
import md5 from "crypto-js/md5";
export default {
  name: "MobileRedirectToEpp",
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
  computed: {
    ...mapGetters([
      "paymentOption",
      "currentPaymentType",
      "currentSoaObj",
      "userDetails",
    ]),
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const id = this.$route.params.id;
        const token = this.$route.params.token;
        const type = this.$route.params.type;

        const result = await axios.get(
          `${api_url}/api/download-invoice/?id=${id}`,
          { headers: { Authorization: `jwt ${token}` } }
        );

        const soa = result.data;
        if (soa) {
          await this.$store.commit("setCurrentSoaObj", soa);
          if (type === "business") {
            await this.$store.commit(
              "setCurrentSelectedBusiness",
              soa.business_application
            );
          }
          await this.$store.commit("setCurrentSoaType", type);
          await this.setupFormData();
        }
      } catch (err) {
        console.log(err);
      }
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
      this.hash = this.getHash();

      this.submit();
    },
    submit() {
      this.$refs.form.submit();
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
  },
};
</script>

<style>
</style>