<template>
  <section class="sc-bs-enrollment">
    <div class="container">
      <div class="flex-column">
        <div>
          <h2>Business Permit Enrollment</h2>
        </div>
        <enrollment-success type="business_permit" account_no="14321" />
        <!-- <div class="sc-rounded-div">
          <div class="form-group">
            <div class="title">
              <h3>Account Information</h3>
            </div>
            <div>
              <base-input-icon-end
                label="Account Number"
                placeholder="Enter account number"
                v-model="account_no"
                name="account_no"
                refs="account_number"
                type="text"
                class="mt40"
                icon="id-card"
              />
            </div>
            <div>
              <base-input-icon-end
                label="Official Receipt Number"
                placeholder="Enter official receipt number"
                v-model="official_receipt"
                name="official_receipt"
                refs="or"
                type="text"
                class="mt40"
                icon="receipt"
              />
            </div>
            <div>
               <base-date-picker v-model="date"/>
            </div>
            <div>
              <button-block>
                VERIFY
              </button-block>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script>
import BaseInputIconEnd from "@/components/forms/BaseInputIconEnd";
import ButtonBlock from "@/components/ButtonBlock";
import EnrollmentSuccess from "@/components/enrollment/EnrollmentSuccess";
import BaseDatePicker from "@/components/forms/BaseDatePicker"
export default {
  name: "BusinessPermitEnrollment",
  components: {
    BaseInputIconEnd,
    ButtonBlock,
    EnrollmentSuccess,
    BaseDatePicker
  },
  data(){
    return{
      account_no: "",
      official_receipt: "",
      date: ""
    }
  }
};
</script>

<style lang="scss" scoped>
.sc-bs-enrollment {
  text-align: center;
  margin-top: 50px;
  .sc-rounded-div {
    background: #eaf6ff !important;
    max-width: 60%;
    width: 100%;
    margin: 50px auto 0;
    box-shadow: 0px 10px 20px #0000000D;
    .form-group {
      text-align: center;
      padding: 60px 80px;
      .title {
        margin-bottom: 50px;
        text-align: left;
      }
      div {
        margin-bottom: 30px;
      }
    }
  }
}
</style>
