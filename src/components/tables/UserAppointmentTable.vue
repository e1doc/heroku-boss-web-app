<template>
  <section class="mt30">
    <div class="thead hide-in-mobile">
        <div class="th">Appointment Date</div>
        <div class="th">Appointment Type</div>
        <div class="th">Batch</div>
        <div class="th">Status</div>
        <div class="th">Action</div>
    </div>
    <div class="appointment-table">
        <!-- v-if="adminAppointments.length > 0" -->
      <div class="tbody">
        <div class="tr" v-for="index of 5" :key="index">
            <div class="td">
                October 10, 2020
                <!-- {{item.appointment_date | moment("MMMM DD YYYY")}} -->
            </div>
            <div class="td">
                Business Permit Application
                <!-- {{item.title}} -->
            </div>
            <div class="td">
                Batch #2 - Afternoon
            </div>
            <div class="td">
                For Payment
            </div>
            <div class="td">
                <button-full-outline class="btn-reg" @click="printInvoice()">Print Appointment Slip</button-full-outline>
            </div>
        </div>
      </div>

      <!-- <div class="tbody" v-if="adminAppointments.length < 1">
        <div class="tr">
            <div class="td">No data available</div>
        </div>
      </div> -->
        <!-- <paginate
        v-if="adminAppointments.length > 9"
        :page-count="pageCount"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :click-handler="appointmentClickCallBack"
      >
      </paginate> -->
    </div>
  </section>
</template>

<script>
import ButtonFullOutline from "@/components/ButtonFullOutline";
import { mapGetters } from "vuex";
export default {
  name: "UserAppointmentTable",
  components: {
    ButtonFullOutline,
  }
//   computed:{
//     ...mapGetters(['appointmentCount', 'adminAppointments', 'pageCount'])
//   },
//   mounted(){
//     this.$store.dispatch('getAdminAppointments')
//   },
//   methods:{
//     appointmentClickCallBack(pageNum){
//       this.$store.dispatch('getAdminAppointments', pageNum)
//     },
//   }

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


.btn-reg{
    width: 100%;
    max-width: 230px;
    min-width: unset !important;
    font-size: 14px;
    text-transform: uppercase;
}


.result-count {
    width: 100%;
    text-align: right;
    padding-bottom: 15px;
    margin-bottom: 20px;
    font-size: 18px;
    font-family: Proxima Nova Rg;
    font-weight: bold;
    color: #1492e6;
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
