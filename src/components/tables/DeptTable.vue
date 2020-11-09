<template>
  <section>
    <div class="thead hide-in-mobile">
      <div class="th order-no">ORDER NO.</div>
      <div class="th dept-name">DEPARTMENT NAME</div>
    </div>
    <div>
      <div class="tbody" v-if="departments.length > 0">
        <div class="tr" v-for="(item, index) in departments" :key="index">
            <div class="td order-no">
                {{ currentType == 'business' ? item.business_index : item.building_index }}
            </div>
            <div class="td dept-name">
                <span class="td-label show-in-mobile">DEPARTMENT NAME : </span>
                {{ item.name }}
            </div>
        </div>
      </div>
      <div class="tbody" v-if="departments.length < 1">
        <div class="tr">
          <div class="td ml-auto mr-auto">No data available</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DeptTable",
  computed: {
    ...mapGetters(['departments', 'currentType'])
  },
  mounted(){
    this.$store.dispatch("getDepartments")
  }
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
        font-size: 13px;
        font-weight: bold;
        text-align: center;
        padding: 18px 0px;
    }
    .th.order-no{
        flex: .5;
    }
    .th.dept-name{
        flex: 1.5;
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
      font-size: 14px;
      font-family: "Proxima Nova Rg";
      text-align: center;
      padding: 17px 0px;
    }
    .td.order-no{
      flex: .5;
    }
    .td.dept-name{
        flex: 1.5;
    }
  }
}

.bill:hover {
  color: #ffffff !important;
  background-color: #039be5;
}

/*
MOBILE RESPONSIVENESS ------------------------------------------- */

span.td-label.show-in-mobile {
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #000c114d;
}

.show-in-mobile {
  display: none;
}

@media only screen and (max-width: 860px) {
  .show-in-mobile {
    display: block;
  }

  .thead {
    display: none;
  }

  .tbody {
    flex-direction: unset;
    margin-top: 0;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .tbody .tr {
    // background: #eef8ff;
    flex-wrap: wrap;
    flex-direction: unset;
    padding: 15px 20px;
    width: calc(50% - 60px);
    float: left;
    margin: 0 10px 20px;
  }

  .tbody .tr .td {
    flex: unset;
    width: 100%;
    float: left;
    text-align: left;
  }
}

@media only screen and (max-width: 650px) {
  .tbody .tr {
    width: 100%;
    float: left;
    margin: 0 0 20px;
  }
}
</style>
