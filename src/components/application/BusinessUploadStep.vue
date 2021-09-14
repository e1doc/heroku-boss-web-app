<template>
  <div class="meta-container flex-center">
    <h1 class="meta-form-title">Upload your Requirements</h1>
    <div class="meta-note">
      Almost Done! Please upload your file. Only allowed format - jpg, jpeg, png
      or pdf file.
    </div>
    <base-file-uploader
      label="1. Proof of business registration, incorporation, or legal personality"
      description="{i.e. DTI / SEC (Including articles and by-laws)/Cooperative Development Authority (CDA)."
      type="business"
      fileLabel="business_registration_proof"
      :hasError="uploadErrors.business_registration_proof"
      :properties="getProperty('business_registration_proof')"
      uploadType="application/pdf"
    />
    <base-file-uploader
      label="2. For Franchisee, please upload a copy of Franchise Agreement"
      :properties="getProperty('franchise_agreement')"
      fileLabel="franchise_agreement"
      type="business"
    />
    <base-file-uploader
      label="3. Occupancy Permit"
      description="If required by national laws (e.g. Building Code) and local laws."
      :properties="getProperty('occupancy_permit')"
      :hasError="uploadErrors.occupancy_permit"
      fileLabel="occupancy_permit"
      type="business"
    />
    <base-file-uploader
      label="4. Contract of Lease (if Lessee)"
      :properties="getProperty('contract_of_lease')"
      fileLabel="contract_of_lease"
      type="business"
      uploadType="application/pdf"
    />
    <base-file-uploader
      label="5. One Goverment issued ID"
      :properties="getProperty('government_id')"
      fileLabel="government_id"
      type="business"
      :hasError="uploadErrors.government_id"
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
import { mapGetters } from "vuex";
const oneDocToken = process.env.VUE_APP_ONE_DOC_TOKEN;
const lguLocalEndpoint = process.env.VUE_APP_LGU_LOCAL_ENDPOINT;
import axios from "axios";
import moment from "moment-timezone";
export default {
  name: "BusinessUploadStep",
  components: {
    ButtonBlock,
    BaseFileUploader,
  },
  data() {
    return {
      business_registration_proof: {},
      franchise_agreement: {},
      occupancy_permit: {},
      contract_of_lease: {},
      government_id: {},
      required: ["business_registration_proof", "occupancy_permit"],
      uploadErrors: {
        business_registration_proof: false,
        occupancy_permit: false,
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
      "businessDetails",
      "lessorDetails",
      "businessActivities",
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
      this.$store.commit("setCurrentApplicationStep", "2");
    },
    async nextStep() {
      if (!this.draftBusiness) {
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
          };

          const result = await this.sendDataToLocal();
          if (result) {
            await this.$store.dispatch("updateBusinessApplication", payload);
            this.$store.commit("setCurrentApplicationStep", "4");
          } else {
            this.$swal({
              title: "Failed!",
              text: "Something went wrong. Please try again later.",
              icon: "error",
            });
          }
        } else {
          this.$swal({
            title: "Failed!",
            text: "Please upload the remaining requirements before you submit the application.",
            icon: "error",
          });
        }
      }
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

    async sendDataToLocal() {
      const config = {
        headers: {
          "OneDoc-Token": oneDocToken,
          "Content-Type": "application/json",
        },
      };
      const application_params = {
        onlinerefno: this.businessBasicInformation.reference_number || "",
        orgtype: this.businessBasicInformation.type_of_organization || "",
        paymode: this.businessBasicInformation.mode_of_payment || "",
        lastname: this.businessBasicInformation.owner_last_name || "",
        firstname: this.businessBasicInformation.owner_first_name || "",
        middlename: this.businessBasicInformation.owner_middle_name || "",
        owneraddress:
          this.businessBasicInformation.owner_complete_address || "",
        telno: this.businessBasicInformation.owner_telephone_number || "",
        email: this.businessBasicInformation.email_address || "",
        regno: this.businessBasicInformation.dti_sec_cda_reg_number || "",
        regdate: moment(this.dti_sec_cda_reg_date).format("YYYY-MM-DD"),
        ctcno: this.businessBasicInformation.ctc_no || "",
        tin: this.businessBasicInformation.tin || "",
        incentive: this.businessBasicInformation.has_tax_incentive
          ? "Yes"
          : "No",
        incentiveentity: this.businessBasicInformation.government_entity || "",
        tlastname: this.businessDetails.president_last_name || "",
        tfirstname: this.businessDetails.president_first_name || "",
        tmiddlename: this.businessDetails.president_middle_name || "",
        corpname: this.businessDetails.name || "",
        tradename: this.businessDetails.trade_name || "",
        businessaddress: this.businessDetails.complete_business_address || "",
        businessaddressno: this.businessDetails.address_no || "",
        businessblockno: this.businessDetails.block_no || "",
        businesslotno: this.businessDetails.lot_no || "",
        businessstreet: this.businessDetails.street || "",
        businesssubdivision: this.businessDetails.subdivision || "",
        businessbldgno: this.businessDetails.building_no || "",
        businessbldgname: this.businessDetails.building_name || "",
        businessunitno: this.businessDetails.unit_no || "",
        businessfloorno: this.businessDetails.floor_no || "",
        businessbarangay: this.businessDetails.barangay || "",
        city: this.businessDetails.city || "",
        province: "Cavite",
        businesstelno: this.businessDetails.telephone_number || "",
        businessemail: this.businessDetails.email_address || "",
        pin: this.businessDetails.property_index_number || "",
        businessarea: this.businessDetails.area.toString() || "",
        empcount: this.businessDetails.total_employees.toString() || "",
        emplgucount: this.businessDetails.residing_employees.toString() || "",
        lessorlastname: this.lessorDetails.last_name || "",
        lessorfirstname: this.lessorDetails.first_name || "",
        lessormiddlename: this.lessorDetails.middle_name || "",
        lessoraddress: this.lessorDetails.complete_address || "",
        monthlyrental: this.lessorDetails.gross_monthly_rental
          ? this.lessorDetails.gross_monthly_rental.toString()
          : "",
        lessortelno: this.lessorDetails.telephone_number || "",
        lessoremail: this.lessorDetails.email_address || "",
        apptype: "New" || "",
        appdate: moment(this.businessApplication.created_at).format(
          "YYYY-MM-DD"
        ),
        year: moment(this.businessApplication.created_at).format("YYYY"),
        remarks: "",
      };
      console.log(application_params);
      const application_payload = {
        name: "POSTBusiness",
        param: application_params,
      };

      const response = await axios.post(
        `${lguLocalEndpoint}`,
        application_payload,
        config
      );

      if (response.data.Result) {
        return true;
      } else {
        return false;
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
    .meta-note {
      font-size: 16px;
      color: #7ac0fa;
      margin-bottom: 30px;
      width: 100%;
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

/*
MOBILE RESPONSIVENESS 
--------------------------------------------------------------*/

@media only screen and (max-width: 1380px) {
  div.meta-container h1.meta-form-title {
    font-size: 22px;
  }
}

@media only screen and (max-width: 768px) {
  div.meta-container h1.meta-form-title {
    font-size: 20px;
  }

  .meta-upload-box .meta-label {
    font-size: 15px;
  }

  div.meta-container .meta-note {
    font-size: 15px;
    text-align: center;
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
  div.meta-container {
    padding: 30px 15px;
  }

  div.meta-container h1.meta-form-title {
    font-size: 16px;
  }

  div.meta-container div.button-left-right .back-button {
    background-color: #048cff;
    border-color: #73befc;
    width: auto;
    background: transparent;
    border: none;
    box-shadow: none;
    color: #2699fb;
    min-width: unset;
  }

  div.meta-container div.button-left-right .next-button {
    width: auto;
    background: transparent;
    border: none;
    box-shadow: none;
    min-width: unset;
    color: #2699fb;
  }

  div.meta-container .meta-note {
    font-size: 14px;
  }
}
</style>
