<template>
  <section>
    <div>
      <font-awesome-icon icon="user-circle" class="icon" />
    </div>
    <div class="mt30 meta-title">
      <h1>USER LOGIN</h1>
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
          <button-full class="mt10" type="submit"> LOGIN </button-full>
        </div>
        <div @click="changeDiv('forgotpass')" class="forgotpass">
          Forgot Password?
        </div>
        <div class="mt10 meta-download-statement">
          BOSS Android Mobile Application (BETA) is now available.
        </div>
        <div class="meta-download-text" @click="getMobileAppLink()">
          Download Now!
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
import axios from "axios";
const baseUrl = process.env.VUE_APP_API_URL;
export default {
  name: "LoginDiv",
  components: {
    ButtonFull,
    ButtonFullOutline,
    BaseInputIcon,
  },
  computed: {
    ...mapGetters(["authType", "codeToken"]),
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["getCodeToken"]),
    changeDiv(type) {
      this.$store.commit("setAuthType", type);
    },
    login() {
      this.getCodeToken({
        username: this.username,
        password: this.password,
      });
    },
    async getMobileAppLink() {
      console.log(`${baseUrl}/api/active-mobile-build`);
      const link = document.createElement("a");
      const response = await axios.get(`${baseUrl}/api/active-mobile-build`);

      const filename = response.data.file.replace("/bacoor/", "/");
      link.href = filename;
      console.log(filename);
      link.download = filename;
      link.click();
    },
  },
};
</script>

<style lang="scss" scoped>
.meta-download-statement {
  line-height: 1.5;
}
.meta-download-text {
  color: #039be5;
  font-weight: bold;
  font-size: 18px;
  text-decoration: underline;
  cursor: pointer;
}
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
