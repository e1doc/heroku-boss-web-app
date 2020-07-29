<template>
  <section>
    <div class="thead">
      <div class="th w10">ACC #</div>
      <div class="th w10">OR #</div>
      <div class="th w10">OR DATE</div>
      <div class="th w35">BUSINESS NAME</div>
      <div class="th w25">PAID BY</div>
      <div class="th w10">AMOUNT</div>
    </div>
    <div class="tbody">
      <div class="tr" v-for="index in 5" :key="index">
        <div class="td w10">F-02248</div>
        <div class="td w10">102582</div>
        <div class="td w10">JUN 1, 2020</div>
        <div class="td w35">MAMICHELLE FOOD STATION</div>
        <div class="td w25">JOHN MICHAEL DOE</div>
        <div class="td w10">₱ 28,063.00</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TransactionTable",
};
</script>

<style lang="scss" scoped>
.w10{
    width: 10%;
}
.w35{
    width: 35%;
}
.w25{
    width: 25%;
}
.thead {
  border-radius: 8px 8px 0px 0px;
  display: flex;
  flex-direction: row;
  border-bottom: 2px #e23a36 solid;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  .th {
    text-align: center;
    padding: 20px 0px;
    font-weight: bold;
  }
}
.tbody {
  flex-direction: column;
  margin-top: 10px;
  .tr {
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    background: #ffffff;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    margin-top: 3px;
    .td {
      text-align: center;
      padding: 20px 0px;
    }
  }
}
</style>
