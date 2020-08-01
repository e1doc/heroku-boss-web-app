<template>
  <div class="meta-list flex-wrap">
        <div class="meta-list-item active">
            <!-- <img class="meta-img" src="../assets/landbank-logo.png"> -->
        </div>
  </div>
</template>

<script>
export default {
    name: "BankOption"
}
</script>

<style lang="scss" scoped>
.meta-list-item{
    max-width: 138px;
    margin-right: 15px;
    margin-bottom: 35px;
    img.meta-img{
        max-height: 66px;
        padding: 15px;
        border: 2px solid transparent;
        border-radius: 10px;
    }
}

.meta-list-item:nth-child(n+4){
    margin-right: 0;
}

.meta-list-item.active img.meta-img{
    border-color: #2699fb;
}
</style>