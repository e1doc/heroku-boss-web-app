<template>
  <div class="input-holder">
    <div class="input-wrapper" :id="name" :class="inputClass">
      <input
        @focus="handleFocus"
        @blur="handleBlur"
        v-model="inputData"
        :placeholder="placeholder"
        :type="type === 'password' ? passType : type"
        :value="value"
        @input="$emit('input', (inputData = $event.target.value))"
        :disabled="disabled"
      />
      <label class="label" :id="refs">{{ label }}</label>
    </div>
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
export default {
  name: "BaseInput",
  data() {
    return {
      wrapper: "",
      inputData: "",
      passType: "password",
      preFillDone: false,
    };
  },
  props: {
    validationMessages: {
      type: Array,
      required: false,
      default: function() {
        return [];
      },
    },
    type: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    refs: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: false,
    },
    inputValue: {
      type: String,
      required: false,
    },
    inputClass: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    isAmount: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.getWrapper();
    if (this.value) {
      this.inputData = this.value;
      this.handleFocus();
      this.handleBlur();
    }
    if (this.type === "number" && this.inputData === "") {
      this.handleFocus();
      this.handleBlur();
    }
  },
  watch: {
    value: {
      deep: true,
      handler(newValue) {
        if (!this.preFillDone) {
          this.$emit("input", (this.inputData = newValue));
          this.preFillDone = true;
          this.handleFocus();
          this.handleBlur();
        } else {
          this.$emit("input", (this.inputData = newValue));
        }
      },
    },
  },
  methods: {
    getWrapper() {
      this.wrapper = document.querySelector(`#${this.name}`);
    },
    handleFocus() {
      this.wrapper.classList.remove("input-wrapper-blur");
      this.wrapper.classList.add("input-wrapper-focus");
      document.querySelector(`#${this.refs}`).classList.add("label-focus");
      if (this.isAmount && this.inputData == "") {
        this.inputData = "0.00";
      }
    },
    handleBlur() {
      if (this.inputData === "") {
        this.wrapper.classList.remove("input-wrapper-focus");
        this.wrapper.classList.add("input-wrapper-focus-danger");
        document.querySelector(`#${this.refs}`).classList.remove("label-focus");
      } else {
        this.wrapper.classList.remove("input-wrapper-focus-danger");
        this.wrapper.classList.add("input-wrapper-blur");
      }
      if (this.isAmount && this.inputData !== "") {
        this.inputData = this.formatCurrency(this.inputData);
      }
    },
    validateMin(val) {
      if (this.type === "number" && this.inputData === "") {
        this.$emit("input", (this.inputData = 0));
      } else {
        if (val[0] === "0") {
          val = val.substring(1);
        }
        this.$emit("input", (this.inputData = val));
      }
    },
    formatCurrency(str) {
      var parts = str.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      if (parts.length < 2) {
        parts.push("00");
      }
      return parts.join(".");
    },
  },
};
</script>

<style scoped lang="scss">
.input-holder {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 15px;
  .meta-error-text {
    margin-top: 10px;
    font-size: 12px;
    color: #e8726f;
    font-weight: bold;
  }
}
.input-wrapper {
  font-size: 15px;
  font-family: "Raleway", sans-serif;
  background: #ffffff;
  border: 1px solid #bdc3c7;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  padding: 15px;
  position: relative;
  transition: 0.1s;
  // overflow: hidden;
  .label {
    color: #bababa;
    background: white;
    position: absolute;
    top: 16px;
    left: 15px;
    padding: 0px 5px;
    z-index: 0;
    transition: all 0.25s ease-in-out;
  }
  input {
    border: none;
    background: transparent;
    outline: none;
    font-size: 16px;
    width: 100%;
    height: 100%;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    transition: 0.1s;
    z-index: 1;
    cursor: text;
  }
}

input::placeholder {
  color: transparent;
}
input:focus::placeholder {
  color: #bababa;
}

.label-focus {
  font-size: 11px !important;
  line-height: 0.3;
  top: -2px !important;
  left: 5 !important;
  color: #2699fb !important;
}

.input-wrapper-focus {
  background-color: #f1f9ff;
  border-color: #bce0fd;
  font-size: 12px !important;
}

.disabled-input input {
  color: #bababa;
  font-size: 15px;
  font-weight: 400;
}

/*
MOBILE RESPONSIVENESS 
--------------------------------------------------------------*/

@media only screen and (max-width: 1400px) {
  .input-wrapper {
    padding: 12px 18px;
    .label {
      font-size: 14px;
      top: 13px;
    }
  }
}

@media only screen and (max-width: 768px) {
  .input-holder {
    margin-bottom: 8px;
  }

  .input-wrapper.fw-mobile {
    width: 100%;
  }
}

@media only screen and (max-width: 480px) {
  .input-wrapper .label {
    font-size: 12px;
    padding: 0;
  }
}
</style>
