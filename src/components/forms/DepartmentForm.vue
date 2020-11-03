<template>
  <div class="container form-section">
    <div class="flex-column">
      <h3 class="meta-input-label mt10 mb10 text-bold mb20">
        Department Details
      </h3>
      <div class="meta-input-label mt10 mb10">
        Application Type
      </div>
      <base-select
        placeholder="--- Select from the options ---"
        :options="typeOptions"
        v-model="application_type"
        name="selectOptions"
        class="mb15"
      />
      <base-input
        label="Department Name"
        v-model="department_name"
        name="departmentname"
        refs="department_name"
        type="text"
        class="input-w3"
        inputClass="fw-mobile"
      />
      <button-block>Submit</button-block>
    </div>
  </div>
</template>

<script>
import ButtonBlock from "@/components/ButtonBlock";
import BaseInput from "@/components/forms/BaseInput";
import BaseSelect from "@/components/forms/BaseSelect";
export default {
  name: "DepartmentForm",
  components: {
    ButtonBlock,
    BaseInput,
    BaseSelect,
  },
  data() {
    return {
      department_name: "",
      typeOptions: [
        {
          label: "Business Application",
          value: "Business",
        },
        {
          label: "Building Application",
          value: "Building",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.form-section {
  padding: 15px;
}
</style>
