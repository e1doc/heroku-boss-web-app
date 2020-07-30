<template>
  <section>
    <div class="dialog-holder">
      <div class="dialog-header">
        <div class="store-avatar">
          <font-awesome-icon icon="store" class="icon" />
        </div>
        <div class="text-bold">SAMPLE BUSINESS NAME HERE</div>
        <div class="triangle">
          <font-awesome-icon icon="caret-up" class="icon" />
        </div>
        <div class="times"><font-awesome-icon icon="times" class="icon" /></div>
      </div>
      <div class="dialog-body">
        <div class="invoice-action">
          <div class="title mb20">New Invoice</div>
          <div class="mb5">
            <button-full-outline class="btn-reg"
              >PAY INVOICE</button-full-outline
            >
          </div>
          <div class="text-later">Pay Later</div>
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
  </section>
</template>

<script>
import ButtonFullOutline from "@/components/ButtonFullOutline";
export default {
  name: "InvoiceDialog",
  components: {
    ButtonFullOutline,
  },
};
</script>

<style lang="scss" scoped>
.dialog-holder {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  width: 100%;
  max-width: 573px;
  margin: 0 auto;
  .dialog-header {
    background: #2699fb;
    position: relative;
    border-radius: 15px 15px 0px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ffffff;
    padding: 50px;
    .store-avatar {
      border: 2px #ffffff solid;
      border-radius: 13px;
      padding: 15px 10px;
      margin-bottom: 20px;
      .icon {
        font-size: 49px;
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
    padding: 0px 40px 20px;
    .invoice-action {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px;
      border-bottom: 2px #eaf6ff solid;
      .title {
        font-size: 28px;
      }
      .text-later {
        color: #2699fb;
        font-size: 14px;
        text-decoration: underline;
        padding: 10px;
        cursor: pointer;
      }
    }
    .invoice-details {
      padding: 15px 0px;
      border-bottom: 2px #eaf6ff solid;
      .invoice-title {
        margin-bottom: 25px;
        color: rgba($color: #2699fb, $alpha: 0.73);
        font-weight: bold;
      }
      .details-body {
        padding-left: 20px;
        display: flex;
        flex-wrap: wrap;
        .details-item {
          width: 50%;
          margin-bottom: 20px;
          .item-label {
            font-weight: bold;
            margin-bottom: 5px;
            font-size: 13px;
          }
          .item-value {
            font-size: 16px;
          }
        }
      }
    }
    .invoice-owner {
      border-bottom: 2px #eaf6ff solid;
      padding: 30px 0px;
      .owner-details {
        .item-label {
          font-weight: bold;
          margin-bottom: 5px;
          font-size: 13px;
        }
        .item-value {
          font-size: 16px;
        }
      }
    }
    .invoice-amount {
      padding: 20px 0px;
      .amount-details {
        display: flex;
        flex-wrap: wrap;
        .item-label{
            width: 50%;
            color: rgba($color: #2699fb, $alpha: 0.73);
            font-weight: bold;
            margin: auto 0;
        }
        .item-value{
            width: 50%;
            color: #2699FB;
            font-weight: bold;
            font-size: 20px;
            text-align: right;
        }
      }
    }
  }
}
</style>
