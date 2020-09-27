<template>
  <div class="meta-container flex-center building-application">
    <h1 class="meta-form-title">Upload your Requirements</h1>
    <div class="meta-note">
      Almost Done! Please upload your file. Only allowed format - jpg, jpeg, png
      or pdf file.
    </div>
    <div class="meta-form-group mb60">
      <div class="meta-group-title">
        A. Legal Documents - Only one PDF File for all legal documents.
      </div>

      <ul class="parent-list">
        <li>
          <base-checkbox
            label="1. Electronic copy of Transfer Certicicate of Title (TCT) (original copy)"
          />
          <ul class="main-list">
            <li>
              If the applicant is NOT the registered owner of the lot, upload:
              <ul class="sub-list">
                <li>Notarized Affidavit of Consent</li>
              </ul>
            </li>
            <li>
              If TCT is not in the name of the applicant, any of the following:
              <ul class="sub-list">
                <li>Deed of Absolute Sale</li>
                <li>Contract to Sell</li>
                <li>Lease Contract</li>
                <li>Deed of Assignment / Donation or any equivalent</li>
              </ul>
            </li>
            <li>
              If TCT is in the name of a Corporation, upload:
              <ul class="sub-list">
                <li>
                  Corporate Secretary's Certificate (authorizing the signatory
                  with general information sheet)
                </li>
              </ul>
            </li>
            <li>
              If a Representative is applying in behalf of the applicant,
              upload:
              <ul class="sub-list">
                <li>
                  Notarized Authorization Letter to transact with OBO (with
                  valid ID of applicant and representative)
                </li>
              </ul>
            </li>
            <li>
              If a Representative is signing in behalf of the applicant, upload:
              <ul class="sub-list">
                <li>
                  Notarized Special Power of Attorney (SPA) (with valid ID of
                  applicant and representative)
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <base-checkbox label="2. Tax Declaration of Lot" />
        </li>
        <li>
          <base-checkbox
            label="3. Tax Clearance of Real Property for Lot (updated)"
          />
        </li>
        <li>
          <base-checkbox
            label="4. Barangay Clearance (for construction - original copy)"
          />
        </li>
        <li>
          <base-checkbox
            label="5. Homeowner's Clearance (for construction - original copy)"
          />
        </li>
        <li>
          <base-checkbox label="6. Affidavit of Undertaking" />
          <ul class="sub-list">
            <li>
              (for National Agencies Clearances, Barangay Clearance, HOA
              Clearance and Neighbor's Consent)
            </li>
          </ul>
        </li>
      </ul>

      <base-file-uploader
        name="tct"
        fileLabel="tct"
        :properties="getProperty('tct')"
        type="property"
        :hasError="uploadErrors.tct"
      />
      <!-- <base-file-uploader
        label="2. Tax Declaration of Lot"
        name="taxdeclaration"
        fileLabel="tax_declaration"
        :properties="getProperty('tax_declaration')"
        type="property"
        :hasError="uploadErrors.tax_declaration"
      />
      <base-file-uploader
        label="3. Tax Clearance of Real Property for Lot (updated)"
        name="taxclearance"
        fileLabel="tax_clearance"
        :properties="getProperty('tax_clearance')"
        type="property"
        :hasError="uploadErrors.tax_clearance"
      />
      <base-file-uploader
        label="4. Barangay Clearance (for construction - original copy)"
        name="brgyclearance"
        fileLabel="barangay_clearance"
        :properties="getProperty('barangay_clearance')"
        type="property"
        :hasError="uploadErrors.barangay_clearance"
      />
      <base-file-uploader
        label="5. Homeowner's Clearance (for construction - original copy)"
        name="homeownerclearance"
        fileLabel="home_owner_clearance"
        :properties="getProperty('home_owner_clearance')"
        type="property"
        :hasError="uploadErrors.home_owner_clearance"
      />
      <base-file-uploader
        label="6. Affidavit of Undertaking"
        description="(for National Agencies Clearances, Barangay Clearance, HOA Clearance and Neighbor's Consent)"
        name="undertakingaffidavit"
        fileLabel="undertaking_affidavit"
        :properties="getProperty('undertaking_affidavit')"
        type="property"
        :hasError="uploadErrors.undertaking_affidavit"
      /> -->
    </div>
    <div class="meta-form-group mb60">
      <div class="meta-group-title">B. Technical Documents</div>
      <!-- <base-file-uploader
        label="1. Unified Application form for Building Permit and FSEC"
        name="unifiedapplicationform"
        fileLabel="unified_application_form"
        :properties="getProperty('unified_application_form')"
        type="property"
        :hasError="uploadErrors.unified_application_form"
      /> -->
      <ul class="parent-list">
        <li>
          <base-checkbox label="1a. Ancillary Forms - Architectural Permit" />
        </li>
        <li>
          <base-checkbox
            label="1b. Ancillary Forms - Civil/Structural Permit"
          />
        </li>
        <li>
          <base-checkbox
            label="1c. Ancillary Forms - Sanitary/Plumbing Permit"
          />
        </li>
        <li>
          <base-checkbox label="1d. Ancillary Forms - Mechanical Permit" />
        </li>
        <li>
          <base-checkbox label="1e. Ancillary Forms - Sign Permit" />
        </li>
        <li>
          <base-checkbox label="1f. Ancillary Forms - Electronic Permit" />
        </li>
        <li>
          <base-checkbox label="2. Locational Clearance Application Form" />
        </li>
        <li>
          <base-checkbox
            label="3. Contractor's Temporary Business Permit Application Form"
          />
        </li>
        <li>
          <base-checkbox
            label="4. Relocation Survey Report and Lot Plan with Vicinity Maps"
          />
          <ul class="sub-list">
            <li>Duly signed and sealed by a licensed GE.</li>
          </ul>
        </li>
        <li>
          <base-checkbox
            label="5. Photocopy of updated valid PRC ID's and PTR of Engrs/Arch"
          />
          <ul class="sub-list">
            <li>Duly signed and sealed by a licensed GE.</li>
          </ul>
        </li>
        <li>
          <base-checkbox label="6. Project Specification" />
          <ul class="sub-list">
            <li>To be signed and sealed by Engr/Arch.</li>
          </ul>
        </li>
        <li>
          <base-checkbox label="7. Notarized Bill of Materials" />
          <ul class="sub-list">
            <li>To be signed and sealed by Engr/Arch.</li>
          </ul>
        </li>
        <li>
          <base-checkbox
            label="8. Structural Design Analysis and Computation"
          />
          <ul class="sub-list">
            <li>For structure two(2) storey and above NSCP 5th Edition.</li>
          </ul>
        </li>
        <li>
          <base-checkbox label="9. Geotech Report / Soil Boring Test Report" />
          <ul class="sub-list">
            <li>For building structures three(3) storey and above.</li>
          </ul>
        </li>
        <li>
          <base-checkbox label="10. Selsmic Analysis" />
          <ul class="sub-list">
            <li>For building exceeding 7.5 meters in height.</li>
          </ul>
        </li>
        <li>
          <base-checkbox label="11. Complete and Detailed Building Plans" />
          <ul class="sub-list">
            <li>
              Scale of 1:100 duly signed and sealed by the design professionals.
            </li>
            <li>
              Green Building Code (must be observed for construction of more
              than 10,000m' floor area)
            </li>
            <li>Fire Protection Plan (if applicable)</li>
          </ul>
        </li>
        <li>
          <base-checkbox
            label="12. Construction Safety and Health Program (DOLE)"
          />
          <ul class="sub-list">
            <li>For Commercial Establishment.</li>
          </ul>
        </li>
      </ul>
      <base-file-uploader
        name="ancillaryarchitectural"
        fileLabel="architectural_permit"
        :properties="getProperty('architectural_permit')"
        type="property"
        :hasError="uploadErrors.architectural_permit"
      />
    </div>

    <!-- C. Supplementary Documents  -->
    <div class="meta-form-group mb60">
      <div class="meta-group-title">C. Supplementary Documents</div>
      <ul class="parent-list">
        <li>
          <base-checkbox label="Sketch or Key Pin" />
          <ul class="sub-list">
            <li>
              With clear landmarks leading to the lot with name and number of
              contact person
            </li>
          </ul>
        </li>
        <li>
          <base-checkbox label="Picture of site/location (colored copy)" />
        </li>
      </ul>
      <base-file-uploader
        name="sketchpin"
        fileLabel="sketch_pin"
        :properties="getProperty('sketch_pin')"
        type="property"
        :hasError="uploadErrors.sketch_pin"
      />
      <!-- <base-file-uploader
        label="2. Picture of site/location (colored copy)"
        name="pictureofsite"
        fileLabel="picture_of_site"
        :properties="getProperty('picture_of_site')"
        type="property"
        :hasError="uploadErrors.picture_of_site"
      /> -->
    </div>
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
import BaseCheckbox from "@/components/forms/BaseCheckbox";
import { mapGetters } from "vuex";
export default {
  name: "BuildingUploadStep",
  components: {
    ButtonBlock,
    BaseFileUploader,
    BaseCheckbox,
  },
  mounted() {
    this.getRequirements();
  },
  data() {
    return {
      required: [
        "tct",
        "tax_declaration",
        "tax_clearance",
        "barangay_clearance",
        "home_owner_clearance",
        "undertaking_affidavit",
        // "unified_application_form",
        // "architectural_permit",
        // "civil_structural_permit",
        // "sanitary_plumbing_permit",
        // "mechanical_permit",
        // "sign_permit",
        // "electronic_permit",
        // "location_clearance",
        "contractor_business_permit", // B4
        "relocation_survey", // B5
        "prc_id", // B6
        "project_specification", // B7
        "bill_of_materials", // B8
        "building_plans", // B12
        "sketch_pin",
        "picture_of_site",
      ],
      uploadErrors: {},
    };
  },
  computed: {
    ...mapGetters([
      "buildingApplicationRequirements",
      "buildingRequirements",
      "draftProperty",
    ]),
  },
  methods: {
    validateRequiredFields() {
      this.uploadErrors = {};
      let validated = [];
      if (this.buildingRequirements) {
        if (this.buildingRequirements.buildingrequirements) {
          if (this.buildingRequirements.buildingrequirements.length > 0) {
            this.buildingRequirements.buildingrequirements.map((item) => {
              if (this.required.includes(item.requirements_label)) {
                validated.push(item.requirements_label);
              }
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
          return false;
        }
      }
    },
    previousStep() {
      this.$store.commit("setCurrentApplicationStep", "2");
    },
    async nextStep() {
      if (!this.draftProperty) {
        let isValidated = this.validateRequiredFields();
        if (isValidated) {
          let payload = { is_draft: false };
          await this.$store.dispatch("updateBuildingApplication", payload);
          this.$store.commit("setCurrentApplicationStep", "4");
        } else {
          this.$swal({
            title: "Failed!",
            text:
              "Please upload the remaining requirements before you submit the application.",
            icon: "error",
          });
        }
      }
    },
    async getRequirements() {
      if (this.buildingApplicationRequirements.id) {
        await this.$store.dispatch("getBuildingApplicationRequirements");
      }
    },
    getProperty(key) {
      if (this.buildingRequirements.id) {
        if (this.buildingRequirements.buildingrequirements.length > 0) {
          let property = {};
          property = this.buildingRequirements.buildingrequirements.find(
            (element) => {
              if (element.requirements_label === key) {
                return element;
              }
            }
          );
          return property;
        }
      }
    },
  },
  watch: {
    draftProperty: {
      deep: true,
      handler(status) {
        if (status) {
          this.$swal({
            title: "Success!",
            text: "data successfully saved as draft.",
            icon: "success",
          }).then((value) => {
            this.$store.commit("setDraftProperty", false);
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
  div.meta-form-group {
    width: 100%;
    div.meta-group-title {
      color: #2699fb;
      font-size: 20px;
      line-height: 19px;
      width: 100%;
      margin-bottom: 30px;
      font-weight: bold;
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

  div.meta-container div.meta-form-group div.meta-group-title {
    font-size: 16px;
    margin-bottom: 20px;
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

  div.meta-container div.meta-form-group div.meta-group-title {
    font-size: 15px;
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
