<template>
  <div class="container form-section">
    <div class="flex-column">
        
    </div>
  </div>
</template>

<script>
import ButtonBlock from "@/components/ButtonBlock";
import BaseSelect from "@/components/forms/BaseSelect";
import BaseDatePicker from "@/components/forms/BaseDatePicker";
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
    };
  },
  methods:{
    async setAppointment(){
      let payload = {title: this.appointmentType, batch: this.batch, appointment_date: this.currentDate}
      await this.$store.dispatch('addAppointment', payload)
      console.log(this.isAppointmentSuccess)
      if(this.isAppointmentSuccess){
        this.$modal.hide("appointmentModal");
        this.$swal({
            title: 'Success!',
            text: 'Appointment was submitted successfully.',
            icon: 'success'
        })
      }else{
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
