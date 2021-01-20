<template>
  <div class="meta-container">
    <modal
      name="agreementModal"
      height="auto"
      :adaptive="true"
      :classes="['vue-modal']"
      :clickToClose="false"
      ><agreement-modal type="building permit application"
    /></modal>
    <h1 class="meta-form-title">Basic Information</h1>
    <div class="meta-form-group mb60">
      <div class="meta-input-label mt10 mb10">Ownership Type</div>
      <base-select
        placeholder="--- Choose type of ownership ---"
        :options="ownership_type"
        name="selectOptions"
        v-model="basic_information.ownership_type"
        :validationMessages="
          buildingStepOneErrors.basic_information.ownership_type
        "
        class="mb15"
      />
      <div class="meta-group-title">Owner / Applicant Details</div>
      <base-input
        label="First Name"
        v-model="basic_information.owner_first_name"
        :validationMessages="
          buildingStepOneErrors.basic_information.owner_first_name
        "
        name="firstname"
        refs="first_name"
        type="text"
        class="mt40"
      />
      <base-input
        label="Middle Name(optional)"
        v-model="basic_information.owner_middle_name"
        :validationMessages="
          buildingStepOneErrors.basic_information.owner_middle_name
        "
        name="middlename"
        refs="middle_name"
        type="text"
        class="mt40"
      />
      <base-input
        label="Last Name"
        v-model="basic_information.owner_last_name"
        :validationMessages="
          buildingStepOneErrors.basic_information.owner_last_name
        "
        name="lastname"
        refs="last_name"
        type="text"
        class="mt40"
      />
      <base-input
        label="Complete Address"
        v-model="basic_information.owner_complete_address"
        :validationMessages="
          buildingStepOneErrors.basic_information.owner_complete_address
        "
        name="completeaddress"
        refs="complete_address"
        type="text"
        class="mt40"
      />
      <base-input
        label="Zip Code"
        v-model="basic_information.owner_zip_code"
        :validationMessages="
          buildingStepOneErrors.basic_information.owner_zip_code
        "
        name="zipcode"
        refs="zip_code"
        type="number"
        class="mt40"
      />
      <base-input
        label="Telephone / Phone Number"
        v-model="basic_information.owner_telephone_number"
        :validationMessages="
          buildingStepOneErrors.basic_information.owner_telephone_number
        "
        name="telephone"
        refs="tel_number"
        type="tel"
        class="mt40"
      />
      <base-input
        label="TIN No."
        v-model="basic_information.tin"
        :validationMessages="buildingStepOneErrors.basic_information.tin"
        name="tinnumber"
        refs="tin_number"
        type="text"
        class="mt40"
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
import BaseSelect from "@/components/forms/BaseSelect";
import AgreementModal from "@/components/application/AgreementModal";
import { mapGetters } from "vuex";
export default {
  name: "BuildingStepOne",
  components: {
    BaseInput,
    BaseCheckbox,
    ButtonBlock,
    BaseSelect,
    AgreementModal,
  },
  computed: {
    ...mapGetters([
      "buildingApplication",
      "buildingBasicInformation",
      "buildingBasicInfoHasError",
      "buildingStepOneErrors",
      "draftProperty",
      "isPrivacyAgree",
    ]),
  },
  mounted() {
    this.scrollToTop();
    this.preFillForm();
    if (!this.isPrivacyAgree) {
      this.$modal.show("agreementModal");
    }
  },
  data() {
    return {
      building_application: {
        area_no: "",
      },
      basic_information: {
        ownership_type: "",
        owner_first_name: "",
        owner_middle_name: "",
        owner_last_name: "",
        owner_complete_address: "",
        owner_zip_code: "",
        owner_telephone_number: "",
        tin: "",
      },
      unrequired: {
        building_application: ["area_no"],
        basic_information: ["owner_middle_name", "owner_zip_code", "tin"],
      },
      ownership_type: [
        {
          label: "Single",
          value: "single",
        },
        {
          label: "Cooperative",
          value: "cooperative",
        },
        {
          label: "Corporation",
          value: "corporation",
        },
        {
          label: "Partnership",
          value: "partnership",
        },
        {
          label: "Local Government",
          value: "local Government",
        },
        {
          label: "National Government",
          value: "national Government",
        },
      ],
    };
  },
  watch: {
    draftProperty: {
      deep: true,
      handler(status) {
        if (status) {
          this.nextStep();
        }
      },
    },
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    async nextStep() {
      this.$store.commit("setLoading", true);
      if (!this.buildingApplication.id) {
        let payload = { basic_information: this.basic_information };
        await this.$store.dispatch("addBuildingApplication", payload);
      }

      if (this.buildingBasicInformation.id) {
        await this.$store.dispatch(
          "updateBuildingBasicInformation",
          this.basic_information
        );
      } else {
        await this.$store.dispatch(
          "addBuildingBasicInformation",
          this.basic_information
        );
      }
      if (!this.buildingBasicInfoHasError) {
        if (!this.draftProperty) {
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
        if (this.draftProperty) {
          this.$swal({
            title: "Failed!",
            text: "Please fix the validation errors before saving as draft.",
            icon: "error",
          });
          this.$store.commit("setDraftProperty", false);
        } else {
          this.$swal({
            title: "Failed!",
            text:
              "Please fix the validation errors before proceeding to the next step.",
            icon: "error",
          });
        }
      }
      this.$store.commit("setLoading", false);

      // this.$store.commit("setCurrentApplicationStep", "2")
    },
    preFillForm() {
      if (this.buildingBasicInformation.id) {
        this.basic_information = this.buildingBasicInformation;
      }
    },
    toProfile() {
      this.$router.push({ name: "Profile" });
      this.$store.commit("setDraftProperty", false);
    },
    validateRequiredFields() {
      let basic_info_errors = { key: "basic_information", value: {} };
      let isBasicInfoClean = true;

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

      if (Object.entries(basic_info_errors.value).length > 0) {
        this.$store.commit("buildingSetStepOneErrors", basic_info_errors);
        isBasicInfoClean = false;
      } else {
        this.$store.commit("buildingSetStepOneErrors", {
          key: "basic_information",
          value: {},
        });
      }

      if (isBasicInfoClean) {
        this.$store.commit("setCurrentApplicationStep", "2");
      } else {
        this.$swal({
          title: "Failed!",
          text:
            "Please fix the validation errors before proceeding to the next step.",
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
  div.meta-input-label {
    color: #2699fb;
    font-size: 13px;
    line-height: 19px;
    width: 100%;
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
    div.input-wrapper {
      margin-bottom: 15px;
    }
    div.meta-input-group {
      width: 100%;
      .input-w3 {
        width: calc(33% - 10px);
        float: left;
        margin-right: 10px;
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
