<template>
  <div class="admin-container">
    <div class="admin-page-title flex-center">
      <font-awesome-icon icon="calendar" class="admin-icon" />
      Appointments
    </div>
    <div class="admin-body flex-wrap">
      <appointment-table-menu type="profile" />
      <div class="admin-content">
        <div v-if="appointmentStatus === 'slot'">
          <appointment-limit />
        </div>
        <div v-if="appointmentStatus === 'appointment'">
          <appointment-table />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppointmentTableMenu from "@/components/tables/AppointmentTableMenu";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { mapGetters } from "vuex";
import AppointmentLimit from "@/components/tables/AppointmentLimit";
import AppointmentTable from "@/components/tables/AppointmentTable";
export default {
  name: "AdminAppointment",
  components: {
    AppointmentTableMenu,
    FullCalendar,
    AppointmentLimit,
    AppointmentTable,
  },
  computed: {
    ...mapGetters(["appointmentStatus"]),
  },
  data() {
    return {};
  },
  methods: {
    handleEventClick(info) {},
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style lang="scss" scoped>
div.admin-container {
  width: 100%;
  div.admin-page-title {
    color: #1492e6;
    font-size: 30px;
    font-weight: bold;
    line-height: 29px;
    text-transform: capitalize;
    margin-bottom: 90px;
    .admin-icon {
      color: #1492e6;
      font-size: 35px;
      margin-right: 15px;
    }
  }
  div.admin-body {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    div.admin-search {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    div.admin-content {
      width: 100%;
      margin-top: 35px;
    }
  }
}

@media only screen and (max-width: 1380px) {
  div.admin-container div.admin-page-title {
    font-size: 28px;
    margin-bottom: 40px;
  }
}
</style>
