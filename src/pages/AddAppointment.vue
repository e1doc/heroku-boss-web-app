<template>
  <section>
    <modal name="appointmentModal" width="50%" height="auto" :adaptive="true"
      ><appointment-form
    /></modal>
    <div class="container">
      <div class="meta-calendar-container">
        <FullCalendar :options="calendarOptions" ref="appointmentCalendar" />
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
  name: "AddAppointment",
  components: {
    FullCalendar,
    AppointmentForm,
  },
  computed: {
    ...mapGetters(["appointments", "appointmentLimits"]),
  },
  watch: {
    appointments: {
      deep: true,
      handler(status) {
        this.calendarOptions.events = [];
        this.setUpAppointments();
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
            dayRender: function(date, cell) {
              if (date < moment(new Date(Date.now())).endOf("day")) {
                $(cell).addClass("disabled");
              }
            },
            dayMaxEvents: 2, // adjust to 6 only for timeGridWeek/timeGridDay
          },
        },
        customButtons: {
          prev: {
            // this overrides the prev button
            text: "PREV",
            click: () => {
              let calendarApi = this.$refs.appointmentCalendar.getApi();
              calendarApi.prev();
              this.getLimits();
            },
          },
          next: {
            // this overrides the next button
            text: "NEXT",
            click: () => {
              let calendarApi = this.$refs.appointmentCalendar.getApi();
              calendarApi.next();
              this.getLimits();
            },
          },
        },
        headerToolbar: {
          left: "title",
          right: "today, prev,next",
        },
      },
    };
  },
  mounted() {
    // this.setUpAppointments();
    this.getLimits();
    this.$store.commit("setCurrentPaymentType", "landbank");
  },
  methods: {
    async getLimits() {
      this.$store.commit("setLoading", true);
      let calendarApi = this.$refs.appointmentCalendar.getApi();
      let currentDate = calendarApi.getDate();
      let month = currentDate.getMonth();
      await this.$store.dispatch("getUserAppointmentLimits", month);
      this.$store.commit("setLoading", false);
      if (this.appointmentLimits.length > 0) {
        this.calendarOptions.events = [];
        let currentDate = moment.tz(new Date(Date.now()), "Asia/Manila");

        this.appointmentLimits.forEach((item) => {
          let date = moment.tz(item.date, "Asia/Manila");
          if (date.isAfter(currentDate.endOf("day"))) {
            let remaining_event = {
              id: item.id,
              title:
                item.batch === "batch_1"
                  ? `Batch 1: ${item.remaining} slots`
                  : `Batch 2: ${item.remaining} slots`,
              start: item.date,
              allDay: true,
              backgroundColor: item.remaining < 1 ? "#e23a36" : "#2ecc71",
              borderColor: item.remaining < 1 ? "#e23a36" : "#2ecc71",
            };
            this.calendarOptions.events.push(remaining_event);
          }
        });
      }
    },
    handleDateClick(info) {
      let date = moment(info.date).format();
      let currentDate = moment.tz(new Date(Date.now()), "Asia/Manila");
      let selectedDate = moment.tz(info.date, "Asia/Manila");
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
