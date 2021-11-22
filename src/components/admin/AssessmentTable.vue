<template>
  <section>
    <div class="thead">
      <div class="th">APPLICATION #</div>
      <div class="th" v-if="currentType === 'business'">Trade Name</div>
      <div class="th" v-if="currentType === 'business'">Application Type</div>
      <div class="th">DATE</div>
      <div class="th" v-if="currentType === 'building'">TD #</div>
      <div class="th">STATUS</div>
      <div class="th">ACTIONS</div>
    </div>
    <div v-if="currentType === 'business' && currentTable === 'assessed'">
      <div class="tbody" v-if="assessedBusinessList.length > 0">
        <div
          class="tr"
          v-for="(item, index) in assessedBusinessList"
          :key="index"
        >
          <div class="td">
            {{
              item.business_application.businessbasicinformation !== null
                ? item.business_application.businessbasicinformation
                    .reference_number
                : "N/A"
            }}
          </div>
          <div class="td">
            {{ item.business_application.businessdetails.trade_name }}
          </div>
          <div class="td">
            {{
              item.business_application.application_type === "new"
                ? "New"
                : "Renewal"
            }}
          </div>
          <div class="td">
            {{
              getApplicationDate(
                item.business_application.last_submitted,
                item.business_application.created_at
              )
            }}
          </div>
          <div class="td">
            {{ item.is_approve ? "APPROVED" : "DISAPPROVED" }}
          </div>
          <div class="td actions">
            <div
              @click="
                openBusinessApplication(item.business_application, 'assessed')
              "
            >
              <font-awesome-icon icon="eye" class="mr5 view-icon" />VIEW
            </div>
          </div>
        </div>
      </div>
      <div class="tbody" v-if="assessedBusinessList.length < 1">
        <div class="tr">
          <div class="td">No data available</div>
        </div>
      </div>
      <paginate
        v-if="assessedBusinessList.length > 0"
        :page-count="pageCount"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :click-handler="businessAssessedClick"
      >
      </paginate>
    </div>
    <div v-if="currentType === 'business' && currentTable === 'for_assessment'">
      <div class="tbody" v-if="forBusinessAssessmentList.length > 0">
        <div
          class="tr"
          v-for="(item, index) in forBusinessAssessmentList"
          :key="index"
        >
          <div class="td">
            {{
              item.businessbasicinformation !== null
                ? item.businessbasicinformation.reference_number
                : "N/A"
            }}
          </div>
          <div class="td">
            {{ item.businessdetails.trade_name }}
          </div>
          <div class="td">
            {{ item.application_type === "new" ? "New" : "Renewal" }}
          </div>
          <div class="td" v-if="item.application_type === 'new'">
            {{ item.created_at | moment("MMMM DD YYYY") }}
          </div>
          <div class="td" v-if="item.application_type === 'renewal'">
            {{ item.updated_at | moment("MMMM DD YYYY") }}
          </div>
          <div class="td">FOR ASSESSMENT</div>
          <div class="td actions">
            <div @click="openBusinessApplication(item, 'for_assessment')">
              <font-awesome-icon icon="eye" class="mr5 view-icon" />VIEW
            </div>
          </div>
        </div>
      </div>
      <div class="tbody" v-if="forBusinessAssessmentList.length < 1">
        <div class="tr">
          <div class="td">No data available</div>
        </div>
      </div>
      <paginate
        v-if="forBusinessAssessmentList.length > 0"
        :page-count="pageCount"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :click-handler="businessAssessmentClick"
      >
      </paginate>
    </div>
    <div v-if="currentType === 'building' && currentTable === 'for_assessment'">
      <div class="tbody" v-if="forBuildingAssessmentList.length > 0">
        <div
          class="tr"
          v-for="(item, index) in forBuildingAssessmentList"
          :key="index"
        >
          <div class="td">
            {{ item.series_number }}
          </div>
          <div class="td">
            {{ item.created_at | moment("MMMM DD YYYY") }}
          </div>
          <div class="td">
            {{
              item.buildingdetails !== null
                ? item.buildingdetails.tax_dec_no
                : "N/A"
            }}
          </div>
          <div class="td">FOR ASSESSMENT</div>
          <div class="td actions">
            <div @click="openBuildingApplication('view', item)">
              <font-awesome-icon icon="eye" class="mr5 view-icon" />VIEW
            </div>
          </div>
        </div>
      </div>
      <div class="tbody" v-if="forBuildingAssessmentList.length < 1">
        <div class="tr">
          <div class="td">No data available</div>
        </div>
      </div>
      <paginate
        v-if="forBuildingAssessmentList.length > 0"
        :page-count="propertyPageCount"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :click-handler="buildingAssessmentClick"
      >
      </paginate>
    </div>
    <div v-if="currentType === 'building' && currentTable === 'assessed'">
      <div class="tbody" v-if="assessedBuildingList.length > 0">
        <div
          class="tr"
          v-for="(item, index) in assessedBuildingList"
          :key="index"
        >
          <div class="td">
            {{ item.building_application.series_number }}
          </div>
          <div class="td">
            {{ item.created_at | moment("MMMM DD YYYY") }}
          </div>
          <div class="td">
            {{
              item.building_application.buildingdetails !== null
                ? item.building_application.buildingdetails.tax_dec_no
                : "N/A"
            }}
          </div>
          <div class="td">
            {{ item.is_approve ? "APPROVED" : "DISAPPROVED" }}
          </div>
          <div class="td actions">
            <div
              @click="
                openBuildingApplication('view', item.building_application)
              "
            >
              <font-awesome-icon icon="eye" class="mr5 view-icon" />VIEW
            </div>
          </div>
        </div>
      </div>
      <div class="tbody" v-if="assessedBuildingList.length < 1">
        <div class="tr">
          <div class="td">No data available</div>
        </div>
      </div>
      <paginate
        v-if="assessedBuildingList.length > 0"
        :page-count="propertyPageCount"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :click-handler="buildingAssessedClick"
      >
      </paginate>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment-timezone";
