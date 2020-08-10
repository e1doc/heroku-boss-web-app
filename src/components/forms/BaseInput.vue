<template>
  <div class="input-holder">
    <div class="input-wrapper" :id="name">
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

@media only screen and (max-width: 1400px) {
  .input-wrapper {
    padding: 12px 18px;
    .label {
      font-size: 14px;
      top: 13px;
    }
  }
}
</style>
