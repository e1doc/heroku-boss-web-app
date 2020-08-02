<template>
  <section>
    <div class="meta-parent-box">
      <div class="container flex-wrap">
        <div class="meta-left-box">
          <invoice-dialog :isPayment="true"/>
        </div>
        <div class="meta-right-box">
          <div class="meta-form-box">
            <div class="meta-title">Select Mode of Payment</div>
            <!-- <div class="meta-label">Select Mode of Payment</div> -->
            <!-- <bank-option/> -->
            <div class="meta-list flex-wrap">
              <div class="meta-list-item active">
                <img class="meta-img" src="../assets/landbank-logo.png" />
              </div>
            </div>
            <radio-button />
            <div class="meta-button" v-if="paymentOption === 'counter'">
              <button-block>DOWNLOAD</button-block>
            </div>
            <div class="meta-button" v-if="paymentOption === 'online'">
              <button-block>REDIRECT</button-block>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import InvoiceDialog from "@/components/payment/InvoiceDialog";
import BankOption from "@/components/payment/BankOption";
import RadioButton from "@/components/payment/RadioButton";
import ButtonBlock from "@/components/ButtonBlock";
import DownloadableInvoice from "@/components/payment/DownloadableInvoice";
import { mapGetters } from "vuex";
export default {
  components: {
    InvoiceDialog,
    BankOption,
    RadioButton,
    ButtonBlock,
    DownloadableInvoice
  },
    computed: {
    ...mapGetters(["paymentOption"]),
  },
  data(){
      return{
          printVisible: false
      }
  },
  methods: {
    printInvoice() {
    //   this.printVisible = true
    this.$store.commit('setPrintInvoice',true)
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  div.meta-parent-box {
    width: 100%;
    min-height: calc(100vh - 81px);
    display: flex;
    flex-wrap: wrap;
    padding-top: 50px;
    div.container {
      max-width: 1320px;
      div.meta-left-box {
        width: 35%;
      }
      div.meta-right-box {
        width: calc(65% - 45px);
        margin-left: 45px;
        div.meta-form-box {
          min-height: 600px;
          background-color: #eaf6ff;
          border-radius: 20px;
          padding: 60px 80px;
          box-shadow: 0 10px 20px rgba(127, 127, 127, 0.1);
          .meta-title {
            font-size: 24px;
            font-weight: bold;
            line-height: 50px;
            margin-bottom: 25px;
            margin-left: -20px;
          }
          .meta-label {
            font-size: 14px;
            color: #2699fb;
            line-height: 20px;
            margin-bottom: 15px;
          }
          .meta-button {
            text-align: center;
          }
        }
      }
    }
  }
}

.meta-list {
  margin-bottom: 20px;
  .meta-list-item {
    max-width: 138px;
    margin-right: 15px;
    margin-bottom: 15px;
    cursor: pointer;
    img.meta-img {
      max-height: 60px;
      padding: 12px;
      border: 2px solid transparent;
      border-radius: 5px;
    }
  }
}

.meta-list-item:nth-child(n + 4) {
  margin-right: 0;
}

.meta-list-item.active img.meta-img {
  border-color: #039be5;
}
</style>
