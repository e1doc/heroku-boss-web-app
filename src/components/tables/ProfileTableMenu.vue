<template>
  <section>
    <div class="menu-holder">
      <div class="left-div flex-grow">
        <div class="flex-row" v-if="type === 'profile'">
          <div class="menu-type active">PROFILE</div>
          <div class="menu-type">APPLICATIONS</div>
          <div class="menu-type">TRANSACTIONS</div>
        </div>
         <div class="flex-row" v-if="type === 'soa'">
          <div class="menu-type active">STATEMENT OF ACCOUNTS</div>
        </div>
      </div>
      <div class="right-div flex-row flex-grow">
        <div class="menu-type">
          <div class="active">
            <font-awesome-icon icon="store" class="mr5 icon" />
            BUSINESS
          </div>
        </div>
        <div class="menu-type">
          <div>
            <font-awesome-icon icon="city" class="mr5 icon" />
            REAL PROPERTY
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ProfileTableMenu",
  props:{
    type:{
      type: String,
      required: true,
      default: "profile"
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
  padding: 0;
  border-radius: 8px;
  box-shadow: 0px 10px 20px #0000000d;
}

.left-div {
  div{
    .menu-type {
      color: #f09795;
      font-weight: bold;    
      font-size: 14px;
      padding: 20px;
      margin-left: 15px;
    }
    .active {
      border-bottom: 3px #e23a36 solid;
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
    }
    .active {
      border: 3px #FADDDD solid;
      border-radius: 5px;
      color: #e23a36;
      font-weight: bold;
    }
  }
}
</style>
