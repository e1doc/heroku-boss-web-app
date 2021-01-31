<template>
  <div class="modal flex-center">
    <div class="meta-modal">
      <div class="meta-wrap">
        <div class="meta-modal-body flex-wrap">
          <h3 class="mb20">Please enter the payment details below:</h3>
          <div class="meta-input-group">
            <div class="meta-input-label mt10 mb10">Bank Used to Pay</div>
            <base-input
              v-model="payment_details.bank"
              label="Enter bank name"
              name="bank"
              refs="payment_bank"
              type="text"
              class="mt40 input-field"
              :validationMessages="stepOneErrors.payment_details.bank"
            />
          </div>
          <div class="meta-input-group">
            <div class="meta-input-label mt10 mb10">Date of Payment</div>
            <base-date-picker
              v-model="payment_details.date"
              class="mb15 input-field"
              :validationMessages="stepOneErrors.payment_details.date"
            />
          </div>
          <div class="flex-wrap meta-input-group">
            <div class="meta-input-label mt10 mb10">Total Amount Paid</div>
            <currency-input
              label="Total Amount Paid"
              name="totalamount"
              refs="total_amount"
              type="text"
              :isAmount="true"
              class="mt40 w100 input-field amount-paid"
              placeholder="Enter total amount paid"
              v-model="payment_details.amount"
              :validationMessages="stepOneErrors.payment_details.amount"
            />
          </div>
          <div class="meta-input-group">
            <div class="meta-input-label mt10 mb10">Reference No.</div>
            <base-input
              label="Enter reference no."
              name="refrenceno"
              refs="reference_no"
              type="text"
              class="mt40 input-field"
              v-model="payment_details.reference_no"
              :validationMessages="stepOneErrors.payment_details.reference_no"
            />
          </div>
          <div class="meta-upload-div flex-wrap">
            <base-file-uploader
              label="Upload proof of transaction:"
              name="payment_slip"
              fileLabel="paymentdetails"
              type="business"
              class="mt15 custom-upload"
              :isPaymentDetails="true"
              :hasError="uploadHasError"
            />
          </div>
        </div>
        <div class="meta-buttons flex-wrap">
          <button class="modal-button agree" @click="onClickCallback(true)">
            SUBMIT
          </button>
          <button class="modal-button cancel" @click="onClickCallback(false)">
            CANCEL
          </button>
        </div>
      </div>
    </div>
  </div>
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
    async onClickCallback(status) {
      if (status) {
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
      } else {
        this.$modal.hide("paymentDetailsModal");
      }
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
.modal {
  min-height: calc(100vh - 60px);
  padding: 30px 0;
  overflow-y: auto;
  .meta-modal {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    box-shadow: 0px 7px 20px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    background: #ffffff;
    .meta-modal-body {
      font-size: 18px;
      font-family: Proxima Nova Rg;
      line-height: 1.4;
      padding: 50px 30px;
      .meta-input-group {
        width: calc(50% - 20px);
        padding: 0 10px;
        align-items: flex-start;
        display: flex;
        flex-wrap: wrap;
        float: left;
        .input-field {
          width: 100%;
        }
      }
      .meta-upload-div {
        width: 100%;
        padding: 0 10px;
      }
    }
    .meta-buttons {
      width: 100%;
      button {
        width: 50%;
        float: left;
        background-color: transparent;
        border: 0;
        padding: 20px 10px;
        border-top: 1px solid #eee;
        font-size: 15px;
        font-weight: bold;
        font-family: Proxima Nova Rg;
        transition: 0.2s;
        cursor: pointer;
      }
      button:focus {
        outline: 0;
      }
      button.agree {
        border-right: 1px solid #eee;
        border-bottom-left-radius: 15px;
      }
      button.cancel {
        border-bottom-right-radius: 15px;
      }
      button.agree:hover {
        color: #fff;
        background-color: #4791db;
      }
      button.cancel:hover {
        color: #fff;
        background-color: #f44336;
      }
    }
  }
}
</style>