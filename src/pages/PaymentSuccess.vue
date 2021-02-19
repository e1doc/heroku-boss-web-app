<template>
  <div class="meta-container flex-center">
    <div class="meta-wrap flex-center">
      <div class="status-icon">
        <font-awesome-icon icon="check-circle" class="icon" />
      </div>
      <h1>Successful Payment</h1>
      <p>Thank you, your payment was successful!</p>
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
    background: #6cc0701f;
    border: 1px solid #6cc070;
    padding: 70px 30px;
    border-radius: 12px;

    .status-icon {
      width: 100%;
      text-align: center;
      .icon {
        font-size: 50px;
        margin-bottom: 15px;
        color: #6cc070;
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