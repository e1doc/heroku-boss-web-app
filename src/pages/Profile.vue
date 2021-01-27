<template>
  <section>
    <modal
      name="invoiceModal"
      height="auto"
      :adaptive="true"
      :classes="['vue-modal-2']"
      ><invoice-dialog
    /></modal>
    <modal name="soaModal" height="auto" :adaptive="true"><soa-form /></modal>
    <div class="sc-home">
      <div class="container flex-wrap">
        <div class="meta-left-box">
          <user-profile />
        </div>
        <div class="meta-right-box">
          <profile-table-menu type="profile" />
          <div
            class="note"
            v-if="currentTable == 'profile' && currentType == 'real_property'"
          >
            <strong>*Note:</strong>
            <br />
            1. For year 2021 payment, All Real Property Tax Payment must be
            using our NEW Tax Declaration number (ex. 19-238-0001-0xxxx). To get
            your new tax declaration number, simply send an inquiry here, with
            subject "REQUEST COPY OF NEW TAX DECLARATION". Indicate your
            previous TaxDec. We will respond with your new number that you will
            use to enroll so you can view your SOA. Thanks.
            <br />
            <br />
            2. The online system currently supports Current and Advanced
            Payments for now. For delinquet accounts, you can send an inquiry
            and the LGU will review your account and send you an SOA.
          </div>
          <approver-steps v-if="currentTable === 'applications'" />
          <div class="meta-table-box mt50">
            <profile-table v-if="currentTable === 'profile'" />
            <user-transaction-table v-if="currentTable === 'transactions'" />
            <application-table v-if="currentTable === 'applications'" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ButtonFull from "@/components/ButtonFull";
import ButtonFullOutline from "@/components/ButtonFullOutline";
import BaseInputIcon from "@/components/forms/BaseInputIcon";
import ProfileTableMenu from "@/components/tables/ProfileTableMenu";
import ProfileTable from "@/components/tables/ProfileTable";
import UserTransactionTable from "@/components/tables/UserTransactionTable";
import ApplicationTable from "@/components/tables/ApplicationTable";
import InvoiceDialog from "@/components/payment/InvoiceDialog";
import HeaderNav from "@/components/HeaderNav";
import UserProfile from "@/components/UserProfile";
import ApproverSteps from "@/components/ApproverSteps";
import SoaForm from "@/components/forms/SoaForm";
import { mapGetters } from "vuex";
export default {
  name: "Profile",
  components: {
    ButtonFull,
    ButtonFullOutline,
    BaseInputIcon,
    ProfileTableMenu,
    ProfileTable,
    UserTransactionTable,
    ApplicationTable,
    InvoiceDialog,
    HeaderNav,
    UserProfile,
    ApproverSteps,
    SoaForm,
  },
  computed: {
    ...mapGetters(["currentTable", "currentType"]),
  },
  data() {
    return {
      text1: "",
      text2: "",
    };
  },
  mounted() {},
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

.sc-home {
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  width: 100%;
  min-height: calc(100vh - 81px);
  display: flex;
  flex-wrap: wrap;
  padding-top: 50px;
  padding-bottom: 30px;
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

.note {
  padding: 50px 15px 0;
  font-size: 13px;
  text-align: left;
  line-height: 1.6;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  opacity: 0.7;
}

/*
MOBILE RESPONSIVENESS ------------------------------------------- */

@media only screen and (max-width: 1400px) {
  .sc-home .meta-left-box {
    max-width: 25%;
    max-height: 480px;
  }

  .sc-home .meta-right-box {
    max-width: calc(75% - 30px);
  }
}

@media only screen and (max-width: 1180px) {
  .sc-home .meta-left-box {
    display: none;
  }

  .sc-home .meta-right-box {
    max-width: 100%;
  }
}

@media only screen and (max-width: 768px) {
  .meta-table-box {
    margin-top: 20px;
  }

  .sc-home {
    padding-top: 30px;
  }

  .container {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
