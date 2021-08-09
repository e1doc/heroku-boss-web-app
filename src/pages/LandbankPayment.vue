<template>
  <form
    action="https://epaymentportal.landbank.com/"
    method="POST"
    target="_blank"
    @submit="backToProfile"
    ref="form"
  >
    <input type="hidden" name="MerchantCode" value="2020101157" />
    <input type="hidden" name="MerchantRefNo" value="4329" />
    <input
      type="hidden"
      name="Particulars"
      value="Transaction_type=Real Property Tax;Tax Declaration=123;Declared Owner=Juan dela Cruz;Payment Mode=Online;Quarter=First Quarter"
    />
    <input type="hidden" name="Amount" value="2500.00" />
    <input type="hidden" name="PayorName" value="John Doe" />
    <input type="hidden" name="PayorEmail" value="john.doe@gmail.com" />
    <input
      type="hidden"
      name="ReturnURLOK"
      value="https://bossapi.bacoor.gov.ph/api/payment-success/"
    />

    <input
      type="hidden"
      name="ReturnURLError"
      value="https://bossapi.bacoor.gov.ph/api/payment-error/"
    />
    <input type="hidden" name="Hash" :value="getHash()" />
    <input type="submit" value="POST TO EPP" />
  </form>
</template>

<script>
import axios from "axios";
import md5 from "crypto-js/md5";
import ButtonFull from "../components/ButtonFull.vue";
export default {
  components: { ButtonFull },
  mounted() {
    let hash = this.getHash();
    console.log(hash);
  },
  methods: {
    getHash() {
      return md5("2020101157" + "4329" + "250000")
        .toString()
        .toLowerCase();
    },
    backToProfile() {
      console.log("clicked");
      this.$refs.form.submit();
      this.$router.push({ name: "Profile" });
    },
    async submit() {
      var formData = new FormData();
      formData.append("MerchantCode", "2020101157");
      formData.append("MerchantRefNo", "4327");
      formData.append(
        "Particulars",
        "Transaction_type=Real Property Tax;Tax Declaration=123;Declared Owner=Juan dela Cruz;Payment Mode=Online;Quarter=First Quarter"
      );
      formData.append("Amount", "2500.00");
      formData.append("PayorName", "John Doe");
      formData.append("PayorEmail", "john.doe@gmail.com");
      formData.append(
        "ReturnURLOK",
        "https://bossapi.bacoor.gov.ph/api/payment-success/"
      );
      formData.append(
        "ReturnURLError",
        "https://bossapi.bacoor.gov.ph/api/payment-error/"
      );
      formData.append("hash", this.getHash());

      const response = await axios.post(
        "https://epaymentportal.landbank.com/",
        formData
      );
      window.open(response.request.responseUrl, "_blank");
    },
  },
};
</script>


<style></style>
