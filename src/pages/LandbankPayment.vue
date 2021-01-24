<template>
  <div>
    <!-- <form action="https://222.127.109.48/epp20200915/" method="POST">
      <input type="hidden" name="MerchantCode" value="2020101157" />
      <input type="hidden" name="MerchantRefNo" value="4327" />
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
        value="https://boss-web-api.herokuapp.com/api/payment-success/"
      />

      <input
        type="hidden"
        name="ReturnURLError"
        value="https://boss-web-api.herokuapp.com/api/payment-error/"
      />
      <input type="hidden" name="Hash" :value="getHash()" />

    </form> -->
    <button-full @click="submit">Submit</button-full>
  </div>
</template>

<script>
import axios from "axios";
import md5 from "crypto-js/md5";
import ButtonFull from '../components/ButtonFull.vue';
export default {
  components: { ButtonFull },
  mounted() {
    let hash = this.getHash();
    console.log(hash);
  },
  methods: {
    getHash() {
      return md5("2020101157" + "4328" + "250000")
        .toString()
        .toLowerCase();
    },
  },
  submit() {
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
      "https://boss-web-api.herokuapp.com/api/payment-success/"
    );
    formData.append(
      "ReturnURLError",
      "https://boss-web-api.herokuapp.com/api/payment-error/"
    );
    formData.append("hash", this.getHash());

    const response = await axios.post('https://222.127.109.48/epp20200915/', formData)
    window.open(response.request.responseUrl, '_blank')
  },
};
</script>

<style></style>
