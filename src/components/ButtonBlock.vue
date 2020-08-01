<template>
  <component 
  :is="link ? 'router-link' : 'button'" 
  class="btn"
  :to="link"
  >
    <slot>
      Button
    </slot>
    <font-awesome-icon icon="arrow-right" class="icon" />
  </component>
</template>

<script>
export default {
  name: "ButtonBlock",
  props: {
    link: {
      type: Object,
      required: false,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../css/base/_colors.scss";
a{
    text-decoration: none;
}
.icon {
  margin-left: 10px;
}
.btn {
  color: #ffffff;
  background: $primary-color;
  font-family: "Raleway", sans-serif;
  font-weight: bold;
  opacity: 1;
  font-size: 15px;
  min-width: 170px;
  padding: 13px 15px;
  box-shadow: 0px 3px 26px #00000029;
  border: 2px solid #039be5;
  border-radius: 50px;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}
.btn:hover {
  color: #027ab5;
  background-color: transparent;
  border-color: #027ab5;
  box-shadow: none;
}
</style>
