<template>
  <section>
    <div class="form-group">
      <div>
        <font-awesome-icon icon="lock" class="mr10 icon" />
      </div>
      <div>
        <h1>VERIFY EMAIL</h1>
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
        <button-full class="mt10" :link="{path:'main/profile'}">
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
    };
  },
  methods: {
    updateValue() {
      var max_chars = 7;
      if (this.code.length > max_chars) {
        this.code= this.code.substr(0, max_chars);
      }
      this.$forceUpdate();
    },
  },
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
</style>
