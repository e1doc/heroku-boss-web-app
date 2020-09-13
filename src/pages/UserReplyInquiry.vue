<template>
  <div class="inquiry-box">
    <div class="inquiry-header">
      <div class="inquiry-subj">{{ inquiry.subject }}</div>
      <div class="inquiry-date">
        {{ inquiry.created_at | moment("MMMM DD YYYY") }}
      </div>
    </div>
    <div class="inquiry-body">
      <!-- START OF THREAD -->
      <div v-for="(message, index) in messages" :key="index">
        <div class="item-row me" v-if="!message.sender.is_staff">
          <div class="item-name">Me</div>
          <div class="item-content">
            {{ message.body }}
          </div>
          <div class="item-date">
            {{ message.created_at | moment("MMMM DD, YYYY HH:mm A") }}
          </div>
        </div>
        <div class="item-row sender" v-if="message.sender.is_staff">
          <div class="item-name">Administrator</div>
          <div class="item-content">
            {{ message.body }}
          </div>
          <div class="item-date">
            {{ message.created_at | moment("MMMM DD, YYYY HH:mm A") }}
          </div>
        </div>
      </div>
      <div class="resolve-column flex-wrap" v-if="inquiry.is_responded && !inquiry.is_resolved">
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
        <div class="inquiry-button">
          <button-block type="send" :disabled="body === '' ? true : false" @click.native="sendReply"
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
export default {
  name: "ReplyInquiry",
  components: {
    InquiryTableMenu,
    InquiryTable,
    ButtonBlock,
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
      messages: []
    };
  },
  computed: {
    ...mapGetters(["currentTable", "inquiry", "currentInquiry"]),
  },
  mounted() {
    this.getInquiry();
  },
  methods: {
    async getInquiry() {
      console.log(this.thread);
      let id = this.thread != "" ? this.thread : this.currentInquiry;
      await this.$store.dispatch("getInquiry", id);
      this.messages = await this.inquiry.messages
    },
    async sendReply() {
      await this.$store.dispatch("addMessage", {
        thread: this.currentInquiry,
        body: this.body,
      });
      this.messages.push({body: this.body, sender: {is_staff: false}})
    },
    async resolveInquiry(){
        await this.$store.dispatch('resolveInquiry', {id:this.currentInquiry, is_resolved: true})
        await this.$swal({
                title: "Success!",
                text: "Inquiry successfully resolved.",
                icon: "success",
            }).then((value) => {
                this.$router.push({ name: 'UserInquiries' });
            });
    }
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
</style>
