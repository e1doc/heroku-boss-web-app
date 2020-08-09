<template>
  <div class="meta-container">
    <h1 class="meta-form-title">Basic Information</h1>
    <div class="meta-form-group mb60">
      <div class="meta-group-title">Taxpayer / Owner Details</div>
      <base-input
        label="First Name"
        v-model="firstname"
        name="firstname"
        refs="first_name"
        type="text"
        class="mt40"
      />
      <base-input
        label="Middle Name(optional)"
        v-model="middlename"
        name="middlename"
        refs="middle_name"
        type="text"
        class="mt40"
      />
      <base-input
        label="Last Name"
        v-model="lastname"
        name="lastname"
        refs="last_name"
        type="text"
        class="mt40"
      />
      <base-input
        label="Complete Owner's Address"
        v-model="owneraddress"
        name="owneraddress"
        refs="owner_address"
        type="text"
        class="mt40"
      />
      <base-input
        label="Telephone Number"
        v-model="telephone"
        name="telephone"
        refs="tel_number"
        type="number"
        class="mt40"
      />
      <base-tel-number v-model="phone_number" class="mb15" />
      <base-input
        label="Email Address"
        v-model="email"
        name="email"
        refs="email_add"
        type="email"
        class="mt40"
      />

      <base-input
        label="Account Number"
        v-model="accountnumber"
        name="accountnumber"
        refs="account_number"
        type="number"
        class="mt40 input-w3"
      />
      <base-input
        label="DTI/SEC/CDA Registration No."
        v-model="dtiregnumber"
        name="dtiregnumber"
        refs="dti_reg_number"
        type="text"
        class="mt40 input-w3"
      />
      <div class="meta-input-label mt10 mb10">
        DTI/SEC/CDA Date of Registration No.
      </div>
      <base-date-picker v-model="dtiregdate" class="mb15" />
      <div class="meta-input-label mt10 mb10">Type of Organization</div>
      <base-select
        placeholder="--- Choose type of organization ---"
        :options="typeoforganization"
        name="selectOptions"
        class="mb15"
      />
      <base-input
        label="CTC No."
        v-model="ctcnumber"
        name="ctcnumber"
        refs="ctc_number"
        type="number"
        class="mt40 input-w3"
      />
      <base-input
        label="TIN"
        v-model="tin"
        name="tin"
        refs="tin_number"
        type="number"
        class="mt40 input-w3"
      />
      <div class="meta-input-label mt10 mb10">
        Are you enjoying tax incentive from any Government Entity?
      </div>
      <base-select
        placeholder="--- Select from the options ---"
        :options="taxincentive"
        name="selectOptions"
        class="mb15"
      />
      <base-input
        label="Please specify the entity:"
        v-model="goventity"
        name="goventity"
        refs="gov_entity"
        type="text"
        class="mt40 input-w3"
      />
    </div>

    <div class="meta-form-group button-right">
      <button-block class="next-button" @click.native="nextStep()"
        >NEXT</button-block
      >
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/forms/BaseInput";
import BaseCheckbox from "@/components/forms/BaseCheckbox";
import ButtonBlock from "@/components/ButtonBlock";
import BaseTelNumber from "@/components/forms/BaseTelNumber";
import BaseSelect from "@/components/forms/BaseSelect";
import BaseDatePicker from "@/components/forms/BaseDatePicker";
export default {
  name: "BusinessStepOne",
  components: {
    BaseInput,
    BaseCheckbox,
    ButtonBlock,
    BaseTelNumber,
    BaseSelect,
    BaseDatePicker,
  },
  data() {
    return {
      firstname: "",
      middlename: "",
      lastname: "",
      owneraddress: "",
      telephone: "",
      mobile: "",
      email: "",
      dtiregdate: "",
      presidentfirstname: "",
      presidentmiddlename: "",
      presidentlastname: "",
      typeoforganization: [
        {
          label: "Single",
          value: "single",
        },
        {
          label: "Partnership",
          value: "partnership",
        },
        {
          label: "Corporation",
          value: "corporation",
        },
        {
          label: "Cooperative",
          value: "cooperative",
        },
      ],
      taxincentive: [
        {
          label: "Yes (Specify below)",
          value: "yes",
        },
        {
          label: "No",
          value: "no",
        },
      ],
    };
  },
  methods: {
    nextStep() {
      this.$store.commit("setCurrentApplicationStep", "2");
    },
  },
};
</script>

<style lang="scss" scoped>
div.meta-container {
  width: 100%;
  padding: 50px;
  background-color: #eaf6ff;
  border-radius: 20px;
  h1.meta-form-title {
    margin-bottom: 40px;
  }
  div.meta-form-group {
    width: 100%;
    div.meta-group-title {
      color: #2699fb;
      font-size: 15px;
      line-height: 19px;
      width: 100%;
      margin-bottom: 20px;
    }
    div.meta-input-label {
      color: #2699fb;
      font-size: 13px;
      line-height: 19px;
      width: 100%;
    }
    div.input-wrapper {
      margin-bottom: 15px;
    }
    div.meta-input-group {
      width: 100%;
      .input-w2 {
        width: 50%;
        float: left;
        margin-right: 10px;
      }
      .input-w3 {
        width: 33%;
        float: left;
        margin-right: 10px;
      }
      .input-w4 {
        width: 25%;
        float: left;
        margin-right: 10px;
      }
      .input-w3:last-child,
      .input-w4:last-child,
      .input-w2:last-child {
        margin-right: 0;
      }
    }
  }
}

div.meta-container
  div.meta-form-group
  div.meta-input-group
  .input-w3:last-child {
  margin-right: 0;
}
</style>
