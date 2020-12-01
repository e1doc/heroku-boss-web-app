<template>
  <div class="inquiry-box">
    <div class="inquiry-header">
      <div class="inquiry-subj">
        New {{ type === "inquiry" ? "Inquiry" : "Remarks" }}
      </div>
      <!-- <div class="application-button">
                 <button-block type="default" class="inquiry-application-btn" />
             </div> -->
      <div class="inquiry-date">
        Date: {{ new Date(Date.now()) | moment("MMMM DD YYYY") }}
      </div>
    </div>
    <div class="inquiry-body">
      <!-- REPLY SECTION -->
      <div class="inquiry-new">
        <div class="inquiry-new-text">SUBJECT</div>
        <input
          type="text"
          name="subject"
          id="subject"
          class="input-subject"
          placeholder="Type your subject here"
          v-model="subject"
          :disabled="type === 'inquiry' ? false : true"
        />
        <div v-if="type === 'inquiry'">
          <div class="inquiry-new-text mb15">Department Concern</div>
          <base-select
            placeholder="------ Choose Department ------"
            :options="departments"
            name="selectDepartment"
            class="select-input mb15"
            v-model="department"
          />
        </div>
        <div class="inquiry-new-text">
          {{ type === "inquiry" ? "Inquiry" : "Remarks" }}
        </div>
        <textarea
          name="inquiry"
          id="inquiry"
          rows="6"
          placeholder="Type your text here"
          v-model="body"
        ></textarea>

        <!-- ATTACH FILE -->
        <base-file-uploader
          name="inquiryattachment"
          fileLabel="inquiry_attachment"
          uploadType="application/pdf"
          class="upload-attachment"
          v-if="isLastBuildingDept"
          :isEvaluation="true"
        />
      </div>
      <div class="inquiry-button flex-wrap">
        <button-block
          type="send"
          :disabled="
            !isButtonDisabled()
          "
          @click.native="sendMessage"
          :class="{
            'btn-disabled': !isButtonDisabled(),
          }"
          >SEND</button-block
        >
      </div>
    </div>
  </div>
</template>

