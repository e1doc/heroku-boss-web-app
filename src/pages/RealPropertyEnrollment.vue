<template>
  <section class="sc-rp-enrollment">
    <div class="container">
      <div class="flex-column">
        <div>
          <h2>Real Property Enrollment</h2>
        </div>
        <enrollment-success v-if="isSuccess" type="real_property" account_no="14321" />
        <div v-if="!isSuccess" class="sc-rounded-div">
          <div class="form-group">
            <div class="title">
              <h3>Account Information</h3>
            </div>
            <div>
              <base-input-icon-end
                label="Tax Declaration Number"
                placeholder="Enter tax declaration number"
                v-model="td_no"
                name="td_no"
                refs="td_number"
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
            <div class="datepicker">
               <base-date-picker v-model="date"/>
            </div>
            <div>
              <button-block @click.native="verify()" >
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
import BaseDatePicker from "@/components/forms/BaseDatePicker"
import EnrollmentSuccess from "@/components/enrollment/EnrollmentSuccess";
export default {
  name: "RealPropertyEnrollment",
  components: {
    BaseInputIconEnd,
    ButtonBlock,
    BaseDatePicker,
    EnrollmentSuccess
  },
  data(){
    return{
      td_no: "",
      official_receipt: "",
      date: "",
      isSuccess: false
    }
  },
  methods:{
    verify(){
      let payload = {
        name: "RealPropertyTaxEnrollment",
        param: {
          property_type: "",
          tdno: this.td_no,
          or_date: this.date,
          ornumber: this.official_receipt
        }
      }
      this.isSuccess = true
    }
  }
};
</script>

<style lang="scss" scoped>
.sc-rp-enrollment {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    padding: 70px 30px 50px;
    min-height: calc( 100vh - 285px );
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
.datepicker{
  width: 100%;
}



/*
MOBILE RESPONSIVENESS 
--------------------------------------------------------------*/
@media only screen and (max-width: 1400px){
  .sc-rp-enrollment {
      .sc-rounded-div {
          max-width: 570px;
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

@media only screen and (max-width: 768px){
  h2 {
      font-size: 20px;
  }

  .sc-rp-enrollment .sc-rounded-div .form-group{
      padding: 50px 30px 30px;
  }

  h3 {
      font-size: 17px;
  }
}

@media only screen and (max-width: 580px){
  h2 {
      font-size: 20px;
  }
}

@media only screen and ( max-width: 480px ){
  .sc-rp-enrollment{
      padding: 70px 0 30px;
  }

}

@media only screen and ( max-width: 480px ){
  .sc-rp-enrollment .sc-rounded-div .form-group{
      padding: 30px 15px 10px;
  }

  h3{
      font-size: 15px;
  }
}
</style>
