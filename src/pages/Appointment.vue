<template>
  <section>
       <div class="meta-invoice-holder">
          <downloadable-appointment-invoice />
    </div>
    <div class="container">
      <div class="page-title">My Appointments</div> 
      <user-appointment-table />
    </div>
  </section>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import AppointmentForm from "@/components/forms/AppointmentForm";
import UserAppointmentTable from "@/components/tables/UserAppointmentTable";
import moment from "moment-timezone";
import DownloadableAppointmentInvoice from "@/components/payment/DownloadableAppointmentInvoice"
import { mapGetters } from "vuex";
export default {
  name: "Appointment",
  components: {
    FullCalendar,
    AppointmentForm,
    UserAppointmentTable,
    DownloadableAppointmentInvoice
  },
  computed: {
    ...mapGetters(["appointments", "appointmentLimits"]),
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
.meta-invoice-holder{
  position: absolute;
  opacity: 0.0;
  top:-5000px;
  left:-10000px;
  z-index: -1;
}
.meta-calendar-container {
  padding: 25px 15px;
}
.container {
  padding-top: 100px;
  .page-title{
      font-size: 27px;
      font-weight: bold;
      font-family: Raleway;
      text-align: center;
  }
}

@media (max-width: 768px){
  .container{
      padding-left: 0;
      padding-right: 0;
      .page-title{
          font-size: 20px;
      }
  }

}
</style>
