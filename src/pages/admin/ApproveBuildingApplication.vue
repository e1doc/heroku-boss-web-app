<template>
  <div class="meta-parent-box">
    <modal
      name="inspectionModal"
      :classes="['vue-modal']"
      width="50%"
      height="auto"
      :adaptive="true"
    >
      <inspection-modal />
    </modal>
    <div class="meta-container flex-wrap" ref="content">
      <div class="meta-form-body flex-wrap">
        <h1 class="meta-form-title">Building Application Details</h1>

        <div class="meta-text-group flex-wrap">
          <div class="meta-text no-bb">
            <div class="meta-label">Application Number :</div>
            <div class="meta-value">
              #{{ buildingApplication.series_number }}
            </div>
          </div>
          <div class="meta-text">
            <div class="meta-label">Ownership Type:</div>
            <div class="meta-value">
              {{ buildingBasicInformation.ownership_type }}
            </div>
          </div>
        </div>
        <!-- Owner / Applicant : -->
        <div class="meta-text-group flex-wrap">
          <div class="meta-group-title">Owner / Applicant :</div>
          <div class="meta-text w3 no-br">
            <div class="meta-label">Last Name :</div>
            <div class="meta-value">
              {{ buildingBasicInformation.owner_last_name }}
            </div>
          </div>
          <div class="meta-text w3 no-br">
            <div class="meta-label">First Name :</div>
            <div class="meta-value">
              {{ buildingBasicInformation.owner_first_name }}
            </div>
          </div>
          <div class="meta-text w3 no-br">
            <div class="meta-label">Middle Initial :</div>
            <div class="meta-value">
              {{ buildingBasicInformation.owner_middle_name }}
            </div>
          </div>
          <div class="meta-text w3">
            <div class="meta-label">TIN :</div>
            <div class="meta-value">{{ buildingBasicInformation.tin }}</div>
          </div>
        </div>

        <!-- Name of President/Treasurer of Corporation : -->
        <!-- <div class="meta-text-group flex-wrap">
          <div class="meta-group-title">
            For Construction Owned by an Enterprise :
          </div>
          <div class="meta-text no-bb">
            <div class="meta-label">Area No.</div>
            <div class="meta-value">
              {{ buildingDetails.area_no }}
            </div>
          </div>
          <div class="meta-text">
            <div class="meta-label">Form of Ownership</div>
            <div class="meta-value">
              {{ buildingDetails.form_of_ownership }}
            </div>
          </div>
        </div> -->
        <div class="meta-text-group flex-wrap">
          <div class="meta-text no-bb">
            <div class="meta-label">TCT No. :</div>
            <div class="meta-value">{{ buildingDetails.tct_no }}</div>
          </div>
          <div class="meta-text">
            <div class="meta-label">Tax Dec. No. :</div>
            <div class="meta-value">{{ buildingDetails.tax_dec_no }}</div>
          </div>
        </div>
        <!-- Business Address -->
        <div class="meta-text-group flex-wrap">
          <div class="meta-group-title">Location of Construction :</div>
          <div class="meta-text w4 no-br no-bb">
            <div class="meta-label">Address No. :</div>
            <div class="meta-value">{{ buildingDetails.address_no }}</div>
          </div>
          <div class="meta-text w4 no-br no-bb">
            <div class="meta-label">Lot No. :</div>
            <div class="meta-value">{{ buildingDetails.lot_no }}</div>
          </div>
          <div class="meta-text w4 no-bb">
            <div class="meta-label">Lot No. count (default 1) :</div>
            <div class="meta-value">{{ buildingDetails.lot_no_count }}</div>
          </div>

          <div class="clearfix"></div>

          <div class="meta-text w4 no-br no-bb">
            <div class="meta-label">Blk No. :</div>
            <div class="meta-value">{{ buildingDetails.blk_no }}</div>
          </div>
          <div class="meta-text w4 no-br no-bb">
            <div class="meta-label">Phase No. :</div>
            <div class="meta-value">{{ buildingDetails.phase_no }}</div>
          </div>
          <div class="meta-text w4 no-bb">
            <div class="meta-label">Subdivision :</div>
            <div class="meta-value">{{ buildingDetails.subdivision_name }}</div>
          </div>

          <div class="clearfix"></div>

          <div class="meta-text w6 no-br no-bb">
            <div class="meta-label">Street :</div>
            <div class="meta-value">{{ buildingDetails.street }}</div>
          </div>
          <div class="meta-text w6 no-bb">
            <div class="meta-label">District :</div>
            <div class="meta-value">{{ buildingDetails.district }}</div>
          </div>

          <div class="clearfix"></div>

          <div class="meta-text no-bb">
            <div class="meta-label">Barangay :</div>
            <div class="meta-value">{{ buildingDetails.barangay }}</div>
          </div>
          <div class="meta-text">
            <div class="meta-label">City / Province:</div>
            <div class="meta-value">{{ buildingDetails.city }}</div>
          </div>
          <!-- <div class="meta-text no-bb">
            <div class="meta-label">Property Type</div>
            <div class="meta-value">{{ buildingDetails.property_type }}</div>
          </div> -->

          <div class="meta-text no-bb mt20">
            <div class="meta-label">Scope of Work :</div>
            <div class="meta-value">
              {{
                buildingDetails.scope_of_work_others === ""
                  ? buildingDetails.scope_of_work
                  : buildingDetails.scope_of_work_others
              }}
            </div>
          </div>
          <div class="meta-text">
            <div class="meta-label">Use or Character of Occupancy :</div>
            <div class="meta-value">
              {{
                buildingDetails.character_of_occupancy_others === ""
                  ? buildingDetails.character_of_occupancy
                  : buildingDetails.character_of_occupancy_others
              }}
            </div>
          </div>
        </div>

        <!-- Other Details -->
        <div class="meta-text-group flex-wrap">
          <!-- <div class="meta-text w6 no-br no-bb">
            <div class="meta-label">Occupancy Classified:</div>
            <div class="meta-value">
              {{ buildingOtherDetails.occupancy_classified }}
            </div>
          </div> -->
          <div class="meta-text no-bb">
            <div class="meta-label">Total Estimated Cost :</div>
            <div class="meta-value">
              ₱
              {{
                parseFloat(buildingOtherDetails.total_estimated_cost).toFixed(2)
              }}
            </div>
          </div>
          <div class="meta-text w6 no-br no-bb">
            <div class="meta-label">Number of Units :</div>
            <div class="meta-value">{{ buildingOtherDetails.units }}</div>
          </div>
          <div class="meta-text w6 no-bb">
            <div class="meta-label">Proposed Date of Construction :</div>
            <div class="meta-value">
              {{
                buildingOtherDetails.date_of_construction
                  | moment("MMMM DD, YYYY")
              }}
            </div>
          </div>
          <div class="meta-text no-bb">
            <div class="meta-label">Expected Date of Completion :</div>
            <div class="meta-value">
              {{
                buildingOtherDetails.date_of_completion
                  | moment("MMMM DD, YYYY")
              }}
            </div>
          </div>
          <div class="meta-text no-bb">
            <div class="meta-label">Total Floor Area :</div>
            <div class="meta-value">
              {{ buildingOtherDetails.floor_area }} square meters
            </div>
          </div>
          <div class="meta-text">
            <div class="meta-label">Lot Area :</div>
            <div class="meta-value">
              {{ buildingOtherDetails.lot_area }} square meters
            </div>
          </div>
        </div>

        <!-- Uploaded Requirements -->
        <div class="meta-text-group flex-wrap" v-if="buildingRequirements">
          <div class="meta-group-title">Uploaded Requirements Checklist</div>

          <!----------------------------- A. LEGAL DOCUMENTS ------------------------------------------>
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
                  </div>
                  <label for="legal_docs_1"
                    >1. Certified true copy of Transfer Certificate of Title
                    (TCT)
                    <span class="copy-indicator">1 Original copy</span></label
                  >
                </div>
                <!-- DETAILS -->
                <ul class="main-list">
                  <li>
                    If TCT is NOT YET in the name of the applicant, any of the
                    following: <span class="copy-indicator">1 Photocopy</span>
                    <ul class="sub-list">
                      <li>Deed of Absolute Sale - Notarized</li>
                      <li>Contract to Sell - Notarized</li>
                      <li>
                        Deed of Assignment / Donation or any equivalent -
                        Notarized
                      </li>
                    </ul>
                  </li>
                  <li>
                    If the applicant is a LESSEE or TCT is in the name of a
                    Corporation, upload:
                    <span class="copy-indicator">1 Photocopy</span>
                    <ul class="sub-list">
                      <li>Lease Contract - Notarized</li>
                      <li>
                        Corporate Secretary's Certificate (authorizing the
                        signatory with general information sheet) - Notarized
                      </li>
                    </ul>
                  </li>
                  <li>
                    If the applicant is NOT the registered owner or with
                    co-owner of the land, upload:
                    <ul class="sub-list">
                      <li>
                        Affidavit of Consent - Notarized
                        <span class="copy-indicator">1 Photocopy</span>
                      </li>
                      <li>
                        Extrajudicial Settlement - Notarized
                        <span class="copy-indicator">1 Photocopy</span>
                      </li>
                    </ul>
                  </li>
                  <li>
                    If the applicant has a Representative
                    <ul class="sub-list">
                      <li>
                        Authorization Letter to APPLY in behalf of the applicant
                        (with valid ID of applicant and representative) -
                        Notarized
                        <span class="copy-indicator">1 Original Copy</span>
                      </li>
                      <li>
                        Special Power of Attorney (SPA) to SIGN in behalf of the
                        applicant (with valid ID of applicant and
                        representative) - Notarized
                        <span class="copy-indicator">1 Photocopy</span>
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
                    >2. Tax Declaration of Real Property
                    <span class="copy-indicator">1 Photocopy</span></label
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
                    >3. Tax Clearance of Real Property - Current Year
                    <span class="copy-indicator">1 Photocopy</span></label
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
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
                  </div>
                  <label for="legal_docs_4"
                    >4. Local and National Agencies Clearances
                    <span class="copy-indicator">1 ORIGINAL COPY</span></label
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
          </div>

          <!----------------------------- B. TECHNICAL DOCUMENTS -------------------------------------->
          <div class="meta-form-group mb60">
            <div class="meta-group-title">B. Technical Documents</div>
            <ul class="parent-list">
              <li>
                <div class="meta-checkbox flex-center">
                  <input
                    type="checkbox"
                    id="tech_docs_1"
                    v-model="technical_documents.tech_docs_1"
                  />
                  <div class="custom-checkbox flex-center">
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
                  </div>
                  <label for="tech_docs_1">1. Application Forms</label>
                </div>
                <ul class="main-list">
                  <li>
                    United Application Form for Building Permit and FSEC(signed
                    and dry seal by an Engineer/Architect and applicant on all
                    pages) - Notarized
                    <span class="copy-indicator">5 Copies</span>
                  </li>
                  <li>
                    Ancillary Application Forms
                    <span class="copy-indicator">5 Copies Each</span>
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
                  <li>
                    Locational Clearance Application Form
                    <span class="copy-indicator">1 Copy</span>
                  </li>
                  <li>
                    Contractor's Temporary Business Permit Application Form
                    <span class="copy-indicator">1 Copy</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <!----------------------------- C. DESIGN PLANS -------------------------------------->
          <!-- <div class="meta-form-group mb60">
            <div class="meta-group-title">C. Design Plans</div>
            <ul class="parent-list">
              <li>
                <div class="meta-checkbox flex-center">
                  <input
                    type="checkbox"
                    id="design_1"
                    v-model="design_plans.design_1"
                  />
                  <div class="custom-checkbox flex-center">
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
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
          </div> -->

          <!----------------------------- C. DESIGN SPECIFICATIONS AND DOCUMENTS -------------------------------------->
          <div class="meta-form-group mb60">
            <div class="meta-group-title">
              C. Design Specifications and Documents
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
                  </div>
                  <label for="specs_1"
                    >1. Design Specifications and Documents</label
                  >
                </div>
                <ul class="sub-list">
                  <li>
                    Project Specification
                    <span class="copy-indicator">2 Copies</span>
                  </li>
                  <li>
                    Bill of Materials
                    <span class="copy-indicator">3 Copies</span>
                  </li>
                  <li>
                    Structural Design Analysis and Computation (for structure
                    two(2) storey and above NSCP 5th Edition)
                    <span class="copy-indicator">1 Copy</span>
                  </li>
                  <li>
                    Geotech Report/Soil Boring Test Report (for building
                    structures three(3) storey and above)
                    <span class="copy-indicator">1 Copy</span>
                  </li>
                  <li>
                    Seismic Analysis (for building exceeding 7.5 meters in
                    height) <span class="copy-indicator">1 Copy</span>
                  </li>
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
                  </div>
                  <label for="specs_2"
                    >2. PRC ID's and PTR of Engineer's and Architect
                    <span class="copy-indicator">1 Photocopy</span></label
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
                  </div>
                  <label for="specs_3"
                    >3. PCAB License of Electrical Contractor for Electrical
                    Works
                    <span class="copy-indicator">1 Colored Copy</span></label
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
                  </div>
                  <label for="specs_4"
                    >4. Construction Safety and Health Program (DOLE)
                    <span class="copy-indicator">1 Original Copy</span></label
                  >
                </div>
              </li>
            </ul>
          </div>

          <!----------------------------- D. SUPPLEMENTARY DOCUMENTS ---------------------------------->
          <div class="meta-form-group mb60">
            <div class="meta-group-title">D. Supplementary Documents</div>
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
                  </div>
                  <label for="supp_docs_1"
                    >1. Sketch <span class="copy-indicator">1 Copy</span></label
                  >
                </div>
                <ul class="sub-list">
                  <li>
                    With clear landmarks leading to the lot with name and number
                    of contact person
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
                  </div>
                  <label for="supp_docs_2"
                    >2. Picture of site/location
                    <span class="copy-indicator">1 Colored Copy</span></label
                  >
                </div>
              </li>
            </ul>
          </div>

          <div class="requirement-list">
            <div class="meta-group-title">Uploaded Requirements</div>
            <ol>
              <li
                v-for="(item, index) of this.buildingRequirements
                  .buildingrequirements"
                :key="index"
              >
                <app-link :to="replaceUrl(item.file)">{{
                  item.filename
                }}</app-link>
              </li>
            </ol>
          </div>
          <div class="flex-column">
            <div
              v-if="
                buildingApplication.application_status === 4 ||
                buildingApplication.application_status === 5 ||
                buildingApplication.application_status === 1
              "
              class="mt50 meta-view-remarks"
              @click="openBuildingRemarks(buildingApplication.id)"
            >
              View Remarks
            </div>
            <div class="submission-text">
              Submission Date:
              {{
                buildingApplication.last_submitted
                  | moment("MMMM DD, YYYY hh:mm A")
              }}
            </div>
            <div
              class="assessment-result-list mt30"
              v-if="
                buildingApplication.application_status == 3 ||
                buildingApplication.application_status == 5
              "
            >
              <div class="meta-group-title">Assessment Result</div>
              <ol>
                <li
                  v-for="(item, index) of this.buildingAssessmentResult"
                  :key="index"
                >
                  <div class="meta-result-holder">
                    <div>
                      {{ item.department }}: {{ item.status
                      }}<span v-if="item.created_at">
                        -
                        {{
                          item.created_at | moment("MMMM DD, YYYY hh:mm A")
                        }}</span
                      >
                    </div>
                    <span
                      v-if="item.status === 'Disapproved'"
                      class="mt5 ml10 mb2 meta-view-remarks"
                      @click="openBuildingRemarks(buildingApplication.id)"
                      >View Remarks</span
                    >
                  </div>
                </li>
              </ol>
            </div>
          </div>

          <div
            class="meta-button-group flex-center"
            v-if="
              !buildingApplication.is_approve &&
              (groups.includes('superadmin') ||
                groups.includes('building_application_approver')) &&
              buildingApplication.application_status !== 3
            "
          >
            <button-block
              type="approve"
              @click.native="approveApplication(true)"
            >
              {{
                buildingApplication.application_status === 0 ||
                buildingApplication.application_status === 1
                  ? "COMPLETE"
                  : buildingApplication.application_status === 2 ||
                    buildingApplication.application_status === 4
                  ? "FOR ASSESSMENT"
                  : "FOR PAYMENT"
              }}
            </button-block>
            <button-block
              class="red-btn"
              type="disapprove"
              @click.native="approveApplication(false)"
            >
              {{
                buildingApplication.application_status === 0 ||
                buildingApplication.application_status === 1
                  ? "INCOMPLETE"
                  : "FOR COMPLIANCE"
              }}
            </button-block>
          </div>
          <div
            v-if="
              buildingDeptCanAssess &&
              isAssessmentActive &&
              buildingApplication.application_status == 3
            "
            class="meta-button-group flex-center"
          >
            <button-block
              type="approve"
              @click.native="assessApplication(true)"
            >
              {{ isLastBuildingDept ? "FOR PAYMENT" : "APPROVE" }}
            </button-block>

            <button-block
              type="disapprove"
              class="red-btn"
              @click.native="assessApplication(false)"
            >
              {{ isLastBuildingDept ? "FOR COMPLIANCE" : "DISAPPROVE" }}
            </button-block>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueEasyLightbox from "vue-easy-lightbox";
