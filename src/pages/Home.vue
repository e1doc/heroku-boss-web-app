<template>
  <section>
    <!-- <header-nav/> -->
    <div class="sc-home">
      <div class="container">
        <profile-table-menu type="profile"/>
        <div class="mt50">
          <profile-table/>
          <!-- <transaction-table/> -->
          <!-- <application-table/> -->
        </div>
        <!-- <invoice-dialog/> -->
      </div>  
    </div>
  </section>
</template>

<script>
import ButtonFull from "@/components/ButtonFull";
import ButtonFullOutline from "@/components/ButtonFullOutline";
import BaseInputIcon from "@/components/forms/BaseInputIcon";
import ProfileTableMenu from "@/components/tables/ProfileTableMenu"
import ProfileTable from "@/components/tables/ProfileTable"
import TransactionTable from "@/components/tables/TransactionTable"
import ApplicationTable from "@/components/tables/ApplicationTable"
import InvoiceDialog from "@/components/payment/InvoiceDialog"
import HeaderNav from "@/components/HeaderNav"
export default {
  components: {
    ButtonFull,
    ButtonFullOutline,
    BaseInputIcon,
    ProfileTableMenu,
    ProfileTable,
    TransactionTable,
    ApplicationTable,
    InvoiceDialog,
    HeaderNav
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
  min-height: calc(100vh - 81px);
  width: 100%;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

</style>
