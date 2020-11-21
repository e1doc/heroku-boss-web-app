<template>
  <section>
    <div class="meta-invoice-holder">
          <downloadable-invoice />
    </div>
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
              <div class="meta-list-item" 
                  :class="{active:selectedPayment == 'landbank'}" 
                  @click="changePaymentType('landbank')">
                      <img class="meta-img" src="../assets/landbank-logo.png" />
              </div>
              <div class="meta-list-item" 
                  :class="{active:selectedPayment == 'treasury_office'}" 
                  @click="changePaymentType('treasury_office')">
                      <img class="meta-img" src="../assets/lgu-treasury.png" />
              </div>
            </div>
            <radio-button/>
            <div class="meta-button" @click="printInvoice()" v-if="paymentOption === 'counter' && currentPaymentType === 'landbank'">
              <button-block>DOWNLOAD</button-block>
            </div>
            <div class="meta-button" v-if="paymentOption === 'online' && currentPaymentType === 'landbank'">
              <button-block>REDIRECT</button-block>
            </div>
            <div class="meta-button" @click="redirectAppointment()" v-if="currentPaymentType === 'treasury_office'">
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
    ...mapGetters(["paymentOption", "currentPaymentType"]),
  },
  data(){
      return{
          printVisible: false,
          isPayment:true,
          selectedPayment: "landbank",
      }
  },
  mounted(){
    this.$store.commit('setPrintInvoice',false)
  },
  methods: {
    printInvoice() {
    this.$store.commit('setPrintInvoice',true)
    },
    redirectAppointment(){
      this.$router.push({ name: 'AddAppointment' })
    },
    changePaymentType(type) {
      this.selectedPayment = type;
      this.$store.commit('setCurrentPaymentType', type)
    }
  },
};
</script>

<style lang="scss" scoped>
.meta-invoice-holder{
  position: absolute;
  opacity: 0.0;
  top:-500px;
  z-index: -1;
}
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

@media only screen and (max-width: 1180px){
  section div.meta-parent-box{
      padding-bottom: 50px;
  }

  section div.meta-parent-box div.container div.meta-left-box{
      width: 45%;
  }

  section div.meta-parent-box div.container div.meta-right-box{
      width: calc(55% - 30px);
      margin-left: 30px;
  }

  section div.meta-parent-box div.container div.meta-right-box div.meta-form-box{
      padding: 30px 30px 50px 50px;
  }

}

@media only screen and (max-width: 860px){
  section div.meta-parent-box{
      padding-top: 20px;
  }

  section div.meta-parent-box div.container div.meta-left-box{
      width: 100%;
  }

  section div.meta-parent-box div.container div.meta-right-box{
      width: 100%;
      margin-left: 0;
  }

  .meta-invoice-holder{ 
      overflow: hidden;
      width: 100%;
  }

  section div.meta-parent-box div.container div.meta-right-box div.meta-form-box .meta-title{
      font-size: 20px;
      margin-left: 0;
  }

  .container{
    margin-bottom: 0!important;
  }

  section div.meta-parent-box div.container div.meta-right-box div.meta-form-box{
      padding: 40px 50px;
  }
}

@media only screen and ( max-width: 480px ){

  section div.meta-parent-box{
    padding-top: 30px;
  }
  section div.meta-parent-box div.container div.meta-right-box div.meta-form-box{
      padding: 30px 30px 40px;
      min-height: auto;
      margin-top: 20px;
  }

  section div.meta-parent-box div.container div.meta-right-box div.meta-form-box .meta-title{
    font-size: 18px;
    line-height: 1.6;
  }
  
  .meta-list .meta-list-item img.meta-img{
      max-height: 40px;
  }
}

@media only screen and ( max-width: 350px ){
  section div.meta-parent-box div.container div.meta-right-box div.meta-form-box{
      padding: 30px 15px;
  }
}
</style>
