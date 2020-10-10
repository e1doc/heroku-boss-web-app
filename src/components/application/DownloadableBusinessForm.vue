<template>
  <div class="meta-container flex-wrap" ref="business_content">
    <base-pdf-header
      :applicationnumber="businessBasicInformation.reference_number"
      formtitle="BUSINESS PERMIT AND LICENSING OFFICE"
      :additionaltext="businessApplication.created_at"
      type="business"
    />
    <div class="meta-form-body flex-wrap">
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
              {{ businessApplication.created_at | moment("MMMM DD, YYYY") }}
            </div>
          </div>
          <div class="meta-text no-bb">
            <div class="meta-label">Type of Organization :</div>
            <div class="meta-value">
              {{ businessBasicInformation.type_of_organization }}
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
            <div class="meta-label">Business Name :</div>
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
          <div class="meta-text no-bb">
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
            <div class="meta-label">Total No. of Employees (including owner):</div>
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
            <div class="form-th sales">
              Gross Sales/Receipts (for Renewal)
              <div class="form-sub-th">
                <div class="form-th no-br no-bl no-bb">Essential / Non-essential :</div>
                <!-- <div class="form-th no-br no-bl no-bb">Non-Essential :</div> -->
              </div>
            </div>
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
              <div class="form-td sales no-bt no-br">
                <span class="form-td-label show-in-mobile">Essential :</span>
                {{ activity.essential }}
              </div>
              <div class="form-td sales no-bt">
                <span class="form-td-label show-in-mobile"
                  >Non-Essential :</span
                >
                {{ activity.non_essential }}
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import BasePdfHeader from "@/components/forms/BasePdfHeader";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { mapGetters } from "vuex";
export default {
  name: "DownloadableBusinessForm",
  components: {
    BasePdfHeader,
  },
  computed: {
    ...mapGetters([
      "printBusiness",
      "businessApplication",
      "businessBasicInformation",
      "businessDetails",
      "lessorDetails",
      "businessActivities",
    ]),
  },
  watch: {
    printBusiness: {
      deep: true,
      handler(status) {
        if (status) {
          this.generateReport();
          this.$store.commit("setPrintBusiness", false);
        }
      },
    },
  },
  mounted() {
    this.$store.commit("setPrintBusiness", false);
  },
  methods: {
    generateReport() {
      const doc = new jsPDF("p", "mm", "a4");
      /** WITH CSS */
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();
      var canvasElement = document.createElement("canvas");
      html2canvas(this.$refs.business_content, {
        canvas: canvasElement,
        width: 794,
        height: 1124,
      }).then(function(canvas) {
        console.log(canvas);
        const img = canvas.toDataURL("image/jpeg", 1);
        doc.addImage(img, "JPEG", 0, 0, width, height);
        console.log(width, height);
        doc.save(`business-application-${businessBasicInformation}.pdf`);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
div.meta-container {
  width: 210mm;
  height: 297mm;
  background-color: #fff;
  div.meta-form-body {
    height: 100%;
    width: 100%;
    padding: 20px 30px;
    div.meta-text-group {
      width: 100%;
      div.meta-group-title {
        width: 100%;
        color: #2699fb;
        font-size: 10px;
        font-weight: bold;
        padding: 10px 0;
      }
      div.meta-text {
        width: 100%;
        color: #2b2b2b;
        font-size: 10px;
        line-height: 1.6;
        padding: 4px 10px;
        border: 1px solid;
        .meta-label {
          font-size: 10px;
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
          font-size: 10px;
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
</style>
