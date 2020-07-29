<template>
  <section>
      <div class="thead">
          <div class="th">APPLICATION #</div>
          <div class="th">DATE</div>
          <div class="th">STATUS</div>
      </div>
      <div class="tbody">
          <div class="tr">
              <div class="td">000001</div>
              <div class="td">JUNE 07 2020</div>
              <div class="td">DRAFT</div>
          </div>
          <div class="tr">
              <div class="td">000002</div>
              <div class="td">JUNE 07 2020</div>
              <div class="td">PENDING</div>
          </div>
          <div class="tr">
              <div class="td">000003</div>
              <div class="td">JUNE 07 2020</div>
              <div class="td">FOR PAYMENT</div>
          </div>
      </div>
  </section>
</template>

<script>
export default {
name: "ApplicationTable"
}
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
  }
}
</style>
