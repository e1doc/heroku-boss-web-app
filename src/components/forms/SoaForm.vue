<template>
  <div class="container form-section">
    <div class="flex-column">
      <h3 class="meta-input-label mt10 mb10 text-bold mb20">Account Number: G-03283</h3>
      <div class="meta-input-label mt10 mb10">
        Payment Mode
      </div>
      <base-select
        placeholder="--- Select from the options ---"
        :options="paymentOptions"
        v-model="application_type"
        name="selectOptions"
        class="mb15"
      />
      <div class="meta-input-label mt10 mb10">
        Payment Quarter
      </div>
      <base-select
        placeholder="--- Select from the options ---"
        :options="quarters"
        v-model="application_type"
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
export default {
  name: "SoaForm",
  components: {
    ButtonBlock,
    BaseInput,
    BaseSelect,
  },
  computed: {
    ...mapGetters(["addDepartmentSuccess"]),
  },
  data() {
    return {
      department_name: "",
      application_type: "",
      paymentOptions: [
        {
          label: "Annually",
          value: "Annually",
        },
        {
          label: "Semi-annually",
          value: "Semi-annually",
        },
        {
          label: "Quarterly",
          value: "Quarterly",
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
          value: "IV Quarter",
        },
      ]
    };
  },

  methods: {
      generateSoa(){
          this.$modal.hide("soaModal");
          this.$modal.show("invoiceModal");
      }
  },
};
</script>

<style scoped lang="scss">
.form-section {
  padding: 15px;
}
</style>
