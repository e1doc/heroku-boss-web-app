<template>
  <div class="admin-container">
    <div class="admin-title-section flex-center">
      <div class="admin-page-title">
        <font-awesome-icon icon="comment-alt" class="admin-icon" />
        Inquiries
      </div>
      <div class="right-button flex-center">
        <router-link to="new-inquiry" class="add-inquiry-button">
          <font-awesome-icon icon="plus" class="add-icon" /> 
          Add Inquiry
        </router-link>
      </div>
    </div>
    <div class="admin-body flex-wrap">
      <!-- <inquiry-table-menu type="profile" /> -->
      <div class="admin-content">
        <user-inquiry-table />
      </div>
    </div>
  </div>
</template>

<script>
import UserInquiryTable from "@/components/tables/UserInquiryTable";
import InquiryTableMenu from "@/components/tables/InquiryTableMenu";
import { mapGetters } from "vuex";
export default {
  name: "Inquiries",
  components: {
    UserInquiryTable,
    InquiryTableMenu 
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("setCurrentType", 'business');
    this.$store.commit("setCurrentTable", 'profile');
    next();
  },
  computed: {
    ...mapGetters(["currentTable"]),
  },
  mounted(){
    if(this.currentTable !== "inquiries" && this.currentTable !== "remarks"){
      this.$store.commit('setCurrentTable', 'inquiries')
    }
  }
};
</script>

<style lang="scss" scoped>
div.admin-container {
  width: 100%;
  div.admin-title-section {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    div.admin-page-title {
      color: #1492e6;
      font-size: 30px;
      font-weight: bold;
      line-height: 29px;
      text-transform: capitalize;
      margin-bottom: 50px;
      margin-top: 50px;
      justify-content: center;
      width: 50%;
      float: left;
      .admin-icon {
        color: #1492e6;
        font-size: 35px;
        margin-right: 15px;
      }
    }
  }
  div.admin-body {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50px;
    div.admin-search {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    div.admin-content {
      width: 100%;
      margin-top: 35px;
    }
  }
}

.right-button{
  width: 50%;
  float: right;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}

a.add-inquiry-button {
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 20px;
    padding: 9px 24px;
    border: 1px solid #e23a36;
    background-color: #e23a36;
    transition: 0.4s;
}

a.add-inquiry-button:hover{
  background-color: transparent;
  color: #e23a36;
}

@media only screen and (max-width: 1380px) {
  div.admin-container div.admin-page-title {
    font-size: 28px;
    margin-bottom: 40px;
  }
}
</style>
