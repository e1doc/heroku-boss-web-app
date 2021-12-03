<template>
  <div class="meta-container flex-center">
    <div class="meta-wrap flex-center">
      <div class="status-icon">
        <font-awesome-icon icon="times-circle" class="icon" />
      </div>
      <h1>Payment Failed</h1>
      <p>
        Sorry, your payment was unsuccessful. <br />
        To proceed and try again, kindly re-generate your statement of account
        (SOA) by clicking the "Bill" button and then proceed to online payment.
        Thank you!
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.meta-container {
  justify-content: center;
  min-height: calc(100vh - 180px);
  width: 100%;
  padding: 50px 0;
  .meta-wrap {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
    justify-content: center;
    background: #ed43371f;
    border: 1px solid #ed4337;
    padding: 70px 30px;
    border-radius: 12px;

    .status-icon {
      width: 100%;
      text-align: center;
      .icon {
        font-size: 50px;
        margin-bottom: 15px;
        color: #ed4337;
      }
    }
    h1 {
      font-size: 35px;
      margin-bottom: 10px;
    }
    p {
      font-size: 18px;
      line-height: 1.8;
    }
  }
}

@media (max-width: 768px) {
  .meta-container {
    h1 {
      font-size: 28px;
    }
  }
}

@media (max-width: 480px) {
  .meta-container {
    min-height: calc(100vh - 180px);
    .meta-wrap {
      padding: 50px 15px;
      h1 {
        font-size: 24px;
      }
      p {
        font-size: 16px;
        line-height: 1.4;
      }
    }
  }
}
</style>