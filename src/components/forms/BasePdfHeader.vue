<template>
    <div class="meta-header flex-center">
        <div class="meta-left-box">
            <img class="meta-img" src="@/assets/bacoor-cavite-logo.png">
        </div>
        <div class="meta-right-box">
            <div class="meta-text">Republic of the Philippines</div>
            <div class="meta-text">Province of  Cavite</div>
            <div class="meta-text caps">CITY OF BACOOR </div>
            <div class="meta-text caps">BUSINESS PERMIT AND LICENSING OFFICE</div>
            <div class="meta-text caps">TAX YEAR ____</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BasePdfHeader"
}
</script>

<style lang="scss" scoped>
div.meta-header{
    width: 100%;
    background-color: #2699fb;
    padding: 30px 40px;
    div.meta-left-box{
        width : 126px;
        float : left;
    }
    div.meta-right-box{
        width : calc( 100% - 146px );
        float : left;
        margin-left : 20px;
        div.meta-text{
            color : #fff;
            font-size : 14px;
            font-weight: bold;
            line-height : 1.6;
        }
    }
}
</style>