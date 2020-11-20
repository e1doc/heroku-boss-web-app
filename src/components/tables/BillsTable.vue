<template>
  <section>
    <div>
      <div class="thead hide-in-mobile">
        <div class="th w15">REFERENCE #</div>
        <div class="th w15">QUARTER</div>
        <div class="th w15">AMOUNT</div>
        <div class="th w15">ACTIONS</div>
      </div>
      <div class="tbody">
        <div class="tr">
          <div class="td w15">
            <span class="td-label show-in-mobile">TD #: </span>
            test
          </div>
          <div class="td w15">
            <span class="td-label show-in-mobile">DATE : </span>
            test
          </div>
          <div class="td w15">
            <span class="td-label show-in-mobile">AMOUNT : </span>
            ₱ 4,428.00
          </div>
           <div class="td w15 actions">
            <div class="bill">
              <font-awesome-icon icon="eye" class="mr5 icon" />VIEW DETAILS
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="tbody">
        <div class="tr">
          <div class="td text-center w-100">No data available</div>
        </div>
      </div> -->
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "BillsTable",
  computed: {
    ...mapGetters([
      "currentType",
      "soaList",
      "pageCount",
      "currentType",
      "currentSoa",
    ]),
  },
  watch: {
    currentType: {
      deep: true,
      handler(status) {
        this.setUpList();
      },
    },
  },
  mounted(){
    console.log('soa list', this.soaList)
  },
  methods: {
    redirect(id, type, soa) {
      if(soa.appointment === null){
      this.$store.commit("setCurrentSoa", { id, type });
      this.$store.commit("setCurrentSoaObj", soa);
      this.$store.commit("setAppointmentAction", "add");
      this.$router.push({ path: "payment" });
      }
    },
    reschedule(appointment, soa) {
      this.$store.commit("setCurrentAppointment", appointment);
      this.$store.commit("setAppointmentAction", "update");
      this.$store.commit("setCurrentSoaObj", soa);
      this.$router.push({ name: "AddAppointment" });
    },
    async setUpList() {
      await this.$store.commit("setLoading", true);
      await this.$store.dispatch("getSoaList");
      console.log(this.soaList);
      await this.$store.commit("setLoading", false);
    },
    async paginateClickCallBack(pageNum) {
      await this.$store.commit("setLoading", true);
      await this.$store.dispatch("getSoaList", pageNum);
      await this.$store.commit("setLoading", false);
    },
  },
  created() {
    this.setUpList();
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
.disabled{
  border-color: gray !important;
  color: gray !important;
}
.disabled:hover{
  border-color: gray !important;
  color: gray !important;
  background: none !important;
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
    .actions {
      padding: 7px 0px;
    }
  }
}

.bill {
  color: #039be5;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  max-width: 117px;
  padding: 8px 0px;
  margin: 0 auto 3px;
  // border: 2px #039be5 solid;
  border-radius: 5px;
  transition: 0.4s;
  cursor: pointer;
}
.bill:hover {
  text-decoration: underline;
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
