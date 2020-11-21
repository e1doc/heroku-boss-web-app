<template>
  <section>
    <div class="thead hide-in-mobile">
      <!-- <div class="th" v-if="currentType === 'business'">ACCOUNT #</div> -->
      <div class="th" v-if="currentType === 'building' || currentType === 'real_property'">TD #</div>
      <div class="th" v-if="currentType === 'business'">BUSINESS NAME</div>
      <div class="th" v-if="currentType === 'building' || currentType === 'real_property'">OWNER NAME</div>
      <div class="th">ACTIONS</div>
    </div>
    <div v-if="currentType === 'business'">
      <div class="tbody" v-if="businessProfiles.length > 0">
        <div class="tr" v-for="(business, index) in businessProfiles" :key="index">
          <!-- <div class="td">
            <span
              class="td-label show-in-mobile"
              >ACCOUNT # :
            </span>
            {{business.account_number}}
          </div> -->
          <div class="td" v-if="currentType === 'business'">
            <span class="td-label show-in-mobile">BUSINESS NAME : </span>
            {{business.businessdetails.name}}
          </div>
          <div class="td" v-if="currentType === 'building'">
            <span class="td-label show-in-mobile">OWNER NAME : </span>
            {{business.businessbasicinformation.owner_first_name}} {{business.businessbasicinformation.owner_last_name}}
          </div>
          <div class="td actions">
            <div v-if="isFeatureImplemented">
              <font-awesome-icon icon="sync-alt" class="mr5 icon" /> RENEW
            </div>
            <div class="bill" @click="showModal('business',business)">
              <font-awesome-icon icon="receipt" class="mr5 icon" />BILL
            </div>
          </div>
        </div>
      </div>
      <div class="tbody" v-if="businessProfiles.length < 1">
        <div class="tr">
          <div class="td">No data available</div>
        </div>
      </div>
    </div>
    <div v-if="currentType === 'building'">
      <div class="tbody" v-if="buildingProfiles.length > 0">
        <div class="tr" v-for="(building, index) in buildingProfiles" :key="index">
          <div class="td">
            <span
              class="td-label show-in-mobile"
              >TD # :
            </span>
            {{building.buildingdetails.tax_dec_no}}
          </div>
          <div class="td" v-if="currentType === 'building'">
            <span class="td-label show-in-mobile">OWNER NAME : </span>
            <span >{{building.buildingbasicinformation.owner_first_name}} {{building.buildingbasicinformation.owner_last_name}}</span>
          </div>
          <div class="td actions">
            <div v-if="isFeatureImplemented">
              <font-awesome-icon icon="sync-alt" class="mr5 icon" /> RENEW
            </div>
            <div class="bill" @click="showModal()">
              <font-awesome-icon icon="receipt" class="mr5 icon" />BILL
            </div>
          </div>
        </div>
      </div>
      <div class="tbody" v-if="buildingProfiles.length < 1">
        <div class="tr">
          <div class="td">No data available</div>
        </div>
      </div>
    </div>
       <div v-if="currentType === 'real_property'">
      <div class="tbody" v-if="realPropertyProfiles.length > 0">
        <div class="tr" v-for="(building, index) in realPropertyProfiles" :key="index">
          <div class="td">
            <span
              class="td-label show-in-mobile"
              >TD # :
            </span>
            {{building.buildingdetails.tax_dec_no}}
          </div>
          <div class="td" v-if="currentType === 'real_property'">
            <span class="td-label show-in-mobile">OWNER NAME : </span>
            <span>{{building.buildingbasicinformation.owner_first_name}}</span>
          </div>
          <div class="td actions">
            <div v-if="isFeatureImplemented">
              <font-awesome-icon icon="sync-alt" class="mr5 icon" /> RENEW
            </div>
            <div class="bill" @click="showModal()">
              <font-awesome-icon icon="receipt" class="mr5 icon" />BILL
            </div>
          </div>
        </div>
      </div>
      <div class="tbody" v-if="realPropertyProfiles.length < 1">
        <div class="tr">
          <div class="td">No data available</div>
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
    ...mapGetters(["currentType", "businessProfiles", "buildingProfiles","realPropertyProfiles"])
  },
  data(){
    return{
      isFeatureImplemented: false
    }
  },
  mounted(){
    this.$store.dispatch('getBusinessProfiles')
    this.$store.dispatch('getBuildingProfiles')
    this.$store.dispatch('getRealPropertyProfiles')
  },
  methods: {
    showModal(type, item) {
      if(type === 'business'){
      this.$store.commit('setCurrentSelectedBusiness', item)
      this.$modal.show("soaModal");
      }
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
