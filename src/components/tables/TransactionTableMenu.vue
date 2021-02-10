<template>
  <div class="menu-holder">
    <div class="left-div flex-center">
      <div class="menu-type">
        <div
          :class="{ active: currentType === 'business' }"
          @click="changeType('business')"
          v-if="
            groups.includes('superadmin') ||
            groups.includes('business_application_approver') ||
            groups.includes('business_application_read')
          "
        >
          <font-awesome-icon icon="store" class="mr5 icon" />
          BUSINESS
        </div>
      </div>
      <div class="menu-type">
        <div
          :class="{ active: currentType === 'building' }"
          @click="changeType('building')"
          v-if="
            groups.includes('superadmin') ||
            groups.includes('building_application_approver') ||
            groups.includes('building_application_read')
          "
        >
          <font-awesome-icon icon="city" class="mr5 icon" />
          BUILDING
        </div>
      </div>
      <div class="menu-type" v-if="type === 'transaction'">
        <div
          :class="{ active: currentType === 'real_property' }"
          @click="changeType('real_property')"
          v-if="
            groups.includes('superadmin') ||
            groups.includes('building_application_approver') ||
            groups.includes('building_application_read')
          "
        >
          <font-awesome-icon icon="city" class="mr5 icon" />
          REAL PROPERTY
        </div>
      </div>
    </div>
    <div class="right-div flex-wrap">
      <base-select
        placeholder="Filter"
        :options="filterList2"
        name="filterLists"
        class="mb15"
        customclass="filter-select"
        ref="filter1"
        @change="filter"
        v-if="currentType === 'business' && type !== 'transaction'"
        :value="filterBy"
      />
      <base-select
        placeholder="Filter"
        :options="filterList1"
        name="propertyFilterLists"
        class="mb15"
        customclass="filter-select"
        ref="filter2"
        @change="filter"
        :value="propertyFilterBy"
        v-if="currentType === 'building' && type !== 'transaction'"
      />
      <base-select
        placeholder="Filter"
        :options="bankTransactionFilter"
        name="propertyFilterLists"
        class="mb15"
        customclass="filter-select"
        ref="filter2"
        @change="filterBankTransaction"
        :value="bankTransactionFilterBy"
        v-if="type === 'transaction'"
      />
      <base-input-search
        v-if="type !== 'transaction'"
        v-model="search"
        @keyup.native="searchData()"
      />
      <base-input-search
        v-if="type == 'transaction'"
        v-model="search2"
        placeholder="Search for reference no."
        @keyup.native="searchTransaction()"
      />
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
    ...mapGetters([
      "currentType",
      "currentTable",
      "filterBy",
      "propertyFilterBy",
      "groups",
    ]),
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
      businessFilter: "",
      propertyFilter: "",
      bankTransactionFilterBy: "",
      search2: "",
      filterList1: [
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
          label: "For Inspection",
          value: "isForInspection",
        },
        {
          label: "For Approval",
          value: "forApproval",
        },
      ],
      filterList2: [
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
          label: "For Assessment",
          value: "forAssessment",
        },
        {
          label: "For Evaluation",
          value: "forEvaluation",
        },
      ],
      bankTransactionFilter: [
        { label: "ALL", value: "all" },
        { label: "VERIFIRED", value: true },
        { label: "FOR VERIFICATION", value: false },
      ],
    };
  },
  methods: {
    searchTransaction() {
      this.$store.commit("setTransactionSearch", this.search2);
      this.$store.dispatch("getAllBankTransactions", { page: 1 });
    },
    searchData() {
      if (this.currentType === "real_property") {
        this.$store.commit("setBuildingSearch", this.search);
        this.$store.dispatch("getAllBuildingApplications");
      } else if (this.currentType === "business") {
        this.$store.commit("setBusinessSearch", this.search);
        this.$store.dispatch("getAllBusinessApplications");
      }
    },
    filter(val) {
      if (this.currentType === "business") {
        this.$store.commit("setFilterBy", val);
        this.$store.dispatch("getAllBusinessApplications");
      } else if (this.currentType === "real_property") {
        this.$store.commit("setPropertyFilterBy", val);
        this.$store.dispatch("getAllBuildingApplications");
      }
    },
    filterBankTransaction(val) {
      this.$store.dispatch("getAllBankTransactions", { filter: val });
    },
    changeTab(tab) {
      this.activeTab = tab;
      this.$store.commit("setCurrentTable", tab);
    },
    changeType(type) {
      this.$store.commit("setCurrentPageNum", 1);
      this.activeType = type;
      this.$store.commit("setCurrentType", type);
      if (this.type === "adminApplications") {
        if (type === "business") {
          this.$store.dispatch("getAllBusinessApplications");
        } else if (type === "real_property") {
          this.$store.dispatch("getAllBuildingApplications");
        }
      } else {
        this.$store.dispatch("getAllBankTransactions", { page: 1 });
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
