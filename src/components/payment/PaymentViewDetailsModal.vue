<template>
  <div class="modal flex-center">
    <div class="meta-modal">
      <div class="meta-wrap">
        <div class="meta-modal-body flex-wrap">
          <h3 class="mb20 modal-title">Payment Details</h3>
          <div class="meta-body-items">
            <div class="meta-input-group">
              <div class="meta-input-label">Payor's Name</div>
              <div class="meta-input-value">
                <span class="separator">:</span>
                {{ currentBankTransaction.user.first_name }}
                {{ currentBankTransaction.user.middle_name }}
                {{ currentBankTransaction.user.last_name }}
              </div>
            </div>
            <div class="meta-input-group">
              <div class="meta-input-label">Bank Used to Pay</div>
              <div class="meta-input-value">
                <span class="separator">:</span>
                {{ currentBankTransaction.bank }}
              </div>
            </div>
            <div class="meta-input-group">
              <div class="meta-input-label">Date of Payment</div>
              <div class="meta-input-value">
                <span class="separator">:</span>
                {{
                  currentBankTransaction.payment_date | moment("MMMM DD YYYY")
                }}
              </div>
            </div>
            <div class="meta-input-group">
              <div class="meta-input-label">Total Amount Paid</div>
              <div class="meta-input-value">
                <span class="separator">:</span>
                PHP
                {{
                  formatCurrency(
                    parseFloat(currentBankTransaction.amount).toFixed(2)
                  )
                }}
              </div>
            </div>
            <div class="meta-input-group">
              <div class="meta-input-label">Reference No.</div>
              <div class="meta-input-value">
                <span class="separator">:</span>
                {{ currentBankTransaction.reference_no }}
              </div>
            </div>
            <div class="meta-input-group">
              <div class="meta-input-label">SOA</div>
              <div class="meta-input-value">
                <span class="separator">:</span>
                {{ currentBankTransaction.soa.reference_number }}
              </div>
            </div>
            <div class="meta-input-group flex-wrap">
              <div class="meta-input-label">Proof of Transaction:</div>
              <div class="meta-input-value meta-link">
                <span class="separator">:</span>
                <app-link :to="replaceUrl(currentBankTransaction.file)"
                  >View Screenshot</app-link
                >
              </div>
            </div>
          </div>
        </div>
        <div class="meta-buttons flex-wrap">
          <button class="modal-button agree" @click="onClickCallback(true)">
            VERIFY
          </button>
          <button class="modal-button cancel" @click="onClickCallback(false)">
            CANCEL
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppLink from "@/components/AppLink";
export default {
  name: "PaymentViewDetailsModal",
  components: {
    AppLink,
  },
  computed: {
    ...mapGetters(["currentBankTransaction"]),
  },
  methods: {
    replaceUrl(url) {
      return url.replace("/bacoor/", "/");
    },
    async onClickCallback(status) {
      if (status) {
        this.$modal.hide("paymentViewDetailsModal");
        await this.$store.dispatch("verifyBankTransaction", {
          id: this.currentBankTransaction.id,
        });
      } else {
        this.$modal.hide("paymentViewDetailsModal");
      }
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
};
</script>

<style scoped lang="scss">
.modal {
  min-height: calc(100vh - 60px);
  padding: 30px 0;

  .meta-modal {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    box-shadow: 0px 7px 20px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    background: #ffffff;
    .meta-modal-body {
      font-size: 18px;
      font-family: Proxima Nova Rg;
      line-height: 1.4;
      padding: 50px 30px 40px;
      .meta-body-items {
        width: 100%;
      }
      .modal-title {
        width: 100%;
        text-align: left;
        padding-left: 10px;
        margin-bottom: 30px;
        text-transform: uppercase;
      }
      .meta-input-group {
        width: calc(100% - 20px);
        padding: 0 10px;
        align-items: center;
        display: flex;
        margin-bottom: 20px;
        .input-field {
          width: 100%;
        }
        .meta-input-label {
          width: 40%;
          float: left;

          font-size: 16px;
          font-family: Proxima Nova Rg;
          line-height: 1.4;
          margin-bottom: 0;
        }
        .meta-input-value {
          width: 60%;
          float: left;
          font-size: 16px;
          font-family: Proxima Nova Rg;
          line-height: 1.4;

          span.separator {
            margin-right: 20px;
          }
        }
        .meta-link {
          cursor: pointer;
          transition: 0.4s;
          a {
            color: #2699fb;
            font-size: 16px;
          }
        }
        .meta-link:hover {
          color: #4791db;
        }
      }
      .meta-upload-div {
        width: 100%;
        padding: 0 10px;
      }
    }
    .meta-buttons {
      width: 100%;
      button {
        width: 50%;
        float: left;
        background-color: transparent;
        border: 0;
        padding: 20px 10px;
        border-top: 1px solid #eee;
        font-size: 15px;
        font-weight: bold;
        font-family: Proxima Nova Rg;
        transition: 0.2s;
        cursor: pointer;
      }
      button:focus {
        outline: 0;
      }
      button.agree {
        border-right: 1px solid #eee;
        border-bottom-left-radius: 15px;
      }
      button.cancel {
        border-bottom-right-radius: 15px;
      }
      button.agree:hover {
        color: #fff;
        background-color: #4791db;
      }
      button.cancel:hover {
        color: #fff;
        background-color: #f44336;
      }
    }
  }
}
</style>