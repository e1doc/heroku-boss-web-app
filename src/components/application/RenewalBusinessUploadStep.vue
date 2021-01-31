<template>
  <div class="meta-container flex-center">
    <h1 class="meta-form-title">Upload your Requirements</h1>
    <div class="meta-note">
      Almost Done! Please upload your file. Only allowed format - jpg, jpeg, png
      or pdf file.
    </div>
    <base-file-uploader
      label="1. Copy of your latest Business Permit"
      type="business"
      fileLabel="latest_business_permit"
      :hasError="uploadErrors.latest_business_permit"
      :properties="getProperty('latest_business_permit')"
    />
    <base-file-uploader
      label="2. Basis for computing taxes, Last year BIR Income Tax Return (170IQ or 1701A) or Last year BIR 2550M/2550Q/2551Q or the Audited Financial Statement"
      description="<b>Note:</b><br> <br>  a. Itemized gross sale of all branches for business establishments with multiple locations.
	 <br> <br> b. Copy of last year BIR 1701A(ITR)"
      :properties="getProperty('computing_taxes_basis')"
      fileLabel="computing_taxes_basis"
      type="business"
      uploadType="application/pdf"
      :hasError="uploadErrors.computing_taxes_basis"
    />
    <base-file-uploader
      label="3. One government issued ID"
      :properties="getProperty('government_id')"
      :hasError="uploadErrors.government_id"
      fileLabel="government_id"
      type="business"
    />
    <div class="meta-form-group button-left-right">
      <button-block
        type="back"
        class="back-button"
        @click.native="previousStep()"
        >BACK</button-block
      >
      <button-block class="next-button" @click.native="nextStep()"
        >NEXT</button-block
      >
    </div>
  </div>
</template>

<script>
import ButtonBlock from "@/components/ButtonBlock";
import BaseFileUploader from "@/components/forms/BaseFileUploader";
import BaseSelect from "@/components/forms/BaseSelect";
import { mapGetters } from "vuex";
export default {
  name: "RenewalBusinessUploadStep",
  components: {
    ButtonBlock,
    BaseFileUploader,
    BaseSelect,
  },
  data() {
    return {
      required: [
        "latest_business_permit",
        "computing_taxes_basis",
        "government_id",
      ],
      uploadErrors: {
        latest_business_permit: false,
        computing_taxes_basis: false,
        government_id: false,
      },
    };
  },
  computed: {
    ...mapGetters([
      "applicationRequirements",
      "requirements",
      "draftBusiness",
      "businessApplication",
      "businessBasicInformation",
    ]),
  },
  mounted() {
    this.scrollToTop();
    this.getRequirements();
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    validateRequiredFields() {
      let validated = [];
      if (this.requirements) {
        if (this.requirements.requirements) {
          if (this.requirements.requirements.length > 0) {
            this.requirements.requirements.map((item) => {
              if (!validated.includes(item.requirements_label)) {
                if (this.required.includes(item.requirements_label)) {
                  validated.push(item.requirements_label);
                }
              }
            });
          } else {
            this.required.forEach((element) => {
              this.uploadErrors[`${element}`] = true;
            });
          }
          this.required.forEach((element) => {
            if (!validated.includes(element)) {
              this.uploadErrors[`${element}`] = true;
            }
          });
          if (validated.length === this.required.length) {
            return true;
          } else {
            return false;
          }
        } else {
          this.required.forEach((element) => {
            this.uploadErrors[`${element}`] = true;
          });
          return false;
        }
      }
    },
    previousStep() {
      this.$store.commit("setCurrentApplicationStep", "1");
    },
    async nextStep() {
      if (!this.draftBusiness) {
        this.$store.commit("setLoading", true);
        let isValidated = this.validateRequiredFields();
        if (isValidated) {
          let application_status;
          this.businessApplication.application_status == 1
            ? (application_status = 0)
            : this.businessApplication.application_status == 3
            ? (application_status = 2)
            : (application_status = 0);
          let payload = {
            is_draft: false,
            application_status: application_status,
            last_submitted: new Date(Date.now()),
            is_disapprove: false,
            is_approve: false,
            latest_approver: "",
            on_renewal: true,
            application_type: "renewal",
          };
          await this.$store.dispatch("updateBusinessApplication", payload);
          await this.$store.dispatch(
            "updateBusinessBasicInformation",
            this.businessBasicInformation
          );
          await this.$store.dispatch("renewBusinessApplication");
          let resetAssessmentPayload = {
            business_application: this.businessApplication.id,
          };
          await this.$store.dispatch(
            "resetBusinessAssessment",
            resetAssessmentPayload
          );
          this.$store.commit("setCurrentApplicationStep", "3");
        } else {
          this.$swal({
            title: "Failed!",
            text:
              "Please upload the remaining requirements before you submit the application.",
            icon: "error",
          });
        }
      }
      this.$store.commit("setLoading", false);
    },
    async getRequirements() {
      if (this.applicationRequirements.id) {
        await this.$store.dispatch("getApplicationRequirements");
      }
    },
    getProperty(key) {
      if (this.requirements.id) {
        if (this.requirements.requirements.length > 0) {
          let property = {};
          property = this.requirements.requirements.find((element) => {
            if (element.requirements_label === key) {
              return element;
            }
          });
          return property;
        }
      }
    },
  },
  watch: {
    draftBusiness: {
      deep: true,
      handler(status) {
        if (status) {
          this.$swal({
            title: "Success!",
            text: "data successfully saved as draft.",
            icon: "success",
          }).then((value) => {
            this.$store.commit("setDraftBusiness", false);
            this.$router.push({ name: "Profile" });
          });
        }
      },
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
  .meta-note {
    font-size: 16px;
    color: #7ac0fa;
    margin-bottom: 30px;
  }
  .meta-custom-upload {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    position: relative;
    border: 3px dashed #bce0fd;
    padding: 50px 30px;
    margin-bottom: 30px;
    transition: 0.4s;

    input[type="file"] {
      position: absolute;
      z-index: 2;
      height: 100%;
      width: 100%;
      opacity: 0;
      cursor: pointer;
    }
    .meta-text.big {
      color: #64b4f9;
      font-size: 30px;
      font-weight: 700;
      line-height: 1.6;
      text-transform: uppercase;
      width: 100%;
      text-align: center;
      transition: 0.4s;
    }
    .meta-text.small {
      color: #64b4f9;
      font-size: 18px;
      font-weight: 700;
      line-height: 1.6;
      transition: 0.4s;
    }
  }
  div.button-left-right {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .back-button {
      background-color: #73befc;
      border-color: #73befc;
    }
  }
}

div.meta-container .meta-custom-upload:hover {
  border-color: #039be5;
}

div.meta-container .meta-custom-upload:hover div.meta-text {
  color: #039be5;
}

.back-button:hover {
  background-color: #2699fb !important;
  color: #fff !important;
  border-color: #2699fb !important;
}

@media only screen and (max-width: 1380px) {
  div.meta-container h1.meta-form-title {
    font-size: 22px;
  }
}
</style>