<template>
  <div class="meta-parent-box">
    <div class="meta-form-holder">
      <downloadable-appointment-invoice />
    </div>
    <div class="meta-message-holder">
      <h3 class="meta-message">{{ message }}</h3>
    </div>
  </div>
</template>

<script>
import DownloadableAppointmentInvoice from "@/components/payment/DownloadableAppointmentInvoice";
import axios from "axios";
export default {
  name: "MobileDownloadAppointment",
  components: {
    DownloadableAppointmentInvoice,
  },
  data() {
    return {
      message: "Please wait, your file is now downloading...",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const id = this.$route.params.id;
        const token = this.$route.params.token;
        const type = this.$route.params.type;

        const result = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/download-appointment/?id=${id}`,
          { headers: { Authorization: `jwt ${token}` } }
        );

        const appointment = result.data;

        console.log(appointment);
        if (appointment) {
          await this.$store.commit(
            "setCurrentSoaType",
            appointment.soa.application_type
          );
          await this.$store.commit("setCurrentSoaObj", appointment.soa);

          if (appointment.soa.application_type === "business") {
            await this.$store.commit(
              "setCurrentSelectedBusiness",
              appointment.soa.business_application
            );
          } else {
            await this.$store.commit(
              "setCurrentSelectedProperty",
              appointment.soa.building_application
            );
          }

          await this.$store.commit("setCurrentAppointment", appointment);
          await this.$store.commit("setPrintInvoice", true);
        }
      } catch (err) {
        err.response ? console.log(err.response) : console.log(err);
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
