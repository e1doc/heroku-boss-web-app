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
    <h1 class="meta-form-title">Business Activity</h1>
    <div class="meta-form-group p-relative mb60">
      <div
        class="meta-multi-group"
        v-for="(activity, index) in activities"
        :key="index"
      >
        <div class="meta-input-group flex-row w3">
          <base-input
            label="Line of Business"
            v-model="activity.line_of_business"
            :name="`lineofbusiness${index}`"
            :refs="`line_of_business${index}`"
            type="text"
            class="mt40 input-w2"
            inputClass="fw-mobile"
            :validationMessages="
              activityErrors[index]
                ? activityErrors[index].value.line_of_business
                : []
            "
          />

          <base-input
            label="No. of Units"
            :name="`businessunits${index}`"
            v-model="activity.units"
            :refs="`business_units${index}`"
            type="number"
            class="mt40 input-w2"
            inputClass="fw-mobile"
          />
        </div>
        <base-input
          label="Capitalization (for New Business)"
          v-model="activity.capitalization"
          :name="`capitalization${index}`"
          :refs="`business_capitalization${index}`"
          type="text"
          :isAmount="true"
          class="mt40 mb30"
        />
        <div v-if="activityErrors[index]">
          <div v-if="activityErrors[index].value.capitalization">
            <div class="meta-error-text">* This field may not be blank</div>
          </div>
        </div>
      </div>
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
  name: "RenewalBusinessStepOne",
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
      activities: [],
      unrequired: {
        business_activities: [
          "units",
          "code",
          "essential",
          "non_essential",
          "application_year",
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
      "businessActivities",
      "activityErrors",
    ]),
  },
  watch: {
    draftBusiness: {
      deep: true,
      handler(status) {
        if (status) {
          this.nextStep();
          this.$store.dispatch("updateBusinessApplication", {
            is_disapprove: false,
            is_draft: true,
          });
          this.$swal({
            title: "Success!",
            text: "data successfully saved as draft.",
            icon: "success",
          }).then((value) => {
            this.toProfile();
          });
          this.$store.commit("setDraftBusiness", false);
        }
      },
    },
  },
  mounted() {
    this.$store.commit("setLoading", false);
    this.preFillForm();
    if (!this.isPrivacyAgree) {
      this.$modal.show("agreementModal");
    }
  },
  methods: {
    toProfile() {
      this.$router.push({ name: "Profile" });
      this.$store.commit("setDraftBusiness", false);
    },
    preFillForm() {
      if (this.businessActivities.length > 0) {
        this.activities.splice(0, this.activities.length);
        this.businessActivities.forEach((element) => {
          element.application_number = this.businessApplication.id;
          this.activities.push(element);
        });
      }
    },
    async nextStep() {
      this.validateRequiredFields();
      if (this.activities.length > 0) {
        let isAdd = true;
        for (let item of this.activities) {
          if (item.is_draft) {
            isAdd = false;
          }
        }
        if (isAdd) {
          for (let item of this.activities) {
            item.is_draft = true;
            item.is_active = false;
            delete item.id;
          }
          this.$store.dispatch("addBusinessActivity", this.activities);
        } else {
          this.$store.dispatch("updateBusinessActivity", this.activities);
        }
      }
    },
    validateRequiredFields() {
      let activity_errors_holder = {};
      let isBusinessActivitiesClean = true;

      if (this.activities.length > 0) {
        let index = 0;
        for (let activity of this.activities) {
          let business_activity_errors = {
            key: "business_activities",
            value: {},
          };
          for (let key in activity) {
            if (!this.unrequired.business_activities.includes(key)) {
              if (
                activity[key] === "" ||
                activity[key] === null ||
                activity[key] === 0
              ) {
                business_activity_errors.value[`${key}`] = [];
                business_activity_errors.value[`${key}`].push(
                  "This field may not be blank."
                );
              }
            }
          }
          activity_errors_holder[index] = business_activity_errors;
          index = index + 1;
        }
      }
      if (Object.entries(activity_errors_holder).length > 0) {
        Object.keys(activity_errors_holder).forEach((item) => {
          if (Object.entries(activity_errors_holder[item].value).length > 0) {
            isBusinessActivitiesClean = false;
          }
        });
        if (!isBusinessActivitiesClean) {
          this.$store.commit("setActivityErrors", activity_errors_holder);
        } else {
          this.$store.commit("setActivityErrors", {});
        }
      }
      if (isBusinessActivitiesClean) {
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
.meta-error-text {
  margin-bottom: 10px;
  font-size: 12px;
  color: #e8726f;
  font-weight: bold;
}
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

.add-icon {
  float: right;
  margin-bottom: 10px;
  font-size: 14px;
  color: #2699fb;
  cursor: pointer;
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
