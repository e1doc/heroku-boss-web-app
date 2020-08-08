<template>
    <div class="meta-container">
        <h1 class="meta-form-title">Basic Information</h1>
        <div class="meta-form-group mb60">
            <div class="meta-group-title">Taxpayer / Owner Details</div>
            <div class="meta-input-group flex-row">
                <base-input
                    label="First Name"
                    v-model="firstname"
                    name="firstname"
                    refs="first_name"
                    type="text"
                    class="mt40 input-w3"
                />
                <base-input
                    label="Middle Name(optional)"
                    v-model="middlename"
                    name="middlename"
                    refs="middle_name"
                    type="text"
                    class="mt40 input-w3"
                />
                <base-input
                    label="Last Name"
                    v-model="lastname"
                    name="lastname"
                    refs="last_name"
                    type="text"
                    class="mt40 input-w3"
                />
            </div>
             <base-input
                label="Complete Owner's Address"
                v-model="owneraddress"
                name="owneraddress"
                refs="owner_address"
                type="text"
                class="mt40"
            />
             <base-input
                label="Telephone Number"
                v-model="telephone"
                name="telephone"
                refs="tel_number"
                type="number"
                class="mt40"
            />
             <base-input
                label="Mobile Number"
                v-model="mobile"
                name="mobile"
                refs="mobile_number"
                type="number"
                class="mt40"
            />
             <base-input
                label="Email Address"
                v-model="email"
                name="email"
                refs="email_add"
                type="email"
                class="mt40"
            />

            <base-input
                label="Account Number"
                v-model="accountnumber"
                name="accountnumber"
                refs="account_number"
                type="number"
                class="mt40 input-w3"
            />
            <base-input
                label="DTI/SEC/CDA Registration No."
                v-model="dtiregnumber"
                name="dtiregnumber"
                refs="dti_reg_number"
                type="text"
                class="mt40 input-w3"
            />
            <base-input
                label="DTI/SEC/CDA Date of Registration No."
                v-model="dtiregdate"
                name="dtiregdate"
                refs="dti_reg_date"
                type="date"
                class="mt40 input-w3"
            />
            <base-input
                label="Type of Organization"
                v-model="orgtype"
                name="orgtype"
                refs="org_type"
                type="text"
                class="mt40 input-w3"
            />
            <base-input
                label="CTC No."
                v-model="ctcnumber"
                name="ctcnumber"
                refs="ctc_number"
                type="number"
                class="mt40 input-w3"
            />
            <base-input
                label="TIN"
                v-model="tin"
                name="tin"
                refs="tin_number"
                type="number"
                class="mt40 input-w3"
            />
            <base-input
                label="Are you enjoying tax incentive from any Government Entity?"
                v-model="taxincentive"
                name="taxincentive"
                refs="tax_incentive"
                type="text"
                class="mt40 input-w3"
            />
            <base-input
                label="Please specify the entity:"
                v-model="goventity"
                name="goventity"
                refs="gov_entity"
                type="text"
                class="mt40 input-w3"
            />
        </div>

        <div class="meta-form-group button-right">
            <button-block class="next-button">NEXT</button-block>
        </div>
    </div>
</template>

<script>
import BaseInput from "@/components/forms/BaseInput"
import BaseCheckbox from "@/components/forms/BaseCheckbox"
import ButtonBlock from "@/components/ButtonBlock"
export default {
  name: "BusinessStepOne",
  components: {
    BaseInput,
    BaseCheckbox,
    ButtonBlock
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
      option1: ""
    };
  },
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
            font-size: 15px;
            line-height: 19px;
            width: 100%;
            margin-bottom: 20px;
        }
        div.input-wrapper{
            margin-bottom: 15px
        }
        div.meta-input-group{
            width: 100%;
            .input-w3 {
                width: calc(33% - 10px);
                float: left;
                margin-right: 10px;
            }
        }
    }
}

div.meta-container div.meta-form-group div.meta-input-group .input-w3:last-child {
    margin-right: 0;
}
</style>