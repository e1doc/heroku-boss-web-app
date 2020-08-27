<template>
    <div class="menu-holder">
      <div class="left-div flex-center">
          <div class="menu-type">
              <div :class="{ active: currentType === 'business' }" @click="changeType('business')" >
                <font-awesome-icon icon="store" class="mr5 icon" />
                BUSINESS
              </div>
          </div>
          <div class="menu-type">
              <div :class="{ active: currentType === 'real_property' }" @click="changeType('real_property')">
                <font-awesome-icon icon="city" class="mr5 icon" />
                REAL PROPERTY
              </div>
          </div>
      </div>
      <div class="right-div flex-wrap">
          <base-input-search />
      </div>
    </div>
</template>

<script>
import BaseInputSearch from "@/components/forms/BaseInputSearch";
import { mapGetters } from "vuex"
export default {
  name: "TransactionTableMenu",
  components: {
      BaseInputSearch,
  },
  computed:{
    ...mapGetters(["currentType", "currentTable"]),
  },
  props:{
    type:{
      type: String,
      required: true,
      default: "profile"
    }
  },
  data(){
    return{
      activeTab: "profile",
      activeType: "business"
    }
  },
  methods:{
    changeTab(tab){
      this.activeTab = tab
      this.$store.commit("setCurrentTable", tab);
    },
    changeType(type){
      this.activeType = type
      this.$store.commit("setCurrentType", type);
    }
  }
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
          div{
              padding: 10px;
              border: 3px solid #fff;
          }
          div.active {
              border-color: #FADDDD;
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
