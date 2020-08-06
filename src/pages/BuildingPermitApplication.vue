<template>
  <div class="meta-parent-box">
    <div class="container flex-wrap">
        <div class="meta-left-box">
            <progress-indicator 
            pageTitle = "Application for Building Permit"
            stepOne = "Basic Information"
            stepTwo = "Building Details"
            stepThree = "Upload your Requirements"
            lastStep = "Submit your Application"/>
        </div>
        <div class="meta-right-box flex-wrap">
            <!-- <building-step-one /> -->
            <building-step-two />
            <!-- <upload-step /> -->
            <!-- <application-success /> -->
        </div>
    </div>
  </div>
</template>

<script>
import BuildingStepOne from "@/components/application/BuildingStepOne"
import BuildingStepTwo from "@/components/application/BuildingStepTwo"
import UploadStep from "@/components/application/UploadStep"
import ApplicationSuccess from "@/components/application/ApplicationSuccess"
import ProgressIndicator from "@/components/application/ProgressIndicator"
export default {
    name: "BuildingPermitApplication",
    components: {
        BuildingStepOne,
        BuildingStepTwo,
        UploadStep,
        ApplicationSuccess,
        ProgressIndicator
    },
}
</script>

<style lang="scss" scoped>
div.meta-parent-box{
    width: 100%;
    margin-top: 50px;
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
}
</style>