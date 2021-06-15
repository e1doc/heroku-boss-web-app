<template>
  <div class="input-holder" :class="customclass">
    <div :id="name" class="select-wrapper">
      <select
        :data-value="mutableSelected"
        :disabled="disabled"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="$emit('change', $event.target.value)"
        @input="$emit('input', $event.target.value)"
      >
        <option value="">{{ placeholder }}</option>
        <option
          v-for="(option, key) in options"
          :key="key"
          :value="option.value"
          v-bind="{ selected: option.value === mutableSelected }"
        >
          {{ option.label }}
        </option>
      </select>
      <font-awesome-icon icon="chevron-down" class="dropdown-icon" />
      <font-awesome-icon icon="filter" class="filter-icon" v-if="customclass == 'filter-select'" />
      <label>{{ label }}</label>
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
  name: "BaseSelect",
  data() {
    return {
      mutableSelected: "",
      wrapper: "",
      prefillDone: false,
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
    label: {
      type: String,
      required: false,
      default: "",
    },
    name: {
      type: String,
      required: false,
      default: "",
    },
    options: {
      type: Array,
      required: true,
      default: () => [],
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    value: {
      required: false,
    },
    customclass: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.getWrapper();
  },
  watch: {
    value: {
      deep: true,
      handler(newValue) {
        if (!this.preFillDone) {
          this.$emit("input", (this.mutableSelected = newValue));
          this.preFillDone = true;
        }else{
          this.$emit("input", (this.mutableSelected = newValue));
        }
      },
    },
  },
  methods: {
    getWrapper() {
      this.wrapper = document.querySelector(`#${this.name}`);
    },
    handleFocus() {
      this.wrapper.classList.remove("select-wrapper-blur");
      this.wrapper.classList.add("select-wrapper-focus");
    },
    handleBlur() {
      this.wrapper.classList.remove("select-wrapper-focus");
      this.wrapper.classList.add("select-wrapper-blur");
    },
  },
};
</script>

<style scoped lang="scss">
.input-holder {
  display: flex;
  flex-direction: column;
  text-align: left;
  .meta-error-text {
    margin-top: 10px;
    font-size: 12px;
    color: #e8726f;
    font-weight: bold;
  }
}

.select-wrapper {
  display: flex;
  flex-direction: column;
  font-size: 15px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid #bdc3c7;
  position: relative;
  transition: 0.1s;
  label {
    position: absolute;
    background: white;
    padding: 0px 5px;
    top: 13px;
    left: 10px;
    transition: all 0.25s ease-in-out;
    z-index: 0;
  }
  select {
    font-size: 16px;
    font-family: Raleway;
    width: 100%;
    height: 100%;
    padding: 15px;
    padding-right: 30px;
    background: transparent;
    border: none;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    cursor: pointer;
    z-index: 1;
    option {
      display: flex;
      font-size: 16px;
      line-height: 50px;
      font-family: Raleway;
    }
  }
  .dropdown-icon {
    position: absolute;
    right: 15px;
    top: 20px;
    color: #039be5;
  }
}

.filter-select {
  flex-wrap: wrap;
  flex-direction: unset!important;
  align-items: center;
  margin-bottom: 0;
  margin-right: 20px;
  .select-wrapper{
    border: 0;
    background-color: 0;
    appearance: none;
    select{
      padding: 0 30px 0 10px;
      color: #e23a36;
      font-weight: bold;
      direction: rtl;
      option{
        color: #2b2b2b;
      }
    }
    .dropdown-icon{
      display: none;
    }
  }
  .filter-icon{
      color: #e23a36;
      position: absolute;
      right: 0;
  }
  .select-wrapper:hover,
  .select-wrapper-focus{
    background-color: transparent;
  }
}

select:focus ~ label,
select:not([data-value=""]):valid ~ label {
  top: -11px;
  left: 10;
  font-size: 14px;
  color: #dc3545;
  font-weight: bold;
}
.select-wrapper:hover,
.select-wrapper-focus {
  // box-shadow: 0 0 0 2px #343a40;
  background-color: #f1f9ff;
  border-color: #bce0fd;
}

.select-input select:focus {
  outline: 0;
  border-color: #027ab5 !important;
  background-color: #f8fcff !important;
}

 .select-input select {
    padding: 20px 30px;
    color: #2b2b2b;
    border-color: #d0e9fa;
    font-size: 14px;
    font-family: Raleway;
    border-radius: 12px;
    transition: 0.4s;
  }

@media only screen and (max-width: 1400px) {
  .select-wrapper select,
  .select-wrapper select option {
    font-size: 14px;
  }
}

@media only screen and (max-width: 768px) {
  .select-wrapper {
    margin-bottom: 8px;
  }
}

@media only screen and (max-width: 480px) {
  .select-wrapper select,
  .select-wrapper select option {
    font-size: 12px;
  }

  .select-wrapper .dropdown-icon {
    font-size: 12px;
    top: 18px;
  }
}
</style>
