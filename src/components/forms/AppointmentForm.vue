<template>
  <div class="container form-section">
    <div class="flex-column">
      <!-- <div class="meta-input-label mt10 mb10">
        Appointment Type:
      </div> -->
      <!-- <base-select
        placeholder="--- Select from the options ---"
        :options="appointmentTypeOptions"
        v-model="appointmentType"
        name="selectOptions"
        class="mb15"
      /> -->
      <div class="meta-input-label mt10 mb10">Batch:</div>
      <base-select
        placeholder="--- Select from the options ---"
        :options="batchOptions"
        v-model="batch"
        name="selectOptions"
        class="mb15"
      />
      <button-block
        @click.native="setAppointment()"
        v-if="appointmentAction === 'add'"
        >Submit</button-block
      >
      <button-block
        @click.native="updateAppointment()"
        v-if="appointmentAction === 'update'"
        >Submit</button-block
      >
    </div>
  </div>
</template>

<script>
import ButtonBlock from "@/components/ButtonBlock";
import BaseSelect from "@/components/forms/BaseSelect";
import { mapGetters } from "vuex";
export default {
  name: "AppointmentForm",
  components: {
    BaseSelect,
    ButtonBlock,
  },
  computed: {
    ...mapGetters([
      "currentDate",
      "isAppointmentSuccess",
      "appointmentError",
      "currentSoa",
      "currentAppointment",
      "appointmentAction",
      "currentSoaObj",
    ]),
  },
  data() {
    return {
      appointmentType: "",
      batch: "",
      appointmentTypeOptions: [
        {
          label: "Building Permit Payment",
          value: "Building Permit Payment",
        },
        {
          label: "Business Permit Payment",
          value: "Business Permit Payment",
        },
      ],

      batchOptions: [
        {
          label: "Batch 1 ( 8:00 AM - 1:00 PM )",
          value: "batch_1",
        },
        {
          label: "Batch 2 ( 1:00 PM - 5:00 PM )",
          value: "batch_2",
        },
      ],
    };
  },
  methods: {
    async setAppointment() {
      console.log("current soa type", this.currentSoaObj);
      let title =
        this.currentSoaObj.application_type === "business"
          ? "Business Permit Payment"
          : this.currentSoaObj.application_type === "building"
          ? "Building Permit Payment"
          : "Real Property Payment";

      let payload = {
        title: title,
        batch: this.batch,
        appointment_date: this.currentDate,
        soa: this.currentSoaObj.id,
      };
      await this.$store.commit("setLoading", true);
      await this.$store.dispatch("addAppointment", payload);
      if (this.isAppointmentSuccess) {
        await this.$store.commit("setLoading", false);
        this.$modal.hide("appointmentModal");
        this.$swal({
          title: "Success!",
          text: "Appointment was submitted successfully.",
          icon: "success",
        });
        this.$router.push({ name: "AppointmentSlip" });
      } else {
        await this.$store.commit("setLoading", false);
        this.$modal.hide("appointmentModal");
        this.$swal({
          title: "Failed!",
          text: this.appointmentError,
          icon: "error",
        });
      }
    },
    async updateAppointment() {
      let payload = this.currentAppointment;
      payload.old_appointment_date = this.currentAppointment.appointment_date;
      payload.appointment_date = this.currentDate;
      payload.batch = this.batch;
      payload.old_batch = this.currentAppointment.batch;
      payload.soa = this.currentSoaObj.id;
      await this.$store.commit("setLoading", true);
      await this.$store.dispatch("updateAppointment", payload);
      if (this.isAppointmentSuccess) {
        await this.$store.commit("setLoading", false);
        this.$modal.hide("appointmentModal");
        this.$swal({
          title: "Success!",
          text: "Appointment was rescheduled successfully.",
          icon: "success",
        });
        this.$router.push({ name: "AppointmentSlip" });
      } else {
        await this.$store.commit("setLoading", false);
        this.$modal.hide("appointmentModal");
        this.$swal({
          title: "Failed!",
          text: this.appointmentError,
          icon: "error",
        });
      }
    },
  },
};
</script>

<style scoped>
.form-section {
  padding: 15px;
}
</style>
