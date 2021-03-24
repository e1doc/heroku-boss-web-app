<template>
  <div class="admin-container">
    <modal name="departmentModal" width="50%" height="auto" :adaptive="true"
      ><department-form
    /></modal>
    <modal
      name="departmentOrderModal"
      width="50%"
      height="auto"
      :adaptive="true"
      ><department-order-form
    /></modal>
    <div>
      <div class="admin-page-title flex-center">
        <font-awesome-icon icon="network-wired" class="admin-icon" />
        Departments
      </div>
      <div class="admin-body flex-wrap">
        <dept-table-menu />
        <div class="admin-content">
          <dept-table />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DeptTableMenu from "@/components/tables/DeptTableMenu";
import DeptTable from "@/components/tables/DeptTable";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { mapGetters } from "vuex";
import AppointmentLimit from "@/components/tables/AppointmentLimit";
import AppointmentTable from "@/components/tables/AppointmentTable";
import DepartmentForm from "@/components/forms/DepartmentForm";
import DepartmentOrderForm from "@/components/forms/DepartmentOrderForm";
export default {
  name: "AdminAppointment",
  components: {
    DeptTableMenu,
    DeptTable,
    FullCalendar,
    AppointmentLimit,
    AppointmentTable,
    DepartmentForm,
    DepartmentOrderForm,
  },
  computed: {
    ...mapGetters([]),
  },
  data() {
    return {};
  },
  mounted() {
    this.$store.commit("setLoading", false);
    window.scrollTo(0, 0);
  },
  methods: {
    handleEventClick(info) {},
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
