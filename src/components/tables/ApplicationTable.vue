<template>
  <section>
    <div class="thead">
      <div class="th">APPLICATION #</div>
      <div class="th">DATE</div>
      <div class="th" v-if="currentType === 'business'">Account #</div>
      <div class="th" v-if="currentType === 'real_property'">TD #</div>
      <div class="th">STATUS</div>
    </div>
    <div v-if="currentType === 'business'">
      <div class="tbody" v-if="applications.length > 0">
        <div
          class="tr"
          v-for="(application, index) in applications"
          :key="index"
        >
          <div class="td">
            {{ application.businessbasicinformation.reference_number }}
          </div>
          <div class="td">
            {{ application.created_at | moment("MMMM DD YYYY") }}
          </div>
          <div class="td">
            {{
              application.account_number ? application.account_number : "N/A"
            }}
          </div>
          <div class="td">
            {{
              application.is_draft
                ? "DRAFT"
                : application.is_approve
                ? "FOR PAYMENT"
                : "DISAPPROVED"
            }}
          </div>
        </div>
      </div>
      <div class="tbody" v-if="applications.length < 1">
        <div class="tr">
          <div class="td">No data available</div>
        </div>
      </div>
    </div>
    <div v-if="currentType === 'real_property'">
      <div class="tbody" v-if="buildingApplications.length > 0">
        <div class="tr" v-for="(application, index) in buildingApplications" :key="index">
        <div class="td">{{application.buildingbasicinformation.reference_number}}</div>
        <div class="td">{{application.created_at |  moment("MMMM DD YYYY")}}</div>
        <div class="td">{{application.buildingdetails.tax_dec_no}}</div>
        <div class="td">{{
              application.is_draft
                ? "DRAFT"
                : application.is_approve
                ? "FOR PAYMENT"
                : "DISAPPROVED"
            }}</div>
      </div>
      </div>
            <div class="tbody" v-if="buildingApplications.length < 1">
        <div class="tr">
          <div class="td">No data available</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ApplicationTable",
  computed: {
    ...mapGetters(["currentType", "applications","buildingApplications"]),
  },
  mounted() {
    this.$store.dispatch("getBusinessApplications");
    this.$store.dispatch("getBuildingApplications")
  },
};
</script>

<style lang="scss" scoped>
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
  }
}
</style>
