<template>
  <section>
    <div class="thead">
      <div class="th">ACCOUNT NUMBER</div>
      <div class="th">OWNER NAME</div>
      <div class="th">ACTIONS</div>
    </div>
    <div class="tbody">
      <div class="tr" v-for="index in 5" :key="index">
        <div class="td">F-000248</div>
        <div class="td">BANTA, FLORENCIA AND LUCIA</div>
        <div class="td actions">
            <div> <font-awesome-icon icon="eye" class="mr5 icon" /> VIEW</div>
            <div class="bill"><font-awesome-icon icon="receipt" class="mr5 icon" />BILL</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ProfileTable",
};
</script>

<style lang="scss" scoped>
.thead {
  border-radius: 8px 8px 0px 0px;
  display: flex;
  flex-direction: row;
  border-bottom: 2px #e23a36 solid;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(0,0,0, 0.1);
  .th {
    flex: 1;
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
    box-shadow: 0px 10px 20px rgba(0,0,0, 0.1);
    margin-top: 3px;
    .td {
      flex: 1;
      text-align: center;
      padding: 20px 0px;
    }
    .actions{
          display: flex;
          flex-direction: row;
          justify-content: center;
          padding: 10px;
         div{
              margin: 0 10px;
              color: #039BE5;
              font-weight: bold;
              padding: 10px;
              
         }
         .bill{
            padding: 10px 15px;
             border: 2px #039BE5 solid;
             border-radius: 5px;
         }
      }
  }
}
</style>
