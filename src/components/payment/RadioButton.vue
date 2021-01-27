<template>
  <div class="meta-list">
    <!-- OPTION 1 -->
    <div
      class="meta-list-option"
      v-if="currentPaymentType === 'landbank' && isFeatureImplemented"
    >
      <div class="meta-radio flex-center">
        <input
          type="radio"
          class="radio-button"
          name="payment-options"
          id="option_1"
          checked
          @click="selectOptions('counter')"
        />
        <span
          class="custom-radio flex-center"
          :class="{ selected: selectedOption === 'counter' }"
          ><span class="circle"></span
        ></span>
        <label for="option_1">Over the Counter</label>
      </div>
      <div class="meta-desc">
        Pay your bills over the counter on any Landbank branches. Click the
        'Download' button below to download your SOA which you will present in
        paying on any Landbank branches.
      </div>
    </div>
    <!-- OPTION 2 -->
    <div
      class="meta-list-option"
      v-if="currentPaymentType === 'landbank' && isFeatureImplemented"
    >
      <div class="meta-radio flex-center">
        <input
          type="radio"
          class="radio-button"
          name="payment-options"
          id="option_2"
          @click="selectOptions('online')"
        />
        <span
          class="custom-radio flex-center"
          :class="{ selected: selectedOption === 'online' }"
          ><span class="circle"></span
        ></span>
        <label for="option_2">Pay Online</label>
      </div>
      <div class="meta-desc">
        You can now pay your bills through online without any hassle.
      </div>
    </div>

    <!-- OPTION 2 -->
    <div
      class="meta-list-option"
      v-if="currentPaymentType === 'treasury_office'"
    >
      <div class="meta-radio flex-center">
        <!-- <input type="radio" class="radio-button" name="payment-options" id="option_3" @click="selectOptions('treasury')">
              <span class="custom-radio flex-center" :class="{selected: selectedOption === 'treasury'}"><span class="circle"></span></span> -->
        <label for="option_3">Pay at the Treasury Office</label>
      </div>
      <div class="meta-desc">
        You must set an appointment before paying your bills at the Treasury
        Office. To set an appointment, please click the button below.
      </div>
    </div>
    <div
      class="meta-list-option"
      v-if="currentPaymentType === 'other_banks' && isFeatureImplemented"
    >
      <div class="meta-radio flex-center">
        <input
          type="radio"
          class="radio-button"
          name="payment-options"
          id="option_1"
          checked
          @click="selectOptions('other_banks')"
        />
        <span
          class="custom-radio flex-center"
          :class="{ selected: selectedOption === 'counter' }"
          ><span class="circle"></span
        ></span>
        <label for="option_1">Pay via Other Banks</label>
      </div>
      <div class="meta-desc">
        <div class="mb25">Please pay your SOA at the bank of your choice:</div>
        <div class="flex-row">
          <div class="flex-column mr20 meta-label">
            <div class="mr15 mb10">Depository Bank:</div>
            <div class="mr15 mb10">Depository Name:</div>
            <div class="mr15 mb10">Depository Account #:</div>
            <div class="mr15 mb10">Total Amount Due:</div>
          </div>
          <div class="flex-column">
            <div class="mr15 mb10">Land Bank of the Philippines</div>
            <div class="mr15 mb10">City Government of Bacoor</div>
            <div class="mr15 mb10">123123123</div>
            <div>
<<<<<<< HEAD
              PHP
              {{ formatCurrency(parseFloat(currentSoaObj.amount).toFixed(2)) }}
=======
              {{ formatCurrency(currentSoaObj.amount) }}
>>>>>>> feature/paymentoption
            </div>
          </div>
        </div>
        <div>
          Once you have settled the account via your bank of choice, please
          click on <span class="text-bold">Upload Payment Details</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "RadioButton",
  data() {
    return {
      selectedOption: "counter",
      isFeatureImplemented: false,
    };
  },
  computed: {
    ...mapGetters(["currentPaymentType", "currentSoaObj"]),
  },
  props: {
    paymentType: {
      type: String,
      default: "landbank",
    },
  },
  mounted() {
    this.$store.commit("setCurrentPaymentType", "treasury_office");
  },
  methods: {
    formatCurrency(str) {
      var parts = str.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (parts.length < 2) {
        parts.push("00");
      }
      return parts.join(".");
    },
    selectOptions(option) {
      this.selectedOption = option;
      this.$store.commit("setPaymentOption", option);
    },
  },
};
</script>

<style lang="scss" scoped>
div.meta-list {
  .meta-list-option {
    margin-bottom: 30px;
    .meta-radio {
      color: #2b2b2b;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
      line-height: 20px;
      position: relative;
      margin-bottom: 13px;
      input.radio-button {
        margin-right: 15px;
        position: relative;
        z-index: 2;
        opacity: 0;
        cursor: pointer;
      }
      label {
        cursor: pointer;
      }
      span.custom-radio {
        height: 13px;
        width: 13px;
        border: 1px solid #2699fb;
        border-radius: 100%;
        justify-content: center;
        position: absolute;
        left: 0;
        z-index: 1;
        span.circle {
          height: 9px;
          width: 9px;
          background-color: transparent;
          border-radius: 100%;
        }
      }
      span.custom-radio.selected {
        span.circle {
          background-color: #2699fb;
        }
      }
    }
    .meta-desc {
      font-size: 14px;
      line-height: 25px;
      color: #646566;
      background: #f6fbff;
      border-radius: 10px;
      border-top-left-radius: 0;
      padding: 15px 18px;
      .meta-label {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}

.meta-list-option:last-child {
  margin-bottom: 50px !important;
}

span.custom-radio.selected span.circle {
  background-color: #2699fb;
}

@media only screen and (max-width: 480px) {
  div.meta-list .meta-list-option .meta-desc {
    font-size: 12px;
    line-height: 1.6;
  }
}
</style>