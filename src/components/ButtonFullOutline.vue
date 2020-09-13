<template>
    <component
    :is="link ? 'router-link' : 'button'" :to="link"
    class="btn"
    >
        <slot>
            Button
        </slot>
    </component>
</template>

<script>
export default {
    name: 'ButtonFullOutline',
      props: {
    link: {
      type: Object,
      required: false,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../css/base/_colors.scss';
a{
    text-decoration: none;
    width: 100%;
    display: block;
    box-sizing: border-box;
    text-align: center;
    margin: 0 auto;
}
.btn {
    color: #ffffff;    
    background: transparent;
    font-size: 15px;    
    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    letter-spacing: 0.5px;
    width: 100%;
    max-width: 80%;
    padding: 12px 15px;
    border-radius: 50px;
    border: 2px solid #ffffff;
    opacity: 1;
    outline: none;
    cursor: pointer;
    transition: 0.3s ease;
}

.btn:hover{
    background-color: #039BE5;
    color: #ffffff;
    border-color: #039BE5
}

.btn-disabled{
  pointer-events: none;
  color: #fff;
  border-color: #a8a8a8;
  background-color: #a8a8a8;
}
</style>