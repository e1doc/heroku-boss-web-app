<template>
  <div class="inquiry-box">
    <div class="inquiry-header">
      <div class="inquiry-subj">{{ inquiry.subject }}</div>
      <div
        class="application-button"
        v-if="inquiry.is_remarks && showUpdateButton()"
      >
        <button-block
          type="default"
          class="inquiry-application-btn"
          @click.native="openApplication()"
        >
          UPDATE APPLICATION
        </button-block>
      </div>
      <div class="inquiry-date">
        {{ inquiry.created_at | moment("MMMM DD YYYY") }}
      </div>
      <div class="item-department">
        <span>Dept. Concern:</span>
        {{ inquiry.department ? inquiry.department : "N/A" }}
      </div>
    </div>
    <div class="inquiry-body">
      <!-- START OF THREAD -->
      <div v-for="(message, index) in messages" :key="index">
        <div class="item-row me" v-if="!message.sender.is_staff">
          <div class="item-name">Me</div>
          <div class="item-content">
            {{ message.body }}
            <div
              v-if="
                message.messageattachments &&
                message.messageattachments.length > 0
              "
            >
              <div class="item-attachment" @click="linkProps(message)">
                <font-awesome-icon icon="paperclip" class="admin-icon" /> See
                Attachment
              </div>
            </div>
          </div>
          <div class="item-date">
            {{ message.created_at | moment("MMMM DD, YYYY HH:mm A") }}
          </div>
        </div>
        <div class="item-row sender" v-if="message.sender.is_staff">
          <div class="item-name">
            {{ message.sender.department.name }} Administrator
          </div>
          <div class="item-content">
            {{ message.body }}
            <div
              v-if="
                message.messageattachments &&
                message.messageattachments.length > 0
              "
            >
              <div class="item-attachment" @click="linkProps(message)">
                <font-awesome-icon icon="paperclip" class="admin-icon" /> See
                Attachment
              </div>
            </div>
          </div>
          <div class="item-date">
            {{ message.created_at | moment("MMMM DD, YYYY HH:mm A") }}
          </div>
        </div>
      </div>
      <div
        class="resolve-column flex-wrap"
        v-if="inquiry.is_responded && !inquiry.is_resolved"
      >
        <div class="resolve-button">
          <button type="send" class="btn-resolve" @click="resolveInquiry">
            <font-awesome-icon icon="check" class="admin-icon" />
            MARK AS RESOLVED
          </button>
        </div>
        <div class="resolve-note">
          <span>Note:</span>
          Once this is marked as resolved, you can no longer reply to this
          thread.
        </div>
      </div>

      <!-- REPLY SECTION -->
      <div class="inquiry-footer" v-if="!inquiry.is_resolved">
        <div class="inquiry-footer-text">
          <font-awesome-icon icon="reply" class="admin-icon" />
          REPLY
        </div>
        <textarea
          name="reply"
          id="reply"
          rows="4"
          placeholder="Type your text here"
          v-model="body"
        ></textarea>
        <base-file-uploader
          fileLabel="inquiry_attachment"
          uploadType="application/pdf"
          class="upload-attachment"
          v-if="inquiry.is_delinquent || inquiry.is_remarks"
          :isEvaluation="true"
        />
        <div class="inquiry-button">
          <button-block
            type="send"
            :disabled="body === '' ? true : false"
            @click.native="sendReply"
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
import { mapGetters } from "vuex";
import BaseFileUploader from "@/components/forms/BaseFileUploader";
export default {
  name: "ReplyInquiry",
  components: {
    InquiryTableMenu,
    InquiryTable,
    ButtonBlock,
    BaseFileUploader,
  },
  props: {
    thread: {
      required: false,
      default: "",
      type: String,
    },
  },
  data() {
    return {
      body: "",
      messages: [],
    };
  },
  computed: {
    ...mapGetters(["currentTable", "inquiry", "currentInquiry"]),
  },
  mounted() {
    this.getInquiry();
    window.scrollTo(0, 0);
  },
  methods: {
    showUpdateButton() {
      if (this.inquiry.business_id) {
        if (this.inquiry.business_id.is_disapprove) {
          return true;
        }
      } else if (this.inquiry.building_id) {
        if (this.inquiry.building_id.is_disapprove) {
          return true;
        }
      } else {
        return false;
      }
    },
    linkProps(item) {
      let url = item.messageattachments[0].file.replace("/bacoor/", "/");
      window.open(url, "_blank");
    },
    async openApplication() {
      if (this.inquiry.building_id !== null) {
        this.$store.dispatch(
          "getBuildingApplication",
          this.inquiry.building_id.id
        );
      }
      if (this.inquiry.business_id !== null) {
        this.$store.dispatch(
          "getBusinessApplication",
          this.inquiry.business_id.id
        );
      }
    },
    async getInquiry() {
      let id = this.thread != "" ? this.thread : this.currentInquiry;
      await this.$store.dispatch("getInquiry", id);
      this.messages = await this.inquiry.messages;
      if (this.inquiry.is_delinquent) {
        this.$store.commit("setIsDelinquentPayment", true);
      } else {
        this.$store.commit("setIsDelinquentPayment", false);
      }
      if (this.inquiry.is_remarks) {
        await this.$store.commit("setIsRemarks", true);
      } else {
        await this.$store.commit("setIsRemarks", false);
      }
    },
    async sendReply() {
      await this.$store.dispatch("addMessage", {
        thread: this.currentInquiry,
        body: this.body,
      });
      this.getInquiry();
      this.messages.push({ body: this.body, sender: { is_staff: false } });
      this.body = "";
    },
    async resolveInquiry() {
      await this.$store.dispatch("resolveInquiry", {
        id: this.currentInquiry,
        is_resolved: true,
      });
      await this.$swal({
        title: "Success!",
        text: "Inquiry successfully resolved.",
        icon: "success",
      }).then((value) => {
        this.$router.push({ name: "UserInquiries" });
      });
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
  div.inquiry-footer {
    margin-top: 25px;
    padding-top: 25px;
    border-top: 1px solid #d0e9fa;
    div.inquiry-footer-text {
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
    }
    textarea:focus {
      outline: 0;
      border-color: #027ab5;
      background-color: #f8fcff;
    }
    .inquiry-button {
      text-align: right;
    }
  }
}

div.resolve-column {
  width: 100%;
  justify-content: center;
  padding: 15px 0;

  div.resolve-button {
    width: 100%;
    text-align: center;
    button.btn-resolve {
      background: #81c784;
      color: #fff;
      font-size: 15px;
      font-weight: bold;
      border-radius: 50px;
      border: 1px solid #81c784;
      padding: 12px 25px;
      margin-bottom: 15px;
      cursor: pointer;
      transition: 0.4s;
    }

    button.btn-resolve:hover {
      color: #81c784;
      background-color: transparent;
    }

    button.btn-resolve:focus {
      outline: none;
    }
  }

  .resolve-note {
    font-size: 14px;
    color: #969696;
    span {
      font-weight: bold;
    }
  }
}
div.inquiry-body {
  padding: 35px 48px;
  max-height: 600px;
  overflow-y: scroll;
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
.item-attachment {
  font-size: 13px;
  width: 100%;
  float: left;
  padding: 5px 0;
  color: #1492e6;
  text-decoration: underline;
  cursor: pointer;
}

.item-department {
  color: #fff;
  font-family: "Proxima Nova Rg";
  font-size: 16px;
  margin-top: 5px;
  span {
    font-weight: bold;
  }
}
</style>
