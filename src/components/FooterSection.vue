<template>
  <section class="footer-section">
      <div class="footer-text flex-center">
        Powered by
        <img src="@/assets/OneDocument.jpeg">
      </div>
  </section>
</template>

<script>
export default {
    name: "FooterSection"
}
</script>

<style lang="scss" scoped>
section.footer-section{
  padding: 20px 15px;
  text-align: center;
    background-color: #f3f3f3;
  .footer-text{
      color: #2b2b2b;
      font-size: 15px;
      justify-content: center;
      padding-top: 5px;
      img {
          margin-left: 15px;
          max-height: 35px;
      }
  }
}
</style>