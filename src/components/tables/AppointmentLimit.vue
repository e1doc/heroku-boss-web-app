<template>
  <section>
    <modal
      name="appointmentLimitModal"
      width="50%"
      height="auto"
      :adaptive="true"
      ><appointment-limit-form
    /></modal>
    <div>
      <!-- <div class="thead hide-in-mobile">
        <div class="th">FROM</div>
        <div class="th">TO</div>
        <div class="th">COUNT</div>
        <div class="th">ACTIONS</div>
      </div>
      <div>
        <div class="tbody" v-if="appointmentLimits.length > 0">
          <div
            class="tr"
            v-for="(item, index) in appointmentLimits"
            :key="index"
          >
            <div class="td">
              {{ item.start_date | moment("MMMM DD, YYYY") }}
            </div>
            <div class="td">{{ item.end_date | moment("MMMM DD, YYYY") }}</div>
            <div class="td">{{ item.count }}</div>
            <div class="td">EDIT</div>
          </div>
        </div>
        <div class="tbody" v-if="appointmentLimits.length < 1">
          <div class="tr">
            <div class="td">No data available</div>
          </div>
        </div>
      </div> -->
      <FullCalendar ref="fullCalendar" :options="calendarOptions1" />
    </div>
  </section>
</template>

<script>
import ButtonBlock from "@/components/ButtonBlock";
import { mapGetters } from "vuex";
import AppointmentLimitForm from "@/components/forms/AppointmentLimitForm";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
export default {
  name: "AppointmentLimit",
  components: {
    ButtonBlock,
    FullCalendar,
    AppointmentLimitForm,
  },
  data() {
    return {
      calendarOptions1: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: "dayGridMonth",
        weekends: false,
        selectable: true,
        events: [],
        dateClick: this.handleDateClick,
        dayMaxEvents: true,
        views: {
          dayGrid: {
            dayMaxEvents: 4, // adjust to 6 only for timeGridWeek/timeGridDay
          },
        },
        customButtons: {
          prev: {
            // this overrides the prev button
            text: "PREV",
            click: () => {
              let calendarApi = this.$refs.fullCalendar.getApi();
              calendarApi.prev();
              this.getLimits();
            },
          },
          next: {
            // this overrides the next button
            text: "NEXT",
            click: () => {
              let calendarApi = this.$refs.fullCalendar.getApi();
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
  computed: {
    ...mapGetters(["appointmentLimits", "isAppointmentSuccess"]),
  },
  created() {
    this.$store.dispatch("appointmentLimits");
  },
  mounted() {
    this.getLimits();
  },
  watch:{
    isAppointmentSuccess: {
      deep: true,
      handler(status) {
        if(status){
          this.getLimits()
        }
      },
    },
  },
  methods: {
    handleMonthChange: function(arg) {

    },
    async getLimits() {
      await this.$store.commit("setLoading", true);
      let calendarApi = this.$refs.fullCalendar.getApi();
      let currentDate = calendarApi.getDate();
      let month = currentDate.getMonth();
      await this.$store.dispatch("getAppointmentLimits", month);

      if (this.appointmentLimits.length > 0) {
        this.calendarOptions1.events = [];
        this.appointmentLimits.forEach((item) => {
          let count_event = {
            id: item.id,
            title: item.batch === 'batch_1' ?  `B1 Total Slots: ${item.count}` : `B2 Total Slots: ${item.count}`,
            start: item.date,
            backgroundColor: item.batch === 'batch_1' ? '#2ecc71' : '',
            borderColor: item.batch === 'batch_1' ? '#2ecc71' : '',
            allDay: true,
          };
          let remaining_event = {
            id: item.id,
            title: item.batch === 'batch_1' ?  `B1 Remaining Slots: ${item.remaining}` : `B2 Remaining Slots: ${item.remaining}` ,
            start: item.date,
            allDay: true,
            backgroundColor: item.batch === 'batch_1' ? '#2ecc71' : '',
            borderColor: item.batch === 'batch_1' ? '#2ecc71' : '',
            description: 'Lorem'
          }; 
          this.calendarOptions1.events.push(count_event);
          this.calendarOptions1.events.push(remaining_event);
        });
      }
      await this.$store.commit("setLoading", false);
    },
  },
};
</script>

<style scoped lang="scss">
.meta-create-holder {
  width: 100%;
  text-align: right;
}
.thead {
  display: flex;
  flex-direction: row;
  background: #ffffff;
  border-radius: 8px 8px 0px 0px;
  border-bottom: 2px #e23a36 solid;
  box-shadow: 0px 10px 20px rgba(127, 127, 127, 0.1);
  .th {
    flex: 1;
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    padding: 20px 0px;
  }
}
.tbody {
  flex-direction: column;
  margin-top: 10px;
  .tr {
    display: flex;
    flex-direction: row;
    background: #ffffff;
    box-shadow: 0px 10px 20px rgba(127, 127, 127, 0.1);
    border-radius: 8px;
    margin-top: 3px;
    padding-left: 10px;
    padding-right: 10px;
    .td {
      flex: 1;
      font-size: 14px;
      font-family: "Proxima Nova Rg";
      text-align: center;
      padding: 17px 0px;
    }
    .td.actions div,
    a {
      color: #1492e6;
      font-size: 13px;
      font-weight: bold;
      text-decoration: none;
      cursor: pointer;
      transition: 0.4s;
    }
    .td.actions a:hover {
      color: #2b2b2b;
    }
  }
}

/*
MOBILE RESPONSIVENESS ------------------------------------------- */

span.td-label.show-in-mobile {
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #000c114d;
}

.show-in-mobile {
  display: none;
}

@media only screen and (max-width: 860px) {
  .show-in-mobile {
    display: block;
  }

  .thead {
    display: none;
  }

  .tbody {
    flex-direction: unset;
    margin-top: 0;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  .tbody .tr {
    // background: #eef8ff;
    flex-wrap: wrap;
    flex-direction: unset;
    padding: 15px 20px;
    width: calc(50% - 60px);
    float: left;
    margin: 0 10px 20px;
  }

  .tbody .tr .td {
    flex: unset;
    width: 100%;
    float: left;
    text-align: left;
  }

  .tbody .tr .td.actions {
    text-align: center;
    padding: 0;
  }

  .tbody .tr .td.actions a {
    width: 100%;
    padding: 17px 0px;
    display: block;
    border: 1px solid #bce0fd;
    border-radius: 10px;
  }
  .tbody .tr .td.actions a:hover,
  .tbody .tr .td.actions a:focus {
    color: #fff;
    background-color: #1492e6;
  }
}

@media only screen and (max-width: 650px) {
  .tbody .tr {
    width: 100%;
    float: left;
    margin: 0 0 20px;
  }
}
</style>
