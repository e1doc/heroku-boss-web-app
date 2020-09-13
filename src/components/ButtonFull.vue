<template>
  <component :is="link ? 'router-link' : 'button'" :to="link" class="btn">
    <slot>
      Button
    </slot>
  </component>
</template>

<script>
export default {
  name: "ButtonFullOutline",
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
    width: 100%;
    display: block;
    box-sizing: border-box;
}
.btn {
  color: #ffffff;
  background: $primary-color;
  font-family: "Raleway", sans-serif;
  font-weight: bold;
  font-size: 16px;
  letter-spacing: 0.5px;
  width: 100%;
  padding: 12px 15px;
  box-shadow: 0px 3px 26px #00000029;
  border: 1px solid #039be5;
  border-radius: 50px;
  outline: none;
  opacity: 1;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}
.btn:hover {
  color: #027ab5;
  background-color: transparent;
  border-color: #027ab5;
  box-shadow: none;
}

.btn-disabled{
  pointer-events: none;
  color: #fff;
  border-color: #a8a8a8;
  background-color: #a8a8a8;
}
</style>
