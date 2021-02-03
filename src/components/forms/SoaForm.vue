<template>
  <div class="container form-section">
    <div class="flex-column" v-if="currentSoaType === 'business'">
      <h3 class="meta-input-label mt10 mb10 text-bold mb20">
        Account Number: {{ currentSelectedBusiness.account_number }}
      </h3>
      <div class="meta-input-label mt10 mb10">Payment Mode</div>
      <base-select
        placeholder="--- Select from the options ---"
        :options="paymentOptions"
        v-model="paymode"
        name="selectOptions"
        class="mb15"
        @change.native="onModeSelect"
      />
      <div class="meta-input-label mt10 mb10">Payment Quarter</div>
      <base-select
        placeholder="--- Select from the options ---"
        :options="quarters"
        v-model="quarter"
        name="selectOptions"
        :disabled="isQuarterDisabled"
        class="mb15"
      />
      <button-block @click.native="generateSoa('business')"
        >Submit</button-block
      >
    </div>
    <div class="flex-column" v-if="currentSoaType === 'real_property'">
      <h4>For Tax Year - {{ new Date(Date.now()) | moment("YYYY") }}</h4>
      <h3 class="meta-input-label mt10 mb10 text-bold mb20">
        Tax Dec No. {{ currentSelectedProperty.buildingdetails.tax_dec_no }}
      </h3>
      <div
        class="mb10 meta-radio-group"
        v-for="(item, index) in propertyPaymentOptions"
        :key="index"
      >
        <div>
          <input
            type="radio"
            :id="item.value"
            :value="item.value"
            v-model="paymentOption"
          />
          <label for="deliquent" class="text-bold">{{ item.label }}</label>
        </div>
      </div>
      <div class="meta-checkbox flex-center mb30 ml30">
        <input
          type="checkbox"
          id="is_advance_payment"
          v-model="isAdvancePayment"
        />
        <div class="custom-checkbox flex-center">
          <span class="check"
            ><font-awesome-icon icon="check" class="mr5 check-icon"
          /></span>
        </div>
        <label for="legal_docs_1">Include Advance Payment</label>
      </div>
      <div class="mb10" v-if="paymentOption !== 'delinquent'">
        <button-block @click.native="generateSoa('real_property')" class="w100"
          >Compute</button-block
        >
      </div>
    </div>
  </div>
</template>

<script>
import ButtonBlock from "@/components/ButtonBlock";
import BaseInput from "@/components/forms/BaseInput";
import BaseSelect from "@/components/forms/BaseSelect";
import { mapGetters } from "vuex";
import axios from "axios";
import moment from "moment-timezone";
const oneDocToken = process.env.VUE_APP_ONE_DOC_TOKEN;
const lguLocalEndpoint = process.env.VUE_APP_LGU_LOCAL_ENDPOINT;
export default {
  name: "SoaForm",
  components: {
    ButtonBlock,
    BaseInput,
    BaseSelect,
  },
  computed: {
    ...mapGetters([
      "addDepartmentSuccess",
      "currentSelectedBusiness",
      "currentSoaType",
      "currentSelectedProperty",
    ]),
  },
  watch: {
    paymentOption: {
      async handler(selected) {
        if (selected === "delinquent") {
          let action = await this.$swal({
            text:
              "Delinquents are handled via the applicant inquiry system. Kindly send your old TD number and property owner in the succeeding screen. You can combine multiple transactions into a single message. You would need to upload the latest scan of the applicable Tax Declarantion as well.",
            showCancelButton: true,
            icon: "info",
          });
          if (action.value) {
            this.$store.commit("setIsDelinquentPayment", true);
            this.$router.push({ name: "NewInquiry" });
          } else {
            await this.$modal.hide("soaModal");
          }
        }
      },
    },
  },
  mounted() {},
  data() {
    return {
      isQuarterDisabled: false,
      quarter: "",
      paymode: "",
      paymentOptions: [
        {
          label: "Annually",
          value: "A",
        },
        {
          label: "Semi-annually",
          value: "S",
        },
        {
          label: "Quarterly",
          value: "Q",
        },
      ],
      propertyPaymentOptions: [
        {
          label: "Settle delinquent payments",
          value: "delinquent",
        },
        {
          label: "Pay current year",
          value: "current",
        },
        // {
        //   label: "Include advance payment",
        //   value: "advance",
        // },
      ],
      quarters: [
        {
          label: "I Quarter",
          value: "1",
        },
        {
          label: "II Quarter",
          value: "2",
        },
        {
          label: "III Quarter",
          value: "3",
        },
        {
          label: "IV Quarter",
          value: "4",
        },
      ],
      isAdvancePayment: false,
      paymentOption: "current",
    };
  },

  methods: {
    onModeSelect() {
      if (this.paymode == "A") {
        this.quarter = "4";
        this.isQuarterDisabled = true;
      } else {
        this.isQuarterDisabled = false;
      }
    },
    async generateSoa(type) {
      try {
        this.$store.commit("setLoading", true);

        let config = {
          headers: {
            "OneDoc-Token": oneDocToken,
            "Content-Type": "application/json",
          },
        };

        if (type === "business") {
          const payload = {
            name: "BusinessTaxInvoce",
            param: {
              accountno: this.currentSelectedBusiness.account_number,
              quarter: this.quarter,
              paymode: this.paymode,
            },
          };

          const result = await axios.post(
            `${lguLocalEndpoint}`,
            payload,
            config
          );
          this.$store.commit("setLoading", false);
          console.log(result.data);
          if (result.data.Status === "Success") {
            await this.$modal.hide("soaModal");
            await this.$store.dispatch(
              "storeGeneratedBill",
              result.data.Result
            );
            await this.$router.push({ name: "Bills" });
          } else {
            this.$swal({
              title: "Failed!",
              text: result.data.Message,
              icon: "error",
            });
          }
        } else {
          const payload = {
            name: "RealPropertyTaxInvoce",
            param: {
              refno: this.currentSelectedProperty.reference_id,
              property_type: this.currentSelectedProperty.buildingdetails
                .property_type,
              includeadv: this.isAdvancePayment ? 1 : 0,
              date: moment().format("YYYY-MM-DD").toString(),
            },
          };
          const result = await axios.post(
            `${lguLocalEndpoint}`,
            payload,
            config
          );
          this.$store.commit("setLoading", false);
          if (result.data.Status === "Success") {
            await this.$modal.hide("soaModal");
            await this.$store.dispatch(
              "storeGeneratedBill",
              result.data.Result
            );
            await this.$router.push({ name: "Bills" });
          } else {
            this.$swal({
              title: "Failed!",
              text: result.data.Message,
              icon: "error",
            });
          }
        }
      } catch (err) {
        this.$store.commit("setLoading", false);
        err.response ? console.log(err.response) : console.log(err);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.meta-radio-group {
  div {
    margin-bottom: 10px;
    input {
      margin-right: 10px;
    }
  }
}
.form-section {
  padding: 15px;
}
div.meta-checkbox {
  position: relative;
  label {
    font-size: 13px;
    line-height: 1.6;
  }
  input[type="checkbox"] {
    height: 17px;
    width: 17px;
    opacity: 0;
    left: 0;
    top: 3px;
    position: absolute;
    z-index: 2;
    cursor: pointer;
  }
  .custom-checkbox {
    height: 15px;
    width: 15px;
    border: 2px solid #2593f1;
    margin-right: 12px;
    .check-icon {
      color: #fff;
      font-size: 14px;
      display: none;
    }
  }
  input[type="checkbox"]:checked + .custom-checkbox {
    background-color: #2593f1;
    .check-icon {
      display: block;
    }
  }
}
</style>
