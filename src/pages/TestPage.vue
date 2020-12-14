<template>
  <section>
      <!-- <building-upload-step/> -->
      <!-- <business-step-two/> -->
      <!-- <div class="countdown-timer">
        {{ timerCount }}
      </div> -->
      <!-- <otp-div/> -->
      <!-- <view-business-details/> -->
      <!-- <downloadable-business-form/> -->
      <!-- <downloadable-building-form/> -->
      <!-- <approve-business-application/> -->
      <!-- <appointment-invoice/> -->
      <!-- <downloadable-appointment-invoice/> -->
      <!-- <agreement-modal /> -->
      <!-- <invoice-dialog/> -->
      <!-- <downloadable-invoice/> -->
      <!-- <new-inquiry />
      <user-reply-inquiry/>
      <reply-inquiry/> -->
      <!-- <faq /> -->
      <renewal-business-permit-application />
  </section>
</template>

<script>
import BusinessStepTwo from "@/components/application/BusinessStepTwo";
import ViewBusinessDetails from "@/pages/ViewBusinessDetails";
import ApproveBusinessApplication from "@/pages/admin/ApproveBusinessApplication";
import BusinessUploadStep from "@/components/application/BusinessUploadStep";
import BuildingUploadStep from "@/components/application/BuildingUploadStep";
import DownloadableBusinessForm from "@/components/application/DownloadableBusinessForm";
import DownloadableBuildingForm from "@/components/application/DownloadableBuildingForm";
import DownloadableAppointmentInvoice from "@/components/payment/DownloadableAppointmentInvoice";
import DownloadableInvoice from "@/components/payment/DownloadableInvoice";
import AppointmentInvoice from "@/pages/AppointmentInvoice";
import RenewalBusinessPermitApplication from "@/pages/RenewalBusinessPermitApplication";
import OtpDiv from "@/components/auth/OtpDiv";
import AgreementModal from "@/components/application/AgreementModal";
import InvoiceDialog from "@/components/payment/InvoiceDialog";
import ReplyInquiry from "@/pages/admin/ReplyInquiry";
import UserReplyInquiry from "@/pages/UserReplyInquiry";
import NewInquiry from "@/pages/NewInquiry";
import Faq from "@/pages/Faq";
export default {
    name: "TestPage",
    components: {
        BusinessStepTwo,
        BusinessUploadStep,
        BuildingUploadStep,
        OtpDiv,
        DownloadableBusinessForm,
        DownloadableBuildingForm,
        ApproveBusinessApplication,
        ViewBusinessDetails,
        DownloadableAppointmentInvoice,
        AppointmentInvoice,
        AgreementModal,
        InvoiceDialog,
        DownloadableInvoice,
        Faq,
        NewInquiry,
        ReplyInquiry,
        UserReplyInquiry,
        RenewalBusinessPermitApplication
  },
  data() {
      return {
        timerCount: 30
      }
  },
  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
              this.timerCount--;
          }, 1000);
        }
      },
      immediate: true // This ensures the watcher is triggered upon creation
    }
  }
}
</script>

<style lang="scss" scoped>
section{
    // max-width: 800px;
    // margin: 50px auto;
}

.countdown-timer {
    color: #039be5bf;
    font-size: 50px;
    font-family: "Proxima Nova Rg";
    font-weight: bold;
    letter-spacing: 5px;
    text-align: center;
}
</style>