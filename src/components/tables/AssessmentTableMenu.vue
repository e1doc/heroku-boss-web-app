<template>
  <div class="table-menu">
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
            :class="{ active: currentType === 'building' }"
            @click="changeType('building')"
          >
            <font-awesome-icon icon="city" class="mr5 icon" />
            BUILDING
          </div>
        </div>
      </div>

      <!-- DESKTOP FOR ASSESSMENT/ASSESSED TABS -->
      <div class="right-div flex-wrap">
        <div class="menu-type blue hide-in-mobile">
          <div
            :class="{ active: currentTable === 'for_assessment' }"
            @click="changeTab('for_assessment')"
          >
            <font-awesome-icon icon="list-alt" class="mr5 icon" />
            FOR ASSESSMENT
          </div>
        </div>
        <div class="menu-type green hide-in-mobile">
          <div
            :class="{ active: currentTable === 'assessed' }"
            @click="changeTab('assessed')"
          >
            <font-awesome-icon icon="check" class="mr5 icon" />
            ASSESSED
          </div>
        </div>
        <base-input-search
          :placeholder="searchLabel"
          v-model="search"
          @keyup.native="searchData()"
        />
      </div>
    </div>

    <!-- MOBILE FOR ASSESSMENT/ASSESSED TABS -->
    <div class="right-div menu-mobile">
      <div class="menu-type blue">
        <div
          :class="{ active: currentTable === 'for_assessment' }"
          @click="changeTab('for_assessment')"
        >
          <font-awesome-icon icon="list-alt" class="mr5 icon" />
          FOR ASSESSMENT
        </div>
      </div>
      <div class="menu-type green">
        <div
          :class="{ active: currentTable === 'assessed' }"
          @click="changeTab('assessed')"
        >
          <font-awesome-icon icon="check" class="mr5 icon" />
          ASSESSED
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInputSearch from "@/components/forms/BaseInputSearch";
import BaseSelect from "@/components/forms/BaseSelect";
import { mapGetters } from "vuex";
export default {
  name: "AssessmentTableMenu",
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
      searchLabel: "Search by Application no., Account no. and Business name",
      activeTab: "for_assessment",
      activeType: "business",
      businessFilter: "",
      propertyFilter: "",
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
    };
  },
  methods: {
    async searchData() {
      if (this.currentTable === "for_assessment") {
        if (this.currentType === "business") {
          await this.$store.commit("setBusinessAssessmentSearch", this.search);
          await this.$store.dispatch("getForBusinessAssessmentList");
        } else {
          await this.$store.commit("setBuildingAssessmentSearch", this.search);
          await this.$store.dispatch("getForBuildingAssessmentList");
        }
      } else if (this.currentTable === "assessed") {
        if (this.currentType === "business") {
          await this.$store.commit("setBusinessAssessmentSearch", this.search);
          await this.$store.dispatch("getAssessedBusinessList");
        } else {
          await this.$store.commit("setBuildingAssessmentSearch", this.search);
          await this.$store.dispatch("getAssessedBuildingList");
        }
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
    changeTab(tab) {
      this.activeTab = tab;
      this.$store.commit("setCurrentTable", tab);
      if (
        this.currentTable === "for_assessment" &&
        this.currentType === "business"
      ) {
        this.$store.dispatch("getForBusinessAssessmentList");
      } else if (
        this.currentTable === "assessed" &&
        this.currentType === "business"
      ) {
        this.$store.dispatch("getAssessedBusinessList");
      } else if (
        this.currentTable === "for_assessment" &&
        this.currentType === "building"
      ) {
        this.$store.dispatch("getForBuildingAssessmentList");
      } else if (
        this.currentTable === "assessed" &&
        this.currentType === "building"
      ) {
        this.$store.dispatch("getAssessedBuildingList");
      }
    },
    changeType(type) {
      this.activeType = type;
      this.$store.commit("setCurrentType", type);
      this.changeSearchLabel(type);
      if (
        this.currentTable === "for_assessment" &&
        this.currentType === "business"
      ) {
        this.$store.dispatch("getForBusinessAssessmentList");
      } else if (
        this.currentTable === "assessed" &&
        this.changeType === "business"
      ) {
        this.$store.dispatch("getAssessedBusinessList");
      } else if (
        this.currentTable === "for_assessment" &&
        this.currentType === "building"
      ) {
        this.$store.dispatch("getForBuildingAssessmentList");
      } else if (
        this.currentTable === "assessed" &&
        this.currentType === "business"
      ) {
        this.$store.dispatch("getAssessedBuildingList");
      }
    },
    changeSearchLabel(type) {
      if (type === "business") {
        this.searchLabel =
          "Search by Application no., Account no. and Business name";
      } else {
        this.searchLabel = "Search by Application no., Tax Declaration No.";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.table-menu {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .menu-holder {
    width: 100%;
    display: flex;
    flex-direction: row;
    background: #ffffff;
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0px 10px 20px #0000000d;
    .left-div {
      width: 50%;
      .menu-type {
        div {
          color: #f09795;
          font-weight: bold;
          font-size: 14px;
          margin-left: 15px;
          cursor: pointer;
          padding: 15px 15px 18px;
          margin-bottom: -11px;
          transition: 0.3s;
          border-bottom: 3px solid #fff;
        }
        .active {
          border-color: #e23a36;
          color: #e23a36;
          font-weight: bold;
        }
      }
    }
    .right-div {
      width: 50%;
      justify-content: flex-end;
      .menu-type {
        font-weight: bold;
        font-size: 13px;
        margin-right: 15px;
        cursor: pointer;
        div {
          padding: 10px;
          border: 3px solid #fff;
          opacity: 0.5;
        }
        div.active {
          border-color: #fadddd;
          border-radius: 5px;
          opacity: 1;
        }
      }
      .menu-type.blue {
        color: #1492e6;
        div.active {
          border-color: #1492e6;
        }
      }
      .menu-type.green {
        color: #4caf50;
        div.active {
          border-color: #4caf50;
        }
      }
    }
  }

  .right-div.menu-mobile {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    margin-top: 15px;
    display: none;
    .menu-type {
      font-weight: bold;
      font-size: 13px;
      margin-right: 15px;
      cursor: pointer;
      div {
        padding: 10px;
        border: 3px solid #fff;
        opacity: 0.5;
      }
      div.active {
        border-color: #fadddd;
        border-radius: 5px;
        opacity: 1;
      }
    }
    .menu-type.blue {
      color: #1492e6;
      div.active {
        border-color: #1492e6;
      }
    }
    .menu-type.green {
      color: #4caf50;
      div.active {
        border-color: #4caf50;
      }
    }
  }
}

@media only screen and( max-width: 1480px ) {
  body .table-menu .right-div.menu-mobile {
    display: flex;
  }
  .right-div .hide-in-mobile {
    display: none;
  }
}
</style>
