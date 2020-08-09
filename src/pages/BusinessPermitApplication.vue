<template>
  <div class="meta-parent-box">
    <div class="meta-form-holder">
      <downloadable-business-form />
    </div>
    <div class="container mb30 meta-save-draft">
      <div @click="saveAsDraft">
        <font-awesome-icon icon="save" class="icon" /> SAVE AS DRAFT
      </div>
    </div>
    <div class="container flex-wrap">
      <div class="meta-left-box">
        <progress-indicator
          pageTitle="Application for Business Permit"
          stepOne="Basic Information"
          stepTwo="Business Details"
          stepThree="Upload your Requirements"
          lastStep="Submit your Application"
        />
      </div>
      <div class="meta-right-box flex-wrap">
        <business-step-one v-if="currentApplicationStep === '1'" />
        <business-step-two v-if="currentApplicationStep === '2'" />
        <business-upload-step v-if="currentApplicationStep === '3'" />
        <!-- <business-renewal-upload-step /> -->
        <application-success v-if="currentApplicationStep === '4'" />
        <!-- <downloadable-business-form /> -->
      </div>
    </div>
  </div>
</template>

<script>
import BusinessStepOne from "@/components/application/BusinessStepOne";
import BusinessStepTwo from "@/components/application/BusinessStepTwo";
import BusinessUploadStep from "@/components/application/BusinessUploadStep";
import BusinessRenewalUploadStep from "@/components/application/BusinessRenewalUploadStep";
import ApplicationSuccess from "@/components/application/ApplicationSuccess";
import ProgressIndicator from "@/components/application/ProgressIndicator";
import DownloadableBusinessForm from "@/components/application/DownloadableBusinessForm";
import { mapGetters } from "vuex";
export default {
  name: "BusinessPermitApplication",
  components: {
    BusinessStepOne,
    BusinessStepTwo,
    BusinessUploadStep,
    BusinessRenewalUploadStep,
    ApplicationSuccess,
    ProgressIndicator,
    DownloadableBusinessForm,
  },
  computed: {
    ...mapGetters(["currentApplicationStep"]),
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("setCurrentApplicationStep", "1");
    next();
  },
  mounted() {
    this.$store.commit("setApplicationType", "business");
  },
  methods: {
    saveAsDraft() {
      this.$swal({
        title: "Success!",
        text: "data successfully saved as draft.",
        icon: "success",
        onClose: this.$router.push({ name: "Profile" }),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
div.meta-parent-box {
  width: 100%;
  margin-top: 50px;
  padding-bottom: 50px;
  .meta-form-holder {
    position: absolute;
    opacity: 0;
    top: -500px;
    z-index: -1;
  }
  div.container {
    max-width: 1400px;
    .meta-left-box {
      width: 490px;
      float: left;
      margin-right: 100px;
    }
    .meta-right-box {
      width: calc(100% - 590px);
      float: left;
    }
  }
  .meta-save-draft {
    font-size: 18px;
    font-weight: bold;
    text-align: right;
    div {
      text-decoration: none;
      color: #e23a36;
      cursor: pointer;
    }
  }
}

.meta-save-draft a:hover {
  color: #e8726f !important;
}
</style>
