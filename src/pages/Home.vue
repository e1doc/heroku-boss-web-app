<template>
  <section>
    <header-nav/>
    <div class="sc-home">
        <div class="container flex-wrap">
            <div class="meta-left-box">
                <user-profile/>
            </div>
            <div class="meta-right-box">
                <profile-table-menu type="profile"/>
                <div class="mt50">
                  <profile-table/>
                  <!-- <transaction-table/> -->
                  <!-- <application-table/> -->
                </div>
                <!-- <invoice-dialog/> -->
            </div>
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
import UserProfile from "@/components/UserProfile"
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
    HeaderNav,
    UserProfile
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
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  width: 100%;
  min-height: calc(100vh - 81px);
  display: flex;
  flex-wrap: wrap;
  padding-top: 50px;

  .meta-left-box{
      width: 100%;
      max-width: 30%;
      max-height: 629px;
      margin-right: 30px;
      background-color: #fff;
      box-shadow: 0 10px 20px rgba(127,127,127,0.1);
      border-radius: 20px;
  }
  .meta-right-box{
      width: 100%;
      max-width: calc(70% - 30px);
  }
}

</style>
