<template>
  <div class="meta-container">
    <h1 class="meta-form-title">Building Details</h1>

    <div class="meta-form-group mb60">
        <div class="meta-group-title">For Construction Owned by an Enterprise</div>
        <base-input
            label="Form of Ownership"
            v-model="formofownership"
            name="formofownership"
            refs="form_of_ownership"
            type="text"
            class="mt40" />
    </div>

    <div class="meta-form-group mb60">
      <div class="meta-group-title">Location of Construction</div>
      <div class="meta-input-group flex-row">
        <base-input
          label="Lot No."
          v-model="lotnumber"
          name="lotnumber"
          refs="lot_number"
          type="text"
          class="input-w4"
        />
        <base-input
          label="Blk No."
          v-model="blknumber"
          name="blknumber"
          refs="blk_number"
          type="text"
          class="input-w4"
        />
        <base-input
          label="TCT No."
          v-model="tctnumber"
          name="tctnumber"
          refs="tct_number"
          type="text"
          class="input-w4"
        />
        <base-input
          label="Tax Dec. No."
          v-model="taxdecnumber"
          name="taxdecnumber"
          refs="tax_dec_number"
          type="text"
          class="input-w4"
        />
      </div>
      <div class="meta-input-group flex-row">
        <base-input
          label="Street"
          v-model="street"
          name="street"
          refs="street_name"
          type="text"
          class="input-w3"
        />
        <base-input
          label="Barangay"
          v-model="barangay"
          name="barangay"
          refs="barangay_name"
          type="text"
          class="input-w3"
        />
        <base-input
          label="City / Province"
          v-model="cityprovince"
          name="cityprovince"
          refs="city_province"
          type="text"
          class="input-w3"
        />
      </div>
    </div>
    <!-- SCOPE OF WORK -->
    <div class="meta-form-group mb60">
        <div class="meta-group-title">Scope of Work</div>
        <base-select placeholder = "------ Choose scope of work ------" :options="scopeofwork" name="selectFields" class="mb15" />
        <base-input
          label="Others (Specify)"
          v-model="otherscope"
          name="otherscope"
          refs="other_scope"
          type="text"
          class=""
        />
    </div>

    <!-- USER OF CHARACTER OF OCCUPANCY -->
    <div class="meta-form-group mb60">
        <div class="meta-group-title">User or Character of Occupancy</div>
        <base-select placeholder = "------ Select from the options ------" :options="characterofoccupancy" name="selectOptions" class="mb15" /> 
        <base-input
          label="Others (Specify)"
          v-model="otheroccupancy"
          name="otheroccupancy"
          refs="other_occupancy"
          type="text"
          class=""
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
          class=" input-w2"
        />
        <base-input
          label="Total Estimated Cost"
          v-model="estimatedcost"
          name="estimatedcost"
          refs="estimated_cost"
          type="text"
          class=" input-w2"
        />
      </div>
      <div class="meta-input-group flex-row">
        <base-input
          label="Number of Units"
          v-model="unitscount"
          name="unitscount"
          refs="units_count"
          type="text"
          class="input-w3 "
        />
        <base-input
          label="Total Floor Area in sqm."
          v-model="floorarea"
          name="floorarea"
          refs="floor_area"
          type="text"
          class="input-w3 "
        />
        <base-input
          label="Lot Area in sqm."
          v-model="lotarea"
          name="lotarea"
          refs="lot_area"
          type="text"
          class="input-w3 "
        />
      </div>
      <div class="meta-form-group mb60">
          <div class="meta-group-title mt10 mb10">Proposed Date of Construction</div>
          <base-date-picker 
            v-model="dateofconstruction" 
            class="mb15"/>
      </div>
        
    </div>

    <div class="meta-form-group button-left-right">
      <button-block class="back-button">BACK</button-block>
      <button-block class="next-button">NEXT</button-block>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/forms/BaseInput";
import BaseCheckbox from "@/components/forms/BaseCheckbox";
import ButtonBlock from "@/components/ButtonBlock";
import BaseSelect from "@/components/forms/BaseSelect";
import BaseDatePicker from "@/components/forms/BaseDatePicker"
export default {
  name: "BuildingStepTwo",
  components: {
    BaseInput,
    BaseCheckbox,
    ButtonBlock,
    BaseSelect,
    BaseDatePicker
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
      dateofconstruction: "",
      formofownership: "",
      scopeofwork: [
        {
          label: "New Construction",
          value: "new_construction",
        },
        {
          label: "Addition",
          value: "addition",
        },
        {
          label: "Accessory Building Structure",
          value: "accessory_building_structure",
        },
        {
          label: "Alteration",
          value: "alteration",
        },
        {
          label: "Conversion",
          value: "conversion",
        },
        {
          label: "Erection",
          value: "erection",
        },
        {
          label: "Moving",
          value: "moving",
        },
        {
          label: "Raising",
          value: "raising",
        },
        {
          label: "Renovation",
          value: "renovation",
        },
        {
          label: "Repair",
          value: "repair",
        },
        {
          label: "Others, Specify on the field below",
          value: "others",
        },
      ],
      characterofoccupancy: [
        {
          label: "GROUP A : Residential Dwellings",
          value: "groupa",
        },
        {
          label: "GROUP B : Residential Hotel, Apartment",
          value: "groupb",
        },
        {
          label: "GROUP C : Educational Recreational",
          value: "groupc",
        },
        {
          label: "GROUP D : Institutional",
          value: "groupd",
        },
        {
          label: "GROUP E : Business and Mercantile",
          value: "groupe",
        },
        {
          label: "GROUP F : Industrial",
          value: "groupf",
        },
        {
          label: "GROUP G : Industrial Storage and Hazardous",
          value: "groupg",
        },
        {
          label: "GROUP H : Recreational, Assembly Occupant Load less 1000",
          value: "grouph",
        },
        {
          label: "GROUP I : Recreational, Assembly Occupant Load 1000 or more",
          value: "groupi",
        },
        {
          label: "GROUP J : Agricultural Accessory",
          value: "groupj",
        },
        {
          label: "Others, Specify on the field below",
          value: "others",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
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
      font-size: 15px;
      line-height: 19px;
      width: 100%;
      margin-bottom: 20px;
    }   
    div.meta-input-label{
        color: #2699FB;
        font-size: 13px;
        line-height: 19px;
        width: 100%;
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

.back-button:hover{
    background-color: #2699FB!important;
    color: #fff!important;
    border-color: #2699FB!important;
}
</style>