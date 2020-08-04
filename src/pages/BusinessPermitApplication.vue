<template>
  <div class="meta-parent-box">
    <div class="container">
        <!-- <business-step-one /> -->
        <business-step-two />
    </div>
  </div>
</template>

<script>
import BusinessStepOne from "@/components/application/BusinessStepOne"
import BusinessStepTwo from "@/components/application/BusinessStepTwo"
export default {
  name: "BusinessPermitApplication",
  components: {
    BusinessStepOne,
    BusinessStepTwo
  },
};
</script>

<style lang="scss" scoped>
div.meta-parent-box{
    width: 100%;
    margin-top: 50px;
}
</style>