<template>
  <section>
    <div class="thead">
      <div class="th">APPLICATION #</div>
      <div class="th">DATE</div>
      <div class="th" v-if="currentType === 'business'">BUSINESS NAME</div>
      <div class="th" v-if="currentType === 'real_property'">TD #</div>
      <div class="th">STATUS</div>
    </div>
    <div class="tbody">
      <div class="tr">
        <div class="td">000001</div>
        <div class="td">JUNE 07 2020</div>
        <div class="td" v-if="currentType === 'business'">MINISTOP</div>
        <div class="td" v-if="currentType === 'real_property'">A-01543</div>
        <div class="td">DRAFT</div>
      </div>
      <div class="tr">
        <div class="td">000002</div>
        <div class="td">JUNE 07 2020</div>
        <div class="td" v-if="currentType === 'business'">MINISTOP</div>
        <div class="td" v-if="currentType === 'real_property'">A-01543</div>
        <div class="td">PENDING</div>
      </div>
      <div class="tr">
        <div class="td">000003</div>
        <div class="td">JUNE 07 2020</div>
        <div class="td" v-if="currentType === 'business'">MINISTOP</div>
        <div class="td" v-if="currentType === 'real_property'">A-01543</div>
        <div class="td">FOR PAYMENT</div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ApplicationTable",
  computed: {
    ...mapGetters(["currentType"]),
  },
};
</script>

<style lang="scss" scoped>
.thead {
  display: flex;
  flex-direction: row;
  background: #ffffff;
  border-radius: 8px 8px 0px 0px;
  border-bottom: 2px #e23a36 solid;
  box-shadow: 0px 10px 20px rgba(127, 127, 127, 0.1);
  .th {
    flex: 1;
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
      flex: 1;
      font-size: 14px;
      font-family: "Proxima Nova Rg";
      text-align: center;
      padding: 17px 0px;
    }
  }
}
</style>
