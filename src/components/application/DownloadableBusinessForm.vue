<template>
  <div class="meta-container flex-wrap" ref="business_content">
    <button @click="generateBusinessForm()">TEST</button>
    <div class="downloadables-container">
      <img src="@/assets/bacoor-cavite-logo.png" alt="" id="logoImage" />
      <table id="basic-details-table">
        <thead>
          <tr>
            <th>BASIC DETAILS</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Application No. :</td>
            <td>{{ businessBasicInformation.reference_number }}</td>
            <td>DTI/SEC/CDA Registration No. :</td>
            <td>{{ businessBasicInformation.dti_sec_cda_reg_number }}</td>
          </tr>
          <tr>
            <td>Date of Application :</td>
            <td>
              {{
                getApplicationDate(
                  businessApplication.last_submitted,
                  businessApplication.created_at
                )
              }}
            </td>
            <td>DTI/SEC/CDA Date of Registration No. :</td>
            <td>
              {{
                businessBasicInformation.dti_sec_cda_reg_date
                  | moment("MMMM DD, YYYY")
              }}
            </td>
          </tr>
          <tr>
            <td>Mode of Payment :</td>
            <td>{{ businessBasicInformation.mode_of_payment }}</td>
            <td>Type of Organization :</td>
            <td>{{ businessBasicInformation.type_of_organization }}</td>
          </tr>
          <tr>
            <td>CTC No. :</td>
            <td>{{ businessBasicInformation.ctc_no }}</td>
            <td>Enjoying tax incentive from any Government Entity?</td>
            <td>
              {{ businessBasicInformation.has_tax_incentive ? "Yes" : "No" }}
            </td>
          </tr>
          <tr>
            <td>TIN :</td>
            <td>{{ businessBasicInformation.tin }}</td>
            <td>Please specify the entity :</td>
            <td>{{ businessBasicInformation.government_entity }}</td>
          </tr>
        </tbody>
      </table>
      <table id="taxpayer-details-table">
        <thead>
          <tr>
            <th>TAXPAYER DETAILS:</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Last Name :</td>
            <td>{{ businessBasicInformation.owner_last_name }}</td>
            <td>Corporate Name :</td>
            <td>{{ businessDetails.name }}</td>
          </tr>
          <tr>
            <td>First Name :</td>
            <td>{{ businessBasicInformation.owner_first_name }}</td>
            <td>Trade Name/Franchise :</td>
            <td>{{ businessDetails.trade_name }}</td>
          </tr>
          <tr>
            <td>Middle Name :</td>
            <td>{{ businessBasicInformation.owner_middle_name }}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <table id="president-details-table">
        <thead>
          <tr>
            <th>PRESIDENT/TREASURER OF CORP.</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Last Name :</td>
            <td>{{ businessDetails.president_last_name }}</td>
          </tr>
          <tr>
            <td>First Name :</td>
            <td>{{ businessDetails.president_first_name }}</td>
          </tr>
          <tr>
            <td>Middle Name :</td>
            <td>{{ businessDetails.president_middle_name }}</td>
          </tr>
        </tbody>
      </table>
      <table id="business-address-table">
        <thead>
          <tr>
            <th>BUSINESS ADDRESS</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Address No. :</td>
            <td>{{ businessDetails.address_no }}</td>
            <td>Building Name :</td>
            <td>{{ businessDetails.building_name }}</td>
          </tr>
          <tr>
            <td>Block No. :</td>
            <td>{{ businessDetails.block_no }}</td>
            <td>Unit No :</td>
            <td>{{ businessDetails.unit_no }}</td>
          </tr>
          <tr>
            <td>Lot No. :</td>
            <td>{{ businessDetails.lot_no }}</td>
            <td>Floor No :</td>
            <td>{{ businessDetails.floor_no }}</td>
          </tr>
          <tr>
            <td>Street :</td>
            <td>{{ businessDetails.street }}</td>
            <td>Barangay :</td>
            <td>{{ businessDetails.barangay }}</td>
          </tr>
          <tr>
            <td>Subdivision :</td>
            <td>{{ businessDetails.subdivision }}</td>
            <td>City :</td>
            <td>{{ businessDetails.city }}</td>
          </tr>
          <tr>
            <td>Building No :</td>
            <td>{{ businessDetails.building_no }}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <table id="business-details-table">
        <thead>
          <tr>
            <th>OTHER BUSINESS DETAILS</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Telephone / Mobile No. :</td>
            <td>
              {{
                businessDetails.telephone_number
                  ? businessDetails.telephone_number
                  : "N/A"
              }}
            </td>
            <td>Email Address :</td>
            <td>
              {{
                businessDetails.email_address
                  ? businessDetails.email_address
                  : "N/A"
              }}
            </td>
          </tr>
          <tr>
            <td>Property Index Number (PIN) :</td>
            <td>{{ businessDetails.property_index_number }}</td>
            <td>Business Area (in sq m) :</td>
            <td>{{ businessDetails.area }} sqm</td>
          </tr>
          <tr>
            <td>Total No. of Employees (including owner):</td>
            <td>{{ businessDetails.total_employees }}</td>
            <td>No. of Employees residing in City/Municipality :</td>
            <td>{{ businessDetails.residing_employees }}</td>
          </tr>
        </tbody>
      </table>
      <table id="owner-details-table">
        <thead>
          <tr>
            <th>OWNER'S DETAILS</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Complete Address :</td>
            <td>{{ businessBasicInformation.owner_complete_address }}</td>
          </tr>
          <tr>
            <td>Telephone / Mobile No. :</td>
            <td>
              {{
                businessBasicInformation.owner_telephone_number
                  ? businessBasicInformation.owner_telephone_number
                  : "N/A"
              }}
            </td>
          </tr>
          <tr>
            <td>Email Address :</td>
            <td>{{ businessBasicInformation.owner_email_address }}</td>
          </tr>
        </tbody>
      </table>
      <table id="lessor-details-table">
        <thead>
          <tr>
            <th>LESSOR'S DETAILS</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Last Name :</td>
            <td>
              {{ lessorDetails.last_name ? lessorDetails.last_name : "N/A" }}
            </td>
          </tr>
          <tr>
            <td>First Name :</td>
            <td>
              {{ lessorDetails.first_name ? lessorDetails.first_name : "N/A" }}
            </td>
          </tr>
          <tr>
            <td>Middle Name :</td>
            <td>
              {{
                lessorDetails.middle_name ? lessorDetails.middle_name : "N/A"
              }}
            </td>
          </tr>
          <tr>
            <td>Telephone / Mobile No. :</td>
            <td>
              {{
                lessorDetails.telephone_number
                  ? lessorDetails.telephone_number
                  : "N/A"
              }}
            </td>
          </tr>
          <tr>
            <td>Lessor's Address :</td>
            <td>
              {{
                lessorDetails.complete_address
                  ? lessorDetails.complete_address
                  : "N/A"
              }}
            </td>
          </tr>
          <tr>
            <td>Email Address :</td>
            <td>
              {{
                lessorDetails.email_address
                  ? lessorDetails.email_address
                  : "N/A"
              }}
            </td>
          </tr>
        </tbody>
      </table>
      <table id="business-activity-table" v-if="businessActivities.length > 0">
        <thead>
          <tr>
            <th>(Business Activity) Line of Business</th>
            <th>No. of Units</th>
            <th>Capitalization / Gross Sales</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(activity, index) in businessActivities" :key="index">
            <td>{{ activity.line_of_business }}</td>
            <td>{{ activity.units }}</td>
            <td>
              PHP
              {{
                formatCurrency(parseFloat(activity.capitalization).toFixed(2))
              }}
            </td>
          </tr>
        </tbody>
      </table>
      <table
        id="business-activity-table-none"
        v-if="businessActivities.length < 1"
      >
        <thead>
          <tr>
            <th>(Business Activity) Line of Business</th>
            <th>No. of Units</th>
            <th>Capitalization / Gross Sales</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>N/A</td>
            <td>N/A</td>
            <td>N/A</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import BasePdfHeader from "@/components/forms/BasePdfHeader";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import { mapGetters } from "vuex";
