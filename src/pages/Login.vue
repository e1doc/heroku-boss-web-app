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
            <div v-if="authType === 'login'">
              <button-full-outline
                class="mt20"
                @click.native="changeDiv('register')"
                >REGISTER</button-full-outline
              >
            </div>
            <div v-if="authType === 'register' || authType === 'forgotpass'">
              <button-full-outline
                class="mt20"
                @click.native="changeDiv('login')"
                >LOGIN</button-full-outline
              >
            </div>
          </div>
        </div>
        <div class="right-div" :class="{ expand: isExpand }">
          <!-- LOGIN DIV -->
          <div v-if="authType === 'login'">
            <login-div />
          </div>

          <!-- REGISTER DIV -->
          <div v-if="authType === 'register'">
            <register-div />
          </div>

          <!-- FORGOT PASS DIV -->
          <div v-if="authType === 'forgotpass'">
            <forgot-pass-div />
          </div>

          <div v-if="authType === 'otp'">
            <otp-div />
          </div>
        </div>
      </div>
    </div>
    <privacy-dialog v-if="showPrivacyDialog"></privacy-dialog>
  </section>
</template>

<script>
import ButtonFull from "@/components/ButtonFull";
import ButtonFullOutline from "@/components/ButtonFullOutline";
import LoginDiv from "@/components/auth/LoginDiv";
import RegisterDiv from "@/components/auth/RegisterDiv";
import ForgotPassDiv from "@/components/auth/ForgotPassDiv";
import OtpDiv from "@/components/auth/OtpDiv";
import { mapGetters } from "vuex";
import PrivacyDialog from "@/components/PrivacyDialog";
export default {
  name: "Login",
  components: {
    ButtonFull,
    ButtonFullOutline,
    LoginDiv,
    RegisterDiv,
    ForgotPassDiv,
    OtpDiv,
    PrivacyDialog,
  },
  data() {
    return {
      type: "login",
      isExpand: false,
    };
  },
  computed: {
    ...mapGetters(["authType", "loginSuccess", "showPrivacyDialog"]),
  },
  watch: {
    loginSuccess: {
      deep: true,
      handler(isSuccess) {
        if (isSuccess) {
          this.$store.commit("setLoginSuccess", false);
          this.$router.push({ name: "Profile" });
        }
      },
    },
  },
  methods: {
    changeDiv(type) {
      this.$store.commit("setAuthType", type);
      type === "register" ? (this.isExpand = true) : (this.isExpand = false);
      this.$store.commit("setValidationMessages", {});
      this.$store.commit("setForgotPasswordSuccess", false);
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
  }
}

@media only screen and (max-width: 860px) {
  #login-section {
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
  #login-section .login-form-holder .expand {
    width: 100% !important;
  }

  #login-section .login-form-holder .left-div {
    border-top-right-radius: 20px;
    border-bottom-left-radius: 0;
    padding: 30px 30px;
  }

  #login-section .login-form-holder .right-div {
    padding: 40px 50px 30px;
  }

  .logo {
    width: 65px;
  }

  #login-section .login-form-holder .left-div .left-div-title {
    margin: 15px 0;
  }
}

@media only screen and (max-width: 650px) {
  #login-section {
    padding: 30px 0;
  }
}
@media only screen and (max-height: 650px) and (min-width: 991px) {
  #login-section {
    padding: 30px;
    min-height: 100vh;
    height: auto;
  }
}

@media only screen and (max-width: 480px) {
  #login-section .login-form-holder .right-div {
    padding: 30px 30px !important;
  }

  .form-group div {
    margin-bottom: 15px;
  }
}

@media only screen and (max-width: 350px) {
  #login-section .login-form-holder .right-div,
  #login-section .login-form-holder .left-div {
    padding: 30px 15px !important;
  }
  .btn {
    max-width: 100%;
  }
}
</style>
