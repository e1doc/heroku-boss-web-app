<template>
  <div class="input-wrapper" :id="name">
    <font-awesome-icon :icon="type === 'password' ? 'lock': 'user'" class="mr10 icon" />
    <input
      @focus="handleFocus"
      @blur="handleBlur"
      v-model="inputData"
      :placeholder="placeholder"
      :type="type === 'password' ? passType : type"
      @input="$emit('input', (inputData = $event.target.value))"
    />
    <label class="label" :id="refs">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "BaseInputIcon",
  data() {
    return {
      wrapper: "",
      inputData: "",
      passType: 'password',
    };
  },
  props: {
    type: {
      type: String,
      required: true
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
  mounted() {
    this.getWrapper();
  },
  methods: {
    getWrapper() {
      this.wrapper = document.querySelector(`#${this.name}`);
    },
    handleFocus() {
      this.wrapper.classList.remove("input-wrapper-blur");
      this.wrapper.classList.add("input-wrapper-focus");
      document.querySelector(`#${this.refs}`).classList.add("label-focus");
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
    },
  },
};
</script>

<style scoped lang="scss">
.icon{
    color: #C2C2C2 ;
}
.input-wrapper {
  background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #cccccc;
  border-radius: 10px;
  opacity: 1;
  display: flex;
  flex-direction: row;
  font-size: 1em;
  box-shadow: 0 0 0 1px #bdc3c7;
  padding: 1em;
  position: relative;
  transition: 0.1s;
  font-family: 'Raleway', sans-serif;
  .label {
    position: absolute;
    background: white;
    padding: 0px 5px;
    top: 16px;
    left: 35px;
    transition: all 0.25s ease-in-out;
    z-index: 0;
    color: #BABABA;
  }
  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    background: transparent;
    outline: none;
    font-size: 16px;
    cursor: text;
    width: 100%;
    height: 100%;
    z-index: 1;
    transition: 0.1s;
    
  }
}

input::placeholder {
  color: transparent;
}
input:focus::placeholder {
  color: #BABABA;
}
.label-focus {
  line-height: 0.3;
  top: -3px !important;
  left: 10 !important;
  font-size: 14px !important;
//   color: #dc3545 !important;
//   font-weight: bold !important;
}
// .input-wrapper:hover {
//   box-shadow: 0 0 0 2px #343a40;
// }
// .input-wrapper-focus {
//   box-shadow: 0 0 0 2px #3f51b5;
// }

// .input-wrapper-focus-danger {
//   box-shadow: 0 0 0 2px #dc3545;
// }
// .input-wrapper-blur {
//   box-shadow: 0 0 0 1px #5a5f63;
// }
</style>
