<template>
  <component 
  :is="link ? 'router-link' : 'button'" 
  class="btn"
  :to="link"
  :disabled="disabled"
  >
  <font-awesome-icon icon="arrow-left" class="icon-left" v-if="type==='back'"/>
  <font-awesome-icon icon="paper-plane" class="icon-left" v-if="type==='send'"/>
  <font-awesome-icon icon="check" class="icon-left" v-if="type==='approve'"/>
  <font-awesome-icon icon="times" class="icon-left" v-if="type==='disapprove'"/>
  <font-awesome-icon icon="plus" class="icon-left" v-if="type==='plus'"/>
    <slot>
      Button
    </slot>
    <font-awesome-icon icon="arrow-right" class="icon-right" v-if="type !=='back' && type !== 'send' && type !== 'approve' && type !== 'disapprove' && type !=='plus'"/>
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
    },
    disabled: {
      type: Boolean,
      default: false
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

.btn-disabled{
  pointer-events: none;
  color: #fff;
  border-color: #a8a8a8;
  background-color: #a8a8a8;
}
.btn-disabled:hover{
    border-color: gray !important;
    color: gray !important;
    background: none !important;
}
.inquiry-application-btn:hover{
  color: #fff;
  border-color: #fff;
}

@media only screen and ( max-width: 480px ){
  .btn{
      width: 100%;
      font-size: 14px;
      padding: 12px;
      margin-bottom: 10px;
  }
}
</style>
