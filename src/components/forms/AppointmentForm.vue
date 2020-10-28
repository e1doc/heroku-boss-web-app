<template>
  <div class="container form-section">
    <div class="flex-column">
      <div class="meta-input-label mt10 mb10">
        Appointment Type:
      </div>
      <base-select
        placeholder="--- Select from the options ---"
        :options="appointmentTypeOptions"
        v-model="appointmentType"
        name="selectOptions"
        class="mb15"
      />
      <div class="meta-input-label mt10 mb10">
        Batch:
      </div>
      <base-select
        placeholder="--- Select from the options ---"
        :options="batchOptions"
        v-model="batch"
        name="selectOptions"
        class="mb15"
      />
       <button-block @click.native="setAppointment()"
        >Submit</button-block
      >
    </div>
  </div>
</template>

<script>
import ButtonBlock from "@/components/ButtonBlock";
import BaseSelect from "@/components/forms/BaseSelect";
import { mapGetters } from "vuex"
export default {
  name: "AppointmentForm",
  components: {
    BaseSelect,
    ButtonBlock
  },
  computed:{
    ...mapGetters(['currentDate', 'isAppointmentSuccess', 'appointmentError'])
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
          value: "Batch 1",
        },
        {
          label: "Batch 2 ( 1:00 PM - 5:00 PM )",
          value: "Batch 2",
        },
      ],
    };
  },
  methods:{
    async setAppointment(){
      let payload = {title: this.appointmentType, batch: this.batch, appointment_date: this.currentDate}
      await this.$store.commit("setLoading", true);
      await this.$store.dispatch('addAppointment', payload)
      console.log(this.isAppointmentSuccess)
      if(this.isAppointmentSuccess){
        await this.$store.commit("setLoading", false);
        this.$modal.hide("appointmentModal");
        this.$swal({
            title: 'Success!',
            text: 'Appointment was submitted successfully.',
            icon: 'success'
        })
        this.$router.push({name:'Appointment'})
      }else{
        await this.$store.commit("setLoading", false);
       this.$modal.hide("appointmentModal");
       this.$swal({
            title: 'Failed!',
            text: this.appointmentError,
            icon: 'error'
        })
      }
    }
  }
};
</script>

<style scoped>
.form-section{
  padding: 15px;
}
</style>
