<template>
  <!-- <section class="sc-invoice">
    <div class="dialog-holder" ref="content">
      <div class="dialog-header">
        <div class="store-avatar">
          <img src="@/assets/bacoor-cavite-logo.png" alt="" />
        </div>
        <div class="text-bold size18">Bacoor One Stop Shop System</div>
        <div class="triangle">
          <font-awesome-icon icon="caret-up" class="icon" />
        </div>
      </div>
      <div class="dialog-body-holder">
   <div class="mb30"><h3>Stament of Account</h3></div> -->
  <!-- <div class="dialog-body">
        <div class="invoice-details">
            <div class="invoice-title">APPOINTMENT DETAILS</div>
            <div class="details-body">
                <div class="details-item">
                    <div class="item-label">Appointment Date:</div>
                    <div class="item-value">{{currentAppointment.appointment_date | moment('MMMM DD, YYYY')}}</div>
                </div>
                <div class="details-item">
                    <div class="item-label">Appointment Type:</div>
                    <div class="item-value">{{currentAppointment.title}}</div>
                </div>
                <div class="details-item">
                    <div class="item-label">Appointment Batch:</div>
                    <div class="item-value">{{currentAppointment.batch === 'batch_1' ? 'Batch 1 ( 8:00 AM - 1:00 PM )' : 'Batch 2 ( 1:00 PM - 5:00 PM )'}}</div>
                </div>
            </div>
        </div>
        <div class="invoice-details">
          <div class="invoice-title">INVOICE DETAILS</div>
          <div class="details-body">
            <div class="details-item">
              <div class="item-label">Reference No:</div>
              <div class="item-value">Invoice #{{currentSoaObj.reference_number}}</div>
            </div>
            <div class="details-item">
              <div class="item-label">Year:</div>
              <div class="item-value">{{currentSoaObj.date_issued | moment('YYYY')}}</div>
            </div>
            <div class="details-item">
              <div class="item-label">Issued Date:</div>
              <div class="item-value">{{currentSoaObj.date_issued | moment('MMMM DD, YYYY')}}</div>
            </div>
            <div class="details-item">
              <div class="item-label">Quarter:</div>
              <div class="item-value">1st Quarter - 2nd Quarter</div>
            </div>
          </div>
        </div>
         <div class="invoice-owner">
          <div class="owner-details" v-if="currentSoaObj.business_application !== null">
            <div class="item-label">Business Name</div>
            <div class="item-value">{{currentSoaObj.business_application.businessdetails.name}}</div>
          </div>
          <div class="owner-details" v-if="currentSoaObj.building_application !== null">
            <div class="item-label">Tax Declaration Number</div>
            <div class="item-value">{{currentSoaObj.building_application.buildingdetails.tax_dec_no}}</div>
          </div>
        </div>
        <div class="invoice-owner">
          <div class="owner-details" v-if="currentSoaObj.business_application !== null">
            <div class="item-label">Business Owner</div>
            <div class="item-value">{{currentSoaObj.business_application.businessbasicinformation.owner_first_name}} {{currentSoaObj.business_application.businessbasicinformation.owner_middle_name}} {{currentSoaObj.business_application.businessbasicinformation.owner_last_name}}</div>
          </div>
          <div class="owner-details" v-if="currentSoaObj.building_application !== null">
            <div class="item-label">Property Owner</div>
            <div class="item-value">{{currentSoaObj.building_application.buildingbasicinformation.owner_first_name}} {{currentSoaObj.building_application.buildingbasicinformation.owner_middle_name}} {{currentSoaObj.building_application.buildingbasicinformation.owner_last_name}}</div>
          </div>
        </div>
        <div class="invoice-amount">
          <div class="amount-details">
            <div class="item-label">Total Amount</div>
            <div class="item-value">₱ {{parseFloat(currentSoaObj.amount).toFixed(2)}}</div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </section> -->
  <div class="new-invoice-container">
    <img src="@/assets/bacoor-cavite-logo.png" alt="" id="logoImage" />
    <table id="appointment-details-table">
      <thead>
        <tr>
          <th>Appointment Date</th>
          <th>Appointment Type</th>
          <th>Appointment Batch</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {{ currentAppointment.appointment_date | moment("MMMM DD, YYYY") }}
          </td>
          <td>{{ currentAppointment.title }}</td>
          <td>
            {{
              currentAppointment.batch === "batch_1"
                ? "Batch 1 ( 8:00 AM - 1:00 PM )"
                : "Batch 2 ( 1:00 PM - 5:00 PM )"
            }}
          </td>
        </tr>
      </tbody>
    </table>
    <table id="invoice-details-table">
      <thead>
        <tr>
          <th>Reference No.</th>
          <th>Year</th>
          <th>Issued Date</th>
          <th>Quarter</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ currentSoaObj.reference_number }}</td>
          <td>{{ currentSoaObj.year }}</td>
          <td>{{ currentSoaObj.created_at | moment("MMMM DD, YYYY") }}</td>
          <td>{{ currentSoaObj.quarter }}</td>
        </tr>
      </tbody>
    </table>
    <table id="business-details-table">
      <thead>
        <tr>
          <th>
            {{
              currentSoaType === "business" ? "Account Number" : "Tax Dec No."
            }}
          </th>
          <th v-if="currentSoaType === 'business'">Business Name</th>
          <th>
            {{
              currentSoaType === "business"
                ? "Business Owner"
                : "Real Property Owner Name"
            }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-if="currentSoaType === 'business'">
            {{ currentSelectedBusiness.account_number }}
          </td>
          <td v-if="currentSoaType === 'real_property'">
            {{ currentSelectedProperty.buildingdetails.tax_dec_no }}
          </td>
          <td v-if="currentSoaType === 'business'">
            {{
              currentSelectedBusiness.businessdetails.name != ""
                ? currentSelectedBusiness.businessdetails.name
                : currentSelectedBusiness.businessdetails.trade_name
            }}
          </td>
          <td v-if="currentSoaType === 'business'">
            {{
              currentSelectedBusiness.businessbasicinformation.owner_first_name
            }}
            {{
              currentSelectedBusiness.businessbasicinformation.owner_middle_name
            }}
            {{
              currentSelectedBusiness.businessbasicinformation.owner_last_name
            }}
          </td>
          <td v-if="currentSoaType === 'real_property'">
            {{
              currentSelectedProperty.buildingbasicinformation.owner_first_name
            }}
          </td>
        </tr>
      </tbody>
    </table>
    <table id="fees-table">
      <thead>
        <tr>
          <th>FEES</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) of compiledFees" :key="index">
          <td>{{ item.fee_description }}</td>
          <td>PHP {{ formatCurrency(parseFloat(item.amount).toFixed(2)) }}</td>
        </tr>
      </tbody>
    </table>
    <table id="amount-table">
      <thead>
        <tr>
          <th align="center">TOTAL AMOUNT</th>
          <th align="center">
            PHP
            {{ formatCurrency(parseFloat(currentSoaObj.amount).toFixed(2)) }}
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
export default {
  name: "DownloadableAppointmentInvoice",
  computed: {
    ...mapGetters([
      "printInvoice",
      "currentSoaObj",
      "currentAppointment",
      "currentSelectedBusiness",
      "generatedBill",
      "currentSelectedProperty",
      "currentSoaType",
    ]),
  },
  data() {
    return {
      fees: [
        {
          label: "Mayor's Permit",
          value: "₱ 500.00",
        },
        {
          label: "Environmental Fee",
          value: "₱ 1200.00",
        },
        {
          label: "Business Plate Fee",
          value: "₱ 250.00",
        },
        {
          label: "Medical Fee",
          value: "₱ 1.00",
        },
        {
          label: "Business Processing Fee",
          value: "₱ 50.00",
        },
        {
          label: "Security Seal Fee",
          value: "₱ 50.00",
        },
        {
          label: "Sanitary Fee",
          value: "₱ 200.00",
        },
        {
          label: "Zoning Fee",
          value: "₱ 1285.00",
        },
        {
          label: "Building Permit Fee",
          value: "₱ 120.00",
        },
        {
          label: "Electrical Fee",
          value: "₱ 300.00",
        },
        {
          label: "Plumbing Permit Fee",
          value: "₱ 60.00",
        },
        {
          label: "Sign Board Fee",
          value: "₱ 192.00",
        },
        {
          label: "Business Tax",
          value: "₱ 220.00",
        },
      ],
      allFees2: [],
      compiledFees: [],
    };
  },
  watch: {
    printInvoice: {
      deep: true,
      async handler(status) {
        if (status) {
          await this.setupFees();
          await this.generateAppointmentInvoice();
          await this.$store.commit("setPrintInvoice", false);
        }
      },
    },
  },
  mounted() {},
  methods: {
    formatCurrency(str) {
      var parts = str.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (parts.length < 2) {
        parts.push("00");
      }
      return parts.join(".");
    },
    groupBy(list, keyGetter) {
      const map = new Map();
      list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
          map.set(key, [item]);
        } else {
          collection.push(item);
        }
      });
      return map;
    },
    async setupFees() {
      this.compiledFees = [];
      this.allFees2 = [];
      let feesHolder = [];
      let groupHolder = [];
      await this.currentSoaObj.bills.forEach((item) => {
        this.allFees2.push(item.billfees);
      });
      await this.allFees2.forEach((item) => {
        item.forEach((element) => {
          feesHolder.push(element);
        });
      });
      const grouped = await this.groupBy(
        feesHolder,
        (item) => item.fee_description
      );
      await grouped.forEach((item) => {
        groupHolder.push(item);
      });
      await groupHolder.forEach((item) => {
        item.forEach((element) => {
          this.compiledFees.push(element);
        });
      });
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
    generateReport() {
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
        doc.save("appointment-invoice.pdf");
      });
    },

    generateAppointmentInvoice() {
      var doc = new jsPDF("p", "pt");

      // Select the image
      const img = document.querySelector("#logoImage");
      img.addEventListener("load", function (event) {
        const dataUrl = this.getDataUrl(event.currentTarget);
      });

      var header = function (data) {
        doc.setFontSize(12);
        doc.setTextColor(40);
        doc.setFontStyle("normal");
        doc.addImage(img, "png", 280, 25, 50, 50);
        doc.text("Bacoor One Stop Shop", 242, 95);

        doc.setFontSize(12);
        doc.setFontStyle("bold");
        doc.text("APPOINTMENT DETAILS", 225, 115);
      };

      var options = {
        beforePageContent: header,
        margin: {
          top: 80,
        },
      };

      var appointmentTable = doc.autoTableHtmlToJson(
        document.getElementById("appointment-details-table")
      );
      doc.autoTable(appointmentTable.columns, appointmentTable.data, {
        margin: { top: 140 },
      });

      var invoiceTable = doc.autoTableHtmlToJson(
        document.getElementById("invoice-details-table")
      );
      doc.autoTable(invoiceTable.columns, invoiceTable.data, {
        margin: { top: 140 },
      });

      var businessTable = doc.autoTableHtmlToJson(
        document.getElementById("business-details-table")
      );
      doc.autoTable(businessTable.columns, businessTable.data, options);

      var feesTable = doc.autoTableHtmlToJson(
        document.getElementById("fees-table")
      );
      doc.autoTable(feesTable.columns, feesTable.data, options);

      // const img2 = document.querySelector("#test");
      // doc.addImage(img2, "png", 280, 25, 50, 50);
      var amountTable = doc.autoTableHtmlToJson(
        document.getElementById("amount-table")
      );
      doc.autoTable(amountTable.columns, amountTable.data, {
        margin: {
          top: 80,
        },
        headStyles: {
          fontSize: 12,
          cellPadding: { top: 10, right: 15, bottom: 10, left: 15 },
        },
      });

      doc.save("Appointment-Details.pdf");
    },
  },
};
</script>

