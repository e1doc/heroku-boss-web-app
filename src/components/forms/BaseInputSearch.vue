<template>
  <div class="input-wrapper flex-center">
    <input
      type="text"
      placeholder="Search by date, name, or keyword"
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
  }
  input::placeholder {
    color: #a4a4a4cc;
  }
  input:focus {
    outline: none;
  }
  .icon {
    position: absolute;
    right: 10px;
    top: 9px;
    font-size: 19px;
    color: #e23a36;
  }
}
</style>
