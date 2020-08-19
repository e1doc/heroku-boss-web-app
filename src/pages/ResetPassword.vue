<template>
  <section id="login-section" :class="{ expand: isExpand }">
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
            <button-full-outline class="mt20" :link="{'name':'Login'}"
              >LOGIN</button-full-outline
            >
          </div>
        </div>
        <div class="right-div" :class="{ expand: isExpand }">
          <reset-pass-div />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ButtonFull from "@/components/ButtonFull";
import ButtonFullOutline from "@/components/ButtonFullOutline";
import LoginDiv from "@/components/auth/LoginDiv";
import RegisterDiv from "@/components/auth/RegisterDiv";
import ResetPassDiv from "@/components/auth/ResetPassDiv";
import OtpDiv from "@/components/auth/OtpDiv";
import { mapGetters } from "vuex";
export default {
  name: "ResetPassword",
  components: {
    ButtonFull,
    ButtonFullOutline,
    LoginDiv,
    RegisterDiv,
    ResetPassDiv,
    OtpDiv,
  },
  data() {
    return {
      type: "login",
      isExpand: false,
    };
  },
  computed: {
    ...mapGetters(["authType", "resetPasswordSuccess"]),
  },
  watch: {
    resetPasswordSuccess: {
      deep: true,
      handler(isSuccess) {
        if (isSuccess) {
          this.$router.push({ name: "Login" });
           this.$store.commit("setResetPasswordSuccess", false);
        }
      },
    },
  },
  methods: {
    changeDiv(type) {
      this.$store.commit("setAuthType", type);
      type === "register" ? (this.isExpand = true) : (this.isExpand = false);
      this.$store.commit("setValidationMessages", {});
    },
  },
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
    margin-right: 0;
  }
}

@media only screen and (max-height: 650px) {
  #login-section {
    padding: 30px;
    min-height: 100vh;
    height: auto;
  }
}
</style>
