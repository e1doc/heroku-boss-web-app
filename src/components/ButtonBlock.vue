<template>
  <component 
  :is="link ? 'router-link' : 'button'" 
  class="btn"
  :to="link"
  >
  <font-awesome-icon icon="arrow-left" class="icon-left" v-if="type==='back'"/>
    <slot>
      Button
    </slot>
    <font-awesome-icon icon="arrow-right" class="icon-right" v-if="type !=='back'"/>
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
    type:{
      type: String,
      required: false,
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../css/base/_colors.scss";
a{
    text-decoration: none;
}
.icon-right{
  margin-left: 10px;
}
.icon-left {
  margin-right: 10px;
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