<script>
import InquiryTableMenu from "@/components/tables/InquiryTableMenu";
import InquiryTable from "@/components/tables/InquiryTable";
import ButtonBlock from "@/components/ButtonBlock";
import BaseInput from "@/components/forms/BaseInput";
import BaseFileUploader from "@/components/forms/BaseFileUploader";
import BaseSelect from "@/components/forms/BaseSelect";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "ReplyInquiry",
  components: {
    InquiryTableMenu,
    InquiryTable,
    ButtonBlock,
    BaseInput,
    BaseFileUploader,
    BaseSelect,
  },
  computed: {
    ...mapGetters([
      "currentTable",
      "currentInquiry",
      "remarks",
      "buildingApplication",
      "businessApplication",
      "isBuildingAssessment",
      "isLastBuildingDept",
      "userDepartment",
      "applicationRemarks",
      "isBusinessAssessment",
      "isLastBusinessDept",
      "authToken",
    ]),
  },
  props: {
    application_number: {
      type: String,
      default: "",
    },
    application_type: {
      type: String,
      default: "",
    },
    user: {
      type: Number,
    },
  },
  data() {
    return {
      subject: "",
      body: "",
      type: "",
      applicationType: "",
      applicationNumber: "",
      receiver: "",
      departments: [],
      department: "",
      required_fields: ["department", "subject", "body"],
      field_errors: { department: [], subject: [], body: [] },
    };
  },
  created() {
    this.getDepartments();
  },
  mounted() {
    console.log(this.type);
    this.getRemarks();
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("setApplicationStateRemarks", {});
    this.$store.commit("setCurrentInquiry", "");
    next();
  },
  methods: {
    async validateFields() {
      this.required_fields.forEach((item) => {
        if (this[item] === "") {
          this.field_errors[`${item}`].push("This field may not be blank.");
        }
      });
      if (Object.keys(this.field_errors).length > 0) {
        return false;
      } else {
        true;
      }
    },
    async getRemarks() {
      if (!this.applicationRemarks.application_number) {
        if (this.application_number !== "") {
          await this.$store.dispatch("setApplicationStateRemarks", {
            application_number: this.application_number,
            application_type: this.application_type,
            user: this.user,
          });
          this.subject = `Application #${this.application_number} Remarks`;
          this.type = "remarks";
          this.applicationType = this.application_type;
          this.applicationNumber = this.application_number;
          this.receiver = this.user;
        } else {
          this.type = "inquiry";
        }
      } else {
        if (this.applicationRemarks.application_number) {
          this.subject = `Application #${this.applicationRemarks.application_number} Remarks`;
          this.type = "remarks";
          this.applicationType = this.remarks.application_type;
          this.applicationNumber = this.remarks.application_number;
          this.receiver = this.remarks.user;
        }
      }
    },
    isButtonDisabled(){
      if(this.type !== 'remarks'){
        if(this.body === '' || this.subject === '' || this.department === ''){
          return false
        }else{
          return true
        }
      }else{
        if(this.body === '' || this.subject === ''){
          return false
        }else{
          return true
        }
      }
    },
    async sendMessageProcess() {
      let isClean = await this.validateFields();
      console.log(this.field_errors);
      if (isClean) {
        await this.sendMessage();
      }
    },
    async sendMessage() {
      await this.$store.commit("setLoading", true);
      await this.$store.dispatch("addThread", {
        subject: this.subject,
        is_remarks: this.type === "remarks" ? true : false,
        business_id:
          this.applicationType === "business" ? this.applicationNumber : null,
        building_id:
          this.applicationType === "building" ? this.applicationNumber : null,
        receiver: this.type === "remarks" ? this.receiver : null,
        department: this.department,
      });
      await this.$store.dispatch("addMessage", {
        thread: this.currentInquiry,
        body: this.body,
      });
      await this.$store.commit("setLoading", false);
      if (this.type === "remarks") {
        if (this.applicationType === "building") {
          let application_status = 0;
          if (this.isBuildingAssessment) {
            application_status = this.buildingApplication.application_status;
            if (!this.isLastBuildingDept) {
              this.$store.dispatch("createPrompt", {
                type: "success",
                title: "Success!",
                message: "Application was successfully assessed!",
              });
              this.$router.push({ name: "Assessments" });
            }
          } else {
            this.buildingApplication.application_status === 0
              ? (application_status = 1)
              : this.buildingApplication.application_status === 3
              ? (application_status = 4)
              : (application_status = 0);
            let payload = {
              id: this.applicationNumber,
              status: application_status,
            };
            this.$store.dispatch("approveBuildingApplication", payload);
          }
          if (!this.isBuildingAssessment) {
            if (this.buildingApplication.application_status === 3) {
              let resetAssessmentPayload = {
                building_application: this.buildingApplication.id,
              };
              this.$store.dispatch(
                "resetBuildingAssessment",
                resetAssessmentPayload
              );
            }
          }
        } else if (this.applicationType === "business") {
          let application_status = 0;
          if (this.isBusinessAssessment) {
            application_status = this.businessApplication.application_status;
            if (!this.isLastBusinessDept) {
              this.$store.dispatch("createPrompt", {
                type: "success",
                title: "Success!",
                message: "Application was successfully assessed!",
              });
              this.$router.push({ name: "Assessments" });
            }
          } else {
            this.businessApplication.application_status === 0
              ? (application_status = 1)
              : this.businessApplication.application_status === 2
              ? (application_status = 3)
              : (application_status = 0);
            let payload = {
              id: this.applicationNumber,
              status: application_status,
              account_number: "",
            };
            this.$store.dispatch("approveBusinessApplication", payload);
          }
          if (!this.isBusinessAssessment) {
            if (this.businessApplication.application_status === 2) {
              let resetAssessmentPayload = {
                business_application: this.businessApplication.id,
              };
              this.$store.dispatch(
                "resetBusinessAssessment",
                resetAssessmentPayload
              );
            }
          }
        }
      } else {
        await this.$swal({
          title: "Success!",
          text: "Inquiry successfully sent.",
          icon: "success",
        }).then((value) => {
          if (this.type === "inquiry") {
            this.$router.push({ name: "UserInquiries" });
          } else if (this.type === "remarks") {
            this.$router.push({ name: "Inquiries" });
          }
        });
      }
    },
    async getDepartments() {
      const result = await axios.get(
        `${process.env.VUE_APP_API_URL}/api/department-list/`,
        { headers: { Authorization: `jwt ${this.authToken}` } }
      );
      if (result.data.length > 0) {
        result.data.forEach((item) => {
          let option = {
            label: item.name,
            value: item.name,
          };
          this.departments.push(option);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
div.inquiry-box {
  width: 100%;
  max-width: 1050px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0px 10px 20px #0000000d;
  border-radius: 20px;
  margin-top: 30px;
  margin-bottom: 50px;
  div.inquiry-header {
    background-color: #1492e6;
    padding: 20px 40px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    position: relative;
    div.inquiry-subj {
      color: #fafafa;
      font-size: 20px;
      font-weight: bold;
      line-height: 1.6;
      letter-spacing: 1.06px;
      margin-bottom: 5px;
    }
    div.inquiry-date {
      color: #e6e6e6;
      font-size: 16px;
      line-height: 1.4;
      letter-spacing: 0.8px;
    }
    div.application-button {
      width: auto;
      float: right;
      position: absolute;
      right: 45px;
      top: 25px;
    }
  }
  div.inquiry-body {
    padding: 35px 48px;
    .item-row {
      margin-bottom: 10px;
    }

    .item-row.sender {
      .item-content {
        background-color: #eaf6ff50;
      }
    }

    .item-row.me {
      .item-name {
        text-align: right;
      }
      .item-content {
        background-color: #eaf6ff90;
      }
    }

    .item-name {
      color: #1792e6;
      font-size: 16px;
      font-weight: bold;
      line-height: 29px;
      letter-spacing: 0.32px;
      margin-bottom: 6px;
    }

    .item-content {
      color: #000000c1;
      font-size: 14px;
      line-height: 28px;
      padding: 35px 32px;
      border-radius: 12px;
    }

    .item-date {
      color: #b3d7fe;
      font-size: 12px;
      line-height: 1.6;
      letter-spacing: 0.24px;
      text-align: right;
    }

    div.inquiry-new {
      div.inquiry-new-text {
        color: #9fa6ab;
        font-size: 16px;
        font-weight: bold;
        line-height: 29px;
        margin-bottom: 10px;
        .admin-icon {
          font-size: 21px;
          margin-right: 14px;
        }
      }
      .input-subject {
        color: #2b2b2b;
        border: 1px solid #d0e9fa;
        font-size: 14px;
        font-family: Raleway;
        line-height: 28px;
        width: calc(100% - 60px);
        padding: 13px 30px;
        margin-bottom: 30px;
        border-radius: 12px;
        outline: 0;
        transition: 0.4s;
      }
      textarea {
        color: #2b2b2b;
        border-color: #d0e9fa;
        font-size: 14px;
        font-family: Raleway;
        line-height: 28px;
        width: calc(100% - 60px);
        max-height: 150px;
        padding: 25px 30px;
        margin-bottom: 15px;
        border-radius: 12px;
        transition: 0.4s;
      }
      textarea:focus,
      input:focus {
        outline: 0;
        border-color: #027ab5 !important;
        background-color: #f8fcff !important;
      }

      .inquiry-button {
        text-align: right;
        width: 100%;
        justify-content: flex-end;
      }
    }
    .inquiry-button {
      text-align: right;
      width: 100%;
      justify-content: flex-end;
    }
  }
}
</style>
