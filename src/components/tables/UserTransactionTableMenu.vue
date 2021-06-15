<template>
  <div class="menu-holder">
    <div class="left-div flex-grow">
      <div class="profile-menus flex-row">
        <div
          class="menu-type"
          :class="{ active: currentTable === 'landbank' }"
          @click="changeTab('landbank')"
        >
          ONLINE PAYMENT
        </div>
        <div
          class="menu-type"
          :class="{ active: currentTable === 'other_banks' }"
          @click="changeTab('other_banks')"
        >
          OTHER BANKS
        </div>
      </div>
    </div>
    <div class="right-div flex-grow flex-row">
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
      <div class="menu-type">
        <div
          :class="{ active: currentType === 'real_property' }"
          @click="changeType('real_property')"
        >
          <font-awesome-icon icon="city" class="mr5 icon" />
          REAL PROPERTY
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
  name: "UserTransactionTableMenu",
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
      bankTransactionFilter: [
        { label: "ALL", value: "all" },
        { label: "VERIFIRED", value: true },
        { label: "FOR VERIFICATION", value: false },
      ],
    };
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;
      this.$store.commit("setCurrentTable", tab);
    },
    changeType(type) {
      this.activeType = type;
      this.$store.commit("setCurrentType", type);
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-holder {
  background: #ffffff;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0px 10px 20px #0000000d;
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
}

/*
MOBILE RESPONSIVENESS ------------------------------------------- */
@media (max-width: 991px) {
  .menu-holder .right-div {
    justify-content: center;
  }
}

@media only screen and (max-width: 768px) {
  .menu-holder {
    box-shadow: none;
    background: transparent;
    flex-direction: unset;
    padding: 0;
  }

  .menu-holder .right-div {
    flex-wrap: unset;
    justify-content: center;
    text-align: center;
  }

  .menu-type .icon {
    margin-bottom: 10px;
    width: 100%;
  }

  .profile-menus {
    width: 100%;
  }
  .menu-holder .right-div .menu-type {
    display: flex;
    flex-wrap: wrap;
    align-self: stretch;
    font-size: 11px;
    margin: 0px 5px;
  }

  .menu-holder .right-div .menu-type > div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
}

@media only screen and (max-width: 450px) {
  .left-div div .menu-type,
  .right-div .menu-type {
    font-size: 12px;
  }
}
</style>
