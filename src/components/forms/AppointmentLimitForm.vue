<template>
  <div class="container form-section">
    <div class="flex-column">
      <div class="meta-input-label mt10 mb10">
        From:
      </div>
      <base-date-picker class="mb15" v-model="start_date" />
      <div class="meta-input-label mt10 mb10">
        To:
      </div>
      <base-date-picker class="mb25" v-model="end_date" />
      <base-input
        label="Batch 1 Slots Per Day:"
        name="slots"
        refs="appointment_slot1"
        type="number"
        class="mt40"
        v-model="batch1_count"
      />
      <base-input
        label="Batch 2 Slots Per Day:"
        name="slots"
        refs="appointment_slot2"
        type="number"
        class="mt40"
        v-model="batch2_count"
      />
      <button-block @click.native="setAppointmentLimit()">Submit</button-block>
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
      batch1_count: 0,
      batch2_count: 0,
    };
  },
  methods: {
    async setAppointmentLimit() {
      this.$store.commit('setIsAppointmentSuccess', false)
      await this.$store.commit("setLoading", true);
      // let payload = {
      //   start_date: this.start_date,
      //   end_date: this.end_date,
      //   count: this.count,
      // };
      let payload = {
        limit_set: [
          {
            start_date: this.start_date,
            end_date: this.end_date,
            batch: "batch_1",
            batch1_count: this.batch1_count,
            count: this.batch1_count,
          },
          {
            start_date: this.start_date,
            end_date: this.end_date,
            batch: "batch_2",
            count: this.batch2_count,
          },
        ],
      };
      await this.$store.dispatch("addAppointmentLimit", payload);
      if (this.isAppointmentSuccess) {
        await this.$store.commit("setLoading", false);
        this.$modal.hide("appointmentLimitModal");
        this.$swal({
          title: "Success!",
          text: "Appointment slot settings was submitted successfully.",
          icon: "success",
        });
        this.$store.dispatch("appointmentLimits");
      } else {
        await this.$store.commit("setLoading", false);
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
