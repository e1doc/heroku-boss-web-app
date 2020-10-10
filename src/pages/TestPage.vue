<template>
  <section>
      <!-- <building-upload-step/> -->
      <business-step-two/>
      <!-- <div class="countdown-timer">
        {{ timerCount }}
      </div> -->
      <!-- <otp-div/> -->
      <view-business-details/>
      <downloadable-business-form/>
      <approve-business-application/>
  </section>
</template>

<script>
import BusinessStepTwo from "@/components/application/BusinessStepTwo";
import ViewBusinessDetails from "@/pages/ViewBusinessDetails";
import ApproveBusinessApplication from "@/pages/admin/ApproveBusinessApplication";
import BusinessUploadStep from "@/components/application/BusinessUploadStep";
import DownloadableBusinessForm from "@/components/application/DownloadableBusinessForm";
import OtpDiv from "@/components/auth/OtpDiv";
export default {
    name: "TestPage",
    components: {
        BusinessStepTwo,
        BusinessUploadStep,
        OtpDiv,
        DownloadableBusinessForm,
        ApproveBusinessApplication,
        ViewBusinessDetails
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