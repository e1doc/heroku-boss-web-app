<template>
  <section>
    <div v-if="currentType==='business'">
      <div class="thead">
        <div class="th w10">ACC #</div>
        <div class="th w10">OR #</div>
        <div class="th w10">OR DATE</div>
        <div class="th w35" v-if="currentType === 'business'">
          BUSINESS NAME
        </div>
        <div class="th w25">PAID BY</div>
        <div class="th w10">AMOUNT</div>
      </div>
      <div class="tbody">
        <div class="tr" v-for="index in 5" :key="index">
          <div class="td w10">F-02248</div>
          <div class="td w10">102582</div>
          <div class="td w10">JUN 1, 2020</div>
          <div class="td w35" v-if="currentType === 'business'">
            MAMICHELLE FOOD STATION
          </div>
          <div class="td w25">JOHN MICHAEL DOE</div>
          <div class="td w10">₱ 28,063.00</div>
        </div>
      </div>
    </div>
      <div v-if="currentType==='real_property'">
      <div class="thead">
        <div class="th w15">TD #</div>
        <div class="th w15">OR #</div>
        <div class="th w15">OR DATE</div>
        <div class="th w25">PAID BY</div>
        <div class="th w30">AMOUNT</div>
      </div>
      <div class="tbody">
        <div class="tr" v-for="index in 5" :key="index">
          <div class="td w15">F-02248</div>
          <div class="td w15">102582</div>
          <div class="td w15">JUN 1, 2020</div>
          <div class="td w25">JOHN MICHAEL DOE</div>
          <div class="td w30">₱ 28,063.00</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TransactionTable",
  computed: {
    ...mapGetters(["currentType"]),
  },
};
</script>

<style lang="scss" scoped>
.w10 {
  width: 10%;
}
.w15 {
  width: 25%;
}
.w25 {
  width: 25%;
}
.w30 {
  width: 30%;
}
.w35 {
  width: 35%;
}
.w45 {
  width: 45%;
}
.thead {
  display: flex;
  flex-direction: row;
  background: #ffffff;
  border-radius: 8px 8px 0px 0px;
  border-bottom: 2px #e23a36 solid;
  box-shadow: 0px 10px 20px rgba(127, 127, 127, 0.1);
  .th {
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    padding: 20px 0px;
  }
}
.tbody {
  flex-direction: column;
  margin-top: 10px;
  .tr {
    display: flex;
    flex-direction: row;
    background: #ffffff;
    box-shadow: 0px 10px 20px rgba(127, 127, 127, 0.1);
    border-radius: 8px;
    margin-top: 3px;
    padding-left: 10px;
    padding-right: 10px;
    .td {
      font-size: 14px;
      font-family: Proxima Nova;
      text-align: center;
      padding: 17px 0px;
    }
  }
}
</style>
