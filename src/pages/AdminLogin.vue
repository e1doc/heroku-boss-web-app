<template>
  <section id="login-section">
    <div class="container">
      <div class="login-form-holder sc-rounded-div flex-row">
        <div class="left-div">
          <div class="left-div-items">
            <div>
              <img src="@/assets/bacoor-cavite-logo.png" alt class="logo" />
            </div>
            <div class="mt30 mb30 left-div-title">
              BACOOR ONE STOP <br />
              SHOP SYSTEM
            </div>
          </div>
        </div>
        <div class="right-div">
          <!-- LOGIN DIV -->
          <div>
            <admin-login-div />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ButtonFull from "@/components/ButtonFull";
import ButtonFullOutline from "@/components/ButtonFullOutline";
import AdminLoginDiv from "@/components/admin/AdminLoginDiv";
import { mapGetters } from "vuex";
export default {
  name: "AdminLogin",
  components: {
    ButtonFull,
    ButtonFullOutline,
    AdminLoginDiv
  },
  mounted(){
    this.$store.commit("setLoading", false)
  }
};
</script>

<style lang="scss" scoped>
.logo {
  width: 100px;
  height: auto;
}
.mt-auto {
  margin-top: auto;
}
#login-section {
  text-align: center;
  background-image: url("../assets/login-bg.png");
  min-height: 100vh;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  padding: 0px 30px;
  display: flex;
  align-items: center;

  .login-form-holder {
    .left-div {
      color: #ffffff;
      border-radius: 20px 0px 0px 20px;
      background-image: url("../assets/municipal-hall.png");
      background-position: center; /* Center the image */
      background-size: cover;
      width: 58%;
      padding: 60px 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .left-div-title {
        font-size: 18px;
        line-height: 24px;
        letter-spacing: 0.3px;
      }
    }
    .right-div {
      width: 60%;
      text-align: center;
      padding: 60px 70px;
    }
    .expand {
      width: 65% !important;
      padding: 40px 50px !important;
    }
  }
}

@media only screen and (max-width: 1400px) {
  #login-section.expand {
    padding-top: 30px;
    padding-bottom: 30px;
  }
  #login-section .login-form-holder .left-div .left-div-title {
    font-size: 15px;
  }

  #login-section .login-form-holder .right-div {
    padding: 50px 50px 30px;
  }

  #login-section .icon {
    font-size: 65px !important;
  }
}

@media only screen and ( max-width : 860px ){
  #login-section{
    padding: 50px 0;
  }
  .container {
      margin-bottom: 0;
  }
  .sc-rounded-div {
      max-width: 480px;
      flex-wrap: wrap;
  }
  #login-section .login-form-holder .left-div,
  #login-section .login-form-holder .right-div,
  #login-section .login-form-holder .expand{
      width: 100%!important;
  }

  #login-section .login-form-holder .left-div{
      border-top-right-radius: 20px;
      border-bottom-left-radius: 0;
      padding: 30px 30px;
  }

  #login-section .login-form-holder .right-div{
      padding: 40px 50px 30px;
  }

  .logo{
      width: 65px;  
  }

  #login-section .login-form-holder .left-div .left-div-title{
      margin: 15px 0;
  }
}


@media only screen and (max-width: 650px) {
    #login-section {
        padding: 30px 0;
    }
}
@media only screen and (max-height: 650px) and ( min-width: 991px ) {
  #login-section {
    padding: 30px;
    min-height: 100vh;
    height: auto;
  }
}

@media only screen and ( max-width: 480px ){
    #login-section .login-form-holder .right-div{
        padding: 30px 30px!important;
    }

    .form-group div{
        margin-bottom: 15px;
    }
}

@media only screen and ( max-width: 350px ){
  #login-section .login-form-holder .right-div,
  #login-section .login-form-holder .left-div{
      padding: 30px 15px!important;
  }
  .btn{
      max-width: 100%;
  }
}
</style>
