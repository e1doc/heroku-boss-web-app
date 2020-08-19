<template>
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
     <font-awesome-icon :icon="icon" class="icon" />
  </div>
</template>

<script>
export default {
  name: "BaseInputIconEnd",
  data() {
    return {
      wrapper: "",
      inputData: "",
      passType: 'password',
    };
  },
  props: {
    icon:{
      type: String,
      required: true
    },
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
  background: #ffffff;
  font-size: 15px;
  font-family: 'Raleway', sans-serif;
  padding: 15px 18px;  
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  border: 1px solid #bdc3c7;
  transition: 0.1s;
  position: relative;
  .label {
    color: #BABABA;
    background: white;
    position: absolute;
    top: 16px;
    left: 18px;
    padding: 0px;
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
    color: #BABABA;
}
.label-focus {
    font-size: 10px!important;
    line-height: 0.3;
    top: -2px !important;
    left: 2 !important;
    color: #2699FB !important;
}

.input-wrapper-focus {
    background-color: #F1F9FF;
    border-color: #BCE0FD;
    font-size: 12px !important;
}

.input-wrapper-focus .icon{
  font-size: 16px;
}

input:focus{
  border-color: #BCE0FD;
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

@media only screen and ( max-width : 768px ){
    .input-holder{
        margin-bottom: 8px;
    }

    .input-wrapper.fw-mobile{
      width: 100%;
    }
}

@media only screen and ( max-width: 480px ){
  .input-wrapper .label{
      font-size: 12px;
      padding: 0;
  }
}
</style>
