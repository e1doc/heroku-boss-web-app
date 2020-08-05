<template>
    <div class="meta-container flex-center">
        <h1 class="meta-form-title">Upload your Requirements</h1>
        <div class="meta-note">Almost Done! Please upload your file. Only allowed format - jpg, jpeg, png or pdf file.</div>
        <div class="meta-upload-box">
            <div class="meta-custom-upload">
                <input type="file" id="upload_file">
                <div class="meta-text big">DRAG YOUR FILE HERE</div>
                <div class="meta-text small">OR Click this to upload your file</div>
            </div>
        </div>
        <div class="meta-form-group button-left-right">
            <button-block class="back-button">BACK</button-block>
            <button-block class="next-button">NEXT</button-block>
        </div>
    </div>
</template>

<script>
import ButtonBlock from "@/components/ButtonBlock"
export default {
    name: "UploadStep",
    components: {
        ButtonBlock
    },
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
        color: #2b2b2b;
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
</style>