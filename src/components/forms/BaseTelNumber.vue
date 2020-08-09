<template>
  <VuePhoneNumberInput
    v-model="inputData"
    :only-countries="['PH']"
    default-country-code="PH"
    size="lg"
    :border-radius="10"
    @update="$emit('input', (inputData = getValue($event)))"
    placeholder="placeholder"
    :no-example="true"
  />
</template>

<script>
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
export default {
  name: "BaseTelNumber",
  components: {
    VuePhoneNumberInput,
  },
  props:{
    placeholder:{
        type: String,
        required: false,
        default:'Phone number'
    }
  },
  data(){
      return{
          inputData: "",
      }
  },
  methods: {
    getValue(event) {
      return event.formattedNumber
    },
  },
};
</script>

<style></style>
