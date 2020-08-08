<template>
  <div class="select-wrapper" :id="name">
    <select
        v-model="selected"
        :data-value="selected"
        @focus="handleFocus"
        @blur="handleBlur" >

        <option value="">{{ placeholder }}</option>
        <option
          v-for="(option, key) in options"
          :key="key"
          :value="option.value"
          v-bind="{ selected: option.value === selected }" >
          {{ option.label }}
        </option>
    </select>
    <font-awesome-icon icon="chevron-down" class="dropdown-icon" />
    <label>{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "BaseSelect",
  data() {
    return {
      selected: "",
      wrapper: ""
    };
  },
  props: {
    label: {
      type: String,
      required: false,
      default: ""
    },
    name: {
      type: String,
      required: false,
      default: ""
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    placeholder: {
      type: String,
      required: false,
      default: ""
    }
  },
  mounted() {
    this.getWrapper();
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
    }
  }
};
</script>

<style scoped lang="scss">
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
  .dropdown-icon{
    position: absolute;
    right: 15px;
    top: 20px;
    color: #039be5;
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
  background-color: #F1F9FF;
  border-color: #BCE0FD;
}
</style>