export default {
  name: "AssessmentTable",
  computed: {
    ...mapGetters([
      "currentType",
      "currentTable",
      "applications",
      "buildingApplications",
      "pageCount",
      "groups",
      "forBusinessAssessmentList",
      "assessedBusinessList",
      "forBuildingAssessmentList",
      "assessedBuildingList",
      "propertyPageCount",
    ]),
  },
  mounted() {
    this.setUpData();
  },
  methods: {
    async setUpData() {
      await this.$store.dispatch("getForBusinessAssessmentList");
      // await this.$store.dispatch("getAssessedBusinessList");
      await this.$store.dispatch("getForBuildingAssessmentList");
      // await this.$store.dispatch("getAssessedBuildingList");
    },
    getApplicationDate(last_submitted, created_at) {
      if (last_submitted) {
        return moment(last_submitted).format("MMMM DD YYYY");
      } else {
        return moment(created_at).format("MMMM DD YYYY");
      }
    },
    businessAssessmentClick(pageNum) {
      this.$store.dispatch("getForBusinessAssessmentList", pageNum);
    },
    businessAssessedClick(pageNum) {
      this.$store.dispatch("getAssessedBusinessList", pageNum);
    },
    buildingAssessmentClick(pageNum) {
      this.$store.dispatch("getForBuildingAssessmentList", pageNum);
    },
    buildingAssessedClick(pageNum) {
      this.$store.dispatch("getAssessedBuildingList", pageNum);
    },
    async openBusinessApplication(data, type) {
      if (type === "assessed") {
        this.$store.commit("setShowActionButtons", true);
      } else {
        this.$store.commit("setShowActionButtons", true);
      }
      if (data.id) {
        let application = {
          id: data.id,
          created_at: data.created_at,
          is_draft: data.is_draft,
          is_approve: data.is_approve,
          is_disapprove: data.is_disapprove,
          account_number: data.account_number,
          application_status: data.application_status,
          user: data.user,
          last_submitted: data.last_submitted,
          on_renewal: data.on_renewal,
        };
        this.$store.commit("setBusinessApplication", application);
      }
      if (data.businessbasicinformation !== null) {
        this.$store.commit(
          "setBusinessBasicInformation",
          data.businessbasicinformation
        );
      }
      if (data.businessdetails !== null) {
        this.$store.commit("setBusinessDetails", data.businessdetails);
      }
      if (data.lessordetails !== null) {
        this.$store.commit("setLessorDetails", data.lessordetails);
      }
      // if (data.businessactivity.length > 0) {
      //   this.$store.commit("setBusinessActivities", data.businessactivity);
      // }
      await this.$store.dispatch("getBusinessActivity");
      // if (data.businessapplicationrequirements.length > 0) {
      //   this.$store.commit(
      //     "setApplicationRequirements",
      //     data.businessapplicationrequirements[0]
      //   );
      // }
      await this.$store.dispatch("getBusinessActiveRequirement");
      this.$router.push({ name: "ApproveBusinessApplication" });
    },
    openBuildingApplication(type, data) {
      if (data.id) {
        let application = {
          id: data.id,
          is_draft: data.is_draft,
          is_approve: data.is_approve,
          is_disapprove: data.is_disapprove,
          created_at: data.created_at,
          application_status: data.application_status,
          user: data.user,
          last_submitted: data.last_submitted,
          series_number: data.series_number,
        };
        this.$store.commit("setBuildingApplication", application);
      }
      if (data.buildingbasicinformation !== null) {
        this.$store.commit(
          "setBuildingBasicInformation",
          data.buildingbasicinformation
        );
      }
      if (data.buildingdetails !== null) {
        this.$store.commit("setBuildingDetails", data.buildingdetails);
      }
      if (data.buildingotherdetails !== null) {
        this.$store.commit(
          "setBuildingOtherDetails",
          data.buildingotherdetails
        );
      }
      if (data.buildingapplicationrequirements.length > 0) {
        this.$store.commit(
          "setBuildingApplicationRequirements",
          data.buildingapplicationrequirements[0]
        );
      }
      this.$router.push({ name: "ApproveBuildingApplication" });
    },
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
    .td.actions div {
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
</style>
