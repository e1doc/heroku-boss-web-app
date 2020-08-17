<template>
    <div class="admin-header">
        <div class="admin-container">
            <div class="admin-text">ADMINISTRATOR</div>
            <div class="admin-icon"><font-awesome-icon icon="power-off" class="icon"/></div>
        </div>
    </div>
</template>

<script>
export default {
    name : "TopNav"
}
</script>

<style lang="scss" scoped>
div.admin-header{
    background-color: #fcfcfc;
    float : right;
    width : calc( 100% - 290px);
    position : fixed;
    top : 0;
    right : 0;
    z-index: 2;
    .admin-container {
        background-color : #fff;
        box-shadow : 0px 10px 20px #0000000D;
        border-radius : 8px;
        display : flex;
        flex-wrap : wrap;
        align-items : center;
        padding : 12px 30px;
        margin : 15px;
        .admin-text {
            font-size : 15px;
            font-weight : bold;
            line-height : 29px;
            width : 50%;
            float : left;
        }
        .admin-icon{
            width : 50%;
            float : right;
            text-align : right;
            .icon{
                font-size : 19px;
                cursor : pointer;
                transition : 0.4s;
            }
            .icon:hover{
                color : #e23a36;
            }
        }
    }
}
</style>