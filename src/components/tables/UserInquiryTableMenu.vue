<template>
  <div class="menu-holder">
    <!-- <div class="left-div flex-center">
      <div class="menu-type">
        <div
          :class="{ active: activeType === 'all_inquiries' }"
          @click="changeType('all_inquiries')"
        >
          <font-awesome-icon icon="inbox" class="mr5 icon" />
          ALL INQUIRIES
        </div>
      </div>
      <div class="menu-type">
        <div
          :class="{ active: activeType === 'unread_inquiries' }"
          @click="changeType('unread_inquiries')"
        >
          <font-awesome-icon icon="envelope" class="mr5 icon" />
          UNREAD INQUIRIES
        </div>
      </div>
    </div> -->
    <!-- <div class="right-div flex-wrap"> -->
      <!-- <base-input-search /> -->
      <div class="right-button flex-center">
        <router-link to="new-inquiry" class="add-inquiry-button">
          <font-awesome-icon icon="plus" class="add-icon" /> 
          Add Inquiry
        </router-link>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
import BaseInputSearch from "@/components/forms/BaseInputSearch";
import { mapGetters } from "vuex";
export default {
  name: "UserInquiryTableMenu",
  components: {
    BaseInputSearch,
  },
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
  data() {
    return {
      activeTab: "profile",
      activeType: "all_inquiries",
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
  flex-direction: row;
  padding: 10px 20px;
  border-radius: 8px;
  // box-shadow: 0px 10px 20px #0000000d;
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

a.add-inquiry-button {
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 20px;
    padding: 9px 24px;
    border: 1px solid #e23a36;
    background-color: #e23a36;
    transition: 0.4s;
}

a.add-inquiry-button:hover{
  background-color: transparent;
  color: #e23a36;
}
</style>
