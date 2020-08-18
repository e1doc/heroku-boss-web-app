<template>
  <div class="meta-upload-box flex-wrap">
        <div class="meta-label">{{ label }}</div>
        <div class="meta-desc" v-html="description">{{ description }}</div>
        <div class="meta-custom-upload">
            <input type="file" name="name">
            <!-- <div class="meta-text big">DRAG/CLICK TO UPLOAD YOUR FILE HERE</div> -->
            <div class="meta-text small">DRAG/CLICK TO UPLOAD YOUR FILE HERE</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BaseFileUploader",
    props: {
        label: {
            type: String,
            default: "",
        },
        description: {
            type: String,
            default: "",
        },
    },
};
</script>

<style lang="scss" scoped>
.meta-upload-box{
    width: 100%;
    .meta-label {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .meta-desc{
        font-size: 14px;
        padding-left: 17px;
        margin-bottom: 18px;
        width: 100%;
    }
    .meta-custom-upload {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 100%;
        padding: 15px 30px;
        margin: 0 0 30px 17px;
        border: 3px dashed #BCE0FD;
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
            font-size: 15px;
            font-weight: 700;
            line-height: 1.6;
            transition: 0.4s;
        }
    }
}

div.meta-container .meta-custom-upload:hover {
    border-color: #039be5;
}

div.meta-container .meta-custom-upload:hover div.meta-text{
    color: #039be5;
}


/*
MOBILE RESPONSIVENESS 
--------------------------------------------------------------*/

@media only screen and ( max-width : 768px ){
    .meta-upload-box .meta-label{
        font-size: 15px;
    }

    .meta-upload-box .meta-custom-upload .meta-text.small{
        font-size: 13px;
    }
}

@media only screen and ( max-width: 480px ){
    .meta-upload-box .meta-label{
        font-size: 13px;
    }

    .meta-upload-box .meta-desc{
        font-size: 12px;
        margin-bottom: 15px;
    }
    .meta-upload-box .meta-custom-upload .meta-text.small{
        font-size: 12px;
        text-align: center;
    }
}
</style>