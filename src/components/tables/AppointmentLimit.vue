<template>
  <section>
    <div>
      <div class="thead hide-in-mobile">
        <div class="th">FROM</div>
        <div class="th">TO</div>
        <div class="th">COUNT</div>
        <div class="th">ACTIONS</div>
      </div>
      <div>
        <div class="tbody">
          <div class="tr" v-for="(item, index) in appointmentLimits" :key="index">
            <div class="td">{{item.start_date | moment("MMMM DD, YYYY")}}</div>
            <div class="td">{{item.end_date | moment("MMMM DD, YYYY")}}</div>
            <div class="td">{{item.count}}</div>
            <div class="td">EDIT</div>
          </div>
        </div>
        <!-- <div class="tbody" >
          <div class="tr">
            <div class="td">No data available</div>
          </div>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script>
import ButtonBlock from "@/components/ButtonBlock";
import { mapGetters } from "vuex"
export default {
  name: "AppointmentLimit",
  components: {
    ButtonBlock,
  },
    computed: {
    ...mapGetters(["appointmentLimits"]),
  },
    created(){
    this.$store.dispatch('appointmentLimits')
  },
};
</script>

<style scoped lang="scss">
.meta-create-holder {
  width: 100%;
  text-align: right;
}
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
    .td.actions div,
    a {
      color: #1492e6;
      font-size: 13px;
      font-weight: bold;
      text-decoration: none;
      cursor: pointer;
      transition: 0.4s;
    }
    .td.actions a:hover {
      color: #2b2b2b;
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

  .tbody .tr .td.actions {
    text-align: center;
    padding: 0;
  }

  .tbody .tr .td.actions a {
    width: 100%;
    padding: 17px 0px;
    display: block;
    border: 1px solid #bce0fd;
    border-radius: 10px;
  }
  .tbody .tr .td.actions a:hover,
  .tbody .tr .td.actions a:focus {
    color: #fff;
    background-color: #1492e6;
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
