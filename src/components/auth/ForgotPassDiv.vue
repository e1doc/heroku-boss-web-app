<template>
  <section>
    <div class="form-group">
      <div>
        <font-awesome-icon icon="key" class="mr10 icon" />
      </div>
      <div>
        <h1>RESET PASSWORD</h1>
      </div>
      <div class="form-items" v-if="!isSuccess">
        <div class="note">
          Enter your registered email address to receive the password reset
          link.
        </div>
        <div>
          <base-input-icon
            label="Email"
            placeholder="Enter email"
            v-model="email"
            name="email"
            refs="user_email"
            type="email"
            class="mt40"
          />
        </div>
        <div>
          <button-full class="mt10">
            SUBMIT
          </button-full>
        </div>
      </div>
      <div class="form-success" v-if="isSuccess">
        <div class="note mt50">
          Password reset link will be sent to your email!
        </div>
        <div class="note mt30">
          Please, check your email now. In case you did not receive any email
          after an hour, just try to send another request
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ButtonFull from "@/components/ButtonFull";
import ButtonFullOutline from "@/components/ButtonFullOutline";
import BaseInputIcon from "@/components/forms/BaseInputIcon";
export default {
  name: "ForgotPassDiv",
  components: {
    ButtonFull,
    ButtonFullOutline,
    BaseInputIcon,
  },
  data() {
    return {
      email: "",
      isSuccess: false,
    };
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
}
</style>
