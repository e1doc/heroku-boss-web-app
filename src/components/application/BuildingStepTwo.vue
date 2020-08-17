<template>
  <div class="meta-container">
    <h1 class="meta-form-title">Building Details</h1>

    <div class="meta-form-group mb60">
      <div class="meta-group-title">
        For Construction Owned by an Enterprise
      </div>
      <base-input
        label="Form of Ownership"
        v-model="building_details.form_of_ownership"
        :validationMessages="
          buildingStepTwoErrors.building_details.form_of_ownership
        "
        name="formofownership"
        refs="form_of_ownership"
        type="text"
        class="mt40"
      />
    </div>

    <div class="meta-form-group mb60">
      <div class="meta-group-title">Location of Construction</div>
      <div class="meta-input-group flex-row">
        <base-input
          label="Lot No."
          v-model="building_details.lot_no"
          :validationMessages="buildingStepTwoErrors.building_details.lot_no"
          name="lotnumber"
          refs="lot_number"
          type="text"
          class="input-w4"
        />
        <base-input
          label="Blk No."
          v-model="building_details.blk_no"
          :validationMessages="buildingStepTwoErrors.building_details.blk_no"
          name="blknumber"
          refs="blk_number"
          type="text"
          class="input-w4"
        />
        <base-input
          label="TCT No."
          v-model="building_details.tct_no"
          :validationMessages="buildingStepTwoErrors.building_details.tct_no"
          name="tctnumber"
          refs="tct_number"
          type="text"
          class="input-w4"
        />
        <base-input
          label="Tax Dec. No."
          v-model="building_details.tax_dec_no"
          :validationMessages="
            buildingStepTwoErrors.building_details.tax_dec_no
          "
          name="taxdecnumber"
          refs="tax_dec_number"
          type="text"
          class="input-w4"
        />
      </div>
      <div class="meta-input-group flex-row">
        <base-input
          label="Street"
          v-model="building_details.street"
          :validationMessages="buildingStepTwoErrors.building_details.street"
          name="street"
          refs="street_name"
          type="text"
          class="input-w3"
        />
        <base-input
          label="Barangay"
          v-model="building_details.barangay"
          :validationMessages="buildingStepTwoErrors.building_details.barangay"
          name="barangay"
          refs="barangay_name"
          type="text"
          class="input-w3"
        />
        <base-input
          label="City / Province"
          v-model="building_details.city"
          :validationMessages="buildingStepTwoErrors.building_details.city"
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

      <base-select
        placeholder="------ Choose scope of work ------"
        :options="scopeofwork"
        v-model="building_details.scope_of_work"
        name="selectFields"
        class="mb15"
      />

      <base-input
        label="Others (Specify)"
        v-model="building_details.scope_of_work_others"
        :validationMessages="
          buildingStepTwoErrors.building_details.scope_of_work_others
        "
        name="otherscope"
        refs="other_scope"
        type="text"
        class=""
      />
    </div>

    <!-- USER OF CHARACTER OF OCCUPANCY -->
    <div class="meta-form-group mb60">
      <div class="meta-group-title">User or Character of Occupancy</div>

      <base-select
        placeholder="------ Select from the options ------"
        :options="characterofoccupancy"
        v-model="building_details.character_of_occupancy"
        name="selectOptions"
        class="mb15"
      />

      <base-input
        label="Others (Specify)"
        v-model="building_details.character_of_occupancy_others"
        :validationMessages="
          buildingStepTwoErrors.building_details.character_of_occupancy_others
        "
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
          v-model="building_other_details.occupancy_classified"
          :validationMessages="
            buildingStepTwoErrors.building_other_details.occupancy_classified
          "
          name="occupancy"
          refs="occupancy_class"
          type="text"
          class=" input-w2"
        />
        <base-input
          label="Total Estimated Cost"
          v-model="building_other_details.total_estimated_cost"
          :validationMessages="
            buildingStepTwoErrors.building_other_details.total_estimated_cost
          "
          name="estimatedcost"
          refs="estimated_cost"
          type="number"
          class=" input-w2"
        />
      </div>
      <div class="meta-input-group flex-row">
        <base-input
          label="Number of Units"
          v-model="building_other_details.units"
          :validationMessages="
            buildingStepTwoErrors.building_other_details.units
          "
          name="unitscount"
          refs="units_count"
          type="number"
          class="input-w3 "
        />
        <base-input
          label="Total Floor Area in sqm."
          v-model="building_other_details.floor_area"
          :validationMessages="
            buildingStepTwoErrors.building_other_details.floor_area
          "
          name="floorarea"
          refs="floor_area"
          type="number"
          class="input-w3 "
        />
        <base-input
          label="Lot Area in sqm."
          v-model="building_other_details.lot_area"
          :validationMessages="
            buildingStepTwoErrors.building_other_details.lot_area
          "
          name="lotarea"
          refs="lot_area"
          type="number"
          class="input-w3 "
        />
      </div>
      <div class="meta-form-group mb60">
        <div class="meta-group-title mt10 mb10">
          Proposed Date of Construction
        </div>
        <base-date-picker
          v-model="building_other_details.date_of_construction"
          class="mb15"
        />
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
import BaseSelect from "@/components/forms/BaseSelect";
import BaseDatePicker from "@/components/forms/BaseDatePicker";
import { mapGetters } from "vuex";
export default {
  name: "BuildingStepTwo",
  components: {
    BaseInput,
    BaseCheckbox,
    ButtonBlock,
    BaseSelect,
    BaseDatePicker,
  },
  data() {
    return {
      building_details: {
        form_of_ownership: "",
        lot_no: "",
        blk_no: "",
        tct_no: "",
        tax_dec_no: "",
        street: "",
        barangay: "",
        city: "",
        scope_of_work: "",
        scope_of_work_others: "",
        character_of_occupancy: "",
        character_of_occupancy_others: "",
      },
      building_other_details: {
        occupancy_classified: "",
        total_estimated_cost: "",
        units: "",
        floor_area: "",
        lot_area: "",
        date_of_construction: "",
      },
      scopeofwork: [
        {
          label: "New Construction",
          value: "New Construction",
        },
        {
          label: "Addition",
          value: "Addition",
        },
        {
          label: "Accessory Building Structure",
          value: "Accessory Building Structure",
        },
        {
          label: "Alteration",
          value: "Alteration",
        },
        {
          label: "Conversion",
          value: "Conversion",
        },
        {
          label: "Erection",
          value: "Erection",
        },
        {
          label: "Moving",
          value: "Moving",
        },
        {
          label: "Raising",
          value: "Raising",
        },
        {
          label: "Renovation",
          value: "Renovation",
        },
        {
          label: "Repair",
          value: "Repair",
        },
        {
          label: "Others, Specify on the field below",
          value: "others",
        },
      ],
      characterofoccupancy: [
        {
          label: "GROUP A : Residential Dwellings",
          value: "GROUP A : Residential Dwellings",
        },
        {
          label: "GROUP B : Residential Hotel, Apartment",
          value: "GROUP B : Residential Hotel, Apartment",
        },
        {
          label: "GROUP C : Educational Recreational",
          value: "GROUP C : Educational Recreational",
        },
        {
          label: "GROUP D : Institutional",
          value: "GROUP D : Institutional",
        },
        {
          label: "GROUP E : Business and Mercantile",
          value: "GROUP E : Business and Mercantile",
        },
        {
          label: "GROUP F : Industrial",
          value: "GROUP F : Industrial",
        },
        {
          label: "GROUP G : Industrial Storage and Hazardous",
          value: "GROUP G : Industrial Storage and Hazardous",
        },
        {
          label: "GROUP H : Recreational, Assembly Occupant Load less 1000",
          value: "GROUP H : Recreational, Assembly Occupant Load less 1000",
        },
        {
          label: "GROUP I : Recreational, Assembly Occupant Load 1000 or more",
          value: "GROUP I : Recreational, Assembly Occupant Load 1000 or more",
        },
        {
          label: "GROUP J : Agricultural Accessory",
          value: "GROUP J : Agricultural Accessory",
        },
        {
          label: "Others, Specify on the field below",
          value: "others",
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      "buildingDetails",
      "buildingOtherDetails",
      "buildingDetailsHasError",
      "buildingOtherDetailsHasError",
      "buildingStepTwoErrors",
      "draftProperty"
    ]),
  },
  mounted() {
    this.preFillForm();
  },
  watch: {
    draftProperty: {
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
      console.log("clicked");
      this.$store.commit("setCurrentApplicationStep", "1");
    },
    async nextStep() {
      if (this.buildingDetails.id) {
        await this.$store.dispatch(
          "updateBuildingDetails",
          this.building_details
        );
      } else {
        await this.$store.dispatch("addBuildingDetails", this.building_details);
      }
      if (this.buildingOtherDetails.id) {
        await this.$store.dispatch(
          "updateBuildingOtherDetails",
          this.building_other_details
        );
      } else {
        await this.$store.dispatch(
          "addBuildingOtherDetails",
          this.building_other_details
        );
      }

      if (!this.buildingDetailsHasError && !this.buildingOtherDetailsHasError) {
        if(!this.draftProperty){
          this.$store.commit("setCurrentApplicationStep", "3");
        }
      }
    },
    preFillForm() {
      if (Object.entries(this.buildingDetails).length > 0) {
        this.building_details = this.buildingDetails;
      }
      if (Object.entries(this.buildingOtherDetails).length > 0) {
        this.building_other_details = this.buildingOtherDetails;
      }
    },
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
    div.meta-input-label {
      color: #2699fb;
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

.back-button:hover {
  background-color: #2699fb !important;
  color: #fff !important;
  border-color: #2699fb !important;
}

@media only screen and (max-width: 1380px) {
  div.meta-container h1.meta-form-title {
    font-size: 22px;
  }
}
</style>
