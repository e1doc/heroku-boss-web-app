<template>
  <div class="meta-parent-box">
    <div class="meta-form-holder">
      <downloadable-business-form />
    </div>
    <div class="meta-message-holder">
      <h3 class="meta-message">{{ message }}</h3>
    </div>
  </div>
</template>

<script>
import DownloadableBusinessForm from "../components/application/DownloadableBusinessForm.vue";
import axios from "axios";
export default {
  name: "MobileDownloadBusinessForm",
  components: { DownloadableBusinessForm },
  mounted() {
    this.getData();
  },
  data() {
    return {
      message: "Please wait, your file is now downloading...",
    };
  },
  methods: {
    async getData() {
      try {
        const id = this.$route.params.id;
        const token = this.$route.params.token;
        this.$store.commit("setAuthToken", token);
        const result = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/download-business/?id=${id}`,
          { headers: { Authorization: `jwt ${token}` } }
        );
        if (result.data) {
          const { data } = result;
          let application = {
            id: data.id,
            created_at: data.created_at,
            updated_at: data.updated_at,
            is_draft: data.is_draft,
            is_approve: data.is_approve,
            is_disapprove: data.is_disapprove,
            account_number: data.account_number,
            application_status: data.application_status,
            last_submitted: data.last_submitted,
          };
          this.$store.commit("setBusinessApplication", application);
          if (data.businessbasicinformation !== null) {
            this.$store.commit(
              "setBusinessBasicInformation",
              data.businessbasicinformation
            );
          }
          if (data.businessdetails !== null) {
            this.$store.commit("setBusinessDetails", data.businessdetails);
          }
          if (data.lessordetails !== null) {
            this.$store.commit("setLessorDetails", data.lessordetails);
          }
          await this.$store.dispatch("getBusinessActivity");
          this.$store.commit("setPrintBusiness", true);
          this.message =
            "Please close this window after successfully downloading your business permit application form. Thank you!";
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
div.meta-parent-box {
  width: 100%;
  margin-top: 50px;
  padding-bottom: 50px;
  .meta-form-holder {
    position: absolute;
    opacity: 0;
    top: -500px;
    z-index: -1;
  }
  .meta-message-holder {
    display: flex;
    padding: 13px;
    flex: 1;
    .meta-message {
      text-align: center;
    }
  }
}
</style>