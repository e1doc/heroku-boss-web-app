<template>
  <div class="menu-holder">
    <div class="left-div flex-grow">
      <div class="profile-menus flex-row" v-if="type === 'profile'">
        <div
          class="menu-type"
          :class="{ active: currentTable === 'profile' }"
          @click="changeTab('profile')"
        >
          PROFILE
        </div>
        <div
          class="menu-type"
          :class="{ active: currentTable === 'applications' }"
          @click="changeTab('applications')"
        >
          APPLICATIONS
        </div>
      </div>
      <div class="soa-menus flex-row" v-if="type === 'soa'">
        <div class="menu-type active">STATEMENT OF ACCOUNTS</div>
      </div>
      <div class="soa-menus flex-row" v-if="type === 'bills'">
        <div class="menu-type active">BILLS</div>
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ProfileTableMenu",
  computed: {
    ...mapGetters(["currentType", "currentTable"]),
  },
  props: {
    type: {
      type: String,
      required: true,
      default: "profile",
    },
  },
  mounted() {
    this.$store.dispatch("getDepartments");
    this.$store.commit("setCurrentTable", "profile");
  },
  data() {
    return {
      activeTab: "profile",
      activeType: "business",
    };
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;
      this.$store.commit("setCurrentTable", tab);
      // this.showNote()
    },

    async changeType(type) {
      this.activeType = type;
      await this.$store.commit("setCurrentType", type);
      await this.$store.commit("setSoaFilter", type);
      await this.$store.dispatch("getDepartments");
      if (this.currentTable === "transactions") {
        this.$store.dispatch("getAllUserBankTransactions", { page: 1 });
      }
      // this.showNote()
    },
    showNote() {
      if (
        this.currentTable == "profile" &&
        this.currentType == "real_property"
      ) {
        this.$swal({
          title: "Announcement",
          text: "RPT Statement of Account will be available by tomorrow.",
          icon: "info",
        }).then((value) => {});
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
}

/*
MOBILE RESPONSIVENESS ------------------------------------------- */
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
}

@media only screen and (max-width: 450px) {
  .left-div div .menu-type,
  .right-div .menu-type {
    font-size: 12px;
  }
}
</style>
