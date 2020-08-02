<template>
  <section class="sc-bs-enrollment">
    <div class="container">
      <div class="flex-column">
        <div>
          <h2>Business Permit Enrollment</h2>
        </div>
        <enrollment-success v-if="isSuccess" type="business_permit" account_no="14321" />
        <div v-if="!isSuccess" class="sc-rounded-div">
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
              <button-block @click.native="verify()">
                VERIFY
              </button-block>
            </div>
          </div>
        </div>
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
      date: "",
      isSuccess: false
    }
  },
  methods:{
    verify(){
      this.isSuccess = true
    }
  }
};
</script>

<style lang="scss" scoped>
.sc-bs-enrollment {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    padding: 70px 30px 50px;
    .sc-rounded-div {
        background: #eaf6ff !important;
        max-width: 53%; 
        width: 100%;
        min-height: 500px;
        margin: 50px auto 0;
        box-shadow: 0px 10px 20px #0000000D;
        .form-group {
            text-align: center;
            padding: 80px 80px 50px;
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

@media only screen and (max-width: 1400px){
  .sc-bs-enrollment {
      .sc-rounded-div {
          max-width: 488px;
          min-height: auto;
          margin-top: 30px;
          .form-group {
              padding: 60px 60px 30px;
              .title{
                  margin-bottom: 30px;
              }
              div{
                  margin-bottom: 20px;
              }
          }
      }
  }
}
</style>
