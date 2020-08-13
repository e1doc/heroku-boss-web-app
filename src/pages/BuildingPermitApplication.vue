<template>
  <div class="meta-parent-box">
    <div class="meta-form-holder">
      <downloadable-building-form />
    </div>
    <div class="container mb30 meta-save-draft">
      <router-link to="#"
        ><font-awesome-icon icon="save" class="icon" /> SAVE AS
        DRAFT</router-link
      >
    </div>
    <div class="container flex-wrap">
      <div class="meta-left-box">
        <progress-indicator
          pageTitle="Application for Building Permit"
          stepOne="Basic Information"
          stepTwo="Building Details"
          stepThree="Upload your Requirements"
          lastStep="Submit your Application"
        />
      </div>
      <div class="meta-right-box flex-wrap">
        <building-step-one v-if="currentApplicationStep === '1'" />
        <building-step-two v-if="currentApplicationStep === '2'" />
        <building-upload-step v-if="currentApplicationStep === '3'" />
        <application-success v-if="currentApplicationStep === '4'" />
      </div>
    </div>
  </div>
</template>

<script>
import BuildingStepOne from "@/components/application/BuildingStepOne";
import BuildingStepTwo from "@/components/application/BuildingStepTwo";
import BuildingUploadStep from "@/components/application/BuildingUploadStep";
import ApplicationSuccess from "@/components/application/ApplicationSuccess";
import ProgressIndicator from "@/components/application/ProgressIndicator";
import DownloadableBuildingForm from "@/components/application/DownloadableBuildingForm";
import { mapGetters } from "vuex";
export default {
  name: "BuildingPermitApplication",
  components: {
    BuildingStepOne,
    BuildingStepTwo,
    BuildingUploadStep,
    ApplicationSuccess,
    ProgressIndicator,
    DownloadableBuildingForm,
  },
  computed: {
    ...mapGetters(["currentApplicationStep"]),
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("setCurrentApplicationStep", "1");
    next();
  },
  mounted() {
    this.$store.commit("setApplicationType", "property");
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
    a {
      text-decoration: none;
      color: #e23a36;
    }
  }
}

.meta-save-draft a:hover {
  color: #e8726f !important;
}


@media only screen and ( max-width: 1380px ){
    div.meta-parent-box{
      margin-top: 30px;
    }

    div.meta-parent-box div.container{
        max-width: 1380px;
        padding-left: 50px;
        padding-right: 50px;
    }
    div.meta-parent-box .meta-save-draft a{
        font-size: 16px;
    }

    div.meta-parent-box div.container .meta-left-box{
        width: 450px;
        margin-right: 70px;
    }

    div.meta-parent-box div.container .meta-right-box{
        width: calc(100% - 520px);
    }
}
</style>
