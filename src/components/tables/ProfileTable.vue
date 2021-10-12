<template>
  <section>
    <div class="thead hide-in-mobile">
      <!-- <div class="th" v-if="currentType === 'business'">ACCOUNT #</div> -->
      <div
        class="th"
        v-if="currentType === 'building' || currentType === 'real_property'"
      >
        TD #
      </div>
      <div class="th" v-if="currentType === 'business'">ACCOUNT NUMBER</div>
      <div class="th" v-if="currentType === 'business'">BUSINESS NAME</div>
      <div
        class="th"
        v-if="currentType === 'building' || currentType === 'real_property'"
      >
        OWNER NAME
      </div>
      <div class="th">ACTIONS</div>
    </div>
    <div v-if="currentType === 'business'">
      <div class="tbody" v-if="businessProfiles.length > 0">
        <div
          class="tr"
          v-for="(business, index) in businessProfiles"
          :key="index"
        >
          <!-- <div class="td">
            <span
              class="td-label show-in-mobile"
              >ACCOUNT # :
            </span>
            {{business.account_number}}
          </div> -->
          <div class="td" v-if="currentType === 'business'">
            <span class="td-label show-in-mobile">ACCOUNT NUMBER : </span>
            {{ business.account_number }}
          </div>
          <div class="td" v-if="currentType === 'business'">
            <span class="td-label show-in-mobile">BUSINESS NAME : </span>
            {{
              business.businessdetails.name != ""
                ? business.businessdetails.name
                : business.businessdetails.trade_name
            }}
          </div>
          <div class="td" v-if="currentType === 'building'">
            <span class="td-label show-in-mobile">OWNER NAME : </span>
            {{ business.businessbasicinformation.owner_first_name }}
            {{ business.businessbasicinformation.owner_last_name }}
          </div>
          <div class="td actions">
            <div @click="renew(business)" v-if="showRenewal(business)">
              <font-awesome-icon icon="sync-alt" class="mr5 icon" /> RENEW
            </div>
            <div class="bill" @click="showModal('business', business)">
              <font-awesome-icon icon="receipt" class="mr5 icon" />BILL
            </div>
          </div>
        </div>
      </div>
      <div class="tbody" v-if="businessProfiles.length < 1">
        <div class="tr">
          <div class="td">No data available</div>
        </div>
      </div>
    </div>
    <div v-if="currentType === 'building'">
      <div class="tbody" v-if="buildingProfiles.length > 0">
        <div
          class="tr"
          v-for="(building, index) in buildingProfiles"
          :key="index"
        >
          <div class="td">
            <span class="td-label show-in-mobile">TD # : </span>
            {{
              building.buildingdetails
                ? building.buildingdetails.tax_dec_no
                : "N/A"
            }}
          </div>
          <div class="td" v-if="currentType === 'building'">
            <span class="td-label show-in-mobile">OWNER NAME : </span>
            <span
              >{{
                building.buildingbasicinformation
                  ? building.buildingbasicinformation.owner_first_name
                  : "N/A"
              }}
              {{
                building.buildingbasicinformation
                  ? building.buildingbasicinformation.owner_last_name
                  : "N/A"
              }}</span
            >
          </div>
          <div class="td actions">
            <div v-if="isFeatureImplemented">
              <font-awesome-icon icon="sync-alt" class="mr5 icon" /> RENEW
            </div>
            <div class="bill" @click="showModal()">
              <font-awesome-icon icon="receipt" class="mr5 icon" />BILL
            </div>
          </div>
        </div>
      </div>
      <div class="tbody" v-if="buildingProfiles.length < 1">
        <div class="tr">
          <div class="td">No data available</div>
        </div>
      </div>
    </div>
    <div v-if="currentType === 'real_property'">
      <div class="tbody" v-if="realPropertyProfiles.length > 0">
        <div
          class="tr"
          v-for="(building, index) in realPropertyProfiles"
          :key="index"
        >
          <div class="td">
            <span class="td-label show-in-mobile">TD # : </span>
            {{
              building.buildingdetails
                ? building.buildingdetails.tax_dec_no
                : "N/A"
            }}
          </div>
          <div class="td" v-if="currentType === 'real_property'">
            <span class="td-label show-in-mobile">OWNER NAME : </span>
            <span>{{
              building.buildingbasicinformation
                ? building.buildingbasicinformation.owner_first_name
                : "N/A"
            }}</span>
          </div>
          <div class="td actions">
            <div v-if="isFeatureImplemented">
              <font-awesome-icon icon="sync-alt" class="mr5 icon" /> RENEW
            </div>
            <div class="bill" @click="showModal('real_property', building)">
              <font-awesome-icon icon="receipt" class="mr5 icon" />BILL
            </div>
          </div>
        </div>
      </div>
      <div class="tbody" v-if="realPropertyProfiles.length < 1">
        <div class="tr">
          <div class="td">No data available</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import moment from "moment-timezone";
