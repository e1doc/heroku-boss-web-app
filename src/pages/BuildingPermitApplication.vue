<template>
  <div class="meta-parent-box">
    <div class="meta-form-holder">
      <downloadable-building-form />
    </div>
    <div class="container mb30 meta-save-draft">
      <div v-if="currentApplicationStep !== '4'" @click="saveAsDraft" class="hide-in-mobile">
        <font-awesome-icon icon="save" class="icon" /> SAVE AS
        DRAFT</div>
    </div>
    <div class="container flex-wrap">
      <div class="meta-page-title show-in-sm-screens">Application for Building Permit</div>
      <div @click="saveAsDraft" class="show-in-mobile meta-save-draft">
          <font-awesome-icon icon="save" class="icon" />
      </div>
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
    this.$store.commit("resetPropertyState")
    this.$store.commit('setIsPrivacyAgree', false)
    next();
  },
  mounted() {
    this.$store.commit("setApplicationType", "property");
  },
  methods: {
    saveAsDraft() {
      this.$store.commit("setDraftProperty", true)
    }
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



/*
MOBILE RESPONSIVENESS 
--------------------------------------------------------------*/
.show-in-sm-screens{
    display: none;
}

.show-in-mobile{
    display: none;
}

div.meta-page-title {
    font-size: 25px;
    font-weight: bold;
    line-height: 30px;
    text-align: right;
    margin-bottom: 50px;
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

@media only screen and ( max-width: 1180px ){
  div.meta-parent-box{
      margin-top: 50px;
  }

  .show-in-sm-screens{
      display: block;
  }
  div.meta-parent-box div.container .meta-left-box{
      width: 100%;
      margin-right: 0;
      margin-bottom: 30px;
  }

  div.meta-parent-box div.container .meta-right-box{
      width: 100%;
  }

  div.meta-parent-box .meta-save-draft div{
      font-size: 16px;
  }

  div.meta-parent-box div.container.meta-save-draft{
      width: auto;
      max-width: unset;
      padding-left: 0;
      padding-right: 0;
      position: absolute;
      right: 50px;
      margin-bottom: 0;
  }

  div.meta-parent-box .meta-form-holder{
      width: 100%;
      overflow: hidden;
  }
}

@media only screen and ( max-width: 768px ){
    .show-in-mobile{
      display: block;
    }
    .hide-in-mobile{
      display: none;
    }

     div.meta-page-title{
        font-size: 23px;
        text-align: center;
        width: 100%;
        margin-bottom: 0;
    }

    div.meta-parent-box .meta-save-draft{
        color: #e23a36;
        font-size: 26px;
        width: auto;
        position: fixed;
        right: 16px;
        bottom: 99px;
        z-index: 4;
        padding: 12px 17px;
        background: #fcfcfc;
        border-radius: 100%;
        box-shadow: -2px 10px 30px rgba(127,127,127, 0.1);
    }
}

@media only screen and ( max-width: 650px ){
  div.meta-parent-box div.container{
      padding-left: 30px;
      padding-right: 30px;
  }
}

@media only screen and ( max-width: 480px ){
  div.meta-parent-box{
      margin-top: 35px;
  }

  div.meta-parent-box div.container{
      padding-left: 15px;
      padding-right: 15px;
  }

  div.meta-page-title{
      font-size: 20px;
  }
}
</style>
