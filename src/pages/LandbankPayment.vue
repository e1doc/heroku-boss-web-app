<template>
  <form action="https://222.127.109.48/epp20200915/" method="POST">
    <input type="hidden" name="MerchantCode" value="2020101157" />
    <input type="hidden" name="MerchantRefNo" value="1234" />
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
    <input type="hidden" name="Hash" value="42f04e6c4fe001ad3454b0625c072d71" />
    <input type="submit" value="POST TO EPP" />
  </form>
</template>

<script>
import md5 from "crypto-js/md5";
export default {
  methods: {
    getHash() {
      console.log(md5("2020101157" + "1234", "2500"));
    },
  },
};
</script>

<style></style>
