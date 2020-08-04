<template>
  <div class="meta-checkbox-div">
      <input type="checkbox" id="option" v-model="inputValue"><label for="option">{{ label }}</label>
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

</style>