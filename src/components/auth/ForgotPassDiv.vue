<template>
  <section>
    <div class="form-group">
      <div>
        <font-awesome-icon icon="key" class="mr10 icon" />
      </div>
      <div>
        <h1>RESET PASSWORD</h1>
      </div>
      <div>
        <p>
          Enter your registered email address to receive the <br />
          password reset link.
        </p>
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
    margin-bottom: 40px;
  }
}
</style>
