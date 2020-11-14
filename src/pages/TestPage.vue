<template>
  <section>
      <!-- <building-upload-step/> -->
      <!-- <business-step-two/> -->
      <!-- <div class="countdown-timer">
        {{ timerCount }}
      </div> -->
      <!-- <otp-div/> -->
      <!-- <view-building-details/> -->
      <!-- <downloadable-business-form/> -->
      <!-- <approve-building-application/> -->
      <!-- <appointment-invoice/> -->
      <!-- <downloadable-appointment-invoice/> -->
      <agreement-modal />
  </section>
</template>

<script>
import BusinessStepTwo from "@/components/application/BusinessStepTwo";
import ViewBuildingDetails from "@/pages/ViewBuildingDetails";
import ApproveBuildingApplication from "@/pages/admin/ApproveBuildingApplication";
import BusinessUploadStep from "@/components/application/BusinessUploadStep";
import BuildingUploadStep from "@/components/application/BuildingUploadStep";
import DownloadableBusinessForm from "@/components/application/DownloadableBusinessForm";
import DownloadableAppointmentInvoice from "@/components/payment/DownloadableAppointmentInvoice";
import AppointmentInvoice from "@/pages/AppointmentInvoice";
import OtpDiv from "@/components/auth/OtpDiv";
import AgreementModal from "@/components/application/AgreementModal";
export default {
    name: "TestPage",
    components: {
        BusinessStepTwo,
        BusinessUploadStep,
        BuildingUploadStep,
        OtpDiv,
        DownloadableBusinessForm,
        ApproveBuildingApplication,
        ViewBuildingDetails,
        DownloadableAppointmentInvoice,
        AppointmentInvoice,
        AgreementModal
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
    max-width: 800px;
    margin: 50px auto;
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