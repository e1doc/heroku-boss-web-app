<template>
  <div>
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
    <div v-if="validationMessages.length > 0">
      <div
        class="meta-error-text"
        v-for="(message, index) in validationMessages"
        :key="index"
      >
        * {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
export default {
  name: "BaseTelNumber",
  components: {
    VuePhoneNumberInput,
  },
  props: {
    placeholder: {
      type: String,
      required: false,
      default: "Phone number",
    },
    validationMessages: {
      type: Array,
      required: false,
      default: function() {
        return [];
      },
    },
   value: {
      required: false,
    },
  },
    watch: {
    value:{
      deep: true,
      handler(newValue) {
        if(!this.preFillDone){
          this.$emit('input', (this.inputData = newValue))
          this.preFillDone = true
        }
      },
    }
  },
  data() {
    return {
      inputData: "",
      preFillDone: false
    };
  },
  methods: {
    getValue(event) {
      return event.formattedNumber;
    },
  },
};
</script>

<style lang="scss" scoped>
.meta-error-text {
  margin-top: 10px;
  font-size: 12px;
  color: #e8726f;
  font-weight: bold;
}
/deep/ .input-tel__input {
  font-family: "Raleway", sans-serif;
  font-size: 15px;
  min-height: 52px;
  padding: 16px 18px;
  border: 1px solid #cccccc;
  border-radius: 10px;
}

/deep/ .input-tel.lg .input-tel__label {
  font-size: 10px;
}

/deep/ .input-tel__input:focus {
  background-color: #f1f9ff;
  border-color: #bce0fd !important;
}

/deep/ .vue-phone-number-input.lg .select-country-container {
  width: 100px;
  min-width: 100px;
  max-width: 100px;
}

/deep/ .country-selector__toggle,
/deep/ .country-selector.lg .country-selector__label {
  display: none;
}

/deep/ .country-selector.lg.has-value .country-selector__input {
  padding-top: 0;
  pointer-events: none;
}

/deep/ .country-selector.lg .country-selector__country-flag {
  top: 20px;
}


@media only screen and ( max-width : 1400px ){
  /deep/ .input-tel.lg .input-tel__input {
      font-size: 14px;
      height: 44px;
      min-height: 40px;
  }

  /deep/ .input-tel.lg,
  /deep/ .country-selector.lg {
      height: 44px;
      min-height: 44px;
  }

  /deep/ .country-selector.lg .country-selector__input {
      height: 44px;
      min-height: 44px;
  }
}

@media only screen and ( max-width : 480px ){
  /deep/ .country-selector.has-value .country-selector__input{
      padding-left: 38px;
      padding-right: 0;
  }

  /deep/ .input-tel.lg .input-tel__input{
      font-size: 12px;
  }

  /deep/ .vue-phone-number-input.lg .select-country-container {
      width: 50px;
      min-width: 50px;
      max-width: 77px;
  }
}
</style>
