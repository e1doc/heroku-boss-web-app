<template>
  <section class="sc-invoice">
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
        <div class="mb30"><h3>Stament of Account</h3></div>
        <div class="dialog-body">
        <div class="invoice-details">
            <div class="invoice-title">APPOINTMENT DETAILS</div>
            <div class="details-body">
                <div class="details-item">
                    <div class="item-label">Appointment Date:</div>
                    <div class="item-value">October 30, 2020</div>
                </div>
                <div class="details-item">
                    <div class="item-label">Appointment Type:</div>
                    <div class="item-value">Business Permit Payment</div>
                </div>
                <div class="details-item">
                    <div class="item-label">Appointment Batch:</div>
                    <div class="item-value">Batch #2 - Afternoon</div>
                </div>
            </div>
        </div>
        <div class="invoice-details">
          <div class="invoice-title">INVOICE DETAILS</div>
          <div class="details-body">
            <div class="details-item">
              <div class="item-label">Reference No:</div>
              <div class="item-value">Invoice #00002</div>
            </div>
            <div class="details-item">
              <div class="item-label">Year:</div>
              <div class="item-value">2020</div>
            </div>
            <div class="details-item">
              <div class="item-label">Issued Date:</div>
              <div class="item-value">July 25, 2020</div>
            </div>
            <div class="details-item">
              <div class="item-label">Quarter:</div>
              <div class="item-value">1st Quarter - 2nd Quarter</div>
            </div>
          </div>
        </div>
        <div class="invoice-owner">
          <div class="owner-details">
            <div class="item-label">Business Owner</div>
            <div class="item-value">John Michael Doe</div>
          </div>
        </div>
        <div class="invoice-amount">
          <div class="amount-details">
            <div class="item-label">Total Amount</div>
            <div class="item-value">₱ 28,083.00</div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export default {
  name: "DownloadableAppointmentInvoice",
  computed: {
    ...mapGetters(["printInvoice"]),
  },
  watch: {
    printInvoice: {
      deep: true,
      handler(status) {
        if (status) {
          this.generateReport();
        }
      },
    },
  },
  methods: {
    generateReport() {
      console.log('generate report')
      const doc = new jsPDF("p", "mm", "a4");
      /** WITH CSS */
      var width = doc.internal.pageSize.getWidth();
      var height = doc.internal.pageSize.getHeight();
      var canvasElement = document.createElement("canvas");
      html2canvas(this.$refs.content, {
        canvas: canvasElement,
        width: 794,
        height: 1124,
      }).then(function(canvas) {
        console.log(canvas)
        const img = canvas.toDataURL("image/jpeg", 1);
        doc.addImage(img, "JPEG", 0, 0, width, height);
        console.log(width, height);
        doc.save("appointment-invoice.pdf");
      });
    },
  }
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
