<template>
    <div class="meta-container flex-center">
        <h1 class="meta-form-title">Upload your Requirements</h1>
        <div class="meta-note">Almost Done! Please upload your file. Only allowed format - jpg, jpeg, png or pdf file.</div>
        <base-file-uploader 
            label="1. Proof of business registration, incorporation, or legal personality" 
            description="{i.e. DTI* / SEC Cooperative Development Authority (CDA) registration} including basis for computing taxes, fees, and charges (e.g. business capitalization)." name="businessregproof" 
            v-model="businessregproof" />
        <base-file-uploader 
            label="2. For Franchisee, please upload a copy of Franchise Agreement" 
            name="franchiseagreement" 
            v-model="franchiseagreement" />
        <base-file-uploader 
            label="3. Occupancy Permit" 
            description="If required by national laws (e.g. Building Code) and local laws. Note For those without Occupancy Permit, sketch of business location including front full view picture of establishment." 
            name="occupancypermit" 
            v-model="occupancypermit" />
        <base-file-uploader 
            label="4. Contract of Lease (if Lessee)"
            name="contractoflease" 
            v-model="contractoflease" />
        <base-file-uploader 
            label="5. One Goverment issued ID"
            name="governmentid" 
            v-model="governmentid" />
        <div class="meta-form-group button-left-right">
            <button-block type="back" class="back-button" @click.native="previousStep()">BACK</button-block>
            <button-block class="next-button" @click.native="nextStep()">NEXT</button-block>
        </div>
    </div>
</template>

<script>
import ButtonBlock from "@/components/ButtonBlock"
import BaseFileUploader from "@/components/forms/BaseFileUploader"
export default {
    name: "BusinessUploadStep",
    components: {
        ButtonBlock,
        BaseFileUploader
    },
    methods:{
        previousStep(){
            this.$store.commit('setCurrentApplicationStep','2')
        },
        nextStep(){
            this.$store.commit('setCurrentApplicationStep','4')
        }
    }
}
</script>

<style lang="scss" scoped>
div.meta-container{
    width: 100%;
    padding: 50px;
    background-color: #EAF6FF;
    border-radius: 20px;
    h1.meta-form-title{
        margin-bottom: 40px;
    }
    .meta-note {
        font-size: 16px;
        color: #7ac0fa;
        margin-bottom: 30px;
    }
    .meta-custom-upload {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        position: relative;
        border: 3px dashed #BCE0FD;
        padding: 50px 30px;
        margin-bottom: 30px;
        transition: 0.4s;
        
        input[type="file"] {
            position: absolute;
            z-index: 2;
            height: 100%;
            width: 100%;
            opacity: 0;
            cursor: pointer;
        }
        .meta-text.big{
            color: #64B4F9;
            font-size: 30px;
            font-weight: 700;
            line-height: 1.6;
            text-transform: uppercase;
            width: 100%;
            text-align: center;
            transition: 0.4s;
        }
         .meta-text.small{
            color: #64B4F9;
            font-size: 18px;
            font-weight: 700;
            line-height: 1.6;
            transition: 0.4s;
         }
    }
    div.button-left-right{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .back-button{
            background-color: #73BEFC;
            border-color: #73BEFC;
        }
    }
}

div.meta-container .meta-custom-upload:hover {
    border-color: #039be5;
}

div.meta-container .meta-custom-upload:hover div.meta-text{
    color: #039be5;
}

.back-button:hover{
    background-color: #2699FB!important;
    color: #fff!important;
    border-color: #2699FB!important;
}


@media only screen and ( max-width : 1380px ){
    div.meta-container h1.meta-form-title{
        font-size: 22px;
    }
}

@media only screen and ( max-width : 650px ){
    div.meta-container{
        padding: 40px 30px;
    }

    div.meta-container h1.meta-form-title{
        font-size: 18px;
        margin-bottom: 30px;
    }
}

@media only screen and ( max-width : 480px ){
    div.meta-container div.button-left-right .back-button{
        background-color: #048cff;
        border-color: #73befc;
        width: auto;
        background: transparent;
        border: none;
        box-shadow: none;
        color: #2699fb;
        min-width: unset;
    }

    div.meta-container div.button-left-right .next-button{
        width: auto;
        background: transparent;
        border: none;
        box-shadow: none;
        min-width: unset;
        color: #2699fb;
    }
}
</style>