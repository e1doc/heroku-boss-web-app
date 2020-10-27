<template>
  <section>
    <modal name="appointmentModal" width="50%" height="auto" :adaptive="true"
      ><appointment-form
    /></modal>
    <div class="container">
      <div class="meta-calendar-container">
        <FullCalendar :options="calendarOptions" />
      </div>
    </div>
  </section>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import AppointmentForm from "@/components/forms/AppointmentForm";
import moment from "moment-timezone";
import { mapGetters } from "vuex";
export default {
  name: "Appointment",
  components: {
    FullCalendar,
    AppointmentForm,
  },
  computed: {
    ...mapGetters(["appointments"]),
  },
  watch:{
    appointments: {
      deep: true,
      handler(status) {
        this.calendarOptions.events = []
        this.setUpAppointments()
      },
    },
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
    this.setUpAppointments();
  },
  methods: {
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
</style>
