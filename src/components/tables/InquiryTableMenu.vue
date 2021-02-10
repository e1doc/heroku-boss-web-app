<template>
  <div class="menu-container">
    <div class="menu-holder">
      <div class="left-div flex-center">
        <div class="menu-type">
          <div
            :class="{ active: currentType === 'all_inquiries' }"
            @click="changeType('all_inquiries')"
          >
            <font-awesome-icon icon="inbox" class="mr5 icon" />
            ALL
          </div>
        </div>
        <div class="menu-type">
          <div
            :class="{ active: currentType === 'unread_inquiries' }"
            @click="changeType('unread_inquiries')"
          >
            <font-awesome-icon icon="envelope" class="mr5 icon" />
            UNRESPONDED
          </div>
        </div>
      </div>
      <div class="right-div flex-wrap">
        <div class="menu-type">
          <div
            :class="{ active: currentTable === 'inquiries' }"
            @click="changeTab('inquiries')"
          >
            <font-awesome-icon icon="inbox" class="mr5 icon" />
            INQUIRIES
          </div>
        </div>
        <div class="menu-type">
          <div
            :class="{ active: currentTable === 'remarks' }"
            @click="changeTab('remarks')"
          >
            <font-awesome-icon icon="inbox" class="mr5 icon" />
            REMARKS
          </div>
        </div>
        <div class="menu-type">
          <div
            :class="{ active: currentTable === 'delinquent' }"
            @click="changeTab('delinquent')"
          >
            <font-awesome-icon icon="inbox" class="mr5 icon" />
            DELINQUENT PAYMENTS
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-div flex-wrap">
      <base-select
        v-if="currentTable !== 'delinquent'"
        placeholder="Filter By Department"
        :options="departments"
        name="selectDepartment"
        class="select-dept-input"
        v-model="department"
        @change="onDepartmentChange"
      />
      <!-- <base-date-picker customclass="inquiry-date-picker" v-model="date" /> -->
      <base-input-search
        v-model="search"
        @keyup.native="searchData()"
        :placeholder="
          currentTable === 'remarks'
            ? 'Search by sender or application no.'
            : currentTable === 'delinquent'
            ? 'Search by sender or TD no.'
            : 'Search by sender'
        "
      />
    </div>
  </div>
</template>

<script>
import BaseInputSearch from "@/components/forms/BaseInputSearch";
import BaseDatePicker from "@/components/forms/BaseDatePicker";
import BaseSelect from "@/components/forms/BaseSelect";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "InquiryTableMenu",
  components: {
    BaseInputSearch,
    BaseDatePicker,
    BaseSelect,
  },
  computed: {
    ...mapGetters(["currentType", "currentTable", "authToken"]),
  },
  props: {
    type: {
      type: String,
      required: true,
      default: "profile",
    },
  },
  mounted() {
    if (
      this.currentType !== "all_inquiries" &&
      this.currentType !== "unread_inquiries"
    ) {
      this.$store.commit("setCurrentType", "all_inquiries");
    }
  },
  data() {
    return {
      activeTab: "profile",
      activeType: "all_inquiries",
      search: "",
      departments: [],
      date: "",
      department: "",
    };
  },
  created() {
    this.getDepartments();
  },
  methods: {
    async onDepartmentChange() {
      this.$store.commit("setDepartmentFilter", this.department);
      await this.$store.dispatch("getAllAdminInquiries", {
        page: 1,
        filter_by: this.currentType,
      });
    },
    changeTab(tab) {
      this.$store.commit("setCurrentPageNum", 1);
      this.activeTab = tab;
      this.$store.commit("setCurrentTable", tab);
    },
    changeType(type) {
      this.$store.commit("setCurrentPageNum", 1);
      this.activeType = type;
      this.$store.commit("setCurrentType", type);
    },
    async searchData() {
      this.$store.commit("setInquirySearch", this.search);
      if (this.currentTable === "inquiries") {
        await this.$store.dispatch("getAllAdminInquiries", {
          page: 1,
          filter_by: this.currentType,
        });
      } else if (this.currentTable === "remarks") {
        await this.$store.dispatch("getAllAdminRemarks", {
          page: 1,
          filter_by: this.currentType,
        });
      } else {
        await this.$store.dispatch("getAllDelinquentPayments", {
          page: 1,
          filter_by: this.currentType,
        });
      }
    },
    async getDepartments() {
      const result = await axios.get(
        `${process.env.VUE_APP_API_URL}/api/department-list/`,
        { headers: { Authorization: `jwt ${this.authToken}` } }
      );
      if (result.data.length > 0) {
        let defaultOption = {
          label: "All",
          value: "all",
        };
        this.departments.push(defaultOption);
        result.data.forEach((item) => {
          let option = {
            label: item.name,
            value: item.name,
          };
          this.departments.push(option);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .menu-holder {
    background: #ffffff;
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0px 10px 20px #0000000d;
    margin-bottom: 30px;
    .left-div,
    .right-div {
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
  .bottom-div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    .inquiry-date-picker {
      margin-right: 15px;
    }
    .select-dept-input {
      margin-right: 15px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
  }
}
</style>
