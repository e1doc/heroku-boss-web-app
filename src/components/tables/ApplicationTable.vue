<template>
  <section>
    <div class="thead hide-in-mobile">
      <div class="th">APPLICATION #</div>
      <div class="th">DATE</div>
      <!-- <div class="th" v-if="currentType === 'business'">Account #</div> -->
      <div class="th" v-if="currentType === 'building'">TD #</div>
      <div class="th">STATUS</div>
      <div class="th">LATEST APPROVER</div>
      <div class="th">ACTIONS</div>
    </div>
    <div v-if="currentType === 'business'">
      <div class="tbody" v-if="applications.length > 0">
        <div
          class="tr"
          v-for="(application, index) in applications"
          :key="index"
        >
          <div class="td">
            <span class="td-label show-in-mobile">APPLICATION NO. : </span>
            {{
              application.businessbasicinformation !== null
                ? application.businessbasicinformation.reference_number
                : "N/A"
            }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">DATE : </span>
            {{
              getApplicationDate(
                application.last_submitted,
                application.created_at
              )
            }}
          </div>
          <!-- <div class="td">
            <span class="td-label show-in-mobile">ACCOUNT #: </span>
            {{
              application.account_number ? application.account_number : "N/A"
            }}
          </div> -->
          <div class="td">
            <span class="td-label show-in-mobile">STATUS : </span>
            {{
              application.application_status == 0 && !application.is_draft
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
            {{ application.is_draft ? "DRAFT" : "" }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">LATEST APPROVER : </span>
            {{
              application.latest_approver
                ? application.latest_approver.name
                : "N/A"
            }}
          </div>
          <div class="td actions">
            <div
              @click="openBusinessApplication('edit', application)"
              v-if="
                application.is_draft && application.application_type === 'new'
              "
            >
              <font-awesome-icon icon="edit" class="mr5 view-icon" />EDIT
            </div>
            <div
              @click="renew(application)"
              v-if="
                application.is_draft &&
                application.application_type === 'renewal'
              "
            >
              <font-awesome-icon icon="edit" class="mr5 view-icon" />EDIT
            </div>
            <div
              @click="openBusinessApplication('view', application)"
              v-if="
                !application.is_draft &&
                application.application_status !== 3 &&
                application.application_status !== 1
              "
            >
              <font-awesome-icon icon="eye" class="mr5 view-icon" />VIEW
            </div>
            <div
              @click="openBusinessRemarks(application.id)"
              v-if="
                application.application_status == 1 ||
                application.application_status == 3
              "
            >
              <font-awesome-icon icon="eye" class="mr5 view-icon" />REMARKS
            </div>
          </div>
        </div>
      </div>
      <div class="tbody" v-if="applications.length < 1">
        <div class="tr">
          <div class="td">No data available</div>
        </div>
      </div>
    </div>
    <div v-if="currentType === 'building'">
      <div class="tbody" v-if="buildingApplications.length > 0">
        <div
          class="tr"
          v-for="(application, index) in buildingApplications"
          :key="index"
        >
          <div class="td">
            <span class="td-label show-in-mobile">APPLICATION NO. : </span>
            {{ application.series_number }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">DATE : </span>
            {{ application.created_at | moment("MMMM DD YYYY") }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">TD # : </span>
            {{
              application.buildingdetails !== null
                ? application.buildingdetails.tax_dec_no
                : "N/A"
            }}
          </div>
          <div class="td" v-if="!application.is_draft">
            <span class="td-label show-in-mobile">STATUS : </span>
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
          <div class="td" v-if="application.is_draft">
            <span class="td-label show-in-mobile">STATUS : </span>
            {{ application.is_draft ? "DRAFT" : "" }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">LATEST APPROVER : </span>
            {{
              application.latest_approver
                ? application.latest_approver.name
                : "N/A"
            }}
          </div>
          <div class="td actions">
            <div
              @click="openBuildingApplication('edit', application)"
              v-if="application.is_draft"
            >
              <font-awesome-icon icon="edit" class="mr5 view-icon" />EDIT
            </div>
            <div
              @click="openBuildingApplication('view', application)"
              v-if="
                !application.is_draft &&
                application.application_status !== 4 &&
                application.application_status !== 1
              "
            >
              <font-awesome-icon icon="eye" class="mr5 view-icon" />VIEW
            </div>
            <div
              @click="openBuildingRemarks(application.id)"
              v-if="
                application.application_status == 1 ||
                application.application_status == 4
              "
            >
              <font-awesome-icon icon="eye" class="mr5 view-icon" />REMARKS
            </div>
          </div>
        </div>
      </div>
      <div class="tbody" v-if="buildingApplications.length < 1">
        <div class="tr">
          <div class="td">No data available</div>
        </div>
      </div>
    </div>

    <paginate
      v-if="applications.length > 0 && currentType === 'business'"
      :page-count="pageCount"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :click-handler="businessClickCallBack"
    >
    </paginate>

    <paginate
      v-if="buildingApplications.length > 0 && currentType === 'building'"
      :page-count="propertyPageCount"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :click-handler="buildingClickCallBack"
    >
    </paginate>

    <!-- <div class="tbody">
      <div class="tr">
        <div class="td">
          <span class="td-label show-in-mobile">APPLICATION NO. : </span>
          000001
        </div>
        <div class="td">
          <span class="td-label show-in-mobile">DATE : </span>
          JUNE 07 2020
        </div>
        <div class="td" v-if="currentType === 'business'">
          <span class="td-label show-in-mobile">ACCOUNT # : </span>
          MINISTOP
        </div>
        <div class="td" v-if="currentType === 'real_property'">
          <span class="td-label show-in-mobile">TD # : </span>
          A-01543
        </div>
        <div class="td">
          <span class="td-label show-in-mobile">STATUS : </span>
          DRAFT
        </div>
        <div class="td actions" v-if="currentType === 'business'">
          <router-link to="business-permit-application">
            <font-awesome-icon icon="edit" class="mr5 view-icon" />EDIT
          </router-link>
        </div>
        <div class="td actions" v-if="currentType === 'real_property'">
          <router-link to="building-permit-application">
            <font-awesome-icon icon="edit" class="mr5 view-icon" />EDIT
          </router-link>
        </div>
      </div>
      <div class="tr">
        <div class="td">
          <span class="td-label show-in-mobile">APPLICATION NO : </span>
          000002
        </div>
        <div class="td">
          <span class="td-label show-in-mobile">DATE : </span>
          JUNE 07 2020
        </div>
        <div class="td" v-if="currentType === 'business'">
          <span class="td-label show-in-mobile">ACCOUNT # : </span>
          MINISTOP
        </div>
        <div class="td" v-if="currentType === 'real_property'">
          <span class="td-label show-in-mobile">TD # : </span>
          A-01543
        </div>
        <div class="td">
          <span class="td-label show-in-mobile">STATUS : </span>
          PENDING
        </div>
        <div class="td actions" v-if="currentType === 'business'">
          <router-link to="view-business-details">
            <font-awesome-icon icon="eye" class="mr5 view-icon" />VIEW
          </router-link>
        </div>
        <div class="td actions" v-if="currentType === 'real_property'">
          <router-link to="view-building-details">
            <font-awesome-icon icon="eye" class="mr5 view-icon" />VIEW
          </router-link>
        </div>
      </div>
      <div class="tr">
        <div class="td">
          <span class="td-label show-in-mobile">APPLICATION NO : </span>
          000003
        </div>
        <div class="td">
          <span class="td-label show-in-mobile">DATE : </span>
          JUNE 07 2020
        </div>
        <div class="td" v-if="currentType === 'business'">
          <span class="td-label show-in-mobile">ACCOUNT # : </span>
          MINISTOP
        </div>
        <div class="td" v-if="currentType === 'real_property'">
          <span class="td-label show-in-mobile">TD # : </span>
          A-01543
        </div>
        <div class="td">
          <span class="td-label show-in-mobile">STATUS : </span>
          FOR PAYMENT
        </div>
        <div class="td actions" v-if="currentType === 'business'">
          <router-link to="view-business-details">
            <font-awesome-icon icon="eye" class="mr5 view-icon" />VIEW
          </router-link>
        </div>
        <div class="td actions" v-if="currentType === 'real_property'">
          <router-link to="view-building-details">
            <font-awesome-icon icon="eye" class="mr5 view-icon" />VIEW
          </router-link>
        </div>
      </div>
    </div> -->
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment-timezone";
export default {
  name: "ApplicationTable",
  computed: {
    ...mapGetters([
      "currentType",
      "applications",
      "buildingApplications",
      "pageCount",
      "propertyPageCount",
    ]),
  },
  mounted() {
    this.$store.dispatch("getBusinessApplications");
    this.$store.dispatch("getBuildingApplications");
    this.$store.commit("setCurrentTable", "applications");
    this.$store.commit("setBusinessActivities", []);
    this.$store.commit("setApplicationRequirements", {});
    if (this.currentType === "real_property") {
      this.$store.commit("setCurrentType", "business");
    }
  },
  methods: {
    getApplicationDate(last_submitted, created_at) {
      if (last_submitted) {
        return moment(last_submitted).format("MMMM DD YYYY");
      } else {
        return moment(created_at).format("MMMM DD YYYY");
      }
    },
    async businessClickCallBack(pageNum) {
      this.$store.dispatch("getBusinessApplications", pageNum);
    },
    async buildingClickCallBack(pageNum) {
      this.$store.dispatch("getBuildingApplications", pageNum);
    },
    async openBusinessRemarks(id) {
      await this.$store.dispatch("getBusinessRemarks", id);
      await this.$router.push({ name: "UserReplyInquiry" });
    },
    async openBuildingRemarks(id) {
      await this.$store.dispatch("getBuildingRemarks", id);
      await this.$router.push({ name: "UserReplyInquiry" });
    },
    async openBusinessApplication(type, data) {
      this.$store.commit("setIsPrivacyAgree", true);
      if (data.id) {
        let application = {
          id: data.id,
          created_at: data.created_at,
          updated_at: data.updated_at,
          is_draft: data.is_draft,
          is_approve: data.is_approve,
          is_disapprove: data.is_disapprove,
          account_number: data.account_number,
          application_status: data.application_status,
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
      // if(data.businessactivity.length > 0){
      //   this.$store.commit('setBusinessActivities',data.businessactivity)
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
      if (type === "edit") {
        this.$router.push({ name: "BusinessPermitApplication" });
      } else {
        this.$router.push({ name: "ViewBusinessDetails" });
      }
    },
    openBuildingApplication(type, data) {
      this.$store.commit("setIsPrivacyAgree", true);
      if (data.id) {
        let application = {
          id: data.id,
          is_draft: data.is_draft,
          is_approve: data.is_approve,
          is_disapprove: data.is_disapprove,
          created_at: data.created_at,
          application_status: data.application_status,
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
      if (type === "edit") {
        this.$router.push({ name: "BuildingPermitApplication" });
      } else {
        this.$router.push({ name: "ViewBuildingDetails" });
      }
    },
    async renew(application) {
      if (application.id) {
        let data = {
          id: application.id,
          created_at: application.created_at,
          updated_at: application.updated_at,
          is_draft: application.is_draft,
          is_approve: application.is_approve,
          is_disapprove: application.is_disapprove,
          account_number: application.account_number,
          application_status: application.application_status,
          last_submitted: application.last_submitted,
          is_renewed: application.is_renewed,
          is_enrolled: application.is_enrolled,
        };
        await this.$store.commit("setBusinessApplication", data);
      }
      if (application.businessbasicinformation !== null) {
        await this.$store.commit(
          "setBusinessBasicInformation",
          application.businessbasicinformation
        );
      }
      if (application.businessdetails !== null) {
        await this.$store.commit(
          "setBusinessDetails",
          application.businessdetails
        );
      }
      if (application.lessordetails !== null) {
        await this.$store.commit("setLessorDetails", application.lessordetails);
      }
      await this.$store.dispatch("getBusinessActivityRenewal", application.id);
      await this.$store.dispatch(
        "getBusinessRequirementRenewal",
        application.id
      );
      await this.$router.push({ name: "BusinessRenewal" });
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
