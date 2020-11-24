<template>
  <section>
    <modal
      name="invoiceModal"
      height="auto"
      :adaptive="true"
      :classes="['vue-modal-2']"
      ><invoice-dialog
    /></modal>
    <div class="container">
      <div class="mt50 invoice-header">
        <profile-table-menu type="bills" />
      </div>
      <div class="mt50 bills-table">
        <bills-table />
      </div>
      <div class="bills-actions">
        <div class="pay-button" @click="onPayClick(true)">
          <font-awesome-icon icon="receipt" class="mr5 icon" />GENERATE SOA
        </div>
        <div class="cancel-button" @click="onPayClick(false)">
          <font-awesome-icon icon="times" class="mr5 icon" />GENERATE LATER
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProfileTableMenu from "@/components/tables/ProfileTableMenu";
import BillsTable from "@/components/tables/BillsTable";
import InvoiceDialog from "@/components/payment/InvoiceDialog";
import { mapGetters } from "vuex"
import moment from "moment-timezone";
export default {
  name: "Bills",
  components: {
    ProfileTableMenu,
    BillsTable,
    InvoiceDialog,
  },
  computed:{
    ...mapGetters(['currentSelectedBusiness','generatedBill', 'currentSoaType', 'currentSelectedProperty'])
  },
  methods:{
    onPayClick(status){
      if(status){
        this.createSoa()
      }else{
        this.$router.push({'name': 'Profile'})
      }
    },
    async createSoa(){
      let bills = []
      this.generatedBill.invoices.forEach(item=>{
        let fees = []
        item.fees.forEach(element=>{
          let fee = {
            fee_description: element.fee_description,
            amount: element.amount,
            code: element.feecode,
            penalty: element.ispenalty == "0" ? false : true
          }
          fees.push(fee)
        })
        let bill = {
          reference_number: item.referenceno,
          quarter: item.quarter,
          amount: item.amount,
          due_date: moment(item.duedate),
          fees: fees
        }
        bills.push(bill)
      })
      const payload = {
        soa: {
          year: this.generatedBill.year,
          quarter: this.generatedBill.quarter,
          paymode: this.generatedBill.paymode,
          amount: this.generatedBill.total_amount,
          business_application: this.currentSoaType === 'business' ? this.currentSelectedBusiness.id : null,
          building_application: this.currentSoaType === 'real_property' ? this.currentSelectedProperty.id : null,
          bills: bills,
          application_type: this.currentSoaType
        }
      }
      await this.$store.dispatch('createSoa', payload)
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .vm--modal {
  overflow: auto;
  width: 100%;
}
/deep/ .vm--modal::-webkit-scrollbar {
  display: none;
}
section {
  // min-height: calc( 100vh - 321px);
  padding-bottom: 30px;
}

.bills-actions {
  max-width: 458px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  .pay-button {
    color: #ffffff;
    background-color: #039be5;
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    max-width: 125px;
    float: left;
    padding: 18px 40px;
    min-width: 125px;
    margin: 0 10px 3px;
    border: 2px #039be5 solid;
    border-radius: 5px;
    transition: 0.4s;
    cursor: pointer;
  }
  .pay-button:hover {
    color: #039be5;
    background-color: transparent;
  }

  .cancel-button {
    color: #d32f2f;
    background-color: transparent;
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    max-width: 125px;
    float: left;
    padding: 18px 40px;
    margin: 0 10px 3px;
    border: 2px #d32f2f solid;
    border-radius: 5px;
    transition: 0.4s;
    cursor: pointer;
  }
  .cancel-button:hover {
    color: #ffffff;
    background-color: #d32f2f;
  }
}

.bills-table {
  margin-bottom: 50px;
}

@media only screen and (max-width: 768px) {
  .invoice-header,
  .bills-table {
    margin-top: 30px;
  }
}
</style>
