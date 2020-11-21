<template>
  <div class="menu-holder">
      <div class="left-div flex-grow">
        <div class="profile-menus flex-row">
            <div class="menu-type" :class="{ active: activeType === 'business' }" @click="changeType('business')">BUSINESS</div>
            <div class="menu-type" :class="{ active: activeType === 'building' }" @click="changeType('building')">BUILDING</div>
        </div>
      </div>
      <div class="right-div flex-row flex-grow">
        <div class="menu-type">
           <div class="active" @click="showForm()">
                <font-awesome-icon icon="plus" class="mr5 icon" />
                ADD
          </div>
        </div>
        <div class="menu-type">
           <div class="active" @click="showOrder()">
                <font-awesome-icon icon="sort" class="mr5 icon" />
                RE-ORDER
          </div>
      </div>
      
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
  name: "buildingTableMenu",
  components: {
    BaseInputSearch,
    BaseSelect,
    BaseDatePicker
  },
  computed: {
    ...mapGetters(["groups", "batchTab"]),
  },
  mounted(){
    this.$store.commit('setCurrentType','business')
  },
  data() {
    return {
      search: "",
      activeTab: "business",
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
    showForm(){
      this.$modal.show("departmentModal");
    },
    showOrder(){
      this.$modal.show("departmentOrderModal");
    },
    changeTab(tab) {
      this.activeTab = tab;
      this.$store.commit("setCurrentTable", tab);
    },
    changeType(type) {
      this.activeType = type;
      this.$store.commit("setCurrentType", type);
      this.$store.dispatch("getDepartments")
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
      .active:hover{
        background-color: #e23a36;
        border-color: #e23a36;
        color: #fff;
      }
  }
}
}

.building-date-picker{
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
