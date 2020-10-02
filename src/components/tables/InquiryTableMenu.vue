<template>
  <div class="menu-holder">
    <div class="left-div flex-center">
      <div class="menu-type">
        <div
          :class="{ active: currentType === 'all_inquiries'} "
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
        <div :class="{ active: currentTable === 'inquiries' }" @click="changeTab('inquiries')">
          <font-awesome-icon icon="inbox" class="mr5 icon" />
          INQUIRIES
        </div>
      </div>
       <div class="menu-type">
        <div :class="{ active: currentTable === 'remarks' }" @click="changeTab('remarks')">
          <font-awesome-icon icon="inbox" class="mr5 icon" />
          REMARKS
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseInputSearch from "@/components/forms/BaseInputSearch";
import { mapGetters } from "vuex";
export default {
  name: "InquiryTableMenu",
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
  mounted(){
    this.$store.commit("setCurrentType", 'all_inquiries');
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
  box-shadow: 0px 10px 20px #0000000d;
  .left-div, .right-div {
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