<style lang="scss" scoped>
.sc-invoice {
  width: 210mm;
  height: 297mm;
}

.dialog-holder {
  box-shadow: -2px 10px 30px rgba(127, 127, 127, 0.1);
  display: flex;
  flex-direction: column;
  width: 100%;
  .dialog-header {
    background: #2699fb;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ffffff;
    padding: 30px 15px;
    width: 100%;
    .store-avatar {
      margin-bottom: 20px;
      img {
        width: 100px;
        height: 100px;
      }
    }
    .triangle {
      position: absolute;
      bottom: -18px;
      .icon {
        font-size: 48px;
      }
    }
    .times {
      position: absolute;
      top: 3px;
      right: 11px;
      padding: 10px;
      cursor: pointer;
      .icon {
        font-size: 28px;
      }
    }
  }
  .dialog-body-holder {
    padding: 50px;
    width: 80%;
    .dialog-body {
      background: #eaf6ff !important;
      width: 100%;
      padding: 40px 30px 30px;
      .invoice-details {
        padding: 30px 0px;
        border-bottom: 1px solid rgba($color: #2699fb, $alpha: 0.73);
        .invoice-title {
          margin-bottom: 25px;
          color: rgba($color: #2699fb, $alpha: 0.73);
          font-weight: bold;
          font-size: 20px;
        }
        .details-body {
          padding-left: 20px;
          display: flex;
          flex-wrap: wrap;
          .details-item {
            width: 50%;
            margin-bottom: 25px;
            .item-label {
              font-weight: bold;
              margin-bottom: 8px;
              font-size: 16px;
            }
            .item-value {
              font-size: 16px;
              font-family: "Proxima Nova Rg";
            }
          }
        }
      }
      .invoice-owner {
        border-bottom: 1px solid rgba($color: #2699fb, $alpha: 0.73);
        padding: 30px 0px;
        .owner-details {
          .item-label {
            font-weight: bold;
            margin-bottom: 8px;
            font-size: 16px;
          }
          .item-value {
            font-size: 16px;
            font-family: "Proxima Nova Rg";
          }
        }
      }
      .invoice-amount {
        padding: 20px 0px;
        .amount-details {
          display: flex;
          flex-wrap: wrap;
          .amount {
            font-family: "Proxima Nova Rg";
          }
          .item-label {
            width: 50%;
            margin: auto 0;
            color: rgba($color: #2699fb, $alpha: 0.73);
            font-weight: bold;
            font-size: 16px;
            text-transform: uppercase;
          }
          .item-value {
            width: 50%;
            color: #2699fb;
            font-weight: bold;
            font-size: 20px;
            text-align: right;
            font-family: "Proxima Nova Rg";
          }
        }
      }
    }
  }
}

.details-item:nth-last-child(-n + 2) {
  margin-bottom: 0 !important;
}
.size18 {
  font-size: 18px;
}
.text-note {
  margin-top: 80px;
}
</style>
