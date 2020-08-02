<template>
  <section>
    <div class="thead">
      <div class="th" v-if="currentType === 'business'">ACCOUNT NUMBER</div>
      <div class="th" v-if="currentType === 'real_property'">TD NUMBER</div>
      <div class="th" v-if="currentType === 'business'">BUSNESS NAME</div>
      <div class="th" v-if="currentType === 'real_property'">OWNER NAME</div>
      <div class="th">ACTIONS</div>
    </div>
    <div class="tbody">
      <div class="tr" v-for="index in 5" :key="index">
        <div class="td">F-000248</div>
        <div class="td">JOHN MICHAEL DOE</div>
        <div class="td actions">
          <div>
            <font-awesome-icon icon="sync-alt" class="mr5 icon" /> RENEW
          </div>
          <div class="bill" @click="showModal()">
            <font-awesome-icon icon="receipt" class="mr5 icon" />BILL
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ProfileTable",
  computed: {
    ...mapGetters(["currentType"]),
  },
  methods: {
    showModal() {
      console.log("show");
      this.$modal.show("invoiceModal");
    },
  },
};
</script>

<style lang="scss" scoped>
.thead {
  border-radius: 8px 8px 0px 0px;
  display: flex;
  flex-direction: row;
  border-bottom: 2px #e23a36 solid;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(127, 127, 127, 0.1);
  .th {
    flex: 1;
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    padding: 18px 0px;
  }
}
.tbody {
  flex-direction: column;
  margin-top: 10px;
  .tr {
    display: flex;
    flex-direction: row;
    align-items: center;
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
    .actions {
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding: 8px 10px;
      div {
        color: #039be5;
        font-size: 13px;
        font-weight: bold;
        padding: 10px;
        margin: 0 10px;
      }
      .bill {
        font-size: 13px;
        padding: 8px 13px;
        border: 2px #039be5 solid;
        border-radius: 5px;
        transition: 0.4s;
        cursor: pointer;
      }
    }
  }
}

.bill:hover {
  color: #ffffff !important;
  background-color: #039be5;
}
</style>
