<template>
  <div class="meta-parent-box">
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
              {{
                buildingBasicInformation.ownership_type
                  .charAt(0)
                  .toUpperCase() +
                buildingBasicInformation.ownership_type.slice(1)
              }}
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
              {{ formatCurrency(buildingOtherDetails.total_estimated_cost) }}
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
          <div class="meta-group-title">Uploaded Requirements</div>
          <!-- <div class="gallery-box flex-wrap">
            <div
              v-for="(requirement, index) in buildingRequirements.buildingrequirements"
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
          </div> -->
          <div class="requirement-list">
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
        </div>
        <div class="flex-column">
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
      </div>
    </div>
  </div>
</template>

<script>
import VueEasyLightbox from "vue-easy-lightbox";
import ButtonBlock from "@/components/ButtonBlock";
import { mapGetters } from "vuex";
import AppLink from "@/components/AppLink";
export default {
  name: "ViewBuildingDetails",
  components: {
    VueEasyLightbox,
    ButtonBlock,
    AppLink,
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
      "buildingAssessmentResult",
    ]),
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("setCurrentApplicationStep", "1");
    this.$store.commit("resetPropertyState");
    next();
  },
  created() {
    this.getRequirements();
    this.setupAssessmentResult();
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
    formatCurrency(str) {
      var parts = str.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (parts.length < 2) {
        parts.push("00");
      }
      return parts.join(".");
    },
    async openBuildingRemarks(id) {
      await this.$store.dispatch("getBuildingRemarks", id);
      await this.$router.push({ name: "UserReplyInquiry" });
    },
    async setupAssessmentResult() {
      if (
        this.buildingApplication.application_status == 3 ||
        this.buildingApplication.application_status == 5
      ) {
        let payload = { building_application: this.buildingApplication.id };
        await this.$store.dispatch("getUserBuildingAssessmentResult", payload);
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
.meta-view-remarks {
  text-decoration: underline;
  cursor: pointer;
}
.meta-result-holder {
  display: flex;
  flex-direction: column;
}
.submission-text {
  color: #2699fb;
  margin: 10px 0px;
  font-weight: bold;
}
.meta-group-title {
  color: #2699fb;
  font-weight: bold;
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
        font-size: 14px;
        font-weight: bold;
        padding: 10px 0;
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
