<template>
    <div class="meta-container">
        <h1 class="meta-form-title">Business Details</h1>
        <div class="meta-form-group mb60">
            <div class="meta-group-title">President / Treasurer of Corporation</div>
            <div class="meta-input-group flex-row">
                <base-input
                    label="First Name"
                    v-model="presidentfirstname"
                    name="presidentfirstname"
                    refs="pres_first_name"
                    type="text"
                    class="mt40 input-w3"
                />
                <base-input
                    label="Middle Name(optional)"
                    v-model="presidentmiddlename"
                    name="presidentmiddlename"
                    refs="pres_middle_name"
                    type="text"
                    class="mt40 input-w3"
                />
                <base-input
                    label="Last Name"
                    v-model="presidentlastname"
                    name="presidentlastname"
                    refs="pres_last_name"
                    type="text"
                    class="mt40 input-w3"
                />
            </div>
        </div>
        <div class="meta-form-group mb60">
            <div class="meta-group-title">Corporate Name: </div>
             <base-input
                label="Business Name"
                v-model="businessname"
                name="businessname"
                refs="business_name"
                type="text"
                class="mt40"
            />

             <base-input
                label="Trade Name / Franchise"
                v-model="tradename"
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
                v-model="businessaddress"
                name="businessaddress"
                refs="business_address"
                type="text"
                class="mt40"
            />

            <div class="meta-input-group flex-row">
                <base-input
                    label="Telephone No."
                    v-model="businesstelephone"
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
                 <base-tel-number v-model="businessmobile" class="mb15" placeholder="Mobile No."/>
            </div>
            
             <base-input
                label="Email Address"
                v-model="businessemail"
                name="businessemail"
                refs="business_email"
                type="email"
                class="mt40"
            />
             <base-input
                label="Property Index Pin (PIN)"
                v-model="pin"
                name="pin"
                refs="pin_number"
                type="number"
                class="mt40"
            />

            <div class="meta-input-group flex-row">
                <base-input
                    label="Business Area (in sq. m.)"
                    v-model="businessarea"
                    name="businessarea"
                    refs="business_area"
                    type="number"
                    class="mt40 input-w2"
                />
                <base-input
                    label="Total No. of Employees"
                    v-model="employees"
                    name="employees"
                    refs="employees_count"
                    type="number"
                    class="mt40 input-w2"
                />
            </div>
            <base-input
                label="No. of Employees residing  in City/Municipality"
                v-model="employeesresidence"
                name="employeesresidence"
                refs="employees_residence"
                type="number"
                class="mt40"
            />
        </div>

        <div class="meta-form-group mb60">
            <div class="meta-group-title">If Place of business is rented, please identify the following Lessor's Details: </div>
            <div class="meta-input-group flex-row">
                <base-input
                    label="First Name"
                    v-model="lessorfirstname"
                    name="lessorfirstname"
                    refs="lessor_firstname"
                    type="text"
                    class="mt40 input-w3"
                />
                <base-input
                    label="Middle Name(optional)"
                    v-model="lessormiddlename"
                    name="lessormiddlename"
                    refs="lessor_middlename"
                    type="text"
                    class="mt40 input-w3"
                />
                <base-input
                    label="Last Name"
                    v-model="lessorlastname"
                    name="lessorlastname"
                    refs="lessor_lastname"
                    type="text"
                    class="mt40 input-w3"
                />
            </div>
            <base-input
                label="Complete Address"
                v-model="lessoraddress"
                name="lessoraddress"
                refs="lessor_address"
                type="text"
                class="mt40"
            />
            <base-input
                label="Gross Monthly Rental"
                v-model="monthlyrental"
                name="monthlyrental"
                refs="monthly_rental"
                type="text"
                class="mt40"
            />
            <div class="meta-input-group flex-row">
                <base-input
                    label="Telephone No."
                    v-model="lessortelephone"
                    name="lessortelephone"
                    refs="lessor_telephone"
                    type="number"
                    class="mt40 input-w2"
                />
                <!-- <base-input
                    label="Mobile No."
                    v-model="lessormobile"
                    name="lessormobile"
                    refs="lessor_mobile"
                    type="number"
                    class="mt40 input-w2"
            /> -->
             <base-tel-number v-model="lessormobile" class="mb15" placeholder="Mobile no."/>
            </div>
            <base-input
                label="Email Address"
                v-model="lessoremail"
                name="lessoremail"
                refs="lessor_email"
                type="email"
                class="mt40"
            />
        </div>

        <div class="meta-form-group mb60">
            <div class="meta-group-title">Business Activity</div>
            <div class="meta-multi-group">
                <div class="meta-input-group flex-row">
                    <base-input
                        label="Code"
                        v-model="businesscode"
                        name="businesscode"
                        refs="business_code"
                        type="text"
                        class="mt40 input-w3"
                    />
                    <base-input
                        label="Line of Business"
                        v-model="lineofbusiness"
                        name="lineofbusiness"
                        refs="line_of_business"
                        type="text"
                        class="mt40 input-w3"
                    />
                    <base-input
                        label="No. of Units"
                        v-model="businessunits"
                        name="businessunits"
                        refs="business_units"
                        type="text"
                        class="mt40 input-w3"
                    />
                </div>
                 <base-input
                    label="Capitalization (for New Business)"
                    v-model="capitalization"
                    name="capitalization"
                    refs="business_capitalization"
                    type="text"
                    class="mt40 mb30"
                />
                
                <div class="meta-group-title">Gross Sales / Receipts (For Renewal)</div>
                <div class="meta-input-group flex-row">
                    <base-input
                        label="Essential"
                        v-model="essential"
                        name="essential"
                        refs="renew_essential"
                        type="text"
                        class="mt40 input-w2"
                    />
                    <base-input
                        label="Non-essential"
                        v-model="nonessential"
                        name="nonessential"
                        refs="non_essential"
                        type="text"
                        class="mt40 input-w2"
                    />
                </div>
            </div>
        </div>

        <div class="meta-form-group button-left-right">
            <button-block type="back" class="back-button" @click.native="previousStep()">BACK</button-block>
            <button-block class="next-button" @click.native="nextStep()">NEXT</button-block>
        </div>
    </div>
