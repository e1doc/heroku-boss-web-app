<template>
    <div class="meta-header flex-center">
        <div class="meta-left-box">
            <img class="meta-img" src="@/assets/bacoor-cavite-logo.png">
        </div>
        <div class="meta-right-box">
            <div class="meta-text">Republic of the Philippines</div>
            <div class="meta-text">Province of  Cavite CITY OF BACOOR</div>
            <div class="meta-text caps">{{ formtitle }}</div>
            <div class="meta-text caps" v-if="type === 'business'">TAX YEAR <span class="text-underline">{{additionaltext | moment("YYYY") }}</span></div>
        </div>
        <div class="meta-form-number">Application No. {{ applicationnumber }}</div>
    </div>
</template>

<script>
export default {
    name: "BasePdfHeader",
    props: {
    applicationnumber: {
      type: String,
      default: "",
    },
    formtitle:{
        type: String,
        default: "",
    },
    additionaltext:{
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: ""
    }
  }
}
</script>

<style lang="scss" scoped>
div.meta-header{
    width: 100%;
    background-color: #2699fb;
    padding: 15px 30px;
    position: relative;
    div.meta-left-box{
        width : 50px;
        float : left;
        img{
            width: 50px;
        }
    }
    div.meta-right-box{
        width : calc( 100% - 70px );
        float : left;
        margin-left : 20px;
        div.meta-text{
            color : #fff;
            font-size : 9px;
            font-weight: bold;
            line-height : 1.6;
        }
    }
    div.meta-form-number{
        color: #fff;
        font-size: 14px;
        font-weight: bold;
        font-family: "Proxima Nova Rg";
        position: absolute;
        right: 30px;
    }
}
</style>