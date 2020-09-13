<template>
  <section>
    <div class="form-group">
      <div>
        <font-awesome-icon icon="lock" class="mr10 icon" />
      </div>
      <div>
        <h1>VERIFY EMAIL</h1>
      </div>

      <!-- COUNTDOWN TIMER -->
      <div class="countdown-timer">
        {{ timerCount }}
      </div>

      <div class="note">
        OTP has been sent to you on your email address. Please enter it below.
      </div>
      <div>
        <base-input-otp
          v-model="code"
          name="code"
          refs="otpcode"
          type="number"
          class="mt40"
          @input="updateValue"
        />
      </div>
      <div>
        <button-full @click.native="verifyOtp" class="mt10">
          VERIFY
        </button-full>
      </div>
    </div>
  </section>
</template>

<script>
import ButtonFull from "@/components/ButtonFull";
import ButtonFullOutline from "@/components/ButtonFullOutline";
import BaseInputIcon from "@/components/forms/BaseInputIcon";
import BaseInputOtp from "@/components/forms/BaseInputOtp";
import { mapActions } from "vuex";
export default {
  name: "OtpDiv",
  components: {
    ButtonFull,
    ButtonFullOutline,
    BaseInputIcon,
    BaseInputOtp,
  },
  data() {
    return {
      code: "",
      timerCount: 30
    };
  },
  methods: {
    ...mapActions(["getAuthToken"]),
    updateValue() {
      var max_chars = 7;
      if (this.code.length > max_chars) {
        this.code= this.code.substr(0, max_chars);
      }
      this.$forceUpdate();
    },
    verifyOtp(){
       this.getAuthToken(this.code);
    }
  },
  // COUNTDOWN TIMER
  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
              this.timerCount--;
          }, 1000);
        }
      },
      immediate: true // This ensures the watcher is triggered upon creation
    }
  }
};
</script>

<style lang="scss" scoped>
.icon {
  font-size: 80px;
  color: #c2c2c2;
}
.form-group {
  margin-top: 45px;
  div {
    margin-bottom: 20px;
  }
}
.note {
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
}

.countdown-timer {
    color: #039be5bf;
    font-size: 50px;
    font-family: "Proxima Nova Rg";
    font-weight: bold;
    letter-spacing: 5px;
    text-align: center;
}

@media only screen and ( max-width: 1400px ){
  .form-group {
      margin-top: 0;
      div {
          margin-bottom: 30px;
      }
      .icon{
          font-size: 60px;
          margin-right: 0;
      }
  }
}

@media only screen and ( max-width: 860px ){
  .icon{
    font-size: 50px;
  }
  h1 {
    font-size: 22px;
  }
  .form-group{
      margin-top: 0;
  }
}

@media only screen and ( max-width: 350px ){
  h1{
      font-size: 20px;
  } 
}
</style>