</template>

<script>
import BaseInput from "@/components/forms/BaseInput"
import BaseCheckbox from "@/components/forms/BaseCheckbox"
import ButtonBlock from "@/components/ButtonBlock"
import BaseTelNumber from "@/components/forms/BaseTelNumber";
export default {
  name: "BusinessStepTwo",
  components: {
    BaseInput,
    BaseCheckbox,
    ButtonBlock,
    BaseTelNumber
  },
  data() {
    return {
      firstname: "",
      middlename: "",
      lastname: "",
      owneraddress: "",
      telephone: "",
      mobile: "",
      email: "",
      presidentfirstname: "",
      presidentmiddlename: "",
      presidentlastname: "",
    };
  },
  methods:{
      previousStep(){
          this.$store.commit('setCurrentApplicationStep','1')
      },
      nextStep(){
          this.$store.commit('setCurrentApplicationStep','3')
      }
  }
};
</script>

<style lang="scss" scoped>
div.meta-container{
    width: 100%;
    padding: 50px;
    background-color: #EAF6FF;
    border-radius: 20px;
    h1.meta-form-title{
        margin-bottom: 40px;
    }
    div.meta-form-group{
        width: 100%;
        div.meta-group-title{
            color: #2699FB;
            font-size: 16px;
            line-height: 19px;
            width: 100%;
            margin-bottom: 20px;
        }
        div.input-wrapper{
            margin-bottom: 15px
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
        }

        div.meta-multi-group{
            padding: 30px;
            background-color: #F1F9FF;
            border-radius: 15px;
            div.meta-group-title{
                font-size: 15px;
            }
            .mb30{
                margin-bottom: 35px;
            }
        }
    }
    div.button-left-right{
        .back-button{
            float: left;
            background-color: #73BEFC;
            border-color: #73BEFC;
        }
        .next-button{
            float: right;
        }
    }
}

.back-button:hover{
    background-color: #2699FB!important;
    color: #fff!important;
    border-color: #2699FB!important;
}
</style>