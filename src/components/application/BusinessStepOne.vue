<template>
  <div class="meta-container">
    <modal
      name="agreementModal"
      height="auto"
      :adaptive="true"
      :classes="['vue-modal']"
      :clickToClose="false"
      ><agreement-modal
    /></modal>
    <h1 class="meta-form-title">Basic Information</h1>
    <div class="meta-form-group mb60">
      <div class="meta-input-label mt10 mb10">Type of Organization</div>
      <base-select
        placeholder="--- Choose type of organization ---"
        :options="types_of_organization"
        name="selectOptions"
        v-model="basic_information.type_of_organization"
        :validationMessages="
          stepOneErrors.basic_information.type_of_organization
        "
        class="mb15"
        @change="changeOrganization"
      />
      <div class="meta-input-label mt10 mb10">Mode of Payment</div>
      <base-select
        placeholder="--- Select from the options ---"
        :options="modeofpayment"
        v-model="basic_information.mode_of_payment"
        :validationMessages="stepOneErrors.basic_information.mode_of_payment"
        name="selectOptions"
        class="mb15"
      />

      <div class="meta-group-title">Taxpayer / Owner Details</div>
      <base-input
        label="First Name"
        v-model="basic_information.owner_first_name"
        :validationMessages="stepOneErrors.basic_information.owner_first_name"
        name="firstname"
        refs="first_name"
        type="text"
        class="mt40"
      />
      <base-input
        label="Middle Name(optional)"
        v-model="basic_information.owner_middle_name"
        :validationMessages="stepOneErrors.basic_information.owner_middle_name"
        name="middlename"
        refs="middle_name"
        type="text"
        class="mt40"
      />
      <base-input
        label="Last Name"
        v-model="basic_information.owner_last_name"
        :validationMessages="stepOneErrors.basic_information.owner_last_name"
        name="lastname"
        refs="last_name"
        type="text"
        class="mt40"
      />
      <base-input
        label="Complete Owner's Address"
        v-model="basic_information.owner_complete_address"
        :validationMessages="
          stepOneErrors.basic_information.owner_complete_address
        "
        name="owneraddress"
        refs="owner_address"
        type="text"
        class="mt40"
      />
      <base-input
        label="Telephone/Phone Number"
        v-model="basic_information.owner_telephone_number"
        :validationMessages="
          stepOneErrors.basic_information.owner_telephone_number
        "
        name="telephone"
        refs="tel_number"
        type="text"
        class="mt40"
      />
      <!-- <base-tel-number
        v-model="basic_information.owner_mobile_number"
        :validationMessages="
          stepOneErrors.basic_information.owner_mobile_number
        "
        class="mb15 input-tel"
      /> -->
      <base-input
        label="Email Address"
        v-model="basic_information.owner_email_address"
        :validationMessages="
          stepOneErrors.basic_information.owner_email_address
        "
        name="email"
        refs="email_add"
        type="email"
        class="mt40"
      />

      <!-- <base-input
        label="Account Number"
        v-model="business_application.account_number"
        :validationMessages="stepOneErrors.application.account_number"
        name="accountnumber"
        refs="account_number"
        type="text"
        class="mt40 input-w3"
      /> -->
      <base-input
        label="DTI/SEC/CDA Registration No."
        v-model="basic_information.dti_sec_cda_reg_number"
        :validationMessages="
          stepOneErrors.basic_information.dti_sec_cda_reg_number
        "
        name="dtiregnumber"
        refs="dti_reg_number"
        type="text"
        class="mt40 input-w3"
      />
      <div class="meta-input-label mt10 mb10">
        DTI/SEC/CDA Date of Registration No.
      </div>
      <base-date-picker
        v-model="basic_information.dti_sec_cda_reg_date"
        :validationMessages="
          stepOneErrors.basic_information.dti_sec_cda_reg_date
        "
        class="mb15"
      />
      <base-input
        label="CTC No."
        v-model="basic_information.ctc_no"
        :validationMessages="stepOneErrors.basic_information.ctc_no"
        name="ctcnumber"
        refs="ctc_number"
        type="number"
        class="mt40 input-w3"
      />
      <base-input
        label="TIN"
        v-model="basic_information.tin"
        :validationMessages="stepOneErrors.basic_information.tin"
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
        v-model="basic_information.has_tax_incentive"
        :validationMessages="stepOneErrors.basic_information.has_tax_incentive"
        name="selectOptions"
        class="mb15"
      />
      <base-input
        label="Please specify the entity:"
        v-model="basic_information.government_entity"
        name="goventity"
        refs="gov_entity"
        type="text"
        class="mt40 input-w3"
        :validationMessages="stepOneErrors.basic_information.government_entity"
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
import { mapGetters } from "vuex";
import AgreementModal from "@/components/application/AgreementModal";
export default {
  name: "BusinessStepOne",
  components: {
    BaseInput,
    BaseCheckbox,
    ButtonBlock,
    BaseTelNumber,
    BaseSelect,
    BaseDatePicker,
    AgreementModal,
  },
  data() {
    return {
      business_application: {
        account_number: "",
      },
      basic_information: {
        dti_sec_cda_reg_number: "",
        dti_sec_cda_reg_date: "",
        type_of_organization: "",
        ctc_no: "",
        tin: "",
        mode_of_payment: "",
        has_tax_incentive: false,
        government_entity: "",
        owner_first_name: "",
        owner_middle_name: "",
        owner_last_name: "",
        owner_complete_address: "",
        owner_telephone_number: "",
        owner_email_address: "",
      },
      types_of_organization: [
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
      modeofpayment: [
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
      taxincentive: [
        {
          label: "Yes (Specify below)",
          value: true,
        },
        {
          label: "No",
          value: false,
        },
      ],
      unrequired: {
        business_application: ["account_number"],
        basic_information: [
          "government_entity",
          "owner_middle_name",
          "ctc_no",
          "tin",
          "has_tax_incentive",
          "owner_email_address",
          "owner_mobile_number",
        ],
      },
    };
  },
  computed: {
    ...mapGetters([
      "businessBasicInformation",
      "businessApplication",
      "basicInfoHasError",
      "applicationHasError",
      "stepOneErrors",
      "draftBusiness",
      "isPrivacyAgree",
    ]),
  },
  watch: {
    draftBusiness: {
      deep: true,
      handler(status) {
        if (status) {
          this.nextStep();
        }
      },
    },
  },
  mounted() {
    this.scrollToTop();
    this.preFillForm();
    this.$store.commit("setLoading", false);
    if (!this.isPrivacyAgree) {
      this.$modal.show("agreementModal");
    }
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    changeOrganization() {
      if (this.basic_information.type_of_organization !== "") {
        this.$store.commit(
          "setTypeOfOrganization",
          this.basic_information.type_of_organization
        );
        let required_fields = [
          "owner_first_name",
          "owner_last_name",
          "owner_complete_address",
          "owner_telephone_number",
        ];
        if (this.basic_information.type_of_organization !== "single") {
          required_fields.forEach((item) => {
            if (!this.unrequired.basic_information.includes(item)) {
              this.unrequired.basic_information.push(item);
            }
          });
        } else {
          this.unrequired.basic_information =
            this.unrequired.basic_information.filter(
              (item) => !required_fields.includes(item)
            );
        }
      }
    },
    async nextStep() {
      this.$store.commit("setLoading", true);
      if (this.businessApplication.id) {
        this.business_application.is_disapprove =
          this.businessApplication.is_disapprove;
        await this.$store.dispatch(
          "updateBusinessApplication",
          this.business_application
        );
      } else {
        await this.$store.dispatch(
          "addBusinessApplication",
          this.business_application
        );
        // await this.$store.dispatch("addBusinessBasicInformation", this.basic_information);
      }

      if (this.businessBasicInformation.id) {
        await this.$store.dispatch(
          "updateBusinessBasicInformation",
          this.basic_information
        );
      } else {
        await this.$store.dispatch(
          "addBusinessBasicInformation",
          this.basic_information
        );
      }
      if (!this.applicationHasError && !this.basicInfoHasError) {
        if (!this.draftBusiness) {
          this.validateRequiredFields();
          this.$store.commit("setLoading", false);
        } else {
          this.$swal({
            title: "Success!",
            text: "data successfully saved as draft.",
            icon: "success",
          }).then((value) => {
            this.toProfile();
          });
        }
      } else {
        this.validateRequiredFields();
        if (this.draftBusiness) {
          this.$swal({
            title: "Failed!",
            text: "Please fix the validation errors before saving as draft.",
            icon: "error",
          });
          this.$store.commit("setDraftBusiness", false);
        } else {
          this.$swal({
            title: "Failed!",
            text: "Please fix the validation errors before proceeding to the next step.",
            icon: "error",
          });
        }
      }
      this.$store.commit("setLoading", false);
      // this.$store.commit("setCurrentApplicationStep", "2");
    },
    preFillForm() {
      if (this.businessApplication.id) {
        this.basic_information = this.businessBasicInformation;
        this.business_application = this.businessApplication;
        this.changeOrganization();
      }
    },
    toProfile() {
      this.$router.push({ name: "Profile" });
      this.$store.commit("setDraftBusiness", false);
    },
    validateRequiredFields() {
      let basic_info_errors = { key: "basic_information", value: {} };
      let application_errors = { key: "application", value: {} };
      let isBasicInfoClean = true;
      let isApplicationClean = true;
      for (let key in this.basic_information) {
        if (!this.unrequired.basic_information.includes(key)) {
          if (this.basic_information[key] === "") {
            basic_info_errors.value[`${key}`] = [];
            basic_info_errors.value[`${key}`].push(
              "This field may not be blank."
            );
          }
        }
      }
      for (let key in this.business_application) {
        if (!this.unrequired.business_application.includes(key)) {
          if (this.business_application[key] === "") {
            application_errors.value[`${key}`] = [];
            application_errors.value[`${key}`].push(
              "This field may not be blank."
            );
          }
        }
      }

      if (Object.entries(basic_info_errors.value).length > 0) {
        this.$store.commit("setStepOneErrors", basic_info_errors);
        isBasicInfoClean = false;
      } else if (!this.basicInfoHasError) {
        this.$store.commit("setStepOneErrors", {
          key: "basic_information",
          value: {},
        });
      }

      if (Object.entries(application_errors.value).length > 0) {
        this.$store.commit("setStepOneErrors", application_errors);
        isApplicationClean = false;
      } else if (!this.applicationHasError) {
        this.$store.commit("setStepOneErrors", {
          key: "application",
          value: {},
        });
      }
      if (
        isApplicationClean &&
        isBasicInfoClean &&
        !this.applicationHasError &&
        !this.basicInfoHasError
      ) {
        console.log(isApplicationClean, isBasicInfoClean);
        this.$store.commit("setCurrentApplicationStep", "2");
      } else {
        this.$swal({
          title: "Failed!",
          text: "Please fix the validation errors before proceeding to the next step.",
          icon: "error",
        });
      }
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
      font-size: 16px;
      line-height: 19px;
      width: 100%;
      margin-bottom: 20px;
      margin-top: 30px;
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

/*
MOBILE RESPONSIVENESS 
--------------------------------------------------------------*/

@media only screen and (max-width: 1380px) {
  div.meta-container h1.meta-form-title {
    font-size: 22px;
  }
}

@media only screen and (max-width: 768px) {
  .input-tel {
    margin-bottom: 8px;
  }

  div.meta-container h1.meta-form-title {
    font-size: 20px;
  }

  div.meta-container div.meta-form-group div.meta-group-title {
    font-size: 15px;
    margin-bottom: 10px;
  }
}

@media only screen and (max-width: 650px) {
  div.meta-container {
    padding: 40px 30px;
  }

  div.meta-container h1.meta-form-title {
    font-size: 18px;
    margin-bottom: 30px;
  }
}

@media only screen and (max-width: 480px) {
  .next-button {
    width: 100%;
  }

  div.meta-container {
    padding: 30px 15px;
  }

  div.meta-container h1.meta-form-title {
    font-size: 16px;
  }

  div.meta-container div.meta-form-group div.meta-group-title {
    font-size: 14px;
    margin-bottom: 15px;
  }
}
</style>
