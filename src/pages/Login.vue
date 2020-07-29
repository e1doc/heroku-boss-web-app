<template>
  <section id="login-section">
    <div class="container">
      <div class="d-flex">
        <div class="login-form-holder sc-rounded-div flex-row">
          <div class="left-div">
            <div>
              <img src="@/assets/bacoor-cavite-logo.png" alt="" class="logo" />
            </div>
            <div class="mt30 mb30">
              <div>
                City of Bacoor <br />
                Province of Cavite
              </div>
            </div>
            <div v-if="authType === 'login'">
              <button-full-outline
                class="mt20"
                @click.native="changeDiv('register')"
              >
                REGISTER
              </button-full-outline>
            </div>
            <div v-if="authType === 'register' || authType === 'forgotpass'">
              <button-full-outline
                class="mt20"
                @click.native="changeDiv('login')"
              >
                LOGIN
              </button-full-outline>
            </div>
          </div>
          <div class="right-div">
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
          </div>
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
import ForgotPassDiv from "@/components/auth/ForgotPassDiv";
import { mapGetters } from "vuex";
export default {
  name: "Login",
  components: {
    ButtonFull,
    ButtonFullOutline,
    LoginDiv,
    RegisterDiv,
    ForgotPassDiv,
  },
  data() {
    return {
      type: "login",
    };
  },
  computed: {
    ...mapGetters(["authType"]),
  },
  methods: {
    changeDiv(type) {
      this.$store.commit("setAuthType", type);
      console.log(type);
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
  height: 100vh;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  padding: 100px 200px;
  display: flex;
  .login-form-holder {
    .left-div {
      border-radius: 20px 0px 0px 20px;
      background-image: url("../assets/login-bg.png");
      background-position: center; /* Center the image */
      background-repeat: no-repeat; /* Do not repeat the image */
      background-size: cover;
      width: 40%;
      padding: 60px 50px;
      color: #ffffff;
    }
    .right-div {
      width: 60%;
      text-align: center;
      padding: 60px 50px;
    }
  }
}
</style>
