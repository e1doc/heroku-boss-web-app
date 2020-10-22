<template>
  <div class="container form-section">
    <div class="flex-column">
      <div class="meta-input-label mt10 mb10">
        From:
      </div>
      <base-date-picker class="mb15" v-model="start_date"/>
      <div class="meta-input-label mt10 mb10">
        To:
      </div>
      <base-date-picker class="mb25" v-model="end_date"/>
      <base-input
        label="Slots:"
        name="slots"
        refs="appointment_slot"
        type="number"
        class="mt40"
        v-model="count"
      />
       <button-block @click.native="setAppointmentLimit()"
        >Submit</button-block
      >
    </div>
  </div>
</template>

<script>
import ButtonBlock from "@/components/ButtonBlock";
import BaseSelect from "@/components/forms/BaseSelect";
import BaseDatePicker from "@/components/forms/BaseDatePicker";
import BaseInput from "@/components/forms/BaseInput";
import { mapGetters } from "vuex";
export default {
  name: "AppointmentForm",
  components: {
    BaseSelect,
    ButtonBlock,
    BaseDatePicker,
    BaseInput,
  },
  computed: {
    ...mapGetters(["currentDate", "isAppointmentSuccess", "appointmentError"]),
  },
  data() {
    return {
      start_date: "",
      end_date: "",
      count: 0
    };
  },
  methods: {
    async setAppointmentLimit() {
      let payload = {
        start_date: this.start_date,
        end_date: this.end_date,
        count: this.count,
      };
      await this.$store.dispatch("addAppointmentLimit", payload);
      console.log(this.isAppointmentSuccess);
      if (this.isAppointmentSuccess) {
        this.$modal.hide("appointmentLimitModal");
        this.$swal({
          title: "Success!",
          text: "Appointment slot settings was submitted successfully..",
          icon: "success",
        });
      } else {
        this.$modal.hide("appointmentLimitModal");
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
