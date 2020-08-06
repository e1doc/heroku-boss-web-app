<template>
    <div class="meta-container">
        <h1 class="meta-form-title">Building Details</h1>
        <div class="meta-form-group mb60">
            <div class="meta-group-title">Location of Construction</div>
            <div class="meta-input-group flex-row">
                <base-input
                    label="Lot No."
                    v-model="lotnumber"
                    name="lotnumber"
                    refs="lot_number"
                    type="text"
                    class="mt40 input-w4"
                />
                <base-input
                    label="Blk No."
                    v-model="blknumber"
                    name="blknumber"
                    refs="blk_number"
                    type="text"
                    class="mt40 input-w4"
                />
                <base-input
                    label="TCT No."
                    v-model="tctnumber"
                    name="tctnumber"
                    refs="tct_number"
                    type="text"
                    class="mt40 input-w4"
                />
                <base-input
                    label="Tax Dec. No."
                    v-model="taxdecnumber"
                    name="taxdecnumber"
                    refs="tax_dec_number"
                    type="text"
                    class="mt40 input-w4"
                />
            </div>
            <div class="meta-input-group flex-row">
                <base-input
                    label="Street"
                    v-model="street"
                    name="street"
                    refs="street_name"
                    type="text"
                    class="mt40 input-w3"
                />
                <base-input
                    label="Barangay"
                    v-model="barangay"
                    name="barangay"
                    refs="barangay_name"
                    type="text"
                    class="mt40 input-w3"
                />
                <base-input
                    label="City / Province"
                    v-model="cityprovince"
                    name="cityprovince"
                    refs="city_province"
                    type="text"
                    class="mt40 input-w3"
                />
            </div>
        </div>
        <!-- SCOPE OF WORK -->
        <div class="meta-form-group mb60">
            <div class="meta-group-title">Scope of Work</div>
            <div class="meta-input-group flex-row">
                <base-checkbox
                    label="New Construction"
                    v-model="newconstruction"
                    name="newconstruction"
                    refs="new_construction"
                    class="mb15 input-w3"
                />
                <base-checkbox
                    label="Renovation"
                    v-model="renovation"
                    name="renovation"
                    refs="reno_vation"
                    class="mb15 input-w3"
                />
                <base-checkbox
                    label="Raising"
                    v-model="raising"
                    name="raising"
                    refs="rai_sing"
                    class="mb15 input-w3"
                />
            </div>
            <div class="meta-input-group flex-row">
                <base-checkbox
                    label="Erection"
                    v-model="erection"
                    name="erection"
                    refs="erec_tion"
                    class="mb15 input-w3"
                />
                <base-checkbox
                    label="Conversion"
                    v-model="conversion"
                    name="conversion"
                    refs="conver_sion"
                    class="mb15 input-w3"
                />
                <base-checkbox
                    label="Accessory Building Structure"
                    v-model="accessorybuilding"
                    name="accessorybuilding"
                    refs="accessory_building"
                    class="mb15 input-w3"
                />
            </div>
            <div class="meta-input-group flex-row">
                <base-checkbox
                    label="Addition"
                    v-model="addition"
                    name="addition"
                    refs="addi_tion"
                    class="mb15 input-w3"
                />
                <base-checkbox
                    label="Repair"
                    v-model="repair"
                    name="repair"
                    refs="re_pair"
                    class="mb15 input-w3"
                />
                <base-checkbox
                    label="Moving"
                    v-model="moving"
                    name="moving"
                    refs="mo_ving"
                    class="mb15 input-w3"
                />
            </div>
            <div class="meta-input-group flex-row">
                <base-checkbox
                    label="Alteration"
                    v-model="alteration"
                    name="alteration"
                    refs="alter_ation"
                    class="mb15 input-w3"
                />
                <base-checkbox
                    label="Others, Specify on the field."
                    v-model="otherworkscope"
                    name="otherworkscope"
                    refs="other_work_scope"
                    class="mb15 input-w3"
                />
            </div>
            <base-input
                label="Others (Specify)"
                v-model="otherscope"
                name="otherscope"
                refs="other_scope"
                type="text"
                class="mt40"
            />
        </div>

        <!-- USER OF CHARACTER OF OCCUPANCY -->
        <div class="meta-form-group mb60">
            <div class="meta-group-title">User of Character of Occupancy</div>
            <div class="meta-input-group">
                <base-checkbox
                    label="GROUP A : Residential Dwellings"
                    v-model="groupa"
                    name="groupa"
                    refs="group_a"
                    class="mb15"
                />
                <base-checkbox
                    label="GROUP B : Residential Hotel, Apartment"
                    v-model="groupb"
                    name="groupb"
                    refs="group_b"
                    class="mb15"
                />
                <base-checkbox
                    label="GROUP C : Educational Recreational"
                    v-model="groupc"
                    name="groupc"
                    refs="group_c"
                    class="mb15"
                />
                    <base-checkbox
                    label="GROUP D : Institutional"
                    v-model="groupd"
                    name="groupd"
                    refs="group_d"
                    class="mb15"
                />
                <base-checkbox
                    label="GROUP E : Business and Mercantile"
                    v-model="groupe"
                    name="groupe"
                    refs="group_e"
                    class="mb15"
                />

                <base-checkbox
                    label="GROUP F : Industrial"
                    v-model="groupf"
                    name="groupf"
                    refs="group_f"
                    class="mb15"
                />
                <base-checkbox
                    label="GROUP G : Industrial Storage and Hazardous"
                    v-model="groupg"
                    name="groupg"
                    refs="group_g"
                    class="mb15"
                />
                <base-checkbox
                    label="GROUP H : Recreational, Assembly Occupant Load less 1000"
                    v-model="grouph"
                    name="grouph"
                    refs="group_h"
                    class="mb15"
                />
                <base-checkbox
                    label="GROUP I : Recreational, Assembly Occupant Load 1000 or more"
                    v-model="groupi"
                    name="groupi"
                    refs="group_i"
                    class="mb15"
                />
                <base-checkbox
                    label="GROUP J : Agricultural Accessory"
                    v-model="groupj"
                    name="groupj"
                    refs="group_j"
                    class="mb15"
                />
            </div>
            <base-input
                label="Others (Specify)"
                v-model="otheroccupancy"
                name="otheroccupancy"
                refs="other_occupancy"
                type="text"
                class="mt40"
            />
        </div>

        <div class="meta-form-group mb60">
            <div class="meta-group-title">Other Details</div>
              <div class="meta-input-group flex-row">
                <base-input
                    label="Occupancy Classified"
                    v-model="occupancy"
                    name="occupancy"
                    refs="occupancy_class"
                    type="text"
                    class="mt40 input-w2"
                />
                <base-input
                    label="Total Estimated Cost"
                    v-model="estimatedcost"
                    name="estimatedcost"
                    refs="estimated_cost"
                    type="text"
                    class="mt40 input-w2"
                />
            </div>
            <div class="meta-input-group flex-row">
                <base-input
                    label="Number of Units"
                    v-model="unitscount"
                    name="unitscount"
                    refs="units_count"
                    type="text"
                    class="mt40 input-w3"
                />
                <base-input
                    label="Total Floor Area in sqm."
                    v-model="floorarea"
                    name="floorarea"
                    refs="floor_area"
                    type="text"
                    class="mt40 input-w3"
                />
                <base-input
                    label="Lot Area in sqm."
                    v-model="lotarea"
                    name="lotarea"
                    refs="lot_area"
                    type="text"
                    class="mt40 input-w3"
                />
            </div>
             <base-input
                label="Proposed Date of Construction"
                v-model="dateofconstruction"
                name="dateofconstruction"
                refs="date_of_construction"
                type="date"
                class="mt40"
            />
        </div>

        <div class="meta-form-group button-left-right">
            <button-block class="back-button">BACK</button-block>
            <button-block class="next-button">NEXT</button-block>
        </div>
    </div>
</template>

<script>
import BaseInput from "@/components/forms/BaseInput"
import BaseCheckbox from "@/components/forms/BaseCheckbox"
import ButtonBlock from "@/components/ButtonBlock"
export default {
  name: "BuildingStepTwo",
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
            .input-w2 {
                width: calc(50% - 10px);
                float: left;
                margin-right: 10px;
            }
            .input-w3 {
                width: calc(33% - 10px);
                float: left;
                margin-right: 10px;
            }
            .input-w4 {
                width: calc(25% - 10px);
                float: left;
                margin-right: 10px;
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

div.meta-container div.meta-form-group div.meta-input-group .input-w3:last-child, 
div.meta-container div.meta-form-group div.meta-input-group .input-w3:last-child,
div.meta-container div.meta-form-group div.meta-input-group .input-w4:last-child {
    margin-right: 0;
}
</style>