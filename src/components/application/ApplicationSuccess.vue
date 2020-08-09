<template>
    <div class="meta-container">
        <h1 class="meta-form-title">Your Application has been submitted!</h1>
        <div class="meta-text">Great! Your application has been successfully submitted.<br>Please note that the assessment will take 1-5 working days. <br>We will send you an email once your application has been reviewed.</div>
        <div class="meta-form-group">
            <div class="meta-link"><router-link :to="{name:'Profile'}">VIEW YOUR APPLICATIONS</router-link></div>
            <button-block @click.native="printForm()">DOWNLOAD</button-block>
        </div>
    </div>
</template>

<script>
import ButtonBlock from "@/components/ButtonBlock"
import {mapGetters} from "vuex"
export default {
    name: "ApplicationSuccess",
    components: {
        ButtonBlock
    },
    computed:{
        ...mapGetters(['applicationType'])
    },
    methods:{
        printForm(){
            if(this.applicationType === 'business'){
                this.$store.commit('setPrintBusiness',true)
            }
            else if(this.applicationType === 'property'){
                this.$store.commit('setPrintProperty',true)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
div.meta-container{
    width: 100%;
    min-height: 500px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 70px 30px;
    background-color: #EAF6FF;
    border-radius: 20px;
    h1.meta-form-title{
        text-align: center;
        width: 100%;
        margin-bottom: 40px;
    }
    .meta-text {
        color: #73BEFC;
        font-size: 18px;
        line-height: 39px;
        text-align: center;
        width: 100%;
        margin-bottom: 30px;
    }
    .meta-form-group{
        text-align: center;
        .meta-link{
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 20px;
            a{
                color: #039BE5;
                transition: 0.4s;
            }
        }
    }
}

.meta-link a:hover{
    color: #73BEFC!important;
}
</style>