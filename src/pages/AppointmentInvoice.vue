<template>
  <section>
    <div class="meta-invoice-holder">
      <downloadable-appointment-invoice />
    </div>
    <div class="dialog-holder">
      <div
        class="dialog-header"
        v-if="currentSoaObj.business_application !== null"
      >
        <div class="store-avatar">
          <font-awesome-icon icon="store" class="icon" />
        </div>
        <div class="text-bold size14">
          {{
            currentSoaObj.business_application.businessdetails.name !== ""
              ? currentSoaObj.business_application.businessdetails.name
              : currentSoaObj.business_application.businessdetails.trade_name
          }}
        </div>
        <div class="triangle">
          <font-awesome-icon icon="caret-up" class="icon" />
        </div>
        <!-- <div class="times" @click="closeModal()" v-if="!isPayment">
          <font-awesome-icon icon="times" class="icon" />
        </div> -->
      </div>
      <div
        class="dialog-header"
        v-if="currentSoaObj.building_application !== null"
      >
        <div class="store-avatar">
          <font-awesome-icon icon="city" class="icon" />
        </div>
        <div class="text-bold size14">
          {{ currentSoaObj.building_application.buildingdetails.tax_dec_no }}
        </div>
        <div class="triangle">
          <font-awesome-icon icon="caret-up" class="icon" />
        </div>
        <!-- <div class="times" @click="closeModal()" v-if="!isPayment">
          <font-awesome-icon icon="times" class="icon" />
        </div> -->
      </div>
      <div class="dialog-body">
        <div class="invoice-details">
          <div class="invoice-title">APPOINTMENT DETAILS</div>
          <div class="details-body">
            <div class="details-item">
              <div class="item-label">Appointment Date:</div>
              <div class="item-value">
                {{
                  currentAppointment.appointment_date | moment("MMMM DD, YYYY")
                }}
              </div>
            </div>
            <div class="details-item">
              <div class="item-label">Appointment Type:</div>
              <div class="item-value">
                {{ currentAppointment.title }}
              </div>
            </div>
            <div class="details-item">
              <div class="item-label">Appointment Batch:</div>
              <div class="item-value">
                {{
                  currentAppointment.batch === "batch_1"
                    ? "Batch 1 ( 8:00 AM - 1:00 PM )"
                    : "Batch 2 ( 1:00 PM - 5:00 PM )"
                }}
              </div>
            </div>
            <div class="dialog-btn mt30">
              <button-full-outline
                class="btn-reg"
                @click.native="actionPrintInvoice()"
                >DOWNLOAD</button-full-outline
              >
            </div>
          </div>
        </div>
        <div class="invoice-details">
          <div class="invoice-title">INVOICE DETAILS</div>
          <div class="details-body">
            <div class="details-item">
              <div class="item-label">Reference No:</div>
              <div class="item-value">
                {{ currentSoaObj.reference_number }}
              </div>
            </div>
            <div class="details-item">
              <div class="item-label">Year:</div>
              <div class="item-value">
                {{ currentSoaObj.year| moment("YYYY") }}
              </div>
            </div>
            <div class="details-item">
              <div class="item-label">Issued Date:</div>
              <div class="item-value">
                {{ currentSoaObj.created_at | moment("MMMM DD, YYYY") }}
              </div>
            </div>
            <div class="details-item">
              <div class="item-label">Quarter:</div>
              <div class="item-value">{{ currentSoaObj.quarter}}</div>
            </div>
          </div>
        </div>
        <div
          class="invoice-owner"
          v-if="currentSoaObj.business_application !== null"
        >
          <div class="invoice-title">OTHER DETAILS</div>
          <div class="owner-details">
            <div class="item-label">Business Owner</div>
            <div class="item-value">
              {{
                currentSoaObj.business_application.businessbasicinformation
                  .owner_first_name
              }}
              {{
                currentSoaObj.business_application.businessbasicinformation
                  .owner_middle_name
              }}
              {{
                currentSoaObj.business_application.businessbasicinformation
                  .owner_last_name
              }}
            </div>
          </div>
        </div>
        <div
          class="invoice-owner"
          v-if="currentSoaObj.building_application !== null"
        >
          <div class="invoice-title">OTHER DETAILS</div>
          <div class="owner-details">
            <div class="item-label">Property Owner</div>
            <div class="item-value">
              {{
                currentSoaObj.building_application.buildingbasicinformation
                  .owner_first_name
              }}
              {{
                currentSoaObj.building_application.buildingbasicinformation
                  .owner_middle_name
              }}
              {{
                currentSoaObj.building_application.buildingbasicinformation
                  .owner_last_name
              }}
            </div>
          </div>
        </div>
        <div class="invoice-amount">
          <div class="invoice-title">FEES</div>
          <div class="invoice-summary">
            <div
              class="summary-tr"
              v-for="(item, index) of currentSoaObj.bills"
              :key="index"
            >
              <div class="summary-td">Quarter {{ item.quarter }}</div>
              <div class="summary-td amount">
                ₱ {{ formatCurrency(parseFloat(item.amount).toFixed(2)) }}
              </div>
            </div>
          </div>
          <div class="amount-details">
            <div class="item-label">Total Amount</div>
            <div class="item-value">
              ₱
              {{ formatCurrency(parseFloat(currentSoaObj.amount).toFixed(2)) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ButtonFullOutline from "@/components/ButtonFullOutline";
import DownloadableAppointmentInvoice from "@/components/payment/DownloadableAppointmentInvoice";
import { mapGetters } from "vuex";
export default {
  name: "AppoinmentInvoice",
  components: {
    ButtonFullOutline,
    DownloadableAppointmentInvoice,
  },
  computed: {
    ...mapGetters([
      "currentSoaObj",
      "currentAppointment",
      "printInvoice",
      "currentSoaObj",
    ]),
  },
  props: {
    isPayment: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  methods: {
    actionPrintInvoice() {
      this.$store.commit("setPrintInvoice", true);
    },
    formatCurrency(str) {
      var parts = str.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (parts.length < 2) {
        parts.push("00");
      }
      return parts.join(".");
    },
  },
  mounted() {
    this.$store.commit("setPrintInvoice", false);
  },
};
</script>

<style lang="scss" scoped>
.meta-invoice-holder {
  position: absolute;
  opacity: 0;
  top: -5000px;
  left: -10000px;
  z-index: -1;
}
.dialog-holder {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  width: 100%;
  max-width: 700px;
  min-height: calc(100vh - 81px);
  margin: 30px auto;
  .dialog-header {
    background: #2699fb;
    position: relative;
    border-radius: 15px 15px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ffffff;
    padding: 30px 15px;
    .store-avatar {
      border: 2px #ffffff solid;
      border-radius: 13px;
      padding: 15px 10px;
      margin-bottom: 20px;
      .icon {
        font-size: 38px;
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
  .dialog-body {
    background: #ffffff;
    border-radius: 0px 0px 15px 15px;
    padding: 10px 30px 30px;
    .invoice-action {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 35px;
      border-bottom: 2px #eaf6ff solid;
      .title {
        font-size: 24px;
      }
      .text-later {
        color: #2699fb;
        font-size: 14px;
        text-decoration: underline;
        padding-top: 10px;
        cursor: pointer;
      }
    }
    .invoice-details {
      padding: 30px 0px;
      border-bottom: 2px #eaf6ff solid;
      .details-body {
        padding: 0 20px;
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
            font-size: 15px;
          }
        }
      }
    }
    .invoice-owner {
      border-bottom: 2px #eaf6ff solid;
      padding: 30px 0px;
      .owner-details {
        padding: 0 30px;
        .item-label {
          font-weight: bold;
          margin-bottom: 8px;
          font-size: 16px;
        }
        .item-value {
          font-size: 16px;
        }
      }
    }
  }
}

.dialog-btn {
  width: 100%;
  text-align: center;
  .btn-reg {
    width: 100%;
    max-width: 100%;
  }
}

.details-item:nth-last-child(-n + 2) {
  margin-bottom: 0 !important;
}
.size14 {
  font-size: 14px;
}

.invoice-amount {
  padding: 30px 0px;
  .invoice-summary {
    padding: 0 30px;
    .summary-tr {
      display: flex;
      flex-wrap: wrap;
      .summary-td {
        font-size: 14px;
        width: 50%;
        float: left;
        margin-bottom: 15px;
      }
      .summary-td.amount {
        text-align: right;
      }
    }
  }
  .amount-details {
    padding: 15px 30px;
    background: #f2f9ff;
    display: flex;
    flex-wrap: wrap;
    .item-label {
      width: 50%;
      margin: auto 0;
      color: rgba($color: #2699fb, $alpha: 0.73);
      font-weight: bold;
      font-size: 16px;
      font-family: "Proxima Nova Rg";
      text-transform: uppercase;
    }
    .item-value {
      width: 50%;
      color: #2699fb;
      font-weight: bold;
      font-size: 20px;
      font-family: "Proxima Nova Rg";
      text-align: right;
    }
  }
}
.invoice-title {
  margin-bottom: 25px;
  color: rgba($color: #2699fb, $alpha: 0.73);
  font-weight: bold;
  font-size: 18px;
}
@media only screen and (max-width: 860px) {
  .dialog-holder {
    max-width: 90%;
  }
}

@media only screen and (max-width: 480px) {
  .dialog-holder {
    max-width: 100%;
    margin: 0;
  }

  .dialog-holder .dialog-body .invoice-details {
    padding-top: 0;
  }

  .dialog-holder .dialog-body .invoice-details .details-body {
    padding-left: 0;
  }
  .dialog-holder .dialog-body .invoice-details .details-body .details-item {
    width: 100%;
  }

  .details-item:nth-last-child(-n + 2) {
    margin-bottom: 25px !important;
  }

  .dialog-holder .dialog-body .invoice-amount .amount-details .item-value {
    font-size: 18px;
    text-align: left;
    width: 100%;
    margin-top: 15px;
  }

  .dialog-holder
    .dialog-body
    .invoice-details
    .details-body
    .details-item
    .item-value,
  .dialog-holder .dialog-body .invoice-owner .owner-details .item-value {
    font-size: 14px;
  }
}
</style>
