<template>
  <section>
    <div v-if="currentType === 'business'">
      <div class="thead hide-in-mobile">
        <!-- <div class="th w10">ACC #</div> -->
        <div class="th w10">OR #</div>
        <div class="th w10">OR DATE</div>
        <div class="th w35">BUSINESS NAME</div>
        <div class="th w25">PAID BY</div>
        <div class="th w10">AMOUNT</div>
      </div>
      <div class="tbody">
        <div class="tr" v-for="index in 5" :key="index">
          <!-- <div class="td w10">
              <span class="td-label show-in-mobile">ACCOUNT # : </span>
              F-02248
          </div> -->
          <div class="td w10">
              <span class="td-label show-in-mobile">OR # : </span>
              102582
          </div>
          <div class="td w10">
              <span class="td-label show-in-mobile">OR DATE : </span>
              JUN 1, 2020 
          </div>
          <div class="td w35">
              <span class="td-label show-in-mobile">BUSINES NAME : </span>
              MAMICHELLE FOOD STATION
          </div>
          <div class="td w25">
              <span class="td-label show-in-mobile">PAID BY : </span>
              JOHN MICHAEL DOE
          </div>
          <div class="td w10">
              <span class="td-label show-in-mobile">AMOUNT : </span>
              ₱ 28,063.00
          </div>
        </div>
      </div>
    </div>
    <div v-if="currentType === 'real_property'">
      <div class="thead hide-in-mobile">
        <div class="th w15">TD #</div>
        <div class="th w15">OR #</div>
        <div class="th w15">OR DATE</div>
        <div class="th w25">PAID BY</div>
        <div class="th w30">AMOUNT</div>
      </div>
      <div class="tbody">
        <div class="tr" v-for="index in 5" :key="index">
          <div class="td w15">
              <span class="td-label show-in-mobile">TD # : </span>
              F-02248
          </div>
          <div class="td w15">
              <span class="td-label show-in-mobile">OR # : </span>
              102582
          </div>
          <div class="td w15">
              <span class="td-label show-in-mobile">OR DATE : </span>
              JUN 1, 2020
          </div>
          <div class="td w25">
              <span class="td-label show-in-mobile">PAID BY : </span>
              JOHN MICHAEL DOE
          </div>
          <div class="td w30">
              <span class="td-label show-in-mobile">AMOUNT : </span>
              ₱ 28,063.00
          </div>
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
section{
  width: 100%;
}
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
      font-family: "Proxima Nova Rg";
      text-align: center;
      padding: 17px 0px;
    }
  }
}

/*
MOBILE RESPONSIVENESS ------------------------------------------- */

span.td-label.show-in-mobile {
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 5px;
    color: #000c114d;
}

.show-in-mobile{
  display: none;
}

@media only screen and ( max-width: 860px ){
    .show-in-mobile{
        display: block;
    }

    .thead{
      display: none;
    }

    .tbody{
        flex-direction: unset;
        margin-top: 0;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    .tbody .tr{
        // background: #eef8ff;  
        flex-wrap: wrap;
        flex-direction: unset;
        padding: 15px 20px;
        width: calc( 50% - 60px );
        float: left;
        margin: 0 10px 20px;
    }

    .tbody .tr .td{
        flex: unset;
        width: 100%;
        float: left;
        text-align: left;
    }
}

@media only screen and ( max-width: 650px ){
  .tbody .tr{
      width: 100%;
      float: left;
      margin: 0 0 20px;
  }
}
</style>