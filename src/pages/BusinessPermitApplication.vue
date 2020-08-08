<template>
  <div class="meta-parent-box">
    <div class="container mb30 meta-save-draft"><router-link to="#"><font-awesome-icon icon="save" class="icon" /> SAVE AS DRAFT</router-link></div>
    <div class="container flex-wrap">
        <div class="meta-left-box">
            <progress-indicator 
            pageTitle = "Application for Business Permit"
            stepOne = "Basic Information"
            stepTwo = "Business Details"
            stepThree = "Upload your Requirements"
            lastStep = "Submit your Application"/>
        </div>
        <div class="meta-right-box flex-wrap">
            <business-step-one />
            <!-- <business-step-two /> -->
            <!-- <business-upload-step /> -->
            <!-- <business-renewal-upload-step /> -->
            <!-- <application-success /> -->
        </div>
    </div>
  </div>
</template>

<script>
import BusinessStepOne from "@/components/application/BusinessStepOne"
import BusinessStepTwo from "@/components/application/BusinessStepTwo"
import BusinessUploadStep from "@/components/application/BusinessUploadStep"
import BusinessRenewalUploadStep from "@/components/application/BusinessRenewalUploadStep"
import ApplicationSuccess from "@/components/application/ApplicationSuccess"
import ProgressIndicator from "@/components/application/ProgressIndicator"
export default {
  name: "BusinessPermitApplication",
  components: {
    BusinessStepOne,
    BusinessStepTwo,
    BusinessUploadStep,
    BusinessRenewalUploadStep,
    ApplicationSuccess,
    ProgressIndicator
  },
};
</script>

<style lang="scss" scoped>
div.meta-parent-box{
    width: 100%;
    margin-top: 50px;
    padding-bottom: 50px;
    div.container{
        max-width: 1400px;
        .meta-left-box {
            width: 490px;
            float: left;
            margin-right: 100px;
        }
        .meta-right-box {
            width: calc( 100% - 590px );
            float: left;
        }
    }
    .meta-save-draft{
        font-size: 18px;
        font-weight: bold;
        text-align: right;
        a{
            text-decoration: none;
            color: #e23a36;
        }
    }
}

.meta-save-draft a:hover{
    color: #E8726F!important;
}
</style>