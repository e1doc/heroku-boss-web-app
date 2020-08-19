<template>
  <section>
    <div class="thead hide-in-mobile">
      <div class="th">APPLICATION #</div>
      <div class="th">DATE</div>
      <div class="th" v-if="currentType === 'business'">Account #</div>
      <div class="th" v-if="currentType === 'real_property'">TD #</div>
      <div class="th">STATUS</div>
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
            {{ application.businessbasicinformation.reference_number }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">DATE : </span>
            {{ application.created_at | moment("MMMM DD YYYY") }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">ACCOUNT #: </span>
            {{
              application.account_number ? application.account_number : "N/A"
            }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">STATUS : </span>
            {{
              application.is_draft
                ? "DRAFT"
                : application.is_approve
                ? "FOR PAYMENT"
                : application.is_disapprove
                ? "DISAPPROVED"
                : "FOR APPROVAL"
            }}
          </div>
          <div class="td actions">
            <div @click="openBusinessApplication('edit', application)" v-if="application.is_draft">
              <font-awesome-icon icon="edit" class="mr5 view-icon" />EDIT
            </div>
          <div @click="openBusinessApplication('view',application)" v-if="!application.is_draft">
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
    </div>
    <div v-if="currentType === 'real_property'">
      <div class="tbody" v-if="buildingApplications.length > 0">
        <div
          class="tr"
          v-for="(application, index) in buildingApplications"
          :key="index"
        >
          <div class="td">
            <span class="td-label show-in-mobile">APPLICATION NO. : </span>
            {{ application.buildingbasicinformation.reference_number }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">DATE : </span>
            {{ application.created_at | moment("MMMM DD YYYY") }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">TD # : </span>
            {{ application.buildingdetails.tax_dec_no }}
          </div>
          <div class="td">
            <span class="td-label show-in-mobile">STATUS : </span>
            {{
              application.is_draft
                ? "DRAFT"
                : application.is_approve
                ? "FOR PAYMENT"
                : application.is_disapprove
                ? "DISAPPROVED":
                "FOR APPROVAL"
            }}
          </div>
          <div class="td actions">
            <div @click="openBuildingApplication('edit', application)" v-if="application.is_draft">
              <font-awesome-icon icon="edit" class="mr5 view-icon" />EDIT
            </div>
            <div @click="openBuildingApplication('view', application)" v-if="!application.is_draft">
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
    </div>

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
export default {
  name: "ApplicationTable",
  computed: {
    ...mapGetters(["currentType", "applications", "buildingApplications"]),
  },
  mounted() {
    this.$store.dispatch("getBusinessApplications");
    this.$store.dispatch("getBuildingApplications")
  },
  methods:{
    openBusinessApplication(type,data){
      if(data.id){
        let application = {id:data.id,created_at: data.created_at, is_draft: data.is_draft, is_approve: data.is_approve, account_number: data.account_number}
        this.$store.commit('setBusinessApplication', application)
      }
      if(data.businessbasicinformation !== null){
        this.$store.commit('setBusinessBasicInformation', data.businessbasicinformation)
      }
      if(data.businessdetails !== null){
        this.$store.commit('setBusinessDetails', data.businessdetails)
      }
      if(data.lessordetails !== null){
        this.$store.commit('setLessorDetails', data.lessordetails)
      }
      if(data.businessactivity.length > 0){
        this.$store.commit('setBusinessActivities',data.businessactivity)
      }
      if(data.businessapplicationrequirements.length > 0){
        this.$store.commit('setApplicationRequirements',data.businessapplicationrequirements[0])
      }
      if(type==='edit'){
        this.$router.push({ name: "BusinessPermitApplication" })
      }else{
        this.$router.push({ name: "ViewBusinessDetails" })
      }
    },
    openBuildingApplication(type, data){
      if(data.id){
        let application = {id: data.id, is_draft: data.is_draft, is_approve: data.is_approve, is_disapprove: data.is_disapprove, created_at: data.created_at}
        this.$store.commit("setBuildingApplication", application)
      }
      if(data.buildingbasicinformation !== null){
        this.$store.commit("setBuildingBasicInformation", data.buildingbasicinformation)
      }
      if(data.buildingdetails !== null){
        this.$store.commit("setBuildingDetails", data.buildingdetails)
      }
      if(data.buildingotherdetails !== null){
        this.$store.commit("setBuildingOtherDetails", data.buildingotherdetails)
      }
      if(data.buildingapplicationrequirements.length > 0){
        this.$store.commit("setBuildingApplicationRequirements",data.buildingapplicationrequirements[0])
      }
      if(type === 'edit'){
        this.$router.push({ name: "BuildingPermitApplication" })
      }else{
        this.$router.push({ name: "ViewBuildingDetails" })
      }
    }
  }
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
    .td.actions div, a {
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
