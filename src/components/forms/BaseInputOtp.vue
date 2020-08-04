<template>
  <div class="input-wrapper" :id="name">
    <input
      @focus="handleFocus"
      :value="inputData"
      type="number"
      :maxlength="max"
      @input="
        $emit('input', (inputData = $event.target.value));
        updateValue($event.target.value);
      "
    />
  </div>
</template>

<script>
export default {
  name: "BaseInputOtp",
  data() {
    return {
      wrapper: "",
      inputData: "",
      passType: "password",
      max: 2,
    };
  },
  mounted() {
    this.getWrapper();
  },
  props: {
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
  },
  methods: {
    getWrapper() {
      this.wrapper = document.querySelector(`#${this.name}`);
    },
    handleFocus() {
      this.wrapper.classList.add("input-wrapper-focus");
    },
    updateValue(element) {
      var max_chars = 7;
      if (element.length > max_chars) {
        element = element.substr(0, max_chars);
        this.inputData = element;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.input-wrapper {
  background: #ffffff;
  font-size: 15px;
  font-family: "Raleway", sans-serif;
  padding: 15px;
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  border: 1px solid #bdc3c7;
  transition: 0.1s;
  position: relative;
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
    text-align: center;
    letter-spacing: 5px;
  }
}
.input-wrapper-focus {
  background-color: #f1f9ff !important;
  border-color: #bce0fd !important;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
