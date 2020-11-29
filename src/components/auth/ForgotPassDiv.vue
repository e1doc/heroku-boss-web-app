<template>
  <section>
    <div class="form-group">
      <div>
        <font-awesome-icon icon="key" class="mr10 icon" />
      </div>
      <div>
        <h1>FORGOT PASSWORD</h1>
      </div>
      <div class="form-items" v-if="!forgotPasswordSuccess">
        <div class="note">
          Enter your registered email address to receive the password reset
          link.
        </div>
        <form @submit.prevent="forgotPassword">
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
            <button-full class="mt10" type="submit">
              SUBMIT
            </button-full>
          </div>
        </form>
      </div>

      <!-- COUNTDOWN TIMER -->
      <div class="resend-code-div flex-center" v-if="forgotPasswordSuccess">
        <span
          class="resend-text"
          v-bind:class="timerCount != 0 ? 'disabled' : ''"
          @click="resetValue"
        >
          Resend Code
        </span>
        <span class="countdown-timer" v-if="timerCount != 0">
          ( {{ timerCount }} seconds )
        </span>
      </div>

      <div class="form-success" v-if="forgotPasswordSuccess">
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
import { mapGetters, mapActions } from "vuex";
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
      timerCount: 0,
    };
  },
  computed: {
    ...mapGetters(["forgotPasswordSuccess", "credentials"]),
  },
  methods: {
    ...mapActions(["forgotPasswordUser"]),
    async forgotPassword() {
      await this.$store.dispatch("forgotPasswordUser", { email: this.email });
    },
    async resetValue() {
      await this.$store.dispatch("forgotPasswordUser", this.credentials);
      this.timerCount = "30";
    },
  },
  // COUNTDOWN TIMER
  watch: {
    forgotPasswordSuccess: {
      handler(value) {
        if (value) {
          this.timerCount = 30;
        }
      },
    },
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        }
      },
      immediate: true, // This ensures the watcher is triggered upon creation
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
}

// COUNTDOWN TIMER
.resend-code-div {
  display: flex;
  justify-content: center;
}
.resend-text {
  width: auto;
  float: left;
  font-size: 16px;
  color: #039be5bf;
  text-decoration: underline;
  cursor: pointer;
  margin-right: 5px;
}
.resend-text.disabled {
  color: #cbcbcb;
  text-decoration: none;
  pointer-events: none;
}
.countdown-timer {
  color: #039be5bf;
  font-size: 16px;
  font-family: "Proxima Nova Rg";
  text-align: center;
}

@media only screen and (max-width: 1400px) {
  .form-group {
    margin-top: 0;
    div {
      margin-bottom: 30px;
    }
    .icon {
      font-size: 60px;
      margin-right: 0;
    }
  }
}

@media only screen and (max-width: 860px) {
  .icon {
    font-size: 50px;
  }

  h1 {
    font-size: 22px;
  }

  .form-group {
    margin-top: 0;
  }
}

@media only screen and (max-width: 350px) {
  h1 {
    font-size: 20px;
  }
}
</style>
