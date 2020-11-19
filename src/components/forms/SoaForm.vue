<template>
  <div class="container form-section">
    <div class="flex-column">
      <h3 class="meta-input-label mt10 mb10 text-bold mb20">
        Account Number: {{ currentSelectedBusiness.account_number }}
      </h3>
      <div class="meta-input-label mt10 mb10">
        Payment Mode
      </div>
      <base-select
        placeholder="--- Select from the options ---"
        :options="paymentOptions"
        v-model="paymode"
        name="selectOptions"
        class="mb15"
      />
      <div class="meta-input-label mt10 mb10">
        Payment Quarter
      </div>
      <base-select
        placeholder="--- Select from the options ---"
        :options="quarters"
        v-model="quarter"
        name="selectOptions"
        class="mb15"
      />
      <button-block @click.native="generateSoa">Submit</button-block>
    </div>
  </div>
</template>

<script>
import ButtonBlock from "@/components/ButtonBlock";
import BaseInput from "@/components/forms/BaseInput";
import BaseSelect from "@/components/forms/BaseSelect";
import { mapGetters } from "vuex";
import axios from "axios";
const oneDocToken = process.env.VUE_APP_ONE_DOC_TOKEN;
export default {
  name: "SoaForm",
  components: {
    ButtonBlock,
    BaseInput,
    BaseSelect,
  },
  computed: {
    ...mapGetters(["addDepartmentSuccess", "currentSelectedBusiness"]),
  },
  data() {
    return {
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
    };
  },

  methods: {
    async generateSoa() {
      try {
        this.$store.commit('setLoading', true)
        let config = {
          headers: {
            "OneDoc-Token": oneDocToken,
            "Content-Type": "application/json",
          },
        };
        const payload = {
          name: "BusinessTaxInvoce",
          param: {
            accountno: this.currentSelectedBusiness.account_number,
            quarter: this.quarter,
            paymode: this.paymode,
          },
        };

        const result = await axios.post(
          `https://api.bacoor.gov.ph/lguapi/`,
          payload,
          config
        );
        this.$store.commit('setLoading', false)
        console.log(result.data)
        if (result.data.Response.Result.length > 0) {
          await this.$modal.hide("soaModal");
          await this.$modal.show("invoiceModal");
        } else {
          this.$swal({
            title: "Failed!",
            text: "No Record Found",
            icon: "error",
          });
        }
      } catch (err) {
        this.$store.commit('setLoading', false)
        err.response ? console.log(err.response) : console.log(err);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.form-section {
  padding: 15px;
}
</style>
