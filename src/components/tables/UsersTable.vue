<template>
  <section>
    <div>
      <div class="thead">
        <div class="th w10">ID</div>
        <div class="th w20">USERNAME</div>
        <div class="th w25">NAME</div>
        <div class="th w25">EMAIL ADDRESS</div>
        <div class="th w20">PHONE NO.</div>
      </div>
      <div class="tbody">
        <div class="tr" v-for="index in 5" :key="index">
          <div class="td w10">1</div>
          <div class="td w20">lorem_ipsum1</div>
          <div class="td w25">JOHN DOE</div>
          <div class="td w25">sample@gmail.com</div>
          <div class="td w20">+639-234567891</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UsersTable",
  computed: {
    ...mapGetters(["currentType"]),
  },
};
</script>

<style lang="scss" scoped>
.w10 {
  width: 10%;
}
.w15 {
  width: 25%;
}
.w20 {
  width: 20%;
}
.w25 {
  width: 25%;
}
.w30 {
  width: 30%;
}
.w35 {
  width: 35%;
}
.w45 {
  width: 45%;
}
.thead {
  display: flex;
  flex-direction: row;
  background: #ffffff;
  border-radius: 8px 8px 0px 0px;
  border-bottom: 2px #e23a36 solid;
  box-shadow: 0px 10px 20px rgba(127, 127, 127, 0.1);
  .th {
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    padding: 20px 0px;
  }
}
.tbody {
  flex-direction: column;
  margin-top: 10px;
  .tr {
    display: flex;
    flex-direction: row;
    background: #ffffff;
    box-shadow: 0px 10px 20px rgba(127, 127, 127, 0.1);
    border-radius: 8px;
    margin-top: 3px;
    padding-left: 10px;
    padding-right: 10px;
    .td {
      font-size: 14px;
      font-family: "Proxima Nova Rg";
      text-align: center;
      padding: 17px 0px;
    }
  }
}
</style>
