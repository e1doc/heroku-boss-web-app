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
  box-shadow: 0px 10px 20px #0000000d;
  border-radius: 8px;
  width: 100%;
  display: flex;
  flex-direction: row;
  background: #ffffff;
}

.left-div {
  div{
    .menu-type {
      margin: 0px 10px;
      padding: 20px;
      color: #f09795;
      font-weight: bold;
    }
    .active {
      border-bottom: 4px #e23a36 solid;
      color: #e23a36;
      font-weight: bold;
    }
  }
}

.right-div {
  justify-content: flex-end;
  .menu-type {
    margin: 0px 10px;
    padding: 10px;
    color: #f09795;
    font-weight: bold;
    div {
      padding: 10px;
    }
    .active {
      border: 2px#f09795 solid;
      border-radius: 5px;
      color: #e23a36;
      font-weight: bold;
    }
  }
}
</style>
