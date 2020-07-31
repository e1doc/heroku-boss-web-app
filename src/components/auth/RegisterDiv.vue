<template>
  <section>
    <div>
      <h1>CREATE AN ACCOUNT</h1>
    </div>
    <div class="form-group">
      <div>
        <base-input
          label="First Name"
          placeholder="Enter first name"
          v-model="firstname"
          name="firstname"
          refs="first_name"
          type="text"
          class="mt40"
        />
      </div>
      <div>
        <base-input
          label="Middle Name"
          placeholder="Enter middle name"
          v-model="middlename"
          name="middlename"
          refs="middle_name"
          type="text"
          class="mt40"
        />
      </div>
      <div>
        <base-input
          label="Last Name"
          placeholder="Enter last name"
          v-model="lastname"
          name="lastname"
          refs="last_name"
          type="text"
          class="mt40"
        />
      </div>
      <div>
        <base-input
          label="User Name"
          placeholder="Enter user name"
          v-model="username"
          name="username"
          refs="user_name"
          type="text"
          class="mt40"
        />
      </div>
      <div>
        <base-input
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
        <base-input
          label="Phone Number"
          placeholder="Enter phone number"
          v-model="contactno"
          name="contactno"
          refs="contact_no"
          type="number"
          class="mt40"
        />
      </div>
      <div>
        <base-input
          label="Password"
          placeholder="Enter password"
          v-model="password"
          name="password"
          refs="user_password"
          type="password"
          class="mt40"
        />
      </div>
      <div>
         <button-full class="mt10">
           REGISTER
        </button-full>
      </div>
    </div>
  </section>
</template>

<script>
import ButtonFull from "@/components/ButtonFull";
import ButtonFullOutline from "@/components/ButtonFullOutline";
import BaseInput from "@/components/forms/BaseInput";
export default {
  name: "RegisterDiv",
  components: {
    ButtonFull,
    BaseInput,
  },
  data() {
    return {
      firstname: "",
      middlename: "",
      lastname: "",
      username: "",
      email: "",
      contactno: "",
      password: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.form-group {
  margin-top: 45px;
  div{
    margin-bottom: 20px;
  }
}
</style>
