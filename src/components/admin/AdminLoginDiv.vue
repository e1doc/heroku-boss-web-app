<template>
  <section>
    <div>
      <font-awesome-icon icon="user-circle" class="icon" />
    </div>
    <div class="mt30 meta-title">
      <h1>ADMIN LOGIN</h1>
    </div>
    <form @submit.prevent="login">
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
          <button-full class="mt10" type="submit">
            LOGIN
          </button-full>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import ButtonFull from "@/components/ButtonFull";
import ButtonFullOutline from "@/components/ButtonFullOutline";
import BaseInputIcon from "@/components/forms/BaseInputIcon";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AdminLoginDiv",
  components: {
    ButtonFull,
    ButtonFullOutline,
    BaseInputIcon,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("adminLogin", {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.forgotpass {
  color: #039be5;
  font-size: 15px;
  padding: 10px;
  cursor: pointer;
  transition: 0.3s;
}

.forgotpass:hover {
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

@media only screen and (max-width: 860px) {
  .icon {
    font-size: 60px;
  }

  h1 {
    font-size: 22px;
  }

  .form-group {
    margin-top: 30px;
  }

  .form-group div.forgotpass {
    margin-bottom: 0;
  }
}

@media only screen and (max-width: 350px) {
  h1 {
    font-size: 20px;
  }

  .meta-title {
    margin-top: 20px;
  }

  .btn {
    width: 100%;
  }
}
</style>
