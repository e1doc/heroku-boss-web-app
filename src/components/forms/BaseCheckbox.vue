<template>
  <div class="meta-checkbox flex-center">
      <input type="checkbox" id="option" value="inputValue" @change="$emit('input', label)">
      <div class="custom-checkbox flex-center">
          <span class="check"><font-awesome-icon icon="check" class="mr5 check-icon" /></span>
      </div>
      <label for="option">{{ label }}</label>
  </div>
</template>

<script>
export default {
    name: "BaseCheckbox",
  data() {
    return {
      inputValue: "",
    };
  },
  props: {
    label: {
      type: String,
      default: "",
    },
  },
}
</script>

<style lang="scss" scoped>
div.meta-checkbox{
  position: relative;
  label{
      font-size: 13px;
      line-height: 1.6;
  }
  input[type="checkbox"]{
      height: 17px;
      width: 17px;
      opacity: 0;
      left: 0;
      top: 3px;
      position: absolute;
      z-index: 2;
      cursor: pointer;
  }
  .custom-checkbox{
      height: 15px;
      width: 15px;
      border: 2px solid #2593F1;
      margin-right: 12px;
      .check-icon{
          color: #fff;
          font-size: 14px;
          display: none;
      }
  }
  input[type="checkbox"]:checked + .custom-checkbox{
      background-color:#2593F1;
      .check-icon{
          display: block;
      }  
  }

}
</style>