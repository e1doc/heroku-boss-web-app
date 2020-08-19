<template>
  <div class="meta-container">
    <h1 class="meta-form-title">Business Details</h1>
    <div class="meta-form-group mb60">
      <div class="meta-group-title">President / Treasurer of Corporation</div>
      <base-input
        label="First Name"
        v-model="business_details.president_first_name"
        :validationMessages="
          stepTwoErrors.business_details.president_first_name
        "
        name="presidentfirstname"
        refs="pres_first_name"
        type="text"
        class="mt40"
      />
      <base-input
        label="Middle Name(optional)"
        v-model="business_details.president_middle_name"
        :validationMessages="
          stepTwoErrors.business_details.president_middle_name
        "
        name="presidentmiddlename"
        refs="pres_middle_name"
        type="text"
        class="mt40"
      />
      <base-input
        label="Last Name"
        v-model="business_details.president_last_name"
        :validationMessages="stepTwoErrors.business_details.president_last_name"
        name="presidentlastname"
        refs="pres_last_name"
        type="text"
        class="mt40"
      />
    </div>
    <div class="meta-form-group mb60">
      <div class="meta-group-title">Corporate Name:</div>
      <base-input
        label="Business Name"
        v-model="business_details.name"
        :validationMessages="stepTwoErrors.business_details.name"
        name="businessname"
        refs="business_name"
        type="text"
        class="mt40"
      />

      <base-input
        label="Trade Name / Franchise"
        v-model="business_details.trade_name"
        :validationMessages="stepTwoErrors.business_details.trade_name"
        name="tradename"
        refs="trade_name"
        type="text"
        class="mt40"
      />
    </div>
    <div class="meta-form-group mb60">
      <div class="meta-group-title">Other Business Details:</div>
      <base-input
        label="Complete Business Address"
        v-model="business_details.complete_business_address"
        :validationMessages="
          stepTwoErrors.business_details.complete_business_address
        "
        name="businessaddress"
        refs="business_address"
        type="text"
        class="mt40"
      />

      <div class="meta-input-group flex-row">
        <base-input
          label="Telephone No."
          v-model="business_details.telephone_number"
          :validationMessages="stepTwoErrors.business_details.telephone_number"
          name="businesstelephone"
          refs="business_telephone"
          type="number"
          class="mt40 input-w2"
        />
        <!-- <base-input
                    label="Mobile No."
                    v-model="businessmobile"
                    name="businessmobile"
                    refs="business_mobile"
                    type="number"
                    class="mt40 input-w2"
                /> -->
        <base-tel-number
          v-model="business_details.mobile_number"
          :validationMessages="stepTwoErrors.business_details.mobile_number"
          class="mb15 input-phone"
          placeholder="Mobile No."
        />
      </div>

      <base-input
        label="Email Address"
        v-model="business_details.email_address"
        :validationMessages="stepTwoErrors.business_details.email_address"
        name="businessemail"
        refs="business_email"
        type="email"
        class="mt40"
      />
      <base-input
        label="Property Index Pin (PIN)"
        v-model="business_details.property_index_number"
        :validationMessages="
          stepTwoErrors.business_details.property_index_number
        "
        name="pin"
        refs="pin_number"
        type="number"
        class="mt40"
      />

      <base-input
        label="Business Area"
        v-model="business_details.area"
        :validationMessages="stepTwoErrors.business_details.area"
        name="area"
        refs="business_area"
        type="number"
        class="mt40"
      />

      <base-input
        label="Total No. of Employeess"
        v-model="business_details.total_employees"
        :validationMessages="stepTwoErrors.business_details.total_employees"
        name="total_employees"
        refs="employees"
        type="number"
        class="mt40"
      />

      <base-input
        label="No. of Employees residing in City/Municipality"
        v-model="business_details.residing_employees"
        :validationMessages="stepTwoErrors.business_details.residing_employees"
        name="residing_employees"
        refs="ref_residing_employees"
        type="number"
        class="mt40"
      />

      <div class="meta-form-group mb60">
        <div class="meta-group-title">
          If Place of business is rented, please identify the following Lessor's
          Details:
        </div>
        <base-input
          label="First Name"
          v-model="lessor_details.first_name"
          :validationMessages="stepTwoErrors.lessor_details.first_name"
          name="lessorfirstname"
          refs="lessor_firstname"
          type="text"
          class="mt40"
        />
        <base-input
          label="Middle Name(optional)"
          v-model="lessor_details.middle_name"
          :validationMessages="stepTwoErrors.lessor_details.middle_name"
          name="lessormiddlename"
          refs="lessor_middlename"
          type="text"
          class="mt40"
        />
        <base-input
          label="Last Name"
          v-model="lessor_details.last_name"
          :validationMessages="stepTwoErrors.lessor_details.last_name"
          name="lessorlastname"
          refs="lessor_lastname"
          type="text"
          class="mt40"
        />
        <base-input
          label="Complete Address"
          v-model="lessor_details.complete_address"
          :validationMessages="stepTwoErrors.lessor_details.complete_address"
          name="lessoraddress"
          refs="lessor_address"
          type="text"
          class="mt40"
        />
        <base-input
          label="Gross Monthly Rental"
          v-model="lessor_details.gross_monthly_rental"
          :validationMessages="
            stepTwoErrors.lessor_details.gross_monthly_rental
          "
          name="monthlyrental"
          refs="monthly_rental"
          type="text"
          class="mt40"
        />
        <div class="meta-input-group flex-row">
          <base-input
            label="Telephone No."
            v-model="lessor_details.telephone_number"
            :validationMessages="stepTwoErrors.lessor_details.telephone_number"
            name="lessortelephone"
            refs="lessor_telephone"
            type="number"
            class="mt40 input-w2"
          />
          <base-tel-number
            v-model="lessor_details.mobile_number"
            :validationMessages="stepTwoErrors.lessor_details.mobile_number"
            class="mb15 input-phone"
            placeholder="Mobile no."
          />
        </div>
        <base-input
          label="Email Address"
          v-model="lessor_details.email_address"
          :validationMessages="stepTwoErrors.lessor_details.email_address"
          name="lessoremail"
          refs="lessor_email"
          type="email"
          class="mt40"
        />
      </div>

      <div class="meta-form-group mb60">
        <div class="meta-group-title">Business Activity</div>
        <div class="add-icon" @click="addActivity">
          <font-awesome-icon icon="plus-circle" />
        </div>
        <div
          class="meta-multi-group"
          v-for="(activity, index) in activities"
          :key="index"
        >
          <div class="meta-input-group flex-row">
            <base-input
              label="Code"
              v-model="activity.code"
              :name="`businesscode${index}`"
              :refs="`business_code${index}`"
              type="text"
              class="mt40 input-w3"
            />
            <base-input
              label="Line of Business"
              v-model="activity.line_of_business"
              :name="`lineofbusiness${index}`"
              :refs="`line_of_business${index}`"
              type="text"
              class="mt40 input-w3"
            />
            <base-input
              label="No. of Units"
              v-model="activity.units"
              :name="`businessunits${index}`"
              :refs="`business_units${index}`"
              type="number"
              class="mt40 input-w3"
            />
          </div>
          <base-input
            label="Capitalization (for New Business)"
            v-model="activity.capitalization"
            :name="`capitalization${index}`"
            :refs="`business_capitalization${index}`"
            type="text"
            class="mt40 mb30"
          />

          <div class="meta-group-title">
            Gross Sales / Receipts (For Renewal)
          </div>
          <div class="meta-input-group flex-row">
            <base-input
              label="Essential"
              v-model="activity.essential"
              :name="`essential${index}`"
              :refs="`renew_essential${index}`"
              type="text"
              class="mt40 input-w2"
            />
            <base-input
              label="Non-essential"
              v-model="activity.non_essential"
              :name="`nonessential${index}`"
              :refs="`non_essential${index}`"
              type="text"
              class="mt40 input-w2"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="meta-form-group button-left-right">
      <button-block
        type="back"
        class="back-button"
        @click.native="previousStep()"
        >BACK</button-block
      >
      <button-block class="next-button" @click.native="nextStep()"
        >NEXT</button-block
      >
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/forms/BaseInput";
import BaseCheckbox from "@/components/forms/BaseCheckbox";
import ButtonBlock from "@/components/ButtonBlock";
import BaseTelNumber from "@/components/forms/BaseTelNumber";
import { mapGetters } from "vuex";
export default {
  name: "BusinessStepTwo",
  components: {
    BaseInput,
    BaseCheckbox,
    ButtonBlock,
    BaseTelNumber,
  },
  data() {
    return {
      business_details: {
        name: "",
        trade_name: "",
        complete_business_address: "",
        president_first_name: "",
        president_middle_name: "",
        president_last_name: "",
        telephone_number: "",
        mobile_number: "",
        email_address: "",
        property_index_number: "",
        area: "",
        total_employees: "",
        residing_employees: "",
      },
      lessor_details: {
        first_name: "",
        middle_name: "",
        last_name: "",
        complete_address: "",
        telephone_number: "",
        mobile_number: "",
        email_address: "",
        gross_monthly_rental: "",
      },
      activities: [],
      activity: {
        code: "",
        line_of_business: "",
        units: "",
        capitalization: "",
        essential: "",
        non_essential: "",
      },
    };
  },
  computed: {
    ...mapGetters([
      "businessApplication",
      "businessDetails",
      "lessorDetails",
      "businessActivities",
      "detailsHasError",
      "lessorDetailsHasError",
      "stepTwoErrors",
      "applicationRequirements",
      "draftBusiness",
    ]),
  },
  mounted() {
    this.addActivity();
    this.preFillForm();
  },
  watch: {
    draftBusiness: {
      deep: true,
      handler(status) {
        if (status) {
          this.nextStep();
        }
      },
    },
  },
  methods: {
    previousStep() {
      this.$store.commit("setCurrentApplicationStep", "1");
    },
    async nextStep() {
      this.$store.commit("setLoading", true);
      if (this.businessDetails.id) {
        await this.$store.dispatch(
          "updateBusinessDetails",
          this.business_details
        );
      } else {
        await this.$store.dispatch("addBusinessDetails", this.business_details);
      }
      if (this.lessor_details.id) {
        await this.$store.dispatch("updateLessorDetails", this.lessor_details);
      } else {
        await this.$store.dispatch("addLessorDetails", this.lessor_details);
      }
      if (this.businessActivities.length > 0) {
        if (this.activities.length > this.businessActivities.length) {
          let update = this.activities.slice(
            0,
            this.businessActivities.length
          );
          let add = this.activities.slice(this.businessActivities.length);
          await this.$store.dispatch("updateBusinessActivity", update);
            await this.$store.dispatch("addBusinessActivity", add);
        } else {
          await this.$store.dispatch("updateBusinessActivity", this.activities);
        }
        // await this.$store.dispatch("updateBusinessActivity", this.activities);
      } else {
        await this.$store.dispatch("addBusinessActivity", this.activities);
      }
      if (!this.detailsHasError && !this.lessorDetailsHasError) {
        let payload = { application_id: this.businessApplication.id };
        if (this.applicationRequirements) {
          if(!this.applicationRequirements.id){
             this.$store.dispatch("addApplicationRequirements", payload);
          }
        }
        if (!this.draftBusiness) {
          this.$store.commit("setCurrentApplicationStep", "3");
        }
      } else {
        console.log("hasError");
      }
      this.$store.commit("setLoading", false);
    },
    preFillForm() {
      if (this.businessDetails.id) {
        this.business_details = this.businessDetails;
      }
      if (this.lessorDetails.id) {
        this.lessor_details = this.lessorDetails;
      }
      if (this.businessActivities.length > 0) {
        this.activities.splice(0, this.activities.length);
        this.businessActivities.forEach((element) => {
          this.activities.push(element);
        });
      }
    },
    addActivity() {
      if (this.activities.length < 4) {
        let activity = {
          code: "",
          line_of_business: "",
          units: "",
          capitalization: "",
          essential: "",
          non_essential: "",
        };
        this.activities.push(activity);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.add-icon {
  text-align: right;
  font-size: 28px;
  padding: 10px 0px 10px 10px;
  cursor: pointer;
  color: #2699fb;
}
div.meta-container {
  width: 100%;
  padding: 50px;
  background-color: #eaf6ff;
  border-radius: 20px;
  h1.meta-form-title {
    margin-bottom: 40px;
  }
  div.meta-form-group {
    width: 100%;
    div.meta-group-title {
      color: #2699fb;
      font-size: 16px;
      line-height: 19px;
      width: 100%;
      margin-bottom: 20px;
      margin-top: 30px;
    }
    div.input-wrapper {
      margin-bottom: 15px;
    }
    div.meta-input-group {
      width: 100%;
      .input-w2 {
        width: 50%;
        float: left;
        margin-right: 10px;
      }
      .input-w3 {
        width: 33%;
        float: left;
        margin-right: 10px;
      }
      .input-w4 {
        width: 25%;
        float: left;
        margin-right: 10px;
      }
      .input-w3:last-child,
      .input-w4:last-child,
      .input-w2:last-child {
        margin-right: 0;
      }

      .input-phone{
          width: 60%;
      }
    }

    div.meta-multi-group {
      padding: 30px;
      background-color: #f1f9ff;
      border-radius: 15px;
      margin-bottom: 20px;
      div.meta-group-title {
        font-size: 15px;
      }
      .mb30 {
        margin-bottom: 35px;
      }
    }
  }
  div.button-left-right {
    .back-button {
      float: left;
      background-color: #73befc;
      border-color: #73befc;
    }
    .next-button {
      float: right;
    }
  }
}

.back-button:hover {
  background-color: #2699fb !important;
  color: #fff !important;
  border-color: #2699fb !important;
}



/*
MOBILE RESPONSIVENESS 
--------------------------------------------------------------*/

@media only screen and ( max-width : 1380px ){
    div.meta-container h1.meta-form-title{
        font-size: 22px;
    }
} 
@media only screen and ( max-width : 768px ){
    div.meta-container h1.meta-form-title{
        font-size: 20px;
    }

    .input-phone{
        margin-bottom: 8px;
    }

    div.meta-container div.meta-form-group div.meta-group-title{
        font-size: 15px;
        margin-bottom: 10px;
    }
}

@media only screen and ( max-width : 650px ){
    div.meta-container{
        padding: 40px 30px;
    }

    div.meta-container h1.meta-form-title {
        font-size: 18px;
        margin-bottom: 30px;
    }
}

@media only screen and ( max-width : 480px ){
    div.meta-container{
        padding: 30px 15px;
    }

    div.meta-container div.meta-form-group.mb60{
        margin-bottom: 20px;
    }

    div.meta-container h1.meta-form-title{
        font-size: 16px;
    }

    div.meta-container div.meta-form-group div.meta-group-title{
        font-size: 14px;
        margin-bottom: 15px;
    }

    div.meta-container div.button-left-right .back-button{
        background-color: #048cff;
        border-color: #73befc;
        width: auto;
        background: transparent;
        border: none;
        box-shadow: none;
        color: #2699fb;
        min-width: unset;
    }

    div.meta-container div.button-left-right .next-button{
        width: auto;
        background: transparent;
        border: none;
        box-shadow: none;
        min-width: unset;
        color: #2699fb;
    }
}
</style>
