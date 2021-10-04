<template>
  <div class="meta-parent-box">
    <div class="meta-container flex-wrap" ref="content">
      <div class="meta-form-body flex-wrap">
        <div
          class="meta-txt-download"
          @click="viewBusinessPermit"
          v-if="businessPermits.length > 0"
        >
          <font-awesome-icon icon="eye" class="mr10 icon" />View Permit
        </div>
        <h1 class="meta-form-title">Business Application Details</h1>
        <!-- Application Date and Nos. -->
        <div class="meta-text-group flex-wrap">
          <div class="meta-text no-bb">
            <div class="meta-label">Application Number :</div>
            <div class="meta-value">
              #{{ businessBasicInformation.reference_number }}
            </div>
          </div>
          <div class="meta-text no-bb">
            <div class="meta-label">Date of Application :</div>
            <div class="meta-value">
              {{
                getApplicationDate(
                  businessApplication.last_submitted,
                  businessApplication.created_at
                )
              }}
            </div>
          </div>
          <div class="meta-text no-bb">
            <div class="meta-label">Type of Organization :</div>
            <div class="meta-value">
              {{
                businessBasicInformation.type_of_organization
                  .charAt(0)
                  .toUpperCase() +
                businessBasicInformation.type_of_organization.slice(1)
              }}
            </div>
          </div>
          <div class="meta-text no-bb">
            <div class="meta-label">Mode of Payment :</div>
            <div class="meta-value">
              {{ businessBasicInformation.mode_of_payment }}
            </div>
          </div>
          <div class="meta-text w6 no-br no-bb">
            <div class="meta-label">DTI/SEC/CDA Registration No. :</div>
            <div class="meta-value">
              {{ businessBasicInformation.dti_sec_cda_reg_number }}
            </div>
          </div>
          <!-- <div class="meta-text w6 no-br no-bb">
            <div class="meta-label">Account No :</div>
            <div class="meta-value">
              {{ businessApplication.account_number }}
            </div>
          </div> -->
          <div class="meta-text w6 no-bb">
            <div class="meta-label">DTI/SEC/CDA Date of Registration No. :</div>
            <div class="meta-value">
              {{
                businessBasicInformation.dti_sec_cda_reg_date
                  | moment("MMMM DD, YYYY")
              }}
            </div>
          </div>
          <div class="meta-text w6 no-br no-bb">
            <div class="meta-label">CTC No. :</div>
            <div class="meta-value">{{ businessBasicInformation.ctc_no }}</div>
          </div>
          <div class="meta-text w6 no-bb">
            <div class="meta-label">TIN :</div>
            <div class="meta-value">{{ businessBasicInformation.tin }}</div>
          </div>
          <div class="meta-text w6 no-br">
            <div class="meta-label">
              Are You enjoying tax incentive from any Government Entity?
            </div>
            <div class="meta-value">
              {{ businessBasicInformation.has_tax_incentive ? "Yes" : "No" }}
            </div>
          </div>
          <div class="meta-text w6">
            <div class="meta-label">Please specify the entity :</div>
            <div class="meta-value">
              {{ businessBasicInformation.government_entity }}
            </div>
          </div>
        </div>

        <!-- Name of Taxpayer/Corporate Name : -->
        <div class="meta-text-group flex-wrap">
          <div class="meta-group-title">Name of Taxpayer/Corporate Name :</div>
          <div class="meta-text w4 no-br no-bb">
            <div class="meta-label">Last Name :</div>
            <div class="meta-value">
              {{ businessBasicInformation.owner_last_name }}
            </div>
          </div>
          <div class="meta-text w4 no-br no-bb">
            <div class="meta-label">First Name :</div>
            <div class="meta-value">
              {{ businessBasicInformation.owner_first_name }}
            </div>
          </div>
          <div class="meta-text w4 no-bb">
            <div class="meta-label">Middle Name :</div>
            <div class="meta-value">
              {{ businessBasicInformation.owner_middle_name }}
            </div>
          </div>
          <div class="meta-text w6 no-br">
            <div class="meta-label">Corporate Name :</div>
            <div class="meta-value">{{ businessDetails.name }}</div>
          </div>
          <div class="meta-text w6">
            <div class="meta-label">Trade Name/Franchise :</div>
            <div class="meta-value">{{ businessDetails.trade_name }}</div>
          </div>
        </div>

        <!-- Name of President/Treasurer of Corporation : -->
        <div class="meta-text-group flex-wrap">
          <div class="meta-group-title">
            Name of President/Treasurer of Corporation :
          </div>
          <div class="meta-text w4 no-br">
            <div class="meta-label">Last Name :</div>
            <div class="meta-value">
              {{ businessDetails.president_last_name }}
            </div>
          </div>
          <div class="meta-text w4 no-br">
            <div class="meta-label">First Name :</div>
            <div class="meta-value">
              {{ businessDetails.president_first_name }}
            </div>
          </div>
          <div class="meta-text w4">
            <div class="meta-label">Middle Name :</div>
            <div class="meta-value">
              {{ businessDetails.president_middle_name }}
            </div>
          </div>
        </div>

        <!-- Business Address -->
        <div class="meta-text-group flex-wrap">
          <div class="meta-group-title">Business Address :</div>
          <div class="meta-text w4 no-br no-bb">
            <div class="meta-label">Address No. :</div>
            <div class="meta-value">
              {{ businessDetails.address_no }}
            </div>
          </div>
          <div class="meta-text w4 no-br no-bb">
            <div class="meta-label">Block No. :</div>
            <div class="meta-value">
              {{ businessDetails.block_no }}
            </div>
          </div>
          <div class="meta-text w4 no-bb">
            <div class="meta-label">Lot No. :</div>
            <div class="meta-value">
              {{ businessDetails.lot_no }}
            </div>
          </div>
          <div class="meta-text w6 no-br no-bb">
            <div class="meta-label">Street :</div>
            <div class="meta-value">
              {{ businessDetails.street }}
            </div>
          </div>
          <div class="meta-text w6 no-bb">
            <div class="meta-label">Subdivision :</div>
            <div class="meta-value">
              {{ businessDetails.subdivision }}
            </div>
          </div>
          <div class="meta-text w6 no-br no-bb">
            <div class="meta-label">Building No :</div>
            <div class="meta-value">
              {{ businessDetails.building_no }}
            </div>
          </div>
          <div class="meta-text w6 no-bb">
            <div class="meta-label">Building Name :</div>
            <div class="meta-value">
              {{ businessDetails.building_name }}
            </div>
          </div>
          <div class="meta-text w6 no-br no-bb">
            <div class="meta-label">Unit No :</div>
            <div class="meta-value">
              {{ businessDetails.unit_no }}
            </div>
          </div>
          <div class="meta-text w6 no-bb">
            <div class="meta-label">Floor No :</div>
            <div class="meta-value">
              {{ businessDetails.floor_no }}
            </div>
          </div>
          <div class="meta-text w6 no-br">
            <div class="meta-label">Barangay :</div>
            <div class="meta-value">
              {{ businessDetails.barangay }}
            </div>
          </div>
          <div class="meta-text w6">
            <div class="meta-label">City :</div>
            <div class="meta-value">
              {{ businessDetails.city }}
            </div>
          </div>
        </div>
        <div class="meta-text-group flex-wrap">
          <div class="meta-group-title">Other Business Details :</div>
          <div class="meta-text no-bb">
            <div class="meta-label">Telephone / Mobile No. :</div>
            <div class="meta-value">
              {{
                businessDetails.telephone_number
                  ? businessDetails.telephone_number
                  : "N/A"
              }}
              <!-- /
              {{
                businessDetails.mobile_number
                  ? businessDetails.mobile_number
                  : "N/A"
              }} -->
            </div>
          </div>
          <div class="meta-text">
            <div class="meta-label">Email Address :</div>
            <div class="meta-value">
              {{
                businessDetails.email_address
                  ? businessDetails.email_address
                  : "N/A"
              }}
            </div>
          </div>
        </div>

        <!-- Owner Details -->
        <div class="meta-text-group flex-wrap">
          <div class="meta-group-title">Owner's Address :</div>
          <div class="meta-text no-bb">
            <div class="meta-label">Complete Address :</div>
            <div class="meta-value">
              {{ businessBasicInformation.owner_complete_address }}
            </div>
          </div>
          <div class="meta-text no-bb">
            <div class="meta-label">Telephone / Mobile No. :</div>
            <div class="meta-value">
              {{
                businessBasicInformation.owner_telephone_number
                  ? businessBasicInformation.owner_telephone_number
                  : "N/A"
              }}
              <!-- /
              {{
                businessBasicInformation.owner_mobile_number
                  ? businessBasicInformation.owner_mobile_number
                  : "N/A"
              }} -->
            </div>
          </div>
          <div class="meta-text">
            <div class="meta-label">Email Address :</div>
            <div class="meta-value">
              {{ businessBasicInformation.owner_email_address }}
            </div>
          </div>
        </div>

        <!-- Business Details -->
        <div class="meta-text-group flex-wrap">
          <div class="meta-text no-bb">
            <div class="meta-label">Property Index Number (PIN) :</div>
            <div class="meta-value">
              {{ businessDetails.property_index_number }}
            </div>
          </div>
          <div class="meta-text w4 no-br">
            <div class="meta-label">Business Area (in sq m) :</div>
            <div class="meta-value">{{ businessDetails.area }} sqm</div>
          </div>
          <div class="meta-text w4 no-br">
            <div class="meta-label">
              Total No. of Employees (including owner):
            </div>
            <div class="meta-value">{{ businessDetails.total_employees }}</div>
          </div>
          <div class="meta-text w4">
            <div class="meta-label">
              No. of Employees residing in City/Municipality :
            </div>
            <div class="meta-value">
              {{ businessDetails.residing_employees }}
            </div>
          </div>
        </div>

        <!-- Lessor Details -->
        <div class="meta-text-group flex-wrap">
          <div class="meta-group-title">
            If Place of Business is Rented, please identify the following :
          </div>
          <div class="meta-text w6 no-br no-bb">
            <div class="meta-label">Lessor's Name :</div>
            <div class="meta-value">
              {{ lessorDetails.last_name }}
              {{ lessorDetails.first_name }}
              {{ lessorDetails.middle_name }}
            </div>
          </div>
          <div class="meta-text w6 no-bb">
            <div class="meta-label">Gross Monthly Rental :</div>
            <div class="meta-value">
              {{
                lessorDetails.gross_monthly_rental
                  ? `₱ ${parseFloat(lessorDetails.gross_monthly_rental).toFixed(
                      2
                    )}`
                  : "N/A"
              }}
            </div>
          </div>
          <div class="meta-text w4 no-br no-bb">
            <div class="meta-label">Last Name :</div>
            <div class="meta-value">
              {{ lessorDetails.last_name ? lessorDetails.last_name : "N/A" }}
            </div>
          </div>
          <div class="meta-text w4 no-br no-bb">
            <div class="meta-label">First Name :</div>
            <div class="meta-value">
              {{ lessorDetails.first_name ? lessorDetails.first_name : "N/A" }}
            </div>
          </div>
          <div class="meta-text w4 no-bb">
            <div class="meta-label">Middle Name :</div>
            <div class="meta-value">
              {{
                lessorDetails.middle_name ? lessorDetails.middle_name : "N/A"
              }}
            </div>
          </div>
          <div class="meta-text no-bb">
            <div class="meta-label">Lessor's Address :</div>
            <div class="meta-value">
              {{
                lessorDetails.complete_address
                  ? lessorDetails.complete_address
                  : "N/A"
              }}
            </div>
          </div>
          <div class="meta-text w6 no-br">
            <div class="meta-label">Telephone / Mobile No. :</div>
            <div class="meta-value">
              {{
                lessorDetails.telephone_number
                  ? lessorDetails.telephone_number
                  : "N/A"
              }}
              <!-- /
              {{
                lessorDetails.mobile_number
                  ? lessorDetails.mobile_number
                  : "N/A"
              }} -->
            </div>
          </div>
          <div class="meta-text w6">
            <div class="meta-label">Email Address :</div>
            <div class="meta-value">
              {{
                lessorDetails.email_address
                  ? lessorDetails.email_address
                  : "N/A"
              }}
            </div>
          </div>
        </div>

        <!-- Business Activity -->
        <div class="meta-text-group flex-wrap">
          <div class="meta-group-title">Business Activity</div>
          <div class="meta-table-header flex-center hide-in-mobile">
            <!-- <div class="form-th code no-br">Code :</div> -->
            <div class="form-th line no-br">Line of Business</div>
            <div class="form-th units no-br">No. of Units</div>
            <!-- <div class="form-th sales">
              Gross Sales/Receipts (for Renewal)
              <div class="form-sub-th">
                <div class="form-th no-br no-bl no-bb">Essential / Non-essential :</div>
              </div>
            </div> -->
            <div class="form-th sales">Capitalization / Gross Sales</div>
          </div>
          <div class="meta-table-row" v-if="businessActivities.length > 0">
            <div
              class="flex-center"
              v-for="(activity, index) in businessActivities"
              :key="index"
            >
              <!-- <div class="form-td code no-bt no-br">
                <span class="form-td-label show-in-mobile">Code :</span>
                {{ activity.code }}
              </div> -->
              <div class="form-td line no-bt no-br">
                <span class="form-td-label show-in-mobile"
                  >Line of Business :</span
                >
                {{ activity.line_of_business }}
              </div>
              <div class="form-td units no-bt no-br">
                <span class="form-td-label show-in-mobile">No. of Units :</span>
                {{ activity.units }}
              </div>
              <div class="form-td sales no-bt">
                <span class="form-td-label show-in-mobile"
                  >Capitalization / Gross Sales :</span
                >
                ₱
                {{
                  formatCurrency(parseFloat(activity.capitalization).toFixed(2))
                }}
              </div>
              <!-- <div class="form-td sales no-bt">
                <span class="form-td-label show-in-mobile"
                  >Non-Essential :</span
                >
                {{ activity.non_essential }}
              </div> -->
            </div>
          </div>
        </div>

        <!-- Uploaded Requirements -->
        <div class="meta-text-group flex-wrap" v-if="requirements">
          <div class="meta-group-title">Uploaded Requirements</div>
          <div class="requirement-list">
            <ol>
              <li
                v-for="(item, index) of this.requirements.requirements"
                :key="index"
              >
                <app-link :to="replaceUrl(item.file)">
                  {{ formatLabel(item.requirements_label) }} -
                  {{ item.filename }}</app-link
                >
              </li>
            </ol>
          </div>
        </div>
        <div class="flex-column">
          <div class="submission-text">
            Submission Date:
            {{
              businessApplication.last_submitted
                | moment("MMMM DD, YYYY hh:mm A")
            }}
          </div>
          <div
            class="assessment-result-list mt30"
            v-if="
              businessApplication.application_status == 2 ||
              businessApplication.application_status == 4
            "
          >
            <div class="meta-group-title">Assessment Result</div>
            <ol>
              <li
                v-for="(item, index) of this.businessAssessmentResult"
                :key="index"
              >
                <div>
                  {{ item.department }}: {{ item.status
                  }}<span v-if="item.created_at">
                    -
                    {{
                      item.created_at | moment("MMMM DD, YYYY hh:mm A")
                    }}</span
                  >
                  <span
                    class="mt5 ml10 mb2 meta-view-remarks"
                    v-if="item.status === 'Disapproved'"
                    @click="openBusinessRemarks(businessApplication.id)"
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
// import VueEasyLightbox from "vue-easy-lightbox";
import ButtonBlock from "@/components/ButtonBlock";
import { mapGetters } from "vuex";
import AppLink from "@/components/AppLink";
import moment from "moment-timezone";
export default {
  name: "BusinessApplicationDetails",
  components: {
    // VueEasyLightbox,
    ButtonBlock,
    AppLink,
  },
  computed: {
    ...mapGetters([
      "businessApplication",
      "businessBasicInformation",
      "businessDetails",
      "lessorDetails",
      "businessActivities",
      "applicationRequirements",
      "requirements",
      "businessAssessmentResult",
      "businessPermits",
    ]),
  },
  created() {
    this.getRequirements();
    this.$store.dispatch("getUserBusinessAssessmentResult", {
      business_application: this.businessApplication.id,
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("setCurrentApplicationStep", "1");
    this.$store.commit("resetBusinessState");
    next();
  },
  data() {
    return {
      imgs: [], // Img Url , string or Array of string
      visible: false,
      index: 0, // default: 0
    };
  },
  methods: {
    getApplicationDate(last_submitted, created_at) {
      if (last_submitted) {
        return moment(last_submitted).format("MMMM DD YYYY");
      } else {
        return moment(created_at).format("MMMM DD YYYY");
      }
    },
    async openBusinessRemarks(id) {
      await this.$store.dispatch("getBusinessRemarks", id);
      await this.$router.push({ name: "UserReplyInquiry" });
    },
    formatCurrency(str) {
      var parts = str.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (parts.length < 2) {
        parts.push("00");
      }
      return parts.join(".");
    },
    showSingle() {
      if (this.requirements) {
        if (this.requirements.requirements.length > 0) {
          this.requirements.requirements.map((item) => {
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
      if (this.applicationRequirements.id) {
        await this.$store.dispatch("getApplicationRequirements");
      }
    },
    replaceUrl(url) {
      return url.replace("/bacoor/", "/");
    },
    formatLabel(string) {
      return string.replace(/_/g, " ").toUpperCase();
    },
    viewBusinessPermit() {
      const file = this.businessPermits[this.businessPermits.length - 1].file;
      const url = this.replaceUrl(file);
      window.open(url, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.meta-txt-download {
  padding: 10px 10px 10px 0px;
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 20px;
  color: #2699fb;
  font-weight: bold;
}
.meta-view-remarks {
  text-decoration: underline;
  cursor: pointer;
}
.meta-group-title {
  color: #2699fb;
  font-weight: bold;
}
.submission-text {
  color: #2699fb;
  margin: 10px 0px;
  font-weight: bold;
}
.assessment-result-list ol li,
.assessment-result-list ol li div {
  width: 100%;
  color: #2699fb;
  font-size: 14px;
  font-weight: bold;
  padding: 5px 0;
  margin-left: 30px;
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
          font-size: 14px;
          line-height: 1.6;
          padding: 5px 0;
          border: 1px solid;
          min-height: 18px;
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
        width: calc(50% - 1.5px);
        float: left;
      }
      div.form-td.sales {
        width: calc(50% - 1.5px);
        float: left;
      }

      div.form-sub-th {
        width: 100%;
        div.form-th {
          width: calc(100% - 1.5px);
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
.show-in-mobile {
  display: none;
}

span.form-td-label {
  font-size: 14px;
  font-weight: bold;
  line-height: 1.6;
  width: 100%;
}

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

  .show-in-mobile {
    display: block;
  }

  .hide-in-mobile {
    display: none;
  }

  div.meta-parent-box
    div.meta-form-body
    div.meta-text-group
    div.meta-table-row
    div.form-td {
    width: 100%;
    padding: 4px 10px;
    text-align: left;
  }

  div.meta-parent-box div.meta-form-body div.meta-text-group div.form-td.code {
    border-top: 1px solid !important;
  }

  div.meta-parent-box div.meta-form-body div.meta-text-group div.form-td.no-br {
    border-right: 1px solid !important;
  }

  div.meta-parent-box
    div.meta-form-body
    div.meta-text-group
    div.meta-table-row {
    margin-bottom: 20px;
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
    .meta-label,
  div.meta-parent-box div.meta-form-body div.meta-text-group div.form-td span {
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
