<template>
  <!-- <div class="menu-holder">
    <div class="left-div flex-center">
      <div class="menu-type">
        <div
          :class="{ active: appointmentStatus === 'slot' }"
          @click="changeType('slot')"
        >
          <font-awesome-icon icon="calendar" class="mr5 icon" />
          APPOINTMENT SLOTS
        </div>
      </div>
      <div class="menu-type">
        <div
          :class="{ active: appointmentStatus === 'appointment' }"
          @click="changeType('appointment')"
        >
          <font-awesome-icon icon="calendar" class="mr5 icon" />
          APPOINTMENTS
        </div>
      </div>
    </div>
     <div class="right-div flex-row flex-grow">
        <div class="menu-type" v-if="appointmentStatus === 'pending'">
          <div class="active" @click="showForm">
            <font-awesome-icon icon="plus" class="mr5 icon" />
            ADD
          </div>
        </div>
     </div>
  </div> -->
  <div class="menu-holder">
      <div class="left-div flex-grow">
        <div class="profile-menus flex-row">
          <div class="menu-type" :class="{ active: appointmentStatus === 'slot' }" @click="changeType('slot')" >APPOINTMENT SLOTS</div>
          <div class="menu-type" :class="{ active: appointmentStatus === 'appointment' }" @click="changeType('appointment')">APPOINTMENTS</div>

        </div>
      </div>
      <div class="right-div flex-row flex-grow">
        <div class="menu-type" v-if="appointmentStatus === 'appointment'">
          <div :class="{ active: batchTab === 'batch_1' }" @click="changeTab('batch_1')" >
            BATCH 1
          </div>
        </div>
        <div class="menu-type" v-if="appointmentStatus === 'appointment'">
          <div :class="{ active: batchTab === 'batch_2' }" @click="changeTab('batch_2')">
            BATCH 2
          </div>
      </div>
       <div class="menu-type" v-if="appointmentStatus === 'slot'">
          <div class="active" @click="showForm">
            <font-awesome-icon icon="plus" class="mr5 icon" />
            ADD
          </div>
        </div>
      <base-date-picker customclass="appointment-date-picker" v-model="date" @input="changeDate" v-if="appointmentStatus === 'appointment'"/>
      <base-input-search v-model="search" placeholder="Search by First Name or Last Name" v-if="appointmentStatus === 'appointment'"  @keyup.native="searchData()"/>
      </div>
    </div>
</template>

<script>
import BaseInputSearch from "@/components/forms/BaseInputSearch";
import BaseDatePicker from "@/components/forms/BaseDatePicker";
import BaseSelect from "@/components/forms/BaseSelect";
import moment from "moment-timezone";
import { mapGetters } from "vuex";
export default {
  name: "AppointmentTableMenu",
  components: {
    BaseInputSearch,
    BaseSelect,
    BaseDatePicker
  },
  computed: {
    ...mapGetters(["appointmentStatus", "groups", "batchTab"]),
  },
  mounted(){
    this.date = moment().startOf('day').format()
    this.$store.commit('setCurrentDate', this.date)
    this.$store.dispatch('getAdminAppointments')
  },
  data() {
    return {
      search: "",
      activeTab: "profile",
      activeType: "business",
      date: '',
      filterlist: [
        {
          label: "All",
          value: "all",
        },
        {
          label: "Approved",
          value: "approved",
        },
        {
          label: "Disapproved",
          value: "disapproved",
        },
        {
          label: "For Approval",
          value: "forApproval",
        },
      ],
    };
  },
  methods: {  
    changeDate(){
      this.date = moment(this.date).format()
      this.$store.commit('setCurrentDate', this.date)
      this.$store.dispatch('getAdminAppointments')
    },
    showForm(){
      this.$modal.show("appointmentLimitModal");
    },
    searchData(){
      this.$store.commit('setAppointmentSearch', this.search)
      this.$store.dispatch('getAdminAppointments')
    },
    filter(val){
      this.$store.commit('setFilterBy', val)
      if(this.currentType === 'business'){
        this.$store.dispatch("getAllBusinessApplications");
      }else if(this.currentType === 'real_property'){
        this.$store.dispatch("getAllBuildingApplications");
      }
    },
    changeTab(tab) {
      this.activeTab = tab;
      this.$store.commit("setBatchTab", tab);
      this.$store.dispatch('getAdminAppointments')
    },
    changeType(type) {
      this.activeType = type;
      this.$store.commit("setAppointmentStatus", type);
    //   if (this.type === "adminApplications") {
    //     if (type === "business") {
    //       this.$store.dispatch("getAllBusinessApplications");
    //     } else if (type === "real_property") {
    //       this.$store.dispatch("getAllBuildingApplications");
    //     }
    //   }
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-holder {
  background: #ffffff;
  width: 100%;
  min-height: 60px;
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0px 10px 20px #0000000d;
  .left-div {
    div{
      .menu-type {
        color: #f09795;
        font-weight: bold;    
        font-size: 14px;
        padding: 20px;
        margin-left: 15px;
        cursor: pointer;
        transition: 0.3s;
        border-bottom: 3px solid #fff;
      }
      .active {
        border-color: #e23a36;
        color: #e23a36;
        font-weight: bold;
        margin-bottom: -11px;
      }
    }
  }
.right-div {
  justify-content: flex-end;
  align-items: center;
  .menu-type {
    color: #f09795;
    font-weight: bold;
    font-family: Proxima Nova Rg;
    font-size: 14px;
    padding: 10px 0;
    margin-right: 15px;
    div {
      padding: 10px;
      cursor: pointer;
      border: 3px solid #ffffff;
      transition: 0.3s;
    }
    .active {
      border-color: #FADDDD;
      border-radius: 5px;
      color: #e23a36;
      font-weight: bold;
    }
  }
}
}

.appointment-date-picker{
  margin-right: 10px;
}

@media only screen and (max-width: 1480px){
  .menu-holder .left-div div .menu-type{
      padding: 15px 15px 11px;
      margin-left: 0;
  }
  .menu-holder .right-div .menu-type div{
      font-size: 10px;
  }

  .menu-holder{
     min-height: unset;
     max-height: 45px;
  }
}
</style>
