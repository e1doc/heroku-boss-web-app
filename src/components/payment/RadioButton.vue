<template>
  <div class="meta-list">
    <!-- OPTION 1 -->
    <!-- <div
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
    </div> -->
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
          :class="{
            selected: currentPaymentType === 'landbank' ? true : false,
          }"
          ><span class="circle"></span
        ></span>
        <label for="option_2">Pay Online</label>
      </div>
      <div class="meta-desc">
        You can now pay your bills through online without any hassle.
        <br />
        <div class="text-underline meta-view-more" @click="showImg(0)">
          View more instruction
        </div>
      </div>
      <vue-easy-lightbox
        moveDisabled
        :visible="visible"
        :imgs="imgs"
        :index="index"
        @hide="handleHide"
      ></vue-easy-lightbox>
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
    <!-- <div class="meta-list-option" v-if="currentPaymentType === 'other_banks'">
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
        <div v-for="(item, index) in paymentDetails" :key="index" class="mb30">
          <h3 class="text-primary">{{ item.bank }}</h3>
          <div class="flex-row mt10">
            <div class="flex-column mr20 meta-label">
              <div class="mr15 mb10">Depository Bank:</div>
              <div class="mr15 mb10">Depository Name:</div>
              <div class="mr15 mb10">Depository Account #:</div>
              <div class="mr15 mb10">Total Amount Due:</div>
            </div>
            <div class="flex-column">
              <div class="mr15 mb10">{{ item.bank }}</div>
              <div class="mr15 mb10">{{ item.name }}</div>
              <div class="mr15 mb10">{{ item.account_number }}</div>
              <div>
                PHP
                {{
                  formatCurrency(parseFloat(currentSoaObj.amount).toFixed(2))
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="mt20">
          Once you have settled the account via your bank of choice, please
          click on <span class="text-bold">Upload Payment Details</span>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueEasyLightbox from "vue-easy-lightbox";
export default {
  name: "RadioButton",
  components: {
    VueEasyLightbox,
  },
  data() {
    return {
      selectedOption: "landbank",
      isFeatureImplemented: true,
      paymentDetails: [
        {
          bank: "Land Bank of the Philippines",
          name: "City of Bacoor",
          account_number: "1422-1056-85",
        },
        {
          bank: "Development Bank of the Philippines",
          name: "City of Bacoor",
          account_number: "0-50003-651-1",
        },
      ],
      imgs: [
        {
          title: "this is a placeholder",
          src: "https://s3.ap-southeast-1.amazonaws.com/public.bacoor/lbpinstruction.png",
        },
      ],
      visible: false,
      index: 0, // default: 0
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
    this.$store.commit("setCurrentPaymentType", "landbank");
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
    showImg(index) {
      this.index = index;
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
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

.meta-view-more {
  cursor: pointer;
}

@media only screen and (max-width: 480px) {
  div.meta-list .meta-list-option .meta-desc {
    font-size: 12px;
    line-height: 1.6;
  }
}
</style>