<template>
  <div class="meta-container flex-center building-application">
    <h1 class="meta-form-title">Upload your Requirements</h1>
    <div class="meta-note">
      Almost Done! Please upload your file. Only allowed format - PDF.
    </div>

    <!----------------------------- A. LEGAL DOCUMENTS ------------------------------------------>
    <div class="meta-form-group mb60">
      <div class="meta-group-title">
        A. Legal Documents - Only one PDF File for all legal documents.
      </div>
      <div class="meta-check-group">
        <div @click="checkRequirements(legal_documents, true)">
          <font-awesome-icon icon="check" class="mr5 check-icon" />Check All
        </div>
        <div @click="checkRequirements(legal_documents, false)">
          <font-awesome-icon icon="times" class="mr5 x-icon" /> Uncheck All
        </div>
      </div>
      <ul class="parent-list">
        <!-- A. LEGAL DOCUMENTS 1 -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="legal_docs_1"
              v-model="legal_documents.legal_docs_1"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="legal_docs_1"
              >1. Certified true copy of Transfer Certificate of Title
              (TCT) <span class="copy-indicator">1 Original copy</span></label
            >
          </div>
          <!-- DETAILS -->
          <ul class="main-list">
            <li>
              If TCT is NOT YET in the name of the applicant, any of the
              following:  <span class="copy-indicator">1 Photocopy</span>
              <ul class="sub-list">
                <li>Deed of Absolute Sale - Notarized</li>
                <li>Contract to Sell - Notarized</li>
                <li>Deed of Assignment / Donation or any equivalent - Notarized</li>
              </ul>
            </li>
            <li>
              If the applicant is a LESSEE or TCT is in the name of a
              Corporation, upload: <span class="copy-indicator">1 Photocopy</span>
              <ul class="sub-list">
                <li>Lease Contract - Notarized</li>
                <li>
                  Corporate Secretary's Certificate (authorizing the signatory
                  with general information sheet) - Notarized
                </li>
              </ul>
            </li>
            <li>
              If the applicant is NOT the registered owner or with co-owner of
              the land, upload: 
              <ul class="sub-list">
                <li>Affidavit of Consent - Notarized <span class="copy-indicator">1 Photocopy</span></li>
                <li>Extrajudicial Settlement - Notarized <span class="copy-indicator">1 Photocopy</span></li>
              </ul>
            </li>
            <li>
              If the applicant has a Representative
              <ul class="sub-list">
                <li>
                  Authorization Letter to APPLY in behalf of the applicant (with
                  valid ID of applicant and representative) - Notarized <span class="copy-indicator">1 Original Copy</span>
                </li>
                <li>
                  Special Power of Attorney (SPA) to SIGN in behalf of the
                  applicant (with valid ID of applicant and representative) - Notarized <span class="copy-indicator">1 Photocopy</span>
                </li>
              </ul>
            </li>
          </ul>
        </li>

        <!-- A. LEGAL DOCUMENTS 2 -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="legal_docs_2"
              v-model="legal_documents.legal_docs_2"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="legal_docs_2"
              >2. Tax Declaration of Real Property <span class="copy-indicator">1 Photocopy</span></label
            >
          </div>
        </li>

        <!-- A. LEGAL DOCUMENTS 3 -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="legal_docs_3"
              v-model="legal_documents.legal_docs_3"
            />
            <div class="custom-checkbox flex-center">
              <span class="check">
                <font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="legal_docs_3"
              >3. Tax Clearance of Real Property - Current Year <span class="copy-indicator">1 Photocopy</span></label
            >
          </div>
        </li>

        <!-- A. LEGAL DOCUMENTS 4 -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="legal_docs_4"
              v-model="legal_documents.legal_docs_4"
            />
            <div class="custom-checkbox flex-center">
              <span class="check">
                <font-awesome-icon icon="check" class="mr5 check-icon" />
              </span>
            </div>
            <label for="legal_docs_4"
              >4. Local and National Agencies Clearances <span class="copy-indicator">1 ORIGINAL COPY</span></label
            >
          </div>
          <ul class="sub-list">
            <li>Barangay Clearance (for construction)</li>
            <li>Homeowner's Clearance (for construction)</li>
            <li>National Agencies Clearance</li>
            <li>Affidavit of Undertaking - Notarized</li>
          </ul>
        </li>
      </ul>

      <base-file-uploader
        fileLabel="tct"
        :properties="getProperty('tct')"
        type="property"
        :hasError="uploadErrors.tct"
      />
    </div>

    <!----------------------------- B. TECHNICAL DOCUMENTS -------------------------------------->
    <div class="meta-form-group mb60">
      <div class="meta-group-title">B. Technical Documents</div>
      <div class="meta-check-group">
        <div @click="checkRequirements(technical_documents, true)">
          <font-awesome-icon icon="check" class="mr5 check-icon" />Check All
        </div>
        <div @click="checkRequirements(technical_documents, false)">
          <font-awesome-icon icon="times" class="mr5 x-icon" /> Uncheck All
        </div>
      </div>
      <ul class="parent-list">
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="tech_docs_1"
              v-model="technical_documents.tech_docs_1"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="tech_docs_1">1. Application Forms</label>
          </div>
          <ul class="main-list">
            <li>United Application Form for Building Permit and FSEC(signed and dry seal by an Engineer/Architect and applicant on all pages) - Notarized <span class="copy-indicator">5 Copies</span></li>
            <li>
              Ancillary Application Forms <span class="copy-indicator">5 Copies Each</span>
              <ul class="sub-list">
                <li>Architectural Permit</li>
                <li>Civil/Structural Permit</li>
                <li>Sanitary/Plumbing Permit</li>
                <li>Mechanical Permit</li>
                <li>Sign Permit</li>
                <li>Mechanical Permit</li>
                <li>Electronic Permit</li>
              </ul>
            </li>
            <li>Locational Clearance Application Form <span class="copy-indicator">1 Copy</span></li>
            <li>Contractor's Temporary Business Permit Application Form <span class="copy-indicator">1 Copy</span></li>
          </ul>
        </li>
      </ul>
      <base-file-uploader
        fileLabel="architectural_permit"
        :properties="getProperty('architectural_permit')"
        type="property"
        :hasError="uploadErrors.architectural_permit"
      />
    </div>

    <!----------------------------- C. DESIGN PLANS -------------------------------------->
    <!-- <div class="meta-form-group mb60">
      <div class="meta-group-title">C. Design Plans</div>
      <div class="meta-check-group">
        <div @click="checkRequirements(design_plans, true)">
          <font-awesome-icon icon="check" class="mr5 check-icon" />Check All
        </div>
        <div @click="checkRequirements(design_plans, false)">
          <font-awesome-icon icon="times" class="mr5 x-icon" /> Uncheck All
        </div>
      </div>
      <ul class="parent-list">
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="design_1"
              v-model="design_plans.design_1"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="design_1">1. Survey Plans</label>
          </div>
          <ul class="sub-list">
            <li>Relocation Survey Report and Certification</li>
            <li>Lot Plan with Vicinity Map</li>
          </ul>
        </li>

        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="design_2"
              v-model="design_plans.design_2"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="design_2">2. Building Plans</label>
          </div>
          <ul class="sub-list">
            <li>Short Circuit Analysis and Voltage Drop Calculation</li>
            <li>Green Building Code</li>
            <li>Fire Protection Plan</li>
          </ul>
        </li>
      </ul>
      <base-file-uploader
        fileLabel="design_plans"
        :properties="getProperty('design_plans')"
        type="property"
        :hasError="uploadErrors.design_plans"
      />
    </div> -->
    
    <!----------------------------- C. DESIGN SPECIFICATIONS AND DOCUMENTS -------------------------------------->
    <div class="meta-form-group mb60">
      <div class="meta-group-title">C. Design Specifications and Documents</div>
      <div class="meta-check-group">
        <div @click="checkRequirements(design_specs, true)">
          <font-awesome-icon icon="check" class="mr5 check-icon" />Check All
        </div>
        <div @click="checkRequirements(design_specs, false)">
          <font-awesome-icon icon="times" class="mr5 x-icon" /> Uncheck All
        </div>
      </div>
      <ul class="parent-list">
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="specs_1"
              v-model="design_specs.specs_1"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="specs_1">1. Design Specifications and Documents</label>
          </div>
          <ul class="sub-list">
            <li>Project Specification <span class="copy-indicator">2 Copies</span></li>
            <li>Bill of Materials <span class="copy-indicator">3 Copies</span></li>
            <li>Structural Design Analysis and Computation (for structure two(2) storey and above NSCP 5th Edition) <span class="copy-indicator">1 Copy</span></li>
            <li>Geotech Report/Soil Boring Test Report (for building structures three(3) storey and above) <span class="copy-indicator">1 Copy</span></li>
            <li>Seismic Analysis (for building exceeding 7.5 meters in height) <span class="copy-indicator">1 Copy</span></li>
          </ul>
        </li>

        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="specs_2"
              v-model="design_specs.specs_2"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="specs_2"
              >2. PRC ID's and PTR of Engineer's and Architect <span class="copy-indicator">1 Photocopy</span></label
            >
          </div>
        </li>

        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="specs_3"
              v-model="design_specs.specs_3"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="specs_3"
              >3. PCAB License of Electrical Contractor for Electrical
              Works  <span class="copy-indicator">1 Colored Copy</span></label
            >
          </div>
        </li>

        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="specs_4"
              v-model="design_specs.specs_4"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="specs_4"
              >4. Construction Safety and Health Program (DOLE) <span class="copy-indicator">1 Original Copy</span></label
            >
          </div>
        </li>
      </ul>
      <base-file-uploader
        fileLabel="design_specs"
        :properties="getProperty('design_specs')"
        type="property"
        :hasError="uploadErrors.design_specs"
      />
    </div>

    <!----------------------------- D. SUPPLEMENTARY DOCUMENTS ---------------------------------->
    <div class="meta-form-group mb60">
      <div class="meta-group-title">D. Supplementary Documents</div>
      <div class="meta-check-group">
        <div @click="checkRequirements(supplementary_documents, true)">
          <font-awesome-icon icon="check" class="mr5 check-icon" />Check All
        </div>
        <div @click="checkRequirements(supplementary_documents, false)">
          <font-awesome-icon icon="times" class="mr5 x-icon" /> Uncheck All
        </div>
      </div>
      <ul class="parent-list">
        <!-- C. SUPPLEMENTARY DOCS 1 -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="supp_docs_1"
              v-model="supplementary_documents.supp_docs_1"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="supp_docs_1">1. Sketch <span class="copy-indicator">1 Copy</span></label>
          </div>
          <ul class="sub-list">
            <li>
              With clear landmarks leading to the lot with name and number of
              contact person
            </li>
          </ul>
        </li>

        <!-- C. SUPPLEMENTARY DOCS 2 -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="supp_docs_2"
              v-model="supplementary_documents.supp_docs_2"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="supp_docs_2"
              >2. Picture of site/location  <span class="copy-indicator">1 Colored Copy</span></label
            >
          </div>
        </li>
      </ul>

      <base-file-uploader
        fileLabel="sketch_pin"
        :properties="getProperty('sketch_pin')"
        type="property"
        :hasError="uploadErrors.sketch_pin"
      />
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
    this.scrollToTop();
    this.getRequirements();
    this.application_number = this.buildingApplicationRequirements.id;
  },
  data() {
    return {
      application_number: 0,
      legal_documents: {
        legal_docs_1: false,
        legal_docs_2: false,
        legal_docs_3: false,
        legal_docs_4: false,
        // legal_docs_5: false,
        // legal_docs_6: false,
      },
      technical_documents: {
        tech_docs_1: false,
      },
      design_plans: {
        design_1: false,
        design_2: false,
      },
      design_specs: {
        specs_1: false,
        specs_2: false,
        specs_3: false,
        specs_4: false,
      },
      supplementary_documents: {
        supp_docs_1: false,
        supp_docs_2: false,
      }, 
      required: [
        "tct",
        "architectural_permit",
        // "design_plans",
        "design_specs",
        "sketch_pin",
      ],
      uploadErrors: {
        tct: false,
        architectural_permit: false,
        // design_plans: false,
        design_specs: false,
        sketch_pin: false,
      },
    };
  },
  computed: {
    ...mapGetters([
      "buildingApplicationRequirements",
      "buildingRequirements",
      "draftProperty",
      "buildingApplication",
      "legalDocuments",
      "technicalDocuments",
      "supplementaryDocuments",
      "designPlans",
      "designSpecs",
    ]),
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    checkRequirements(type, action) {
      for (let item in type) {
        type[item] = action;
      }
    },
    validateRequiredFields() {
      this.uploadErrors = {};
      let validated = [];
      if (this.buildingRequirements) {
        if (this.buildingRequirements.buildingrequirements) {
          if (this.buildingRequirements.buildingrequirements.length > 0) {
            this.buildingRequirements.buildingrequirements.map((item) => {
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
            if (!validated.includes(element)) {
              this.uploadErrors[`${element}`] = true;
            }
          });
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
          let application_status;
          this.buildingApplication.application_status == 1
            ? (application_status = 0)
            : this.buildingApplication.application_status == 4
            ? (application_status = 3)
            : (application_status = 0);
          let payload = {
            is_draft: false,
            application_status: application_status,
            is_disapprove: false,
            last_submitted: new Date(Date.now()),
          };
          await this.$store.dispatch("updateBuildingApplication", payload);
          if (this.legalDocuments.id) {
            await this.editBuildingCheckList();
          } else {
            await this.sendBuildingCheckList();
          }
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
    async sendBuildingCheckList() {
      let parseLegalDocs = JSON.stringify(this.legal_documents);
      let parseTechnicalDocs = JSON.stringify(this.technical_documents);
      let parseSupplementaryDocs = JSON.stringify(this.supplementary_documents);
      let parseDesignPlans = JSON.stringify(this.design_plans);
      let parseDesignSpecs = JSON.stringify(this.design_specs);
      this.$store.commit("setLoading", true);

      await this.$store.dispatch("setBuildingCheckList", {
        application_number: this.buildingApplicationRequirements.id,
        value: parseLegalDocs,
        category: "legal",
      });

      await this.$store.dispatch("setBuildingCheckList", {
        application_number: this.buildingApplicationRequirements.id,
        value: parseTechnicalDocs,
        category: "technical",
      });

      await this.$store.dispatch("setBuildingCheckList", {
        application_number: this.buildingApplicationRequirements.id,
        value: parseSupplementaryDocs,
        category: "supplementary",
      });

      await this.$store.dispatch("setBuildingCheckList", {
        application_number: this.buildingApplicationRequirements.id,
        value: parseDesignPlans,
        category: "design_plans",
      });

      await this.$store.dispatch("setBuildingCheckList", {
        application_number: this.buildingApplicationRequirements.id,
        value: parseDesignSpecs,
        category: "design_specs",
      });

      this.$store.commit("setLoading", false);
    },
    async editBuildingCheckList() {
      let parseLegalDocs = JSON.stringify(this.legal_documents);
      let parseTechnicalDocs = JSON.stringify(this.technical_documents);
      let parseSupplementaryDocs = JSON.stringify(this.supplementary_documents);
      let parseDesignPlans = JSON.stringify(this.design_plans);
      let parseDesignSpecs = JSON.stringify(this.design_specs);
      this.$store.commit("setLoading", true);

      await this.$store.dispatch("updateBuildingCheckList", {
        id: this.legalDocuments.id,
        category: "legal",
        value: parseLegalDocs,
        application_number: this.buildingApplicationRequirements.id,
      });

      await this.$store.dispatch("updateBuildingCheckList", {
        id: this.technicalDocuments.id,
        category: "technical",
        value: parseTechnicalDocs,
        application_number: this.buildingApplicationRequirements.id,
      });

      await this.$store.dispatch("updateBuildingCheckList", {
        id: this.supplementaryDocuments.id,
        category: "supplementary",
        value: parseSupplementaryDocs,
        application_number: this.buildingApplicationRequirements.id,
      });
      await this.$store.dispatch("updateBuildingCheckList", {
        id: this.designPlans.id,
        category: "design_plans",
        value: parseDesignPlans,
        application_number: this.buildingApplicationRequirements.id,
      });
      await this.$store.dispatch("updateBuildingCheckList", {
        id: this.designSpecs.id,
        category: "design_specs",
        value: parseDesignSpecs,
        application_number: this.buildingApplicationRequirements.id,
      });
      this.$store.commit("setLoading", false);
    },
    async getRequirements() {
      if (this.buildingApplicationRequirements.id) {
        await this.$store.dispatch("getBuildingApplicationRequirements");
        if (this.legalDocuments.id) {
          this.legal_documents = await JSON.parse(this.legalDocuments.value);
        }
        if (this.technicalDocuments.id) {
          this.technical_documents = await JSON.parse(
            this.technicalDocuments.value
          );
        }
        if (this.supplementaryDocuments.id) {
          this.supplementary_documents = await JSON.parse(
            this.supplementaryDocuments.value
          );
        }
        if (this.designPlans.id) {
          this.design_plans = await JSON.parse(this.designPlans.value);
        }
        if (this.designSpecs.id) {
          this.design_specs = await JSON.parse(this.designSpecs.value);
        }
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
          }).then(async (value) => {
            if (this.legalDocuments.id) {
              await this.editBuildingCheckList();
            } else {
              await this.sendBuildingCheckList();
            }
            await this.$store.commit("setDraftProperty", false);
            await this.$router.push({ name: "Profile" });
          });
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.meta-check-group {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  div {
    padding: 10px;
    cursor: pointer;
    color: #2699fb;
    font-weight: 700;
    .check-icon {
      color: #81c784;
      font-size: 14px;
    }
    .x-icon {
      color: #e23a36;
    }
  }
  div:hover {
    text-decoration: underline;
  }
}
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

div.meta-checkbox {
  position: relative;
  label {
    font-size: 16px;
    line-height: 1.6;
  }
  input[type="checkbox"] {
    height: 17px;
    width: 17px;
    opacity: 0;
    left: 0;
    top: 3px;
    position: absolute;
    z-index: 2;
    cursor: pointer;
  }
  .custom-checkbox {
    height: 15px;
    width: 15px;
    border: 2px solid #2593f1;
    margin-right: 12px;
    .check-icon {
      color: #fff;
      font-size: 14px;
      display: none;
    }
  }
  input[type="checkbox"]:checked + .custom-checkbox {
    background-color: #2593f1;
    .check-icon {
      display: block;
    }
  }
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
