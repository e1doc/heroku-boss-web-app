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
              >1. Electronic copy of Transfer Certicicate of Title (TCT)
              (original copy)</label
            >
          </div>
          <!-- DETAILS -->
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
            <label for="legal_docs_2">2. Tax Declaration of Lot</label>
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
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="legal_docs_3"
              >3. Tax Clearance of Real Property for Lot (updated)</label
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
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="legal_docs_4"
              >4. Barangay Clearance (for construction - original copy)</label
            >
          </div>
        </li>

        <!-- A. LEGAL DOCUMENTS 5 -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="legal_docs_5"
              v-model="legal_documents.legal_docs_5"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="legal_docs_5"
              >5. Homeowner's Clearance (for construction - original
              copy)</label
            >
          </div>
        </li>

        <!-- A. LEGAL DOCUMENTS 6 -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="legal_docs_6"
              v-model="legal_documents.legal_docs_6"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="legal_docs_6">6. Affidavit of Undertaking</label>
          </div>
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
        uploadType="application/pdf"
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
        <!-- B. TECHNICAL DOCS 1a -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="tech_docs_1a"
              v-model="technical_documents.tech_docs_1a"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="tech_docs_1a"
              >1a. Ancillary Forms - Architectural Permit</label
            >
          </div>
        </li>

        <!-- B. TECHNICAL DOCS 1b -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="tech_docs_1b"
              v-model="technical_documents.tech_docs_1b"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="tech_docs_1b"
              >1b. Ancillary Forms - Civil/Structural Permit</label
            >
          </div>
        </li>

        <!-- B. TECHNICAL DOCS 1c -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="tech_docs_1c"
              v-model="technical_documents.tech_docs_1c"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="tech_docs_1c"
              >1c. Ancillary Forms - Sanitary/Plumbing Permit</label
            >
          </div>
        </li>

        <!-- B. TECHNICAL DOCS 1d -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="tech_docs_1d"
              v-model="technical_documents.tech_docs_1d"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="tech_docs_1d"
              >1d. Ancillary Forms - Mechanical Permit</label
            >
          </div>
        </li>

        <!-- B. TECHNICAL DOCS 1e -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="tech_docs_1e"
              v-model="technical_documents.tech_docs_1e"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="tech_docs_1e">1e. Ancillary Forms - Sign Permit</label>
          </div>
        </li>

        <!-- B. TECHNICAL DOCS 1f -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="tech_docs_1f"
              v-model="technical_documents.tech_docs_1f"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="tech_docs_1f"
              >1f. Ancillary Forms - Electronic Permit</label
            >
          </div>
        </li>

        <!-- B. TECHNICAL DOCS 2 -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="tech_docs_2"
              v-model="technical_documents.tech_docs_2"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="tech_docs_2"
              >2. Locational Clearance Application Form</label
            >
          </div>
        </li>

        <!-- B. TECHNICAL DOCS 3 -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="tech_docs_3"
              v-model="technical_documents.tech_docs_3"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="tech_docs_3"
              >3. Contractor's Temporary Business Permit Application Form</label
            >
          </div>
        </li>

        <!-- B. TECHNICAL DOCS 4 -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="tech_docs_4"
              v-model="technical_documents.tech_docs_4"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="tech_docs_4"
              >4. Relocation Survey Report and Lot Plan with Vicinity
              Maps</label
            >
          </div>
          <ul class="sub-list">
            <li>Duly signed and sealed by a licensed GE.</li>
          </ul>
        </li>

        <!-- B. TECHNICAL DOCS 5 -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="tech_docs_5"
              v-model="technical_documents.tech_docs_5"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="tech_docs_5"
              >5. Photocopy of updated valid PRC ID's and PTR of
              Engrs/Arch</label
            >
          </div>
          <ul class="sub-list">
            <li>Duly signed and sealed by a licensed GE.</li>
          </ul>
        </li>

        <!-- B. TECHNICAL DOCS 6 -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="tech_docs_6"
              v-model="technical_documents.tech_docs_6"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="tech_docs_6">6. Project Specification</label>
          </div>
          <ul class="sub-list">
            <li>To be signed and sealed by Engr/Arch.</li>
          </ul>
        </li>

        <!-- B. TECHNICAL DOCS 7 -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="tech_docs_7"
              v-model="technical_documents.tech_docs_7"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="tech_docs_7">7. Notarized Bill of Materials</label>
          </div>
          <ul class="sub-list">
            <li>To be signed and sealed by Engr/Arch.</li>
          </ul>
        </li>

        <!-- B. TECHNICAL DOCS 8 -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="tech_docs_8"
              v-model="technical_documents.tech_docs_8"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="tech_docs_8"
              >8. Structural Design Analysis and Computation</label
            >
          </div>
          <ul class="sub-list">
            <li>For structure two(2) storey and above NSCP 5th Edition.</li>
          </ul>
        </li>

        <!-- B. TECHNICAL DOCS 9 -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="tech_docs_9"
              v-model="technical_documents.tech_docs_9"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="tech_docs_9"
              >9. Geotech Report / Soil Boring Test Report</label
            >
          </div>
          <ul class="sub-list">
            <li>For building structures three(3) storey and above.</li>
          </ul>
        </li>

        <!-- B. TECHNICAL DOCS 10 -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="tech_docs_10"
              v-model="technical_documents.tech_docs_10"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="tech_docs_10">10. Selsmic Analysis</label>
          </div>
          <ul class="sub-list">
            <li>For building exceeding 7.5 meters in height.</li>
          </ul>
        </li>

        <!-- B. TECHNICAL DOCS 11 -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="tech_docs_11"
              v-model="technical_documents.tech_docs_11"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="tech_docs_11"
              >11. Complete and Detailed Building Plans</label
            >
          </div>
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

        <!-- B. TECHNICAL DOCS 12 -->
        <li>
          <div class="meta-checkbox flex-center">
            <input
              type="checkbox"
              id="tech_docs_12"
              v-model="technical_documents.tech_docs_12"
            />
            <div class="custom-checkbox flex-center">
              <span class="check"
                ><font-awesome-icon icon="check" class="mr5 check-icon"
              /></span>
            </div>
            <label for="tech_docs_12"
              >12. Construction Safety and Health Program (DOLE)</label
            >
          </div>
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
        uploadType="application/pdf"
        :hasError="uploadErrors.architectural_permit"
      />
    </div>

    <!-- C. Supplementary Documents  -->
    <div class="meta-form-group mb60">
      <div class="meta-group-title">C. Supplementary Documents</div>
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
            <label for="supp_docs_1">1. Sketch or Key Pin</label>
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
              >2. Picture of site/location (colored copy)</label
            >
          </div>
        </li>
      </ul>

      <base-file-uploader
        name="sketchpin"
        fileLabel="sketch_pin"
        :properties="getProperty('sketch_pin')"
        type="property"
        uploadType="application/pdf"
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
        legal_docs_5: false,
        legal_docs_6: false,
      },
      technical_documents: {
        tech_docs_1a: false,
        tech_docs_1b: false,
        tech_docs_1c: false,
        tech_docs_1d: false,
        tech_docs_1e: false,
        tech_docs_1f: false,
        tech_docs_2: false,
        tech_docs_3: false,
        tech_docs_4: false,
        tech_docs_5: false,
        tech_docs_6: false,
        tech_docs_7: false,
        tech_docs_8: false,
        tech_docs_9: false,
        tech_docs_10: false,
        tech_docs_11: false,
        tech_docs_12: false,
      },
      supplementary_documents: {
        supp_docs_1: false,
        supp_docs_2: false,
      },
      required: [
        "tct",
        // "tax_declaration",
        // "tax_clearance",
        // "barangay_clearance",
        // "home_owner_clearance",
        // "undertaking_affidavit",
        // "unified_application_form",
        "architectural_permit",
        // "civil_structural_permit",
        // "sanitary_plumbing_permit",
        // "mechanical_permit",
        // "sign_permit",
        // "electronic_permit",
        // "location_clearance",
        // "contractor_business_permit", // B4
        // "relocation_survey", // B5
        // "prc_id", // B6
        // "project_specification", // B7
        // "bill_of_materials", // B8
        // "building_plans", // B12
        "sketch_pin",
        // "picture_of_site",
      ],
      uploadErrors: {},
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
      this.$store.commit("setLoading", true);

      console.log("legal ", this.legalDocuments.id);
      console.log("technical ", this.technicalDocuments.id);
      console.log("supplementary ", this.supplementaryDocuments.id);

      await this.$store.dispatch("setBuildingCheckList", {
        application_number: this.application_number,
        value: parseLegalDocs,
        category: "legal",
      });

      await this.$store.dispatch("setBuildingCheckList", {
        application_number: this.application_number,
        value: parseTechnicalDocs,
        category: "technical",
      });

      await this.$store.dispatch("setBuildingCheckList", {
        application_number: this.application_number,
        value: parseSupplementaryDocs,
        category: "supplementary",
      });
      this.$store.commit("setLoading", false);
    },
    async editBuildingCheckList() {
      let parseLegalDocs = JSON.stringify(this.legal_documents);
      let parseTechnicalDocs = JSON.stringify(this.technical_documents);
      let parseSupplementaryDocs = JSON.stringify(this.supplementary_documents);
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
    font-size: 13px;
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