const oneDocToken = process.env.VUE_APP_ONE_DOC_TOKEN;
const lguLocalEndpoint = process.env.VUE_APP_LGU_LOCAL_ENDPOINT;
export default {
  name: "ProfileTable",
  computed: {
    ...mapGetters([
      "currentType",
      "businessProfiles",
      "buildingProfiles",
      "realPropertyProfiles",
      "businessApplication",
    ]),
  },
  data() {
    return {
      isFeatureImplemented: false,
    };
  },
  mounted() {
    this.setUpData();
  },
  methods: {
    async setUpData() {
      this.$store.commit("setLoading", true);
      this.$store.dispatch("getBusinessProfiles");
      this.$store.dispatch("getBuildingProfiles");
      this.$store.dispatch("getRealPropertyProfiles");
      this.$store.commit("setLoading", false);
    },
    async renew(application) {
      this.$store.commit("setLoading", true);
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
      if (!application.is_renewed && application.is_enrolled) {
        await this.getLocalBusinessDetails(application.account_number);
      }
      await this.$store.dispatch(
        "getBusinessRequirementRenewal",
        application.id
      );
      this.$store.commit("setLoading", false);
      await this.$router.push({ name: "BusinessRenewal" });
    },
    async showModal(type, item) {
      this.$store.commit("setCurrentSoaType", type);
      if (type === "business") {
        if (!item.is_renewed && item.is_enrolled) {
          await this.setBusinessApplication(item);
          await this.getLocalBusinessDetails(item.account_number);
        }
        await this.$store.commit("setCurrentSelectedBusiness", item);
      }
      if (type === "real_property") {
        this.$store.commit("setCurrentSelectedProperty", item);
      }
      this.$modal.show("soaModal");
    },
    async getLocalBusinessDetails(account_number) {
      try {
        let config = {
          headers: {
            "OneDoc-Token": oneDocToken,
            "Content-Type": "application/json",
          },
        };
        const payload = {
          name: "RenewBusinessApplication",
          param: {
            accountno: account_number,
          },
        };
        const response = await axios.post(
          `${lguLocalEndpoint}`,
          payload,
          config
        );
        const data = response.data.Result;
        if (data.accountno) {
          const business_application = {
            is_renewed: true,
            is_disapprove: false,
            application_type: "renewal",
            account_number: data.accountno,
          };
          const business_basic_information = {
            application_number: this.businessApplication.id,
            dti_sec_cda_reg_number:
              data.orgtype == "SINGLE" ? data.dtino : data.secno,
            dti_sec_cda_reg_date:
              data.orgtype == "SINGLE" && data.dtidate !== null
                ? moment(data.dtidate).format()
                : data.orgtype !== "SINGLE" && data.secdate !== null
                ? moment(data.secdate).format()
                : null,
            type_of_organization: data.orgtype,
            ctc_no: "",
            tin: "",
            has_tax_incentive: false,
            government_entity: "",
            owner_first_name: data.ownerfirstname,
            owner_middle_name: data.ownermiddlename,
            owner_last_name: data.ownerlastname,
            owner_complete_address: data.owneraddress,
            owner_email_address: data.owneremail,
            owner_telephone_number: data.ownertelno,
            owner_mobile_number: "",
            mode_of_payment: this.getPaymode(data.paymode),
          };
          const business_details = {
            application_number: this.businessApplication.id,
            name: data.corpname,
            trade_name: data.tradename,
            complete_business_address: "",
            president_first_name: data.presidentname,
            president_middle_name: "",
            president_last_name: "",
            telephone_number: data.businesstelno,
            email_address: data.businessemail,
            property_index_number: "",
            area: data.businessarea,
            total_employees: data.empcount,
            residing_employees: data.empcount,
            address_no: data.addressno,
            subdivision: data.subdivision,
            unit_no: data.unitno,
            floor_no: data.floorno,
            house_no: "",
            block_no: data.block,
            lot_no: data.lot,
            building_no: data.buildingno,
            building_name: data.buildingname,
            street: data.street,
            barangay: data.barangay,
            city: "Bacoor City, Cavite",
          };
          const lessor_details = {
            first_name: data.lessorname,
            middle_name: "",
            last_name: "",
            complete_address: data.lessoraddress,
            telephone_number: data.lessortelno,
            mobile_number: "",
            email_address: data.lessoremail,
            gross_monthly_rental: data.rentamount,
          };
          const business_activities = [];
          for (let item of response.data.Result.businesslines) {
            const activity = {
              line_of_business: item.line,
              capitalization: item.gross.split(".")[0],
              units: 1,
            };
            business_activities.push(activity);
          }
          await this.$store.dispatch(
            "updateBusinessApplication",
            business_application
          );
          await this.$store.dispatch(
            "updateBusinessBasicInformation",
            business_basic_information
          );
          await this.$store.dispatch("updateBusinessDetails", business_details);
          await this.$store.dispatch("addLessorDetails", lessor_details);
          await this.$store.dispatch(
            "addBusinessActivity",
            business_activities
          );
        } else {
          this.$swal({
            title: "Failed!",
            text: response.data.Result.Message,
            icon: "error",
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    getPaymode(mode) {
      const paymentOptions = [
        {
          label: "Annually",
          value: "A",
        },
        {
          label: "Semi-annually",
          value: "S",
        },
        {
          label: "Quarterly",
          value: "Q",
        },
      ];
      for (let item of paymentOptions) {
        if (item.value === mode) {
          return item.label;
        }
      }
    },
    showRenewal(data) {
      console.log(data.last_renewal);
      if (data.last_renewal) {
        if (moment(data.last_renewal).isBefore(moment().format(), "year")) {
          return true;
        } else {
          return false;
        }
      } else if (data.latest_approval_date) {
        if (
          moment(data.latest_approval_date).isBefore(moment().format(), "year")
        ) {
          return true;
        } else {
          return false;
        }
      } else if (
        data.is_enrolled &&
        !data.latest_approval_date &&
        !data.last_renewal
      ) {
        return true;
      } else {
        return false;
      }
    },
    async setBusinessApplication(application) {
      this.$store.commit("setLoading", true);
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
      await this.$store.dispatch(
        "getBusinessRequirementRenewal",
        application.id
      );
      this.$store.commit("setLoading", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.thead {
  border-radius: 8px 8px 0px 0px;
  display: flex;
  flex-direction: row;
  border-bottom: 2px #e23a36 solid;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(127, 127, 127, 0.1);
  .th {
    flex: 1;
    font-size: 13px;
    font-weight: bold;
    text-align: center;
    padding: 18px 0px;
  }
}
.tbody {
  flex-direction: column;
  margin-top: 10px;
  .tr {
    display: flex;
    flex-direction: row;
    align-items: center;
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
    .actions {
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding: 8px 10px;
      div {
        color: #039be5;
        font-size: 13px;
        font-weight: bold;
        padding: 10px;
        margin: 0 10px;
        text-decoration: none;
        cursor: pointer;
      }
      .bill {
        font-size: 13px;
        padding: 8px 13px;
        border: 2px #039be5 solid;
        border-radius: 5px;
        transition: 0.4s;
        cursor: pointer;
      }
    }
  }
}

.bill:hover {
  color: #ffffff !important;
  background-color: #039be5;
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
}

@media only screen and (max-width: 650px) {
  .tbody .tr {
    width: 100%;
    float: left;
    margin: 0 0 20px;
  }
}
</style>
