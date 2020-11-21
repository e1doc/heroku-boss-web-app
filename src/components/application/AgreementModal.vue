<template>
  <div class="meta-modal">
    <div class="meta-wrap">
      <div class="meta-text">
            I hereby authorize the City Government of Bacoor, to collect and process
            the data indicated herein for the purpose of {{type}}. I understand that my personal information is protected by
            RA 10173, Data Privacy Act of 2012.
      </div>
      <div class="meta-buttons flex-wrap">
          <button class="modal-button agree" @click="onClickCallback(true)">I AGREE</button>
          <button class="modal-button cancel" @click="onClickCallback(false)">CANCEL</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AgreementModal",
  props:{
      type:{
          type: String,
          default: "business permit application"
      }
  },
  methods:{
      onClickCallback(status){
          if (status){
              this.$store.commit('setIsPrivacyAgree', true)
              this.$modal.hide("agreementModal");
          }else{
              this.$router.push({name: 'Profile'})
          }
      }
  }
};
</script>

<style lang="scss" scoped>
.meta-modal{
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    box-shadow: 0px 7px 20px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    background: #ffffff;
    .meta-text{
        font-size: 18px;
        font-family: Proxima Nova Rg;
        text-align: center;
        line-height: 1.4;
        padding: 50px 30px;
    }
    .meta-buttons{
        width: 100%;
        button{
            width: 50%;
            float: left;
            background-color: transparent;
            border: 0;
            padding: 20px 10px;
            border-top: 1px solid #eee;
            font-size: 15px;
            font-weight: bold;
            font-family: Proxima Nova Rg;
            transition: 0.2s;
            cursor: pointer;
        }
        button:focus{
            outline: 0;
        }
        button.agree{
            border-right: 1px solid #eee;
            border-bottom-left-radius: 15px;
        }
        button.cancel{
            border-bottom-right-radius: 15px;
        }
        button.agree:hover{
            color: #fff;
            background-color: #4791db;
        }
        button.cancel:hover{
            color: #fff;
            background-color: #f44336;
        }
    }
}

</style>