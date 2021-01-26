<template>
  <section>
    <div>
      <div class="flex-column">
        <h3 class="mb20">Please enter the payment details below:</h3>
        <div class="meta-input-label mt10 mb10">Bank Used to Pay</div>
        <base-input
          v-model="payment_details.bank"
          label="Enter bank name"
          name="bank"
          refs="payment_bank"
          type="text"
          class="mt40"
          :validationMessages="stepOneErrors.payment_details.bank"
        />
        <div class="meta-input-label mt10 mb10">Date of Payment</div>
        <base-date-picker
          v-model="payment_details.date"
          class="mb15"
          :validationMessages="stepOneErrors.payment_details.date"
        />
        <div>
          <div class="meta-input-label mt10 mb10">Total Amount Paid</div>
          <currency-input
            label="Total Amount Paid"
            name="totalamount"
            refs="total_amount"
            type="text"
            :isAmount="true"
            class="mt40 w100"
            placeholder="Enter total amount paid"
            v-model="payment_details.amount"
            :validationMessages="stepOneErrors.payment_details.amount"
          />
        </div>
        <div class="meta-input-label mt10 mb10">Reference No.</div>
        <base-input
          label="Enter reference no."
          name="refrenceno"
          refs="reference_no"
          type="text"
          class="mt40"
          v-model="payment_details.reference_no"
          :validationMessages="stepOneErrors.payment_details.reference_no"
        />
        <div class="mt40">
          <base-file-uploader
            label="Upload screenshot of transaction:"
            name="payment_details"
            fileLabel="paymentdetails"
            type="business"
            class="mt30"
            :isPaymentDetails="true"
            :hasError="uploadHasError"
          />
        </div>
        <button-block @click.native="submit">Submit</button-block>
      </div>
    </div>
  </section>
</template>

<script>
import BaseInput from "@/components/forms/BaseInput";
import BaseDatePicker from "@/components/forms/BaseDatePicker";
import BaseFileUploader from "@/components/forms/BaseFileUploader";
import ButtonBlock from "@/components/ButtonBlock";
import { mapGetters } from "vuex";
export default {
  name: "PaymentDetailsModal",
  components: {
    BaseInput,
    BaseDatePicker,
    BaseFileUploader,
    ButtonBlock,
  },
  computed: {
    ...mapGetters([
      "paymentDetails",
      "currentSoaObj",
      "stepOneErrors",
      "isFileUploaded",
    ]),
  },
  data() {
    return {
      payment_details: {
        bank: "",
        date: "",
        amount: 0,
        reference_no: "",
      },
      unrequired: {
        payment_details: [],
      },
      uploadHasError: false,
    };
  },
  mounted() {
    console.log(this.paymentDetails);
  },
  methods: {
    async submit() {
      this.$store.commit("setLoading", true);
      let formData = this.paymentDetails;
      formData.append("soa", this.currentSoaObj.id);
      formData.append("bank", this.payment_details.bank);
      formData.append("payment_date", this.payment_details.date);
      formData.append("amount", this.payment_details.amount);
      formData.append("reference_no", this.payment_details.reference_no);
      let validate = this.validateRequiredFields();
      if (validate) {
        await this.$store.commit("setPaymentDetails", formData);
        await this.$store.dispatch("addPaymentDetails");
      }
      this.$store.commit("setLoading", false);
    },
    validateRequiredFields() {
      let payment_details_errors = { key: "payment_details", value: {} };
      let isPaymentDetailsClean = true;
      for (let key in this.payment_details) {
        if (!this.unrequired.payment_details.includes(key)) {
          if (this.payment_details[key] === "") {
            payment_details_errors.value[`${key}`] = [];
            payment_details_errors.value[`${key}`].push(
              "This field may not be blank."
            );
          }
        }
      }
      if (Object.entries(payment_details_errors.value).length > 0) {
        this.$store.commit("setStepOneErrors", payment_details_errors);
        isPaymentDetailsClean = false;
      } else {
        this.$store.commit("setStepOneErrors", {
          key: "paymentDetails",
          value: {},
        });
      }
      if (!this.isFileUploaded) {
        this.uploadHasError = true;
      } else {
        this.uploadHasError = false;
      }
      if (isPaymentDetailsClean && this.isFileUploaded) {
        return true;
      } else {
        this.$swal({
          title: "Failed!",
          text: "Please fix the validation errors.",
          icon: "error",
        });
        return false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
section {
  padding: 25px 25px 35px;
  background-color: #ffffff;
  max-height: 100vh;
  overflow-y: auto;
}
</style>