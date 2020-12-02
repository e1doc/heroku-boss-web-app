<template>
  <div class="input-wrapper flex-center" >
    <input
      type="text"
      :placeholder="placeholder"
      @input="
        $emit('input', (inputData = $event.target.value));"
      v-model="inputData"
    />
    <font-awesome-icon icon="search" class="icon" />
  </div>
</template>

<script>
export default {
  name: "BaseInputSearch",
  data() {
    return {
      inputData: "",
    };
  },
  props:{
     value: {
      type: [String, Number],
      required: false,
    },
    placeholder: {
      type: String,
      default: "Search by Application no."
    }
  }
};
</script>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
  width: 240px;
  input {
    width: 100%;
    padding: 10px 30px 10px 10px;
    font-family: Raleway;
    font-size: 12px;
    background: #fadddd30;
    border: 1px solid #e56a67;
    border-radius: 5px;
    transition: 0.4s;
  }
  input::placeholder {
    color: #a4a4a4cc;
  }
  input:focus {
    outline: none;
    border-color: #bce0fd!important;
    background: #eaf6ff!important;
  }
  .icon {
    position: absolute;
    right: 10px;
    top: 9px;
    font-size: 19px;
    color: #e23a36;
  }
}


input:focus ~ .icon{
  color: #1492e6!important;
}


</style>
