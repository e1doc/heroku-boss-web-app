<template>
  <section>
    <!-- <modal name="appointmentModal" width="50%" height="auto" :adaptive="true"
      ><appointment-form
    /></modal> -->
    <div class="container">
      <div class="page-title">My Appointments</div> 
      <!-- <div class="meta-calendar-container">
        <FullCalendar :options="calendarOptions"/>
      </div> -->
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
import { mapGetters } from "vuex";
export default {
  name: "Appointment",
  components: {
    FullCalendar,
    AppointmentForm,
    UserAppointmentTable
  },
  computed: {
    ...mapGetters(["appointments", "appointmentLimits"]),
  },
  data() {
    return {
      events: [],
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        weekends: false,
        selectable: true,
        events: [],
        dateClick: this.handleDateClick,
        dayMaxEvents: true,
        views: {
          dayGrid: {
            dayMaxEvents: 2, // adjust to 6 only for timeGridWeek/timeGridDay
          },
        },
      },
    };
  },
  created() {
    this.$store.dispatch("getUserAppointments");
  },
  mounted() {
    console.log(this.appointments)
    this.setUpAppointments();
  },
  methods: {
    async getLimits() {
      let calendarApi = this.$refs.appointmentCalendar.getApi();
      let currentDate = calendarApi.getDate();
      let month = currentDate.getMonth();
      await this.$store.dispatch("getUserAppointmentLimits", month);

      if (this.appointmentLimits.length > 0) {
        this.calendarOptions.events = [];
        this.appointmentLimits.forEach((item) => {
          let remaining_event = {
            id: item.id,
            title: `Remaining Slots: ${item.remaining}`,
            start: item.date,
            allDay: true,
            backgroundColor: '#2ecc71',
            borderColor: '#2ecc71',
            description: 'Lorem'
          }; 
          this.calendarOptions.events.push(remaining_event);
        });
      }
    },
    handleDateClick(info) {
      let date = moment(info.date).format();
      this.$store.commit("setCurrentDate", date);
      this.$modal.show("appointmentModal");
    },
    setUpAppointments() {
      if (this.appointments.length > 0) {
        this.appointments.forEach((item) => {
          let event = {
            id: item.id,
            title: `${item.title}`,
            start: moment
              .tz(item.appointment_date, "Asia/Manila")
              .format("YYYY-MM-DD"),
          };
          this.calendarOptions.events.push(event);
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
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
</style>
