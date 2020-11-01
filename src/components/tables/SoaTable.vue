<template>
  <section>
    <div v-if="currentType === 'business'">
      <div class="thead hide-in-mobile">
        <!-- <div class="th w10">ACCOUNT #</div> -->
        <div class="th w15">REFERENCE #</div>
        <div class="th w10">DATE</div>
        <div class="th w25">BUSINESS NAME</div>
        <div class="th w15">AMOUNT</div>
        <div class="th w10">STATUS</div>
        <div class="th w15">ACTIONS</div>
      </div>
      <div class="tbody" v-if="soaList.length > 0">
        <div class="tr" v-for="(item, index) in soaList" :key="index">
          <!-- <div class="td w10">
              <span class="td-label show-in-mobile">ACCOUNT # : </span>
              F-02248
          </div> -->
          <div class="td w15">
            <span class="td-label show-in-mobile">REFERENCE # : </span>
            {{ item.reference_number }}
          </div>
          <div class="td w10">
            <span class="td-label show-in-mobile">DATE : </span>
            {{ item.date_issued | moment("MMMM DD YYYY") }}
          </div>
          <div class="td w25">
            <span class="td-label show-in-mobile">BUSINESS NAME : </span>
            {{ item.business_application.businessdetails.name }}
          </div>
          <div class="td w15">
            <span class="td-label show-in-mobile">AMOUNT : </span>
            ₱ {{ parseFloat(item.amount).toFixed(2) }}
          </div>
          <div class="td w10">
            <span class="td-label show-in-mobile">STATUS : </span>
            PENDING
          </div>
          <div class="td w15 actions">
            <div
              class="bill"
              @click="redirect(item.id, 'business', item)"
              :class="{disabled: item.appointment !== null }"
            >
              <font-awesome-icon icon="receipt" class="mr5 icon" />PAY NOW
            </div>
          </div>
        </div>
      </div>
      <div class="tbody" v-if="soaList.length < 1">
        <div class="tr">
          <div class="td text-center w-100">No data available</div>
        </div>
      </div>
    </div>
    <div v-if="currentType === 'building'">
      <div class="thead hide-in-mobile">
        <div class="th w15">TD #</div>
        <div class="th w15">REFERENCE #</div>
        <div class="th w15">DATE</div>
        <div class="th w15">AMOUNT</div>
        <div class="th w10">STATUS</div>
        <div class="th w15">ACTIONS</div>
      </div>
      <div class="tbody" v-if="soaList.length > 0">
        <div class="tr" v-for="(item, index) in soaList" :key="index">
          <!-- <div class="td w10">
              <span class="td-label show-in-mobile">ACCOUNT # : </span>
              F-02248
          </div> -->
          <div class="td w15">
            <span class="td-label show-in-mobile">TD #: </span>
            {{ item.building_application.buildingdetails.tax_dec_no }}
          </div>
          <div class="td w15">
            <span class="td-label show-in-mobile">REFERENCE # : </span>
            {{ item.reference_number }}
          </div>
          <div class="td w15">
            <span class="td-label show-in-mobile">DATE : </span>
            {{ item.date_issued | moment("MMMM DD YYYY") }}
          </div>
          <div class="td w15">
            <span class="td-label show-in-mobile">AMOUNT : </span>
            ₱ {{ parseFloat(item.amount).toFixed(2) }}
          </div>
          <div class="td w10">
            <span class="td-label show-in-mobile">STATUS : </span>
            PENDING
          </div>
          <div class="td w15 actions">
            <div
              class="bill"
              @click="redirect(item.id, 'building', item)"
              :class="{disabled: item.appointment !== null }"
            >
              <font-awesome-icon icon="receipt" class="mr5 icon" />PAY NOW
            </div>
          </div>
        </div>
      </div>
      <div class="tbody" v-if="soaList.length < 1">
        <div class="tr">
          <div class="td text-center w-100">No data available</div>
        </div>
      </div>
    </div>
    <div v-if="currentType === 'real_property'">
      <div class="thead hide-in-mobile">
        <div class="th w15">TD #</div>
        <div class="th w15">REFERENCE #</div>
        <div class="th w15">DATE</div>
        <div class="th w15">AMOUNT</div>
        <div class="th w10">STATUS</div>
        <div class="th w15">ACTIONS</div>
      </div>
      <div class="tbody" v-if="soaList.length > 0">
        <div class="tr" v-for="(item, index) in soaList" :key="index">
          <div class="td w25">
            <span class="td-label show-in-mobile">TD #: </span>
            {{ item.building_application.buildingdetails.tax_dec_no }}
          </div>
          <div class="td w15">
            <span class="td-label show-in-mobile">REFERENCE # : </span>
            {{ item.reference_number }}
          </div>
          <div class="td w10">
            <span class="td-label show-in-mobile">DATE : </span>
            {{ item.date_issued | moment("MMMM DD YYYY") }}
          </div>
          <div class="td w15">
            <span class="td-label show-in-mobile">AMOUNT : </span>
            ₱ {{ parseFloat(item.amount).toFixed(2) }}
          </div>
          <div class="td w10">
            <span class="td-label show-in-mobile">STATUS : </span>
            PENDING
          </div>
          <div class="td w15 actions">
            <div
              class="bill"
              @click="redirect(item.id, 'rpt', item)"
              :class="{disabled: item.appointment !== null }"
            >
              <font-awesome-icon icon="receipt" class="mr5 icon" />PAY NOW
            </div>
          </div>
        </div>
      </div>
      <div class="tbody" v-if="soaList.length < 1">
        <div class="tr">
          <div class="td text-center w-100">No data available</div>
        </div>
      </div>
    </div>
    <paginate
      v-if="soaList.length > 9 && currentType === 'business'"
      :page-count="pageCount"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :click-handler="paginateClickCallBack"
    >
    </paginate>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SoaTable",
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
      console.log("soa", soa);
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
  border: 2px #039be5 solid;
  border-radius: 5px;
  transition: 0.4s;
  cursor: pointer;
}
.bill:hover {
  color: #ffffff;
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
