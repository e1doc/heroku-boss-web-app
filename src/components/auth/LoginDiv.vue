<template>
  <section>
    <div>
      <font-awesome-icon icon="user-circle" class="mr10 icon" />
    </div>
    <div class="mt30">
      <h1>USER LOGIN</h1>
    </div>
    <div class="form-group">
      <div>
        <base-input-icon
          label="Username"
          placeholder="Enter username"
          v-model="username"
          name="username"
          refs="user_name"
          type="text"
          class="mt40"
        />
      </div>
      <div>
        <base-input-icon
          label="Password"
          placeholder="Enter password"
          v-model="password"
          name="password"
          refs="user_password"
          type="password"
        />
      </div>
      <div>
        <button-full class="mt10">
          LOGIN
        </button-full>
      </div>
      <div @click="changeDiv('forgotpass')" class="forgotpass">
        Forgot Password?
      </div>
    </div>
  </section>
</template>

<script>
import ButtonFull from "@/components/ButtonFull";
import ButtonFullOutline from "@/components/ButtonFullOutline";
import BaseInputIcon from "@/components/forms/BaseInputIcon";
import { mapGetters } from "vuex";
export default {
  name: "LoginDiv",
  components: {
    ButtonFull,
    ButtonFullOutline,
    BaseInputIcon,
  },
  computed: {
    ...mapGetters(["authType"]),
  },
  data() {
    return {
      username: "",
      password: "",
    };
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
.forgotpass{
  color: #039BE5;
  font-size: 15px;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;
}

.forgotpass:hover{
  text-decoration: underline;
}

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
</style>
