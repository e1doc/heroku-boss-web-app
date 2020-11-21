<template>
  <section>
    <div class="form-group">
      <div>
        <font-awesome-icon icon="key" class="mr10 icon" />
      </div>
      <div>
        <h1>RESET PASSWORD</h1>
      </div>
      <div class="form-items">
        <div class="note">
          Enter your new password for your account.
        </div>
        <div>
          <base-input-icon
            label="New Password"
            placeholder="Enter new password"
            v-model="new_password"
            name="new_password"
            refs="newpassword"
            type="password"
            class="mt40 mb15"
            :validationMessages="validationMessages.new_password"
          />
        </div>
        <div>
          <base-input-icon
            label="Retype New Password"
            placeholder="Retype new password"
            v-model="re_new_password"
            name="re_new_password"
            refs="renewpassword"
            type="password"
            :validationMessages="validationMessages.re_new_password"
          />
        </div>
        <div>
          <button-full class="mt10" @click.native="resetPassword()">
            SUBMIT
          </button-full>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ButtonFull from "@/components/ButtonFull";
import ButtonFullOutline from "@/components/ButtonFullOutline";
import BaseInputIcon from "@/components/forms/BaseInputIcon";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ResetPassDiv",
  components: {
    ButtonFull,
    ButtonFullOutline,
    BaseInputIcon,
  },
  data() {
    return {
      new_password: "",
      re_new_password: "",
      isSuccess: false,
    };
  },
  computed: {
    ...mapGetters(["resetPasswordSuccess","validationMessages"]),
  },
  methods: {
    ...mapActions(["resetPasswordUser"]),
    resetPassword() {
      let payload = {
        uid: this.$route.params.uid,
        token: this.$route.params.token,
        new_password: this.new_password,
        re_new_password: this.re_new_password
      }
      this.resetPasswordUser(payload);
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
      margin-bottom: 15px;
    }
}
.note {
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 0.5px;
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
