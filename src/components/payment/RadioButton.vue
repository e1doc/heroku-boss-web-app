<template>
  <div class="meta-list">
    <!-- OPTION 1 -->
      <div class="meta-list-option">
          <div class="meta-radio flex-center">
              <input type="radio" class="radio-button" name="payment-options" id="option_1" checked @click="selectOptions('counter')">
              <span class="custom-radio flex-center" :class="{selected: selectedOption === 'counter'}"><span class="circle"></span></span>
              <label for="option_1">Over the Counter</label>
          </div>
          <div class="meta-desc">Pay your bills over the counter on  any Landbank branches.  Click the 'Download' button below to download your SOA which you will present in paying on any Landbank branches.</div>
      </div>
    <!-- OPTION 2 -->
      <div class="meta-list-option">
          <div class="meta-radio flex-center">
              <input type="radio" class="radio-button" name="payment-options" id="option_2" @click="selectOptions('online')">
              <span class="custom-radio flex-center" :class="{selected: selectedOption === 'online'}"><span class="circle"></span></span>
              <label for="option_2">Pay Online</label>
          </div>
          <div class="meta-desc">Pay your bills over the counter in  any Landbank branches.  Click the 'Download' button below to download your SOA which you will present when paying at any Landbank branches.</div>
      </div>

  </div>
</template>

<script>
export default {
    name: "RadioButton",
    data(){
      return{
        selectedOption: 'counter'
      }
    },
    methods:{
      selectOptions(option){
        this.selectedOption = option
        this.$store.commit('setPaymentOption',option)
      }
    }
}
</script>

<style lang="scss" scoped>
div.meta-list{
  .meta-list-option {
      margin-bottom: 30px;
      .meta-radio {
          color: #2b2b2b;
          font-size: 14px;
          font-weight: bold;
          text-transform: uppercase;
          line-height: 20px;
          position: relative;
          margin-bottom: 13px;
          input.radio-button {
            margin-right: 15px;
            position: relative;
            z-index: 2;
            opacity: 0;
            cursor: pointer;
          }
          label{
            cursor: pointer;
          }
          span.custom-radio {
            height: 13px;
            width: 13px;
            border: 1px solid #2699fb;
            border-radius: 100%;
            justify-content: center;
            position: absolute;
            left: 0;
            z-index: 1;
            span.circle {
                height: 9px;
                width: 9px;
                background-color: transparent;
                border-radius: 100%;
            }
          }
          span.custom-radio.selected{
              span.circle{
                  background-color: #2699fb;
              }
          }
      }
      .meta-desc {
          font-size: 14px;
          line-height: 25px;
          color: #646566;
          background: #F6FBFF;
          border-radius: 10px;
          border-top-left-radius: 0;
          padding: 15px 18px;
    }
  }
}

.meta-list-option:last-child{
  margin-bottom: 50px!important;
}

span.custom-radio.selected span.circle{
    background-color: #2699fb;
}
</style>