import moment from "moment-timezone";
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
          this.generateBusinessForm();
          this.$store.commit("setPrintBusiness", false);
        }
      },
    },
  },
  mounted() {
    this.$store.commit("setPrintBusiness", false);
  },
  methods: {
    getApplicationDate(last_submitted, created_at) {
      if (last_submitted) {
        return moment(last_submitted).format("MMMM DD YYYY");
      } else {
        return moment(created_at).format("MMMM DD YYYY");
      }
    },
    getDataUrl(img) {
      // Create canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      // Set width and height
      canvas.width = img.width;
      canvas.height = img.height;
      // Draw the image
      ctx.drawImage(img, 0, 0);
      return canvas.toDataURL("image/jpeg");
    },
    formatCurrency(str) {
      var parts = str.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (parts.length < 2) {
        parts.push("00");
      }
      return parts.join(".");
    },
    generateReport() {
      const doc = new jsPDF("p", "mm", "a4");
      /** WITH CSS */
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();
      var canvasElement = document.createElement("canvas");
      let business_basic_info = this.businessBasicInformation;
      html2canvas(this.$refs.business_content, {
        canvas: canvasElement,
        width: 794,
        height: 1124,
      }).then(function (canvas) {
        const img = canvas.toDataURL("image/jpeg", 1);
        doc.addImage(img, "JPEG", 0, 0, width, height);
        doc.save(
          `business-application-${business_basic_info.reference_number}.pdf`
        );
      });
    },
    generateBusinessForm() {
      var doc = new jsPDF("p", "pt");

      // Select the image
      const img = document.querySelector("#logoImage");
      img.addEventListener("load", function (event) {
        const dataUrl = this.getDataUrl(event.currentTarget);
      });
      let tax_year = moment(this.businessApplication.updated_at).format("YYYY");
      var header = function (data) {
        doc.setFontSize(12);
        doc.setTextColor(40);
        doc.setFontStyle("normal");
        doc.addImage(img, "png", 280, 25, 50, 50);

        doc.setFontSize(11);
        doc.text("Republic of the Philippines", 242, 95);
        doc.text("Province of Cavite CITY OF BACOOR", 210, 110);
        doc.setFontStyle("bold");
        doc.text("BUSINESS PERMIT AND LICENSING OFFICE", 185, 125);
        doc.setFontStyle("normal");
        doc.text(`TAX YEAR ${tax_year}`, 260, 140);
      };

      //MAIN DETAILS
      var basicTable = doc.autoTableHtmlToJson(
        document.getElementById("basic-details-table")
      );
      doc.autoTable(basicTable.columns, basicTable.data, {
        theme: "grid",
        headStyles: { fillColor: "#2699fb" },
        bodyStyles: { lineColor: "#bce0fd" },
        margin: { top: 160 },

        beforePageContent: header,
      });

      //TAXPAYER DETAILS
      var taxpayerDetailsTable = doc.autoTableHtmlToJson(
        document.getElementById("taxpayer-details-table")
      );
      doc.autoTable(taxpayerDetailsTable.columns, taxpayerDetailsTable.data, {
        theme: "grid",
        headStyles: { fillColor: "#2699fb" },
        bodyStyles: { lineColor: "#bce0fd" },
      });

      //PRESIDENT/TREASURER DETAILS
      var presTable = doc.autoTableHtmlToJson(
        document.getElementById("president-details-table")
      );
      doc.autoTable(presTable.columns, presTable.data, {
        theme: "grid",
        headStyles: { fillColor: "#2699fb" },
        bodyStyles: { lineColor: "#bce0fd" },
      });

      //BUSINESS ADDRESS
      var busiAddressTable = doc.autoTableHtmlToJson(
        document.getElementById("business-address-table")
      );
      doc.autoTable(busiAddressTable.columns, busiAddressTable.data, {
        theme: "grid",
        headStyles: { fillColor: "#2699fb" },
        bodyStyles: { lineColor: "#bce0fd" },
      });

      //BUSINESS DETAILS
      var busiDetailsTable = doc.autoTableHtmlToJson(
        document.getElementById("business-details-table")
      );
      doc.autoTable(busiDetailsTable.columns, busiDetailsTable.data, {
        theme: "grid",
        headStyles: { fillColor: "#2699fb" },
        bodyStyles: { lineColor: "#bce0fd" },
        pageBreak: "avoid",
      });

      //OWNER DETAILS
      var ownerDetailsTable = doc.autoTableHtmlToJson(
        document.getElementById("owner-details-table")
      );
      doc.autoTable(ownerDetailsTable.columns, ownerDetailsTable.data, {
        theme: "grid",
        headStyles: { fillColor: "#2699fb" },
        bodyStyles: { lineColor: "#bce0fd" },
      });

      //LESSOR DETAILS
      var lessorDetailsTable = doc.autoTableHtmlToJson(
        document.getElementById("lessor-details-table")
      );
      doc.autoTable(lessorDetailsTable.columns, lessorDetailsTable.data, {
        theme: "grid",
        headStyles: { fillColor: "#2699fb" },
        bodyStyles: { lineColor: "#bce0fd" },
      });

      //LESSOR DETAILS
      if (this.businessActivities.length > 0) {
        var busiActivityTable = doc.autoTableHtmlToJson(
          document.getElementById("business-activity-table")
        );
        doc.autoTable(busiActivityTable.columns, busiActivityTable.data, {
          theme: "grid",
          headStyles: { fillColor: "#2699fb" },
          bodyStyles: { lineColor: "#bce0fd" },
        });
      } else {
        var busiActivityTable = doc.autoTableHtmlToJson(
          document.getElementById("business-activity-table-none")
        );
        doc.autoTable(busiActivityTable.columns, busiActivityTable.data, {
          theme: "grid",
          headStyles: { fillColor: "#2699fb" },
          bodyStyles: { lineColor: "#bce0fd" },
        });
      }

      doc.save(
        `business-application-${this.businessBasicInformation.reference_number}.pdf`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
div.meta-container {
  width: 210mm;
  height: 297mm;
  background-color: #fff;
  .meta-form-title {
    font-size: 18px;
    line-height: 1;
    margin-bottom: -10px;
  }
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
        padding: 10px 0 0;
        line-height: 1;
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
