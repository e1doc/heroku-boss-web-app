<template>
  <section class="sc-invoice">
    <div class="new-invoice-container">
      <img src="@/assets/bacoor-cavite-logo.png" alt="" id="logoImage" />
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
      <table id="invoice-business-details-table">
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
            <td
              v-if="
                currentSoaType === 'business' &&
                currentSelectedBusiness.businessbasicinformation
                  .type_of_organization !== 'CORPORATION'
              "
            >
              {{
                currentSelectedBusiness.businessbasicinformation
                  .owner_first_name
              }}
              {{
                currentSelectedBusiness.businessbasicinformation
                  .owner_middle_name
              }}
              {{
                currentSelectedBusiness.businessbasicinformation.owner_last_name
              }}
            </td>
            <td
              v-if="
                currentSoaType === 'business' &&
                currentSelectedBusiness.businessbasicinformation
                  .type_of_organization === 'CORPORATION'
              "
            >
              {{ currentSelectedBusiness.businessdetails.president_first_name }}
              {{
                currentSelectedBusiness.businessbasicinformation
                  .president_middle_name
              }}
              {{
                currentSelectedBusiness.businessbasicinformation
                  .president_last_name
              }}
            </td>
            <td v-if="currentSoaType === 'real_property'">
              {{
                currentSelectedProperty.buildingbasicinformation
                  .owner_first_name
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
            <td>
              PHP
              {{ formatCurrency(parseFloat(item.amount).toFixed(2)) }}
            </td>
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
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
export default {
  name: "DownloadableInvoice",
  computed: {
    ...mapGetters([
      "printInvoice",
      "currentSelectedBusiness",
      "currentSelectedProperty",
      "generatedBill",
      "currentSoaObj",
      "currentSoaType",
    ]),
  },
  watch: {
    printInvoice: {
      deep: true,
      async handler(status) {
        if (status) {
          await this.setupFees();
          await this.generateInvoice();
          await this.$store.commit("setPrintInvoice", false);
        }
      },
    },
  },
  data() {
    return {
      allFees: [
        [
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
        [
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
      ],
      allFees2: [],
      compiledFees: [],
    };
  },
  mounted() {},
  methods: {
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
    formatCurrency(str) {
      var parts = str.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (parts.length < 2) {
        parts.push("00");
      }
      return parts.join(".");
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
      console.log("generate report");
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
        console.log(canvas);
        const img = canvas.toDataURL("image/jpeg", 1);
        doc.addImage(img, "JPEG", 0, 0, width, height);
        console.log(width, height);
        doc.save("invoice.pdf");
      });
    },
    generateReport2() {
      const doc = new jsPDF("p", "mm", "a4");
      var position = 0;
      var canvasElement = document.createElement("canvas");
      html2canvas(this.$refs.content, {
        canvas: canvasElement,
        width: 794,
        height: 1724,
      }).then(function (canvas) {
        var imgWidth = 210;
        var pageHeight = 295;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;
        const img = canvas.toDataURL("image/jpeg", 1);
        doc.addImage(img, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(img, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.save("invoice.pdf");
      });
    },
    generateInvoice() {
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
        doc.text("STATEMENT OF ACCOUNT", 225, 115);
      };

      var options = {
        beforePageContent: header,
        margin: {
          top: 80,
        },
      };

      var invoiceTable = doc.autoTableHtmlToJson(
        document.getElementById("invoice-details-table")
      );
      doc.autoTable(invoiceTable.columns, invoiceTable.data, {
        margin: { top: 140 },
      });

      var businessTable = doc.autoTableHtmlToJson(
        document.getElementById("invoice-business-details-table")
      );
      doc.autoTable(businessTable.columns, businessTable.data, options);
      var feesTable = doc.autoTableHtmlToJson(
        document.getElementById("fees-table")
      );
      doc.autoTable(feesTable.columns, feesTable.data, {
        beforePageContent: header,
        margin: {
          top: 140,
        },
      });

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

      doc.save("Invoice.pdf");
    },
  },
};
</script>

<style lang="scss" scoped>
.meta-fees {
  display: flex;
  flex-direction: column;
  .meta-fees-title {
    margin: 25px 0px;
    color: rgba($color: #2699fb, $alpha: 0.73);
    font-weight: bold;
    font-size: 15px;
  }
  .meta-fees-details {
    display: flex;
    flex-direction: row;
    margin-top: 15px;
    .meta-label-holder {
      text-align: left;
      flex: 1;
    }
    .meta-value-holder {
      text-align: right;
      flex: 1;
      font-weight: bold;
    }
  }
}
.sc-invoice {
  width: 210mm;
  height: 297mm;
}

.dialog-holder {
  box-shadow: -2px 10px 30px rgba(127, 127, 127, 0.1);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
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
          font-size: 15px;
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
              font-size: 13px;
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
            font-size: 13px;
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
            font-size: 14px;
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
