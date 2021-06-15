<template>
  <div class="meta-container flex-wrap" ref="content">
    <button @click="generateBuildingForm()">TEST</button>
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
            <!-- <td>#{{ buildingBasicInformation.reference_number }}</td> -->
            <td>#{{ buildingApplication.series_number }}</td>
            <td>Ownership Type:</td>
            <td>{{ buildingBasicInformation.ownership_type }}</td>
          </tr>
          <tr>
            <td>Last Name :</td>
            <td>{{ buildingBasicInformation.ownership_type }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>First Name :</td>
            <td>{{ buildingBasicInformation.owner_first_name }}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Middle Name</td>
            <td>{{ buildingBasicInformation.owner_middle_name }}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <table id="building-details-table">
        <thead>
          <tr>
            <th>BUILDING DETAILS:</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>TCT No. :</td>
            <td>{{ buildingDetails.tct_no }}</td>
            <td>Tax Dec. No. :</td>
            <td>{{ buildingDetails.tax_dec_no }}</td>
          </tr>
          <tr>
            <td>Scope of Work :</td>
            <td>
              {{
                buildingDetails.scope_of_work_others === ""
                  ? buildingDetails.scope_of_work
                  : buildingDetails.scope_of_work_others
              }}
            </td>
            <td>Use or Character of Occupancy :</td>
            <td>
              {{
                buildingDetails.character_of_occupancy_others === ""
                  ? buildingDetails.character_of_occupancy
                  : buildingDetails.character_of_occupancy_others
              }}
            </td>
          </tr>
        </tbody>
      </table>
      <table id="building-address-table">
        <thead>
          <tr>
            <th>BUILDING ADDRESS</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Address No. :</td>
            <td>{{ buildingDetails.address_no }}</td>
            <td>District :</td>
            <td>{{ buildingDetails.district }}</td>
          </tr>
          <tr>
            <td>Block No. :</td>
            <td>{{ buildingDetails.blk_no }}</td>
            <td>Phase No. :</td>
            <td>{{ buildingDetails.phase_no }}</td>
          </tr>
          <tr>
            <td>Lot No. :</td>
            <td>{{ buildingDetails.lot_no }}</td>
            <td>Barangay :</td>
            <td>{{ buildingDetails.barangay }}</td>
          </tr>
          <tr>
            <td>Lot No. count (default 1) :</td>
            <td>{{ buildingDetails.lot_no_count }}</td>
            <td>Street :</td>
            <td>{{ buildingDetails.street }}</td>
          </tr>
          <tr>
            <td>Subdivision :</td>
            <td>{{ buildingDetails.subdivision_name }}</td>
            <td>City / Province :</td>
            <td>{{ buildingDetails.city }}</td>
          </tr>
        </tbody>
      </table>
      <table id="other-building-details-table">
        <thead>
          <tr>
            <th>OTHER BUILDING DETAILS</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Estimated Cost :</td>
            <td>
              ₱ {{ formatCurrency(buildingOtherDetails.total_estimated_cost) }}
            </td>
            <td>Number of Units :</td>
            <td>{{ buildingOtherDetails.units }}</td>
          </tr>
          <tr>
            <td>Proposed Date of Construction :</td>
            <td>
              {{
                buildingOtherDetails.date_of_construction
                  | moment("MMMM DD, YYYY")
              }}
            </td>
            <td>Total Floor Area :</td>
            <td>{{ buildingOtherDetails.floor_area }} square meters</td>
          </tr>
          <tr>
            <td>Expected Date of Completion :</td>
            <td>
              {{
                buildingOtherDetails.date_of_completion
                  | moment("MMMM DD, YYYY")
              }}
            </td>
            <td>Lot Area :</td>
            <td>{{ buildingOtherDetails.lot_area }} square meters</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import BasePdfHeader from "@/components/forms/BasePdfHeader";
import { mapGetters } from "vuex";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
export default {
  name: "DownloadableBuildingForm",
  computed: {
    ...mapGetters([
      "printProperty",
      "buildingApplication",
      "buildingBasicInformation",
      "buildingDetails",
      "buildingOtherDetails",
    ]),
  },
  components: {
    BasePdfHeader,
  },
  watch: {
    printProperty: {
      deep: true,
      handler(status) {
        if (status) {
          this.generateBuildingForm();
          this.$store.commit("setPrintProperty", false);
        }
      },
    },
  },
  methods: {
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
      if (str) {
        var parts = str.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if (parts.length < 2) {
          parts.push("00");
        }
        return parts.join(".");
      } else {
        return "N/A";
      }
    },
    generateReport() {
      const buildingId = this.buildingApplication.series_number;
      const doc = new jsPDF("p", "mm", "a4");
      /** WITH CSS */
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();
      var canvasElement = document.createElement("canvas");
      html2canvas(this.$refs.content, {
        canvas: canvasElement,
        width: 794,
        height: 1124,
      }).then(function (canvas) {
        const img = canvas.toDataURL("image/jpeg", 1);
        doc.addImage(img, "JPEG", 0, 0, width, height);
        doc.save(`building-application-${buildingId}`);
      });
    },
    generateBuildingForm() {
      var doc = new jsPDF("p", "pt");
      const buildingId = this.buildingApplication.series_number;
      // Select the image
      const img = document.querySelector("#logoImage");
      img.addEventListener("load", function (event) {
        const dataUrl = this.getDataUrl(event.currentTarget);
      });
      // let tax_year = moment(this.businessApplication.created_at).format('YYYY')
      var header = function (data) {
        doc.setFontSize(12);
        doc.setTextColor(40);
        doc.setFontStyle("normal");
        doc.addImage(img, "png", 280, 25, 50, 50);

        doc.setFontSize(11);
        doc.text("Republic of the Philippines", 242, 95);
        doc.text("Province of Cavite CITY OF BACOOR", 210, 110);
        doc.setFontStyle("bold");
        doc.text("APPLICATION FORM FOR BUILDING PERMIT", 185, 127);
        // doc.setFontStyle("normal");
        // doc.text(`TAX YEAR ${tax_year}`, 260, 140);
      };

      //MAIN DETAILS
      var basicTable = doc.autoTableHtmlToJson(
        document.getElementById("basic-details-table")
      );
      doc.autoTable(basicTable.columns, basicTable.data, {
        theme: "grid",
        headStyles: { fillColor: "#2699fb" },
        bodyStyles: { lineColor: "#bce0fd" },
        margin: { top: 150 },

        beforePageContent: header,
      });

      //TAXPAYER DETAILS
      var buildingDetailsTable = doc.autoTableHtmlToJson(
        document.getElementById("building-details-table")
      );
      doc.autoTable(buildingDetailsTable.columns, buildingDetailsTable.data, {
        theme: "grid",
        headStyles: { fillColor: "#2699fb" },
        bodyStyles: { lineColor: "#bce0fd" },
      });

      //BUILDING ADDRESS
      var buildingAddressTable = doc.autoTableHtmlToJson(
        document.getElementById("building-address-table")
      );
      doc.autoTable(buildingAddressTable.columns, buildingAddressTable.data, {
        theme: "grid",
        headStyles: { fillColor: "#2699fb" },
        bodyStyles: { lineColor: "#bce0fd" },
      });

      //BUILDING DETAILS
      var otherDetailsTable = doc.autoTableHtmlToJson(
        document.getElementById("other-building-details-table")
      );
      doc.autoTable(otherDetailsTable.columns, otherDetailsTable.data, {
        theme: "grid",
        headStyles: { fillColor: "#2699fb" },
        bodyStyles: { lineColor: "#bce0fd" },
      });

      doc.save(`building-application-${buildingId}`);
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
        margin-top: 15px;
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

div.clearfix {
  clear: both;
}
</style>
