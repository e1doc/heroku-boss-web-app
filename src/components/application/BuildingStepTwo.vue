<template>
  <div class="meta-container">
    <h1 class="meta-form-title">Building Details</h1>

    <!-- <div class="meta-form-group mb60">
      <div class="meta-group-title">
        Area No.
      </div>
      <base-input
        label="Enter the area number here"
        v-model="building_details.area_no"
        :validationMessages="
          buildingStepTwoErrors.building_details.area_no
        "
        name="areanumber"
        refs="area_number"
        type="text"
        class="mt40"
      />
    </div> -->

    <!-- <div class="meta-form-group mb60">
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
    </div> -->
    <base-input
        label="TCT No."
        v-model="building_details.tct_no"
        :validationMessages="buildingStepTwoErrors.building_details.tct_no"
        name="tctnumber"
        refs="tct_number"
        type="text"
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
    />
    <div class="meta-form-group mb60">
      <div class="meta-group-title">Location of Construction</div>
      <div class="meta-input-group flex-row w3">
        <base-input
          label="Address No."
          v-model="building_details.address_no"
          :validationMessages="buildingStepTwoErrors.building_details.address_no"
          name="addressnumber"
          refs="address_number"
          type="text"
          class="input-w3"
          inputClass="fw-mobile"
        />
         <base-input
          label="Lot No."
          v-model="building_details.lot_no"
          :validationMessages="buildingStepTwoErrors.building_details.lot_no"
          name="lotnumber"
          refs="lot_number"
          type="text"
          class="input-w3"
          inputClass="fw-mobile"
        />
        <base-input
          label="Lot No. count (default 1)"
          v-model="building_details.lot_no_count"
          :validationMessages="buildingStepTwoErrors.building_details.lot_no_count"
          name="lotnumbercount"
          refs="lot_number_count"
          type="text"
          class="input-w3"
          inputClass="fw-mobile"
        />
      </div>
      <div class="meta-input-group flex-row w3">
        <base-input
          label="Blk No."
          v-model="building_details.blk_no"
          :validationMessages="buildingStepTwoErrors.building_details.blk_no"
          name="blknumber"
          refs="blk_number"
          type="text"
          class="input-w3"
          inputClass="fw-mobile"
        />
        <base-input
          label="Phase No."
          v-model="building_details.phase_no"
          :validationMessages="buildingStepTwoErrors.building_details.phase_no"
          name="phasenumber"
          refs="phase_number"
          type="text"
          class="input-w3"
          inputClass="fw-mobile"
        />
        <base-input
          label="Subdivision"
          v-model="building_details.subdivision_name"
          :validationMessages="buildingStepTwoErrors.building_details.subdivision_name"
          name="nameofsubdivision"
          refs="subdivision_name"
          type="text"
          class="input-w3"
          inputClass="fw-mobile"
        />
      </div>
      <div class="meta-input-group flex-row w3">
        <base-input
          label="Street"
          v-model="building_details.street"
          :validationMessages="buildingStepTwoErrors.building_details.street"
          name="street"
          refs="street_name"
          type="text"
          class="input-w2"
          inputClass="fw-mobile"
        />
        <base-input
          label="District"
          v-model="building_details.district"
          :validationMessages="buildingStepTwoErrors.building_details.district"
          name="district"
          refs="district_name"
          type="text"
          class="input-w2 input-required"
          inputClass="fw-mobile"
        />
      </div>
      <div class="meta-form-group mb20">
        <div class="meta-group-title">Barangay <span class="asterisk">*</span></div>
        <base-select
          placeholder="------ Choose from the list of barangay ------"
          v-model="building_details.barangay"
          :validationMessages="buildingStepTwoErrors.building_details.barangay"
          name="nameofbarangay"
          refs="barangay_name"
          :options="barangayname"
          type="text"
          inputClass="fw-mobile"
        />
      </div>
      <base-input
        label="City / Province"
        v-model="building_details.city"
        :validationMessages="buildingStepTwoErrors.building_details.city"
        name="cityprovince"
        refs="city_province"
        type="text"
        class="disabled"
        inputClass="fw-mobile disabled-input"
        :disabled="true"
      />
    </div>
    <!-- PROPERTY TYPE -->
    <!-- <div class="meta-form-group mb60">
        <div class="meta-group-title">Property Type</div>
        <base-select
          placeholder="------ Choose type of property ------"
          :options="propertytype"
          v-model="building_details.property_type"
          :validationMessages="
            buildingStepTwoErrors.building_details.property_type
          "
          name="selectProperty"
          class="mb15"
        />
    </div> -->

    <!-- SCOPE OF WORK -->
    <div class="meta-form-group mb60">
      <div class="meta-group-title">Scope of Work <span class="asterisk">*</span></div>

      <base-select
        placeholder="------ Choose scope of work ------"
        :options="scopeofwork"
        v-model="building_details.scope_of_work"
        :validationMessages="
          buildingStepTwoErrors.building_details.scope_of_work
        "
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
      <div class="meta-group-title">User or Character of Occupancy <span class="asterisk">*</span></div>

      <base-select
        placeholder="------ Select from the options ------"
        :options="characterofoccupancy"
        v-model="building_details.character_of_occupancy"
        :validationMessages="
          buildingStepTwoErrors.building_details.character_of_occupancy
        "
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
      <!-- <div class="meta-input-group flex-row w2"> -->
        <!-- <base-input
          label="Occupancy Classified"
          v-model="building_other_details.occupancy_classified"
          :validationMessages="
            buildingStepTwoErrors.building_other_details.occupancy_classified
          "
          name="occupancy"
          refs="occupancy_class"
          type="text"
          class=" input-w2"
        /> -->
      <base-input
        label="Total Estimated Cost"
        v-model="building_other_details.total_estimated_cost"
        :validationMessages="
          buildingStepTwoErrors.building_other_details.total_estimated_cost
        "
        name="estimatedcost"
        refs="estimated_cost"
        class="input-required"
        type="number"
        
      />
      <!-- </div> -->
      <div class="meta-input-group flex-row w3">
        <base-input
          label="Number of Units"
          v-model="building_other_details.units"
          :validationMessages="
            buildingStepTwoErrors.building_other_details.units
          "
          name="unitscount"
          refs="units_count"
          type="number"
          class="input-w3"
          inputClass="fw-mobile"
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
          class="input-w3"
          inputClass="fw-mobile"
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
          class="input-w3"
          inputClass="fw-mobile"
        />
      </div>
      <div class="meta-form-group mb60">
        <div class="meta-group-title mt10 mb10">
          Proposed Date of Construction <span class="asterisk">*</span>
        </div>
        <base-date-picker
          v-model="building_other_details.date_of_construction"
          :validationMessages="
            buildingStepTwoErrors.building_other_details.date_of_construction
          "
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
        area_no: "",
        form_of_ownership: "",
        lot_no: "",
        blk_no: "",
        tct_no: "",
        tax_dec_no: "",
        street: "",
        barangay: "",
        city: "Bacoor City, Cavite",
        scope_of_work: "",
        scope_of_work_others: "",
        character_of_occupancy: "",
        character_of_occupancy_others: "",
      },
      building_other_details: {
        occupancy_classified: "",
        total_estimated_cost: "",
        units: "1",
        floor_area: "",
        lot_area: "",
        date_of_construction: "",
      },
      unrequired: {
        building_details: [
          "scope_of_work_others",
          "character_of_occupancy_others",
          "tct_no",
          "tax_dec_no",
          "address_no",
          "lot_no",
          "lot_no_count",
          "blk_no",
          "phase_no",
          "subdivision_name",
          "street"
        ],
        building_other_details: [
          "units",
          "floor_area",
          "lot_area"
        ],
      },
      propertytype: [
        {
          label: "Land",
          value: "Land",
        },
        {
          label: "Building",
          value: "Building",
        },
        {
          label: "Machinery",
          value: "Machinery",
        },
      ],
      barangayname: [
        {
          label: "Alima",
          value: "Alima"
        },
        {
          label: "Aniban I",
          value: "Aniban I"
        },
        {
          label: "Aniban II",
          value: "Aniban II"
        },
        {
          label: "Aniban III",
          value: "Aniban III"
        },
        {
          label: "Aniban IV",
          value: "Aniban IV"
        },
        {
          label: "Aniban V",
          value: "Aniban V"
        },
        {
          label: "Banalo",
          value: "Banalo"
        },
        {
          label: "Bayanan",
          value: "Bayanan"
        },
        {
          label: "Camposanto",
          value: "Camposanto"
        },
        {
          label: "Daang-Bukid",
          value: "Daang-Bukid"
        },
        {
          label: "Digman",
          value: "Digman"
        },
        {
          label: "Dulong-Bayan",
          value: "Dulong-Bayan"
        },
        {
          label: "Habay I",
          value: "Habay I"
        },
        {
          label: "Habay II",
          value: "Habay II"
        },
        {
          label: "Kaingin",
          value: "Kaingin"
        },
        {
          label: "Ligas I",
          value: "Ligas I"
        },
        {
          label: "Ligas II",
          value: "Ligas II"
        },
        {
          label: "Ligas III",
          value: "Ligas III"
        },
        {
          label: "Mabolo I",
          value: "Mabolo I"
        },
        {
          label: "Mabolo II",
          value: "Mabolo II"
        },
        {
          label: "Mabolo III",
          value: "Mabolo III"
        },
        {
          label: "Maliksi I",
          value: "Maliksi I"
        },
        {
          label: "Maliksi II",
          value: "Maliksi II"
        },
        {
          label: "Maliksi III",
          value: "Maliksi III"
        },
        {
          label: "Mambog I",
          value: "Mambog I"
        },
        {
          label: "Mambog II",
          value: "Mambog II"
        },
        {
          label: "Mambog III",
          value: "Mambog III"
        },
        {
          label: "Mambog IV",
          value: "Mambog IV"
        },
        {
          label: "Mambog V",
          value: "Mambog V"
        },
        {
          label: "Molino I/Burol",
          value: "Molino I/Burol"
        },
        {
          label: "Molino II",
          value: "Molino II"
        },
        {
          label: "Molino III",
          value: "Molino III"
        },
        {
          label: "Molino IV",
          value: "Molino IV"
        },
        {
          label: "Molino V/Bahayang Pag-Asa",
          value: "Molino V/Bahayang Pag-Asa"
        },
        {
          label: "Molino VI",
          value: "Molino VI"
        },
        {
          label: "Molino VII/Gawaran",
          value: "Molino VII/Gawaran"
        },
        {
          label: "Niog I",
          value: "Niog I"
        },
        {
          label: "Niog II",
          value: "Niog II"
        },
        {
          label: "Niog III",
          value: "Niog III"
        },
        {
          label: "P.F. Espiritu II (Panapaan II)",
          value: "P.F. Espiritu II (Panapaan II)"
        },
        {
          label: "P.F. Espiritu III (Panapaan III)",
          value: "P.F. Espiritu III (Panapaan III)"
        },
        {
          label: "P.F. Espiritu IV (Panapaan IV)",
          value: "P.F. Espiritu IV (Panapaan IV)"
        },
        {
          label: "P.F. Espiritu V (Panapaan V)",
          value: "P.F. Espiritu V (Panapaan V)"
        },
        {
          label: "P.F. Espiritu VI (Panapaan VI)",
          value: "P.F. Espiritu VI (Panapaan VI)"
        },
        {
          label: "P.F. Espiritu VII (Panapaan VII)",
          value: "P.F. Espiritu VII (Panapaan VII)"
        },
        {
          label: "P.F. Espiritu VIII (Panapaan VIII)",
          value: "P.F. Espiritu VIII (Panapaan VIII)"
        },
        {
          label: "P.F. Espirtu I (Panapaan I)",
          value: "P.F. Espirtu I (Panapaan I)"
        },
        {
          label: "Queens Row Central",
          value: "Queens Row Central"
        },
        {
          label: "Queens Row East",
          value: "Queens Row East"
        },
        {
          label: "Queens Row West",
          value: "Queens Row West"
        },
        {
          label: "Real I",
          value: "Real I"
        },
        {
          label: "Real II",
          value: "Real II"
        },
        {
          label: "Salinas I",
          value: "Salinas I"
        },
        {
          label: "Salinas II",
          value: "Salinas II"
        },
        {
          label: "Salinas III",
          value: "Salinas III"
        },
        {
          label: "Salinas IV",
          value: "Salinas IV"
        },
        {
          label: "San Nicolas I",
          value: "San Nicolas I"
        },
        {
          label: "San Nicolas II",
          value: "San Nicolas II"
        },
        {
          label: "San Nicolas III",
          value: "San Nicolas III"
        },
        {
          label: "Sineguelasan",
          value: "Sineguelasan"
        },
        {
          label: "Tabing-Dagat (Town Proper)",
          value: "Tabing-Dagat (Town Proper)"
        },
        {
          label: "Talaba I",
          value: "Talaba I"
        },
        {
          label: "Talaba II",
          value: "Talaba II"
        },
        {
          label: "Talaba III",
          value: "Talaba III"
        },
        {
          label: "Talaba IV",
          value: "Talaba IV"
        },
        {
          label: "Talaba V",
          value: "Talaba V"
        },
        {
          label: "Talaba VI",
          value: "Talaba VI"
        },
        {
          label: "Talaba VII",
          value: "Talaba VII"
        },
        {
          label: "Zapote I",
          value: "Zapote I"
        },
        {
          label: "Zapote II",
          value: "Zapote II"
        },
        {
          label: "Zapote III",
          value: "Zapote III"
        },
        {
          label: "Zapote IV",
          value: "Zapote IV"
        },
        {
          label: "Zapote V (Longos-Zapote V)",
          value: "Zapote V (Longos-Zapote V)"
        },
      ],
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
      "buildingApplication",
      "buildingDetails",
      "buildingOtherDetails",
      "buildingDetailsHasError",
      "buildingOtherDetailsHasError",
      "buildingStepTwoErrors",
      "draftProperty",
      "buildingApplicationRequirements",
    ]),
  },
  mounted() {
    this.preFillForm();
    this.$store.commit("setLoading",false)
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
      this.$store.commit("setLoading", true);
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
        let payload = { application_id: this.buildingApplication.id };
        if (this.buildingApplicationRequirements) {
          if (!this.buildingApplicationRequirements.id) {
            this.$store.dispatch("addBuildingApplicationRequirements", payload);
          }
        }
        if (!this.draftProperty) {
          this.validateRequiredFields();
          this.$store.commit("setLoading", false);
        } else {
          this.$swal({
            title: "Success!",
            text: "data successfully saved as draft.",
            icon: "success",
          }).then((value) => {
            this.toProfile();
          });
        }
      } else {
        if (this.draftProperty) {
          this.$swal({
            title: "Failed!",
            text: "Please fix the validation errors before saving as draft.",
            icon: "error",
          });
          this.$store.commit("setDraftProperty", false);
        } else {
          this.$swal({
            title: "Failed!",
            text:
              "Please fix the validation errors before proceeding to the next step.",
            icon: "error",
          });
        }
      }
      this.$store.commit("setLoading", false);
    },
    toProfile() {
      this.$router.push({ name: "Profile" });
      this.$store.commit("setDraftProperty", false);
    },
    preFillForm() {
      if (Object.entries(this.buildingDetails).length > 0) {
        this.building_details = this.buildingDetails;
      }
      if (Object.entries(this.buildingOtherDetails).length > 0) {
        this.building_other_details = this.buildingOtherDetails;
      }
    },
    validateRequiredFields() {
      let building_details_errors = { key: "building_details", value: {} };
      let building_other_details_errors = {
        key: "building_other_details",
        value: {},
      };
      let isBuildingDetailsClean = true;
      let isBuildingOtherDetailsClean = true;

      for (let key in this.building_details) {
        if (!this.unrequired.building_details.includes(key)) {
          if (this.building_details[key] === "") {
            console.log(key)
            building_details_errors.value[`${key}`] = [];
            building_details_errors.value[`${key}`].push(
              "This field may not be blank."
            );
          }
        }
      }

      for (let key in this.building_other_details) {
        if (!this.unrequired.building_other_details.includes(key)) {
          if (this.building_other_details[key] === "") {
            building_other_details_errors.value[`${key}`] = [];
            building_other_details_errors.value[`${key}`].push(
              "This field may not be blank."
            );
          }
        }
      }

      if (Object.entries(building_details_errors.value).length > 0) {
        this.$store.commit("buildingSetStepTwoErrors", building_details_errors);
        isBuildingDetailsClean = false;
        console.log(building_details_errors)
      } else {
        this.$store.commit("buildingSetStepTwoErrors", {
          key: "building_details",
          value: {},
        });
      }

      if (Object.entries(building_other_details_errors.value).length > 0) {
        this.$store.commit(
          "buildingSetStepTwoErrors",
          building_other_details_errors
        );
        isBuildingOtherDetailsClean = false;
        console.log(building_other_details_errors)
      } else {
        this.$store.commit("buildingSetStepTwoErrors", {
          key: "building_other_details",
          value: {},
        });
      }

      if (isBuildingDetailsClean && isBuildingOtherDetailsClean) {
        this.$store.commit("setCurrentApplicationStep", "3");
      } else {
        console.log(building_other_details_errors)
        this.$swal({
          title: "Failed!",
          text:
            "Please fix the validation errors before proceeding to the next step.",
          icon: "error",
        });
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
      font-size: 16px;
      line-height: 19px;
      width: 100%;
      margin-bottom: 20px;
      margin-top: 30px;
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

.disabled{
  pointer-events: none;
}

/*
MOBILE RESPONSIVENESS 
--------------------------------------------------------------*/

@media only screen and (max-width: 1380px) {
  div.meta-container h1.meta-form-title {
    font-size: 22px;
  }
}

@media only screen and (max-width: 768px) {
  div.meta-container h1.meta-form-title {
    font-size: 20px;
  }

  .input-phone {
    margin-bottom: 8px;
  }

  div.meta-container div.meta-form-group div.meta-group-title {
    font-size: 15px;
    margin-bottom: 10px;
  }
  
  div.meta-container div.meta-form-group div.meta-input-group .input-w3 {
    width: 100%;
    float: left;
    margin-right: 0;
    flex-direction: unset;
  }

  div.meta-container div.meta-form-group div.meta-input-group.flex-row.w2,
  div.meta-container div.meta-form-group div.meta-input-group.flex-row.w3,
  div.meta-container div.meta-form-group div.meta-input-group.flex-row.w4 {
    width: 100%;
    flex-direction: unset;
    flex-wrap: wrap;
    margin-right: 0;
  }

  div.meta-container div.meta-form-group div.meta-input-group .input-w4,
  div.meta-container div.meta-form-group div.meta-input-group .input-w2 {
    width: 100%;
    margin-right: 0;
  }

  div.meta-container
    div.meta-form-group
    div.meta-input-group
    .input-w4:nth-child(even) {
    margin-right: 0;
  }
}

@media only screen and (max-width: 650px) {
  div.meta-container {
    padding: 40px 30px;
  }

  div.meta-container h1.meta-form-title {
    font-size: 18px;
    margin-bottom: 30px;
  }
}

@media only screen and (max-width: 480px) {
  div.meta-container {
    padding: 30px 15px;
  }

  div.meta-container div.meta-form-group.mb60 {
    margin-bottom: 20px;
  }

  div.meta-container h1.meta-form-title {
    font-size: 16px;
  }

  div.meta-container div.meta-form-group div.meta-group-title {
    font-size: 14px;
    margin-bottom: 15px;
  }

  div.meta-container div.button-left-right .back-button {
    background-color: #048cff;
    border-color: #73befc;
    width: auto;
    background: transparent;
    border: none;
    box-shadow: none;
    color: #2699fb;
    min-width: unset;
  }

  div.meta-container div.button-left-right .next-button {
    width: auto;
    background: transparent;
    border: none;
    box-shadow: none;
    min-width: unset;
    color: #2699fb;
  }
}
</style>
