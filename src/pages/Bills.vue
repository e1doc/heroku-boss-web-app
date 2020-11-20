<template>
  <section>
    <div class="container">
      <div class="mt50 invoice-header"> 
        <profile-table-menu type="bills" />
      </div>
      <div class="mt50 bills-table">
        <bills-table />
      </div>
      <div class="bills-actions">
          <div class="pay-button">
            <font-awesome-icon icon="receipt" class="mr5 icon" />PAY NOW
          </div>
          <div class="cancel-button">
            <font-awesome-icon icon="times" class="mr5 icon" />PAY LATER
          </div>
      </div>
    </div>
  </section>
</template>

<script>
import ProfileTableMenu from "@/components/tables/ProfileTableMenu";
import BillsTable from "@/components/tables/BillsTable";
export default {
  name: "Bills",
  components: {
    ProfileTableMenu,
    BillsTable
  },
};
</script>

<style lang="scss" scoped>
section{
    // min-height: calc( 100vh - 321px);
    padding-bottom: 30px;
}

.bills-actions {
    max-width: 391px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;

    .pay-button {
      color: #ffffff;
      background-color: #039be5;
      font-size: 15px;
      font-weight: bold;
      text-align: center;
      max-width: 117px;
      float: left;
      padding: 18px 40px;
      min-width: 91px;
      margin: 0 10px 3px;
      border: 2px #039be5 solid;
      border-radius: 5px;
      transition: 0.4s;
      cursor: pointer;
    }
    .pay-button:hover {
      color: #039be5;
      background-color: transparent;
    }

    .cancel-button {
      color: #d32f2f;
      background-color: transparent;
      font-size: 15px;
      font-weight: bold;
      text-align: center;
      max-width: 117px;
      float: left;
      padding: 18px 40px;
      margin: 0 10px 3px;
      border: 2px #d32f2f solid;
      border-radius: 5px;
      transition: 0.4s;
      cursor: pointer;
    }
    .cancel-button:hover {
      color: #ffffff;
      background-color: #d32f2f;
    }
}

.bills-table{
  margin-bottom: 50px;
}

@media only screen and ( max-width : 768px ){
    .invoice-header,
    .bills-table{
        margin-top: 30px;
    }
}
</style>
