<template>
  <div class="menu-holder">
    <div class="left-div flex-grow">
      <div class="soa-menus flex-row">
        <div class="menu-type active">STATEMENT OF ACCOUNTS</div>
      </div>
    </div>
    <div class="right-div flex-row flex-grow" v-if="type !== 'bills'">
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
      <div class="menu-type" v-if="currentTable !== 'applications'">
        <div
          :class="{ active: currentType === 'real_property' }"
          @click="changeType('real_property')"
        >
          <font-awesome-icon icon="city" class="mr5 icon" />
          REAL PROPERTY
        </div>
      </div>
      <div class="search-menu flex-center">
        <base-input-search
          v-model="search"
          @keyup.native="searchData()"
          :placeholder="searchLabel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BaseInputSearch from "@/components/forms/BaseInputSearch";
export default {
  name: "SoaTableMenu",
  components: {
    BaseInputSearch,
  },
  computed: {
    ...mapGetters(["currentType", "currentTable"]),
  },
  props: {
    type: {
      type: String,
      required: false,
      default: "soa",
    },
  },
  mounted() {
    this.$store.commit("setCurrentType", "business");
  },
  data() {
    return {
      activeTab: "soa",
      activeType: "business",
      search: "",
      searchLabel: "Search by ref no.",
    };
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;
      this.$store.commit("setCurrentTable", tab);
    },

    async changeType(type) {
      this.activeType = type;
      await this.$store.commit("setCurrentType", type);
      await this.$store.commit("setSoaFilter", type);
      await this.$store.dispatch("getDepartments");
      this.changeSearchInputLabel(type);
    },
    async searchData() {
      this.$store.commit("setSoaSearch", this.search);
      await this.$store.dispatch("getAdminSoaList");
    },

    changeSearchInputLabel(type) {
      if (type === "business") {
        this.searchLabel = "Search by ref no.";
      } else if (type === "building") {
        this.searchLabel = "Search by ref no. and building no.";
      } else {
        this.searchLabel = "Search by ref no and tax declaration no.";
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
  padding: 0;
  border-radius: 8px;
  box-shadow: 0px 10px 20px #0000000d;
}

.left-div {
  div {
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
    }
  }
}

.right-div {
  justify-content: flex-end;
  .menu-type {
    color: #f09795;
    font-weight: bold;
    font-size: 12px;
    padding: 10px 0;
    margin-right: 15px;
    div {
      padding: 10px;
      cursor: pointer;
      border: 3px solid #ffffff;
      transition: 0.3s;
    }
    .active {
      border-color: #fadddd;
      border-radius: 5px;
      color: #e23a36;
      font-weight: bold;
    }
  }
  .search-menu {
    padding-right: 15px;
  }
}

/*
MOBILE RESPONSIVENESS ------------------------------------------- */
@media only screen and (max-width: 768px) {
  .menu-holder {
    box-shadow: none;
    background: transparent;
    flex-direction: unset;
    flex-wrap: wrap;
  }

  .right-div .menu-type {
    margin-left: 15px;
    margin-right: 0;
  }
  .left-div {
    width: 100%;
    flex-grow: unset;
    flex-wrap: wrap;
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 4;
    background-color: #fff;
    box-shadow: 0px 0px 20px rgba(127, 127, 127, 0.1);
  }

  .left-div .profile-menus .menu-type {
    border-bottom: 0;
    border-top: 3px solid #fff;
    margin-left: 0;
    width: calc(100% / 3);
    text-align: center;
    padding: 15px;
  }

  .left-div .soa-menus .menu-type {
    border-bottom: 0;
    border-top: 3px solid #fff;
    margin-left: 0;
    width: 100%;
    text-align: center;
    padding: 15px;
  }

  .left-div div .menu-type.active {
    border-color: #e23a36;
    background: #e23a36;
    color: #fff;
  }

  .profile-menus {
    width: 100%;
  }
}

@media only screen and (max-width: 450px) {
  .left-div div .menu-type,
  .right-div .menu-type {
    font-size: 12px;
  }
}
</style>
