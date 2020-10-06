<template>
  <div class="menu-holder">
    <div class="left-div flex-center">
      <div class="menu-type">
        <div
          :class="{ active: currentType === 'business' }"
          @click="changeType('business')"
        >
          <font-awesome-icon icon="store" class="mr5 icon" />
          BUSINESS
        </div>
      </div>
      <div class="menu-type">
        <div
          :class="{ active: currentType === 'real_property' }"
          @click="changeType('real_property')"
        >
          <font-awesome-icon icon="city" class="mr5 icon" />
          BUILDING
        </div>
      </div>
    </div>
    <div class="right-div flex-wrap">
      <base-select
        placeholder="Filter"
        :options="filterlist"
        name="filterLists"
        class="mb15"
        customclass="filter-select"
        @change="filter"
        :selected="filterBy"
      />
      <base-input-search v-model="search"  @keyup.native="searchData()"/>
    </div>
  </div>
</template>

<script>
import BaseInputSearch from "@/components/forms/BaseInputSearch";
import BaseSelect from "@/components/forms/BaseSelect";
import { mapGetters } from "vuex";
export default {
  name: "TransactionTableMenu",
  components: {
    BaseInputSearch,
    BaseSelect,
  },
  computed: {
    ...mapGetters(["currentType", "currentTable", "filterBy"]),
  },
  props: {
    type: {
      type: String,
      required: false,
      default: "profile",
    },
  },
  data() {
    return {
      search: "",
      activeTab: "profile",
      activeType: "business",
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
    searchData(){
      if(this.currentType === 'real_property'){
        this.$store.commit('setBuildingSearch', this.search)
        this.$store.dispatch("getAllBuildingApplications");
      }else if(this.currentType === 'business'){
        this.$store.commit('setBusinessSearch', this.search)
        console.log(this.search)
        this.$store.dispatch("getAllBusinessApplications");
      }
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
      this.$store.commit("setCurrentTable", tab);
    },
    changeType(type) {
      this.activeType = type;
      this.$store.commit("setCurrentType", type);
      if (this.type === "adminApplications") {
        if (type === "business") {
          this.$store.dispatch("getAllBusinessApplications");
        } else if (type === "real_property") {
          this.$store.dispatch("getAllBuildingApplications");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-holder {
  background: #ffffff;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0px 10px 20px #0000000d;
  .left-div {
    width: 50%;
    .menu-type {
      color: #f09795;
      font-weight: bold;
      font-size: 13px;
      margin-right: 15px;
      cursor: pointer;
      div {
        padding: 10px;
        border: 3px solid #fff;
      }
      div.active {
        border-color: #fadddd;
        border-radius: 5px;
        color: #e23a36;
      }
    }
  }
  .right-div {
    width: 50%;
    justify-content: flex-end;
  }
}
</style>
