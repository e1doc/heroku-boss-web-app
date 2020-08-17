<template>
  <section>
    <header-nav/>
    <div class="sc-home">
    </div>  
  </section>
</template>

<script>
import ButtonFull from "@/components/ButtonFull";
import ButtonFullOutline from "@/components/ButtonFullOutline";
import BaseInputIcon from "@/components/forms/BaseInputIcon";
import ProfileTableMenu from "@/components/tables/ProfileTableMenu";
import ProfileTable from "@/components/tables/ProfileTable";
import TransactionTable from "@/components/tables/TransactionTable";
import ApplicationTable from "@/components/tables/ApplicationTable";
import InvoiceDialog from "@/components/payment/InvoiceDialog";
import HeaderNav from "@/components/HeaderNav";
import UserProfile from "@/components/UserProfile";
import DownloadableInvoice from "@/components/payment/DownloadableInvoice";
 
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
    UserProfile,
    DownloadableInvoice,
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
.holder {
  margin: 0 auto;
}
.sc-home {
  background-position: center;
  background-size: cover;
  width: 100%;
  min-height: calc(100vh - 81px);
  display: flex;
  flex-wrap: wrap;
  padding-top: 50px;

  .meta-left-box {
    width: 100%;
    max-width: 30%;
    max-height: 629px;
    margin-right: 30px;
    background-color: #fff;
    box-shadow: 0 10px 20px rgba(127, 127, 127, 0.1);
    border-radius: 20px;
  }
  .meta-right-box {
    width: 100%;
    max-width: calc(70% - 30px);
  }
}
</style>
