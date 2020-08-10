<template>
  <div class="input-wrapper flex-center" >
      <input type="text" placeholder="Search by date, name, or keyword" >
      <font-awesome-icon icon="search" class="icon" />
  </div>
</template>

<script>
export default {
  name: "BaseInputSearch",
};
</script>

<style scoped lang="scss">
.input-wrapper{
    position : relative;
    width : 270px;
    input {
        width: 100%;
        padding: 10px 30px 10px 10px;
        font-family : Raleway;
        font-size : 14px;
        background: #FADDDD30;
        border: 1px solid #E56A67;
        border-radius : 8px;
    }
    input::placeholder{
        color : #A4A4A4CC;
    }
    input:focus{
        outline : none;
    }
    .icon{
        position : absolute;
        right : 10px;
        top : 9px;
        font-size : 19px;
        color : #E23A36;
    }
}
</style>
