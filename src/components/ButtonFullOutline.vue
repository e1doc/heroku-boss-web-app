<template>
    <component
    :is="'button'"
    class="btn"
    >
        <slot>
            Button
        </slot>
    </component>
</template>

<script>
export default {
    name: 'ButtonFull',
}
</script>

<style lang="scss" scoped>
@import '../css/base/_colors.scss';
.btn {
    color: #ffffff;
    background: transparent;
    box-shadow: 0px 3px 26px #00000029;
    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    border: 2px solid #ffffff;;
    border-radius: 50px;
    opacity: 1;
    font-size: 18px;
    width: 100%;
    padding: 15px 15px;
    outline: none;
    cursor: pointer;
    transition: 0.3s ease;
}
.btn:hover{
    background-color: #039BE5;
    color: #ffffff;
    border-color: #039BE5
}
</style>