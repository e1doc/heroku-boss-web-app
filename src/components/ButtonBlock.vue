<template>
    <component
    :is="'button'"
    class="btn"
    >
        <slot>
            Button
        </slot>
         <font-awesome-icon icon="arrow-right" class="icon" />
    </component>
</template>

<script>
export default {
    name: 'ButtonBlock',
}
</script>

<style lang="scss" scoped>
@import '../css/base/_colors.scss';
.icon{
    margin-left: 10px;
}
.btn {
    color: #ffffff;
    background: $primary-color 0% 0% no-repeat padding-box;
    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    box-shadow: 0px 3px 26px #00000029;
    border: 2px solid #039BE5;
    border-radius: 50px;
    opacity: 1;
    font-size: 18px;
    min-width: 100px;
    padding: 15px 30px;
    outline: none;
    cursor: pointer;
    transition: 0.3s ease-in-out;
}
.btn:hover{
    background-color: transparent;
    color: #027ab5;
    border-color: #027ab5;
}
</style>