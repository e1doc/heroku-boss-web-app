<template>
  <section>
    <div class="meta-invoice-holder">
      <downloadable-invoice />
    </div>
    <div v-if="currentType === 'business'">
      <div class="thead hide-in-mobile">
        <div class="th">ACCOUNT NUMBER</div>
        <div class="th">REFERENCE #</div>
        <div class="th">DATE</div>
        <div class="th">BUSINESS NAME</div>
        <div class="th">AMOUNT</div>
        <div class="th">STATUS</div>
        <div class="th">ACTION</div>
      </div>
      <div
        class="tbody"
        v-if="soaList.length > 0 && currentType === 'business'"
      >
        <div class="tr" v-for="(item, index) in soaList" :key="index">
          <div class="td">
            <span class="td-label show-in-mobile">ACCOUNT NUMBER: </span>
            {{ item.business_application.account_number }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">REFERENCE # : </span>
            {{ item.reference_number }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">DATE : </span>
            {{ item.created_at | moment("MMMM DD YYYY") }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">BUSINESS NAME : </span>
            {{
              item.business_application.businessdetails.name !== ""
                ? item.business_application.businessdetails.name
                : item.business_application.businessdetails.trade_name
            }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">AMOUNT : </span>
            ₱ {{ parseFloat(item.amount).toFixed(2) }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">STATUS : </span>
            {{ getStatus(item) }}
          </div>
          <div class="td actions">
            <div class="bill" @click="printSoa('business', item)">
              <font-awesome-icon icon="save" class="mr5 icon" />DOWNLOAD
            </div>
            <div
              class="bill"
              @click="changeSoaStatus(item)"
              :class="{
                disabled:
                  item.landbank_transaction.length < 1 || item.is_verified,
              }"
            >
              PAID
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
        <div class="th">TD #</div>
        <div class="th">REFERENCE #</div>
        <div class="th">DATE</div>
        <div class="th">AMOUNT</div>
        <div class="th">STATUS</div>
        <div class="th">ACTION</div>
      </div>
      <div class="tbody" v-if="soaList.length > 0">
        <div class="tr" v-for="(item, index) in soaList" :key="index">
          <!-- <div class="td w10">
              <span class="td-label show-in-mobile">ACCOUNT # : </span>
              F-02248
          </div> -->
          <div class="td">
            <span class="td-label show-in-mobile">TD #: </span>
            {{ item.building_application.buildingdetails.tax_dec_no }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">REFERENCE # : </span>
            {{ item.reference_number }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">DATE : </span>
            {{ item.created_at | moment("MMMM DD YYYY") }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">AMOUNT : </span>
            ₱ {{ parseFloat(item.amount).toFixed(2) }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">STATUS : </span>
            {{ getStatus(item) }}
          </div>
          <div class="td actions">
            <div class="bill" @click="printSoa('building', item)">
              <font-awesome-icon icon="save" class="mr5 icon" />DOWNLOAD
            </div>
            <div
              class="bill"
              @click="changeSoaStatus(item)"
              :class="{
                disabled:
                  item.landbank_transaction.length < 1 || item.is_verified,
              }"
            >
              PAID
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
        <div class="th">TD #</div>
        <div class="th">REFERENCE #</div>
        <div class="th">DATE</div>
        <div class="th">AMOUNT</div>
        <div class="th">STATUS</div>
        <div class="th">ACTION</div>
      </div>
      <div class="tbody" v-if="soaList.length > 0">
        <div class="tr" v-for="(item, index) in soaList" :key="index">
          <div class="td">
            <span class="td-label show-in-mobile">TD #: </span>
            {{ item.building_application.buildingdetails.tax_dec_no }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">REFERENCE # : </span>
            {{ item.reference_number }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">DATE : </span>
            {{ item.created_at | moment("MMMM DD YYYY") }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">AMOUNT : </span>
            ₱ {{ parseFloat(item.amount).toFixed(2) }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">STATUS : </span>
            {{ getStatus(item) }}
          </div>
          <div class="td actions">
            <div class="bill" @click="printSoa('real_property', item)">
              <font-awesome-icon icon="save" class="mr5 icon" />DOWNLOAD
            </div>
            <div
              class="bill"
              @click="changeSoaStatus(item)"
              :class="{
                disabled:
                  item.landbank_transaction.length < 1 || item.is_verified,
              }"
            >
              PAID
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
      v-if="soaList.length > 0"
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
import DownloadableInvoice from "@/components/payment/DownloadableInvoice";
import { mapGetters } from "vuex";
export default {
  name: "SoaTable",
  components: {
    DownloadableInvoice,
  },
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
  mounted() {
    this.$store.commit("setCurrentType", "business");
  },
  methods: {
    async printSoa(type, soa) {
      await this.$store.commit("setLoading", true);
      await this.$store.commit("setCurrentSoaObj", soa);
      if (type === "business") {
        await this.$store.commit(
          "setCurrentSelectedBusiness",
          soa.business_application
        );
      } else {
        await this.$store.commit(
          "setCurrentSelectedProperty",
          soa.building_application
        );
      }
      await this.$store.commit("setCurrentSoaType", type);
      await this.$store.commit("setPrintInvoice", true);
      await this.$store.commit("setLoading", false);
    },
    getStatus(data) {
      if (data.landbank_transaction.length > 0) {
        if (data.is_verified) {
          return "VERIFIED";
        } else {
          return "FOR VERIFICATION";
        }
      } else {
        return "PENDING";
      }
    },
    redirect(id, type, soa) {
      if (soa.appointment === null && soa.banktransaction === null) {
        this.$store.commit("setCurrentSoaType", type);
        this.$store.commit("setCurrentSoa", { id, type });
        this.$store.commit("setCurrentSoaObj", soa);
        this.$store.commit("setAppointmentAction", "add");
        if (type === "business") {
          this.$store.commit(
            "setCurrentSelectedBusiness",
            soa.business_application
          );
        } else {
          this.$store.commit(
            "setCurrentSelectedProperty",
            soa.building_application
          );
        }
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
      await this.$store.dispatch("getAdminSoaList");
      await this.$store.commit("setLoading", false);
    },
    async paginateClickCallBack(pageNum) {
      await this.$store.commit("setLoading", true);
      await this.$store.dispatch("getAdminSoaList", pageNum);
      await this.$store.commit("setLoading", false);
    },
    async changeSoaStatus(item) {
      if (item.landbank_transaction.length > 0 && !item.is_verified) {
        this.$swal({
          title: "Confirm Action",
          text: "Are you sure you want to verify this SOA as paid?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "VERIFY",
          cancelButtonText: "CANCEL",
        }).then((result) => {
          if (result.value) {
            this.$store.dispatch("verifySoa", { id: item.id });
          }
        });
      }
    },
  },
  created() {
    this.setUpList();
  },
};
</script>

<style lang="scss" scoped>
.meta-invoice-holder {
  position: absolute;
  opacity: 0;
  top: -500px;
  z-index: -1;
}
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
.disabled {
  border-color: gray !important;
  color: gray !important;
}
.disabled:hover {
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
    flex: 1;
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
      flex: 1;
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
