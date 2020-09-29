<template>
  <div class="meta-parent-box">
    <div class="meta-container flex-wrap" ref="content">
      <div class="meta-form-body flex-wrap">
        <h1 class="meta-form-title">Building Application Details</h1>

        <div class="meta-text-group flex-wrap">
          <div class="meta-text no-bb">
            <div class="meta-label">Application Number :</div>
            <div class="meta-value">
              #{{ buildingBasicInformation.reference_number }}
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

          <div class="meta-form-group mb60">
            <div class="meta-list-title">
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
                    >1. Electronic copy of Transfer Certicicate of Title (TCT)
                    (original copy)</label
                  >
                </div>
                <!-- DETAILS -->
                <ul class="main-list">
                  <li>
                    If the applicant is NOT the registered owner of the lot,
                    upload:
                    <ul class="sub-list">
                      <li>Notarized Affidavit of Consent</li>
                    </ul>
                  </li>
                  <li>
                    If TCT is not in the name of the applicant, any of the
                    following:
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
                        Corporate Secretary's Certificate (authorizing the
                        signatory with general information sheet)
                      </li>
                    </ul>
                  </li>
                  <li>
                    If a Representative is applying in behalf of the applicant,
                    upload:
                    <ul class="sub-list">
                      <li>
                        Notarized Authorization Letter to transact with OBO
                        (with valid ID of applicant and representative)
                      </li>
                    </ul>
                  </li>
                  <li>
                    If a Representative is signing in behalf of the applicant,
                    upload:
                    <ul class="sub-list">
                      <li>
                        Notarized Special Power of Attorney (SPA) (with valid ID
                        of applicant and representative)
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
                  </div>
                  <label for="legal_docs_4"
                    >4. Barangay Clearance (for construction - original
                    copy)</label
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
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
          </div>
          <div class="meta-form-group mb60">
            <div class="meta-list-title">B. Technical Documents</div>
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
                  </div>
                  <label for="tech_docs_1e"
                    >1e. Ancillary Forms - Sign Permit</label
                  >
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
                  </div>
                  <label for="tech_docs_3"
                    >3. Contractor's Temporary Business Permit Application
                    Form</label
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
                  </div>
                  <label for="tech_docs_7"
                    >7. Notarized Bill of Materials</label
                  >
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
                  </div>
                  <label for="tech_docs_8"
                    >8. Structural Design Analysis and Computation</label
                  >
                </div>
                <ul class="sub-list">
                  <li>
                    For structure two(2) storey and above NSCP 5th Edition.
                  </li>
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
                  </div>
                  <label for="tech_docs_11"
                    >11. Complete and Detailed Building Plans</label
                  >
                </div>
                <ul class="sub-list">
                  <li>
                    Scale of 1:100 duly signed and sealed by the design
                    professionals.
                  </li>
                  <li>
                    Green Building Code (must be observed for construction of
                    more than 10,000m' floor area)
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
                    <span class="check">
                      <font-awesome-icon icon="check" class="mr5 check-icon" />
                      <font-awesome-icon icon="times" class="mr5 x-icon" />
                    </span>
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
          </div>

          <!-- C. Supplementary Documents  -->
          <div class="meta-form-group mb60">
            <div class="meta-list-title">C. Supplementary Documents</div>
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
                  <label for="supp_docs_1">1. Sketch or Key Pin</label>
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
                    >2. Picture of site/location (colored copy)</label
                  >
                </div>
              </li>
            </ul>
          </div>

          <div class="requirement-list">
            <div class="meta-group-title">Files Uploaded</div>
            <ol>
              <li v-for="(item, index) of this.buildingRequirements.buildingrequirements" :key="index" >
                <app-link :to="replaceUrl(item.file)"
                  >{{item.filename}}</app-link
                >
              </li>
            </ol>
          </div>

          <!-- GALLERY SECTION
          <div class="gallery-box flex-wrap">
            <div
              v-for="(requirement,
              index) in buildingRequirements.buildingrequirements"
              :key="index"
              class="gallery-image"
              @click="showSingle"
              :style="`background-image: url(${replaceUrl(requirement.file)});`"
            ></div>
            <vue-easy-lightbox
              escDisabled
              moveDisabled
              :visible="visible"
              :imgs="imgs"
              :index="index"
              @hide="handleHide"
            ></vue-easy-lightbox>
          </div>
        </div>
        <div
          class="meta-button-group flex-center"
          v-if="
            !buildingApplication.is_approve &&
            !buildingApplication.is_disapprove
          "
        > -->

          <div class="meta-button-group flex-center">
            <button-block
              type="approve"
              @click.native="approveApplication(true)"
            >
              Approve
            </button-block>
            <button-block
              class="red-btn"
              type="disapprove"
              @click.native="approveApplication(false)"
            >
              Disapprove
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
export default {
  name: "ApproveBuildingApplication",
  components: {
    VueEasyLightbox,
    ButtonBlock,
    AppLink,
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("resetPropertyState");
    next();
  },
  mounted() {
    this.getRequirements();
    console.log(this.buildingRequirements.buildingrequirements);
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
    ]),
  },
  data() {
    return {
      imgs: [],
      legal_documents: {},
      technical_documents: {},
      supplementary_documents: {},
      visible: false,
      index: 0, // default: 0
    };
  },
  methods: {
    approveApplication(status) {
      this.$swal({
        text: "Are you sure with this action?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        let payload = { id: this.buildingApplication.id, is_approve: status };
        if (result.value) {
          // this.$store.dispatch('approveBuildingApplication', payload)
          this.createRemarks();
        }
      });
    },
    createRemarks() {
      // await this.$store.dispatch('setApplicationRemarks', {application_number: this.buildingBasicInformation.reference_number})
      this.$router.push({
        name: "NewRemarks",
        params: {
          application_number: this.buildingBasicInformation.reference_number,
          type: "remarks",
        },
      });
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
      }
    },
    replaceUrl(url) {
      return url.replace("/bacoor/", "/");
    },
    formatLabel(string) {
      return string.replace(/_/g, " ").toUpperCase();
    },
  },
};
</script>

<style lang="scss" scoped>
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
