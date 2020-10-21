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
        <div class="inquiry-button">
          <button-block
            type="send"
            :disabled="body === '' || subject === '' ? true : false"
            @click.native="sendMessage"
            >SEND</button-block
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InquiryTableMenu from "@/components/tables/InquiryTableMenu";
import InquiryTable from "@/components/tables/InquiryTable";
import ButtonBlock from "@/components/ButtonBlock";
import BaseInput from "@/components/forms/BaseInput";
import { mapGetters } from "vuex";
export default {
  name: "ReplyInquiry",
  components: {
    InquiryTableMenu,
    InquiryTable,
    ButtonBlock,
    BaseInput,
  },
  computed: {
    ...mapGetters([
      "currentTable",
      "currentInquiry",
      "remarks",
      "buildingApplication",
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
    };
  },
  mounted() {
    this.getRemarks();
    console.log(this.buildingApplication)
  },
    beforeRouteLeave(to, from, next) {
      this.$store.dispatch("setApplicationRemarks", {});
      this.$store.commit('setCurrentInquiry', "")
      next()
  },
  methods: {
    async getRemarks() {
      console.log('remarks', this.remarks)
      if (!this.remarks.application_number) {
        if (this.application_number !== "") {
          console.log('application number', this.application_number)
          await this.$store.dispatch("setApplicationRemarks", {
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
        this.subject = `Application #${this.remarks.application_number} Remarks`;
        this.type = "remarks";
        this.applicationType = this.remarks.application_type;
        this.applicationNumber = this.remarks.application_number;
        this.receiver = this.remarks.user;
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
      });
      await this.$store.dispatch("addMessage", {
        thread: this.currentInquiry,
        body: this.body,
      });
      await this.$store.commit("setLoading", false);
      if (this.type === "remarks") {
        if (this.applicationType === "building") {
          let payload = { id: this.applicationNumber, is_approve: false, is_for_inspection: false };
          this.$store.dispatch("approveBuildingApplication", payload);
        } else if (this.applicationType === "business") {
          let payload = { id: this.applicationNumber, is_approve: false };
          this.$store.dispatch("approveBusinessApplication", payload);
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
      }
    }
  }
}
</style>
