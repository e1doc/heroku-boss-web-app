<template>
  <downloadable-business-form />
</template>

<script>
import DownloadableBusinessForm from "../components/application/DownloadableBusinessForm.vue";
import axios from "axios";
export default {
  name: "MobileDownloadBusinessForm",
  components: { DownloadableBusinessForm },
  mounted() {},
  methods: {
    async getData() {
      try {
        const id = this.$route.params.id;
        const token = this.$routes.token;

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
}
</style>