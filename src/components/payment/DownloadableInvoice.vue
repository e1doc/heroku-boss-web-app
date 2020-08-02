<template>
  <section class="sc-invoice">
    <vue-html2pdf
      :show-layout="false"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="2500"
      filename="payment-invoice"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="800px"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <div class="dialog-holder">
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
              <div class="invoice-details">
                <div class="invoice-title">BUSINESS / OWNER DETAILS</div>
                <div class="details-body">
                  <div class="details-item">
                    <div class="item-label">Account Number:</div>
                    <div class="item-value">F-02248</div>
                  </div>
                </div>
                <div class="details-body"></div>
                <div class="details-body mt25">
                  <div class="details-item">
                    <div class="item-label">Business Owner:</div>
                    <div class="item-value">John Michael Doe</div>
                  </div>
                </div>
              </div>
              <div class="invoice-amount">
                <div class="amount-details">
                  <div class="item-label">Total Amount</div>
                  <div class="item-value amount">₱ 28,083.00</div>
                </div>
              </div>
            </div>
            <div class="text-note">
              * You can pay this over the counter at any Landbank branch or even
              the counter of LGU office in Bacoor, Cavite.
            </div>
          </div>
        </div>
      </section>
    </vue-html2pdf>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DownloadableInvoice",
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
      this.$refs.html2Pdf.generatePdf();
    },
  },
  mounted(){
    console.log('print mounted')
    this.generateReport()
  }
};
</script>

<style lang="scss" scoped>
.sc-invoice {
  width: 100%;
}

.dialog-holder {
  box-shadow: -2px 10px 30px rgba(127, 127, 127, 0.1);
  display: flex;
  flex-direction: column;
  width: 210mm;
  height: 297mm;
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