import ButtonBlock from "@/components/ButtonBlock";
import AppLink from "@/components/AppLink";
import { mapGetters } from "vuex";
import moment from "moment-timezone";
import axios from "axios";
import InspectionModal from "@/components/admin/InspectionModal";
const oneDocToken = process.env.VUE_APP_ONE_DOC_TOKEN;
const lguLocalEndpoint = process.env.VUE_APP_LGU_LOCAL_ENDPOINT;
export default {
  name: "ApproveBuildingApplication",
  components: {
    VueEasyLightbox,
    ButtonBlock,
    AppLink,
    InspectionModal,
  },
  beforeRouteLeave(to, from, next) {
    // this.$store.commit("resetPropertyState");
    this.$store.commit("setBuildingRequirements", []);
    this.$store.commit("setLegalDocuments", {});
    this.$store.commit("setTechnicalDocuments", {});
    this.$store.commit("setSupplementaryDocuments", {});
    this.$store.commit("setDesignPlans", {});
    this.$store.commit("setDesignSpecs", {});
    next();
  },
  mounted() {
    this.getRequirements();
    window.scrollTo(0, 0);
    this.$store.commit("setIsAssessmentHasError", false);
    // this.$store.commit("setPrintProperty", true);
  },
  created() {
    this.checkIfCanAssess();
    this.setupAssessmentResult();
  },
  computed: {
    ...mapGetters([
      "printProperty",
      "buildingApplication",
      "buildingBasicInformation",
      "buildingDetails",
      "buildingOtherDetails",
      "buildingApplicationRequirements",
      "buildingRequirements",
      "legalDocuments",
      "technicalDocuments",
      "supplementaryDocuments",
      "designPlans",
      "designSpecs",
      "currentInquiry",
      "groups",
      "buildingAssessmentResult",
      "buildingDeptCanAssess",
      "isLastBuildingDept",
      "isAssessmentActive",
      "isAssessmentHasError",
    ]),
  },
  data() {
    return {
      imgs: [],
      legal_documents: {},
      technical_documents: {},
      supplementary_documents: {},
      design_plans: {},
      design_specs: {},
      visible: false,
      index: 0, // default: 0
    };
  },
  methods: {
    async openBuildingRemarks(id) {
      await this.$store.dispatch("getBuildingRemarks", id);
      await this.$router.push({ name: "ReplyInquiry" });
    },
    async approveApplication(status) {
      let approve = await this.$swal({
        text: "Are you sure with this action?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });
      // let payload = { id: this.buildingApplication.id, is_approve: status };
      //   if (result.value) {
      //     // this.$store.dispatch('approveBuildingApplication', payload)
      //   await this.createRemarks();
      //   }
      if (approve.value) {
        if (!status) {
          this.createRemarks();
        } else {
          let application_status = 0;
          if (status) {
            this.buildingApplication.application_status === 0
              ? (application_status = 2)
              : this.buildingApplication.application_status === 1
              ? (application_status = 2)
              : this.buildingApplication.application_status === 2
              ? (application_status = 3)
              : this.buildingApplication.application_status === 3
              ? (application_status = 6)
              : this.buildingApplication.application_status === 4
              ? (application_status = 3)
              : (application_status = 6);
          } else {
            this.buildingApplication.application_status === 0
              ? (application_status = 1)
              : this.buildingApplication.application_status === 2
              ? (application_status = 4)
              : this.buildingApplication.application_status === 3
              ? (application_status = 5)
              : this.buildingApplication.application_status === 4
              ? (application_status = 4)
              : this.buildingApplication.application_status === 5
              ? (application_status = 5)
              : (application_status = 0);
          }
          let payload = {
            id: this.buildingApplication.id,
            status: application_status,
          };
          if (application_status === 2) {
            this.$modal.show("inspectionModal");
          } else {
            this.$store.dispatch("approveBuildingApplication", payload);
          }
          if (application_status === 5 || application_status === 2) {
            this.sendDataToLGU();
          }
        }
      }
    },
    async assessApplication(status) {
      this.$store.commit("setIsBuildingAssessment", true);
      let approve = await this.$swal({
        text: "Are you sure with this action?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });
      if (approve.value) {
        let application_status = 0;
        this.buildingApplication.application_status === 0
          ? (application_status = 2)
          : this.buildingApplication.application_status === 2
          ? (application_status = 3)
          : this.buildingApplication.application_status === 3
          ? (application_status = 6)
          : this.buildingApplication.application_status === 4
          ? (application_status = 3)
          : (application_status = 6);

        let payload = {
          building_application: this.buildingApplication.id,
          is_approve: status ? true : false,
        };
        this.$store.commit("setBuildingAssessmentPayload", payload);
        if (this.isLastBuildingDept && status) {
          await this.$store.dispatch("assessBuildingApplication", payload);
          this.$store.commit("setIsEvaluation", false);
          let changeApplicationStatusPayload = {
            id: this.buildingApplication.id,
            status: application_status,
          };
          if (application_status === 5) {
            this.sendDataToLGU();
          }
          await this.$store.dispatch(
            "approveBuildingApplication",
            changeApplicationStatusPayload
          );
        }
        if (!status) {
          if (this.isLastBuildingDept) {
            this.$store.commit("setIsBuildingAssessment", false);
            this.$store.commit("setIsEvaluation", true);
          } else {
            this.$store.commit("setIsEvaluation", true);
          }
          if (!this.isAssessmentHasError) {
            this.createRemarks();
          } else {
            this.$router.push({ name: "Assessments" });
          }
        } else {
          if (!this.isLastBuildingDept && !this.isAssessmentHasError) {
            await this.$store.dispatch("assessBuildingApplication", payload);
            await this.$store.dispatch("createPrompt", {
              type: "success",
              title: "Success!",
              message: "Application was successfully assessed!",
            });
          }
          this.$router.push({ name: "Assessments" });
        }
      }
    },
    async createRemarks() {
      await this.$store.dispatch(
        "getBuildingRemarks",
        this.buildingApplication.id
      );
      if (this.currentInquiry === "") {
        this.$router.push({
          name: "NewRemarks",
          params: {
            application_number: this.buildingBasicInformation.reference_number,
            type: "remarks",
            application_type: "building",
            user: this.buildingApplication.user,
          },
        });
      } else {
        this.$store.commit("setContinueBuildingThread", true);
        this.$store.commit("setCurrentBuildingId", this.buildingApplication.id);
        this.$router.push({
          name: "ReplyInquiry",
          params: { thread: this.currentInquiry },
        });
      }
    },
    showSingle() {
      if (this.buildingRequirements) {
        if (this.buildingRequirements.buildingrequirements.length > 0) {
          this.buildingRequirements.buildingrequirements.map((item) => {
            let img = {
              title: this.formatLabel(item.requirements_label),
              src: this.replaceUrl(item.file),
            };
            this.imgs.push(img);
          });
        }
      }
      this.show();
    },
    show() {
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
    async getRequirements() {
      if (this.buildingApplicationRequirements.id) {
        await this.$store.dispatch("getBuildingApplicationRequirements");
        this.legal_documents = JSON.parse(this.legalDocuments.value);
        this.technical_documents = JSON.parse(this.technicalDocuments.value);
        this.supplementary_documents = JSON.parse(
          this.supplementaryDocuments.value
        );
        this.design_plans = JSON.parse(this.designPlans.value);
        this.design_specs = JSON.parse(this.designSpecs.value);
      }
    },
    replaceUrl(url) {
      return url.replace("/bacoor/", "/");
    },
    formatLabel(string) {
      return string.replace(/_/g, " ").toUpperCase();
    },
    async setupAssessmentResult() {
      if (
        this.buildingApplication.application_status == 3 ||
        this.buildingApplication.application_status == 5
      ) {
        let payload = { building_application: this.buildingApplication.id };
        await this.$store.dispatch("getBuildingAssessmentResult", payload);
      }
    },
    async checkIfCanAssess() {
      let payload = { building_application: this.buildingApplication.id };
      await this.$store.dispatch("checkBuildingDeptCanAssess", payload);
    },
    async sendDataToLGU() {
      try {
        let config = {
          headers: {
            "OneDoc-Token": oneDocToken,
            "Content-Type": "application/json",
          },
        };
        const data = {
          onlinerefno: this.buildingApplication.series_number,
          ownertype: this.buildingBasicInformation.ownership_type,
          firstname: this.buildingBasicInformation.owner_first_name,
          middlename: this.buildingBasicInformation.owner_middle_name,
          lastname: this.buildingBasicInformation.owner_last_name,
          owneraddress: this.buildingBasicInformation.owner_complete_address,
          ownertelno: this.buildingBasicInformation.owner_telephone_number,
          ownertin: this.buildingBasicInformation.tin,
          tctno: this.buildingDetails.tct_no,
          tdno: this.buildingDetails.tax_dec_no,
          addressno: this.buildingDetails.address_no,
          lotno: this.buildingDetails.lot_no,
          lotcountno: this.buildingDetails.lot_no_count,
          blkno: this.buildingDetails.blk_no,
          phaseno: this.buildingDetails.phaseno,
          subdivision: this.buildingDetails.subdivision_name,
          street: this.buildingDetails.street,
          district: this.buildingDetails.district,
          barangay: this.buildingDetails.barangay,
          city: "Bacoor",
          province: "Cavite",
          scopeofwork: "New Construction",
          scopeofworkothers: this.buildingDetails.scope_of_work,
          occupancycharacter: this.buildingDetails.character_of_occupancy,
          occupancycharacterothers:
            this.buildingDetails.character_of_occupancy_others,
          totalestcost:
            this.buildingOtherDetails.total_estimated_cost.toString(),
          noofunits: this.buildingOtherDetails.units.toString(),
          totalfloorareasqm: this.buildingOtherDetails.floor_area.toString(),
          lotareasqm: this.buildingOtherDetails.lot_area.toString(),
          constructiondate: moment(
            this.buildingOtherDetails.date_of_construction
          ).format("YYYY-MM-DD"),
          completiondate: moment(
            this.buildingOtherDetails.date_of_completion
          ).format("YYYY-MM-DD"),
        };

        const payload = {
          name: "addBuilding",
          param: data,
        };
        const response = await axios.post(
          `${lguLocalEndpoint}`,
          payload,
          config
        );
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.meta-view-remarks {
  color: #2699fb;
  text-decoration: underline;
  font-weight: bold;
  cursor: pointer;
}
.meta-result-holder {
  display: flex;
  flex-direction: column;
}
.submission-text {
  color: #2699fb;
  margin-top: 30px;
  font-weight: bold;
}
.meta-group-title {
  color: #2699fb;
  font-weight: bold;
}
div.meta-parent-box {
  width: 100%;
  margin-top: 50px;
  padding-bottom: 50px;
  div.meta-container {
    max-width: 1060px;
    margin: 0 auto;
    padding: 0 30px;
  }
  div.meta-form-body {
    height: 100%;
    width: 100%;
    padding: 50px;
    background-color: #eaf6ff;
    border-radius: 20px;
    .meta-form-title {
      font-size: 35px;
      text-align: center;
      width: 100%;
      margin-bottom: 30px;
    }
    div.meta-text-group {
      width: 100%;
      padding-bottom: 30px;
      div.meta-group-title {
        width: 100%;
        color: #2699fb;
        font-size: 17px;
        font-weight: bold;
        padding: 10px 0;
        margin-bottom: 18px;
      }
      .meta-list-title {
        width: 100%;
        color: #2699fb;
        font-size: 14px;
        font-weight: bold;
        padding: 10px 0;
        margin-bottom: 18px;
        margin-left: 10px;
      }
      .gallery-box {
        justify-content: center;
      }
      div.meta-text {
        width: 100%;
        color: #2b2b2b;
        font-size: 14px;
        line-height: 1.6;
        padding: 4px 10px;
        border: 1px solid;
        .meta-label {
          font-size: 14px;
          font-weight: bold;
        }
      }
      div.meta-text.w1 {
        width: calc(8.33% - 21.5px);
        float: left;
      }
      div.meta-text.w2 {
        width: calc(16.6% - 21.5px);
        float: left;
      }
      div.meta-text.w3 {
        width: calc(25% - 21.5px);
        float: left;
      }
      div.meta-text.w4 {
        width: calc(33.3333% - 21.5px);
        float: left;
      }
      div.meta-text.w6 {
        width: calc(50% - 21.5px);
        float: left;
      }
      div.meta-text.w7 {
        width: calc(58% - 21.5px);
        float: left;
      }

      div.meta-table-header {
        text-align: center;
        width: 100%;
        div.form-th {
          font-size: 14px;
          font-weight: bold;
          line-height: 1.6;
          height: 100%;
          border: 1px solid;

          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
        }
      }

      div.meta-table-row {
        text-align: center;
        width: 100%;
        div.form-td {
          font-size: 10px;
          line-height: 1.6;
          padding: 5px 0;
          border: 1px solid;
        }
      }
      div.form-th.code,
      div.form-td.code {
        width: calc(15% - 1.5px);
        float: left;
      }
      div.form-th.line,
      div.form-td.line {
        width: calc(35% - 1.5px);
        float: left;
      }
      div.form-th.units,
      div.form-td.units {
        width: calc(15% - 1.5px);
        float: left;
      }
      div.form-th.sales {
        width: calc(35% - 1.5px);
        float: left;
      }
      div.form-td.sales {
        width: calc(17.5% - 1px);
        float: left;
      }

      div.form-sub-th {
        width: 100%;
        div.form-th {
          width: calc(50% - 1.5px);
          float: left;
        }
      }
    }
    div.meta-text-group.w6 {
      width: 50%;
      float: left;
    }

    div.gallery-image {
      height: 150px;
      width: 150px;
      background-position: center;
      background-size: cover;
      cursor: pointer;
      float: left;
      margin: 5px;
    }

    div.meta-button-group {
      justify-content: center;
      width: 100%;
      margin-top: 20px;
      button {
        margin: 0 15px;
      }
    }
  }
}

.no-bl {
  border-left: 0 !important;
}
.no-br {
  border-right: 0 !important;
}
.no-bt {
  border-top: 0 !important;
}
.no-bb {
  border-bottom: 0 !important;
}

.red-btn {
  background-color: #e23a36;
  border-color: #e23a36;
}

.red-btn:hover {
  color: #e23a36;
  border-color: #e23a36;
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
    // cursor: pointer;
    pointer-events: none;
  }
  .custom-checkbox {
    height: 15px;
    width: 15px;
    border: 2px solid transparent;
    margin-right: 12px;
    .check-icon {
      color: #81c784;
      font-size: 14px;
      display: none;
    }
    .x-icon {
      display: block;
      color: #e23a36;
    }
  }
  input[type="checkbox"]:checked + .custom-checkbox {
    .check-icon {
      display: block;
    }
    .x-icon {
      display: none;
    }
  }
}

ul.parent-list > li {
  margin-left: 20px;
}

ul.main-list {
  padding-left: 49px !important;
}

ul.sub-list {
  margin-left: 50px !important;
}

ul.main-list > li > ul.sub-list {
  margin-left: 20px !important;
}

.requirement-list ol li,
.requirement-list ol li a {
  width: 100%;
  color: #2699fb;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 0;
  margin-left: 30px;
}

.assessment-result-list ol li,
.assessment-result-list ol li div {
  width: 100%;
  color: #2699fb;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 0;
  margin-left: 10px;
}

/*
MOBILE RESPONSIVENESS 
--------------------------------------------------------------*/
@media only screen and (max-width: 1400px) {
  div.meta-parent-box div.meta-form-body .meta-form-title {
    font-size: 28px;
  }
}

@media only screen and (max-width: 768px) {
  div.meta-parent-box div.meta-form-body .meta-form-title {
    font-size: 24px;
  }

  div.meta-parent-box div.meta-form-body div.meta-text-group div.meta-text.w3,
  div.meta-parent-box div.meta-form-body div.meta-text-group div.meta-text.w4,
  div.meta-parent-box div.meta-form-body div.meta-text-group div.meta-text.w6 {
    width: 100%;
  }

  div.meta-parent-box
    div.meta-form-body
    div.meta-text-group
    div.meta-text.no-br {
    border-right: 1px solid !important;
    border-bottom: 0;
  }

  div.meta-parent-box div.meta-form-body div.gallery-image {
    height: 100px;
    width: 100px;
  }
}

@media only screen and (max-width: 580px) {
  div.meta-parent-box div.meta-form-body {
    padding: 50px 30px;
  }

  div.meta-parent-box div.meta-form-body .meta-form-title {
    font-size: 20px;
  }

  div.meta-parent-box
    div.meta-form-body
    div.meta-text-group
    div.meta-text
    .meta-label {
    font-size: 12px;
  }
}

@media only screen and (max-width: 480px) {
  div.meta-parent-box div.meta-form-body {
    padding: 30px 15px;
  }
  div.meta-parent-box {
    margin-top: 30px;
  }
  div.meta-parent-box div.meta-container {
    padding: 0 15px;
  }
  div.meta-parent-box div.meta-form-body .meta-form-title {
    font-size: 18px;
  }
  div.meta-parent-box
    div.meta-form-body
    div.meta-text-group
    div.meta-group-title {
    font-size: 12px;
  }
  div.meta-parent-box div.meta-form-body div.meta-text-group {
    padding-bottom: 15px;
  }
}

@media only screen and (max-width: 380px) {
  div.meta-parent-box div.meta-form-body div.gallery-image {
    height: 70px;
    width: 70px;
  }
}
</style>
