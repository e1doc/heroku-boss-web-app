<template>
  <div>
    <router-view />
    <footer-section />
  </div>
</template>

<script>
import FooterSection from "@/components/FooterSection";
export default {
  name: "PaymentLayout",
  components: { FooterSection },
};
</script>

<style>
</style>