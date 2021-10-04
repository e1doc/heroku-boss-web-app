<template>
  <section>
    <div class="thead">
      <div class="th">APPLICATION #</div>
      <div class="th">DATE</div>
      <!-- <div class="th" v-if="currentType === 'business'">Account #</div> -->
      <div class="th" v-if="currentType === 'building'">TD #</div>
      <div class="th" v-if="currentType === 'building'">INSPECTION DATE</div>
      <div class="th" v-if="currentType === 'business'">TRADENAME</div>
      <div class="th" v-if="currentType === 'business'">APPLICATION TYPE</div>
      <div class="th">STATUS</div>
      <div class="th">ACTIONS</div>
    </div>
    <!-- <div v-if="currentType === 'business'">
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
          <div class="td actions">
            //Just change the icon to 'eye' and text to 'VIEW' pag di na draft ung status
            <router-link to="business-permit-application">
                <font-awesome-icon icon="edit" class="mr5 view-icon" />EDIT
            </router-link>
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
        <div class="td actions">
          //Just change the icon to 'eye' and text to 'VIEW' pag di na draft ung status
          <router-link to="business-permit-application">
              <font-awesome-icon icon="edit" class="mr5 view-icon" />EDIT
          </router-link>
        </div>
      </div>
      </div>
            <div class="tbody" v-if="buildingApplications.length < 1">
        <div class="tr">
          <div class="td">No data available</div>
        </div>
      </div>
    </div> -->

    <div v-if="currentType === 'business'">
      <div class="tbody" v-if="applications.length > 0">
        <div
          class="tr"
          v-for="(application, index) in applications"
          :key="index"
        >
          <div class="td">
            {{
              application.businessbasicinformation !== null
                ? application.businessbasicinformation.reference_number
                : "N/A"
            }}
          </div>
          <div class="td">
            {{
              getApplicationDate(
                application.last_submitted,
                application.created_at
              )
            }}
          </div>
          <!-- <div class="td">
            {{
              application.account_number ? application.account_number : "N/A"
            }}
          </div> -->
          <div class="td">
            {{ application.businessdetails.trade_name }}
          </div>
          <div class="td">
            {{ application.application_type === "new" ? "New" : "Renewal" }}
          </div>
          <div class="td">
            {{
              application.application_status == 0
                ? "FOR EVALUATION"
                : application.application_status == 1
                ? "INCOMPLETE"
                : application.application_status == 2
                ? "FOR ASSESSMENT"
                : application.application_status == 3
                ? "FOR COMPLIANCE"
                : application.application_status == 4
                ? "FOR PAYMENT"
                : ""
            }}
          </div>
          <div class="td actions">
            <div @click="openBusinessApplication(application)">
              <font-awesome-icon icon="eye" class="mr5 view-icon" />VIEW
            </div>
          </div>
        </div>
      </div>
      <div class="tbody" v-if="applications.length < 1">
        <div class="tr">
          <div class="td">No data available</div>
        </div>
      </div>
      <paginate
        v-if="applications.length > 0"
        :page-count="pageCount"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :click-handler="businessClickCallback"
        v-model="currentPage"
      >
      </paginate>
    </div>

    <div v-if="currentType === 'building'">
      <div class="tbody" v-if="buildingApplications.length > 0">
        <div
          class="tr"
          v-for="(application, index) in buildingApplications"
          :key="index"
        >
          <div class="td">
            {{ application.series_number }}
          </div>
          <div class="td">
            {{ application.created_at | moment("MMMM DD YYYY") }}
          </div>
          <div class="td">
            {{
              application.buildingdetails !== null
                ? application.buildingdetails.tax_dec_no
                : "N/A"
            }}
          </div>
          <div class="td" v-if="application.inspection_date !== null">
            {{ application.inspection_date | moment("MMMM DD YYYY") }}
          </div>
          <div class="td" v-if="application.inspection_date === null">N/A</div>
          <div class="td">
            {{
              application.application_status == 0
                ? "FOR APPROVAL"
                : application.application_status == 1
                ? "INCOMPLETE"
                : application.application_status == 2
                ? "FOR INSPECTION"
                : application.application_status == 3
                ? "FOR ASSESSMENT"
                : application.application_status == 4
                ? "FOR COMPLIANCE"
                : application.application_status == 5
                ? "FOR COMPLIANCE"
                : "FOR PAYMENT"
            }}
          </div>
          <div class="td actions">
            <div @click="openBuildingApplication('view', application)">
              <font-awesome-icon icon="eye" class="mr5 view-icon" />VIEW
            </div>
          </div>
        </div>
      </div>
      <div class="tbody" v-if="buildingApplications.length < 1">
        <div class="tr">
          <div class="td">No data available</div>
        </div>
      </div>
      <paginate
        v-if="buildingApplications.length > 0"
        :page-count="propertyPageCount"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :click-handler="buildingClickCallBack"
        v-model="currentPage"
      >
      </paginate>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment-timezone";
export default {
  name: "AdminApplicationTable",
  computed: {
    ...mapGetters([
      "currentType",
      "applications",
      "buildingApplications",
      "pageCount",
      "groups",
      "propertyPageCount",
      "currentPageNum",
    ]),
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  mounted() {
    this.setUpData();
    this.currentPage = this.currentPageNum;
  },
  watch: {
    currentPage: {
      handler(newVal) {
        this.$store.commit("setCurrentPageNum", newVal);
      },
    },
    currentType: {
      handler(newVal) {
        this.currentPage = 1;
      },
    },
  },

  methods: {
    getApplicationDate(last_submitted, created_at) {
      if (last_submitted) {
        return moment(last_submitted).format("MMMM DD YYYY");
      } else {
        return moment(created_at).format("MMMM DD YYYY");
      }
    },
    async setUpData() {
      await this.$store.commit("setLoading", true);
      await this.$store.dispatch(
        "getAllBusinessApplications",
        this.currentPageNum
      );
      await this.$store.dispatch(
        "getAllBuildingApplications",
        this.currentPageNum
      );
      await this.$store.commit("setBusinessActivities", []);
      await this.$store.commit("setApplicationRequirements", {});
      if (
        this.groups.includes("superadmin") ||
        this.groups.includes("business_application_approver") ||
        this.groups.includes("business_application_read")
      ) {
        await this.$store.commit("setCurrentType", "business");
      } else {
        await this.$store.commit("setCurrentType", "building");
      }
      await this.$store.commit("setLoading", false);
    },
    async businessClickCallback(pageNum) {
      await this.$store.commit("setLoading", true);
      await this.$store.dispatch("getAllBusinessApplications", pageNum);
      await this.$store.commit("setLoading", false);
    },
    buildingClickCallBack(pageNum) {
      this.$store.dispatch("getAllBuildingApplications", pageNum);
    },
    async openBusinessApplication(data) {
      await this.$store.commit("setLoading", true);
      if (data.id) {
        console.log(data);
        let application = {
          id: data.id,
          created_at: data.created_at,
          updated_at: data.updated_at,
          is_draft: data.is_draft,
          is_approve: data.is_approve,
          is_disapprove: data.is_disapprove,
          account_number: data.account_number,
          application_status: data.application_status,
          user: data.user,
          last_submitted: data.last_submitted,
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

      if (data.businesspermitfiles.length > 0) {
        this.$store.commit("setBusinessPermits", data.businesspermitfiles);
      } else {
        this.$store.commit("setBusinessPermits", []);
      }
      await this.$store.dispatch("getBusinessActiveRequirement");
      await this.$store.commit("setLoading", false);
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
