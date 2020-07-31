<template>
  <div class="sc-home">
    <div class="container">
      <!-- <profile-table-menu type="soa"/> -->
      <div class="mt50">
        <!-- <profile-table/> -->
        <!-- <transaction-table/> -->
        <!-- <application-table/> -->
      </div>
      <invoice-dialog/>
    </div>  
  </div>
</template>

<script>
import ButtonFull from "@/components/ButtonFull";
import ButtonFullOutline from "@/components/ButtonFullOutline";
import BaseInputIcon from "@/components/forms/BaseInputIcon";
import RoundedDiv from "@/components/forms/RoundedDiv";
import ProfileTableMenu from "@/components/tables/ProfileTableMenu"
import ProfileTable from "@/components/tables/ProfileTable"
import TransactionTable from "@/components/tables/TransactionTable"
import ApplicationTable from "@/components/tables/ApplicationTable"
import InvoiceDialog from "@/components/payment/InvoiceDialog"
export default {
  components: {
    ButtonFull,
    ButtonFullOutline,
    BaseInputIcon,
    RoundedDiv,
    ProfileTableMenu,
    ProfileTable,
    TransactionTable,
    ApplicationTable,
    InvoiceDialog
  },
  data() {
    return {
      text1: "",
      text2: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.sc-home {
  height: 100vh;
  width: 100%;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  padding-top: 30px;
}
</style>
