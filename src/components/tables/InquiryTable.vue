<template>
  <section>
    <div>
      <div class="thead">
        <div class="th date">DATE</div>
        <div class="th subject">SUBJECT</div>
        <div class="th sender">SENDER</div>
        <div class="th content">INQUIRY CONTENT</div>
        <div class="th status">STATUS</div>
        <div class="th actions">ACTIONS</div>
      </div>
      <div class="tbody">
        <div class="tr" v-for="(inquiry, index) in inquiries" :key="index">
          <div class="td date">
            {{ inquiry.created_at | moment("MMMM DD YYYY") }}
          </div>
          <div class="td subject">{{ inquiry.subject }}</div>
          <div class="td sender">JOHN MICHAEL DOE</div>
          <div class="td content">Sample overview of the inquiry here.</div>
          <div class="td status">{{ inquiry.status }}</div>
          <div class="td actions">
            <router-link :to="{name:'ReplyInquiry', params:{thread: inquiry.id}}">
              <font-awesome-icon icon="envelope-open-text" class="mr5 icon" />
              READ
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <paginate
      v-if="inquiries.length > 9"
      :page-count="pageCount"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :click-handler="getAllInquiries"
    >
    </paginate>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "InquiryTable",
  computed: {
    ...mapGetters(["currentType", "inquiries", "pageCount"]),
  },
  mounted() {
    this.getAllInquiries();
  },
  methods: {
    async getAllInquiries(pageNum = 1) {
      await this.$store.dispatch("getAllAdminInquiries");
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  width: 100%;
}

.date {
  width: 13%;
  text-transform: uppercase;
}

.subject,
.sender {
  width: 21%;
  text-transform: uppercase;
}

.content {
  width: 28%;
}

.status {
  width: 13%;
  text-transform: uppercase;
}
.actions {
  width: 13%;
  text-transform: uppercase;
}

.thead {
  display: flex;
  flex-direction: row;
  background: #ffffff;
  border-radius: 8px 8px 0px 0px;
  border-bottom: 2px #e23a36 solid;
  box-shadow: 0px 10px 20px rgba(127, 127, 127, 0.1);
  .th {
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
      font-size: 14px;
      font-family: "Proxima Nova Rg";
      text-align: center;
      padding: 17px 0px;
    }
    .td.actions {
      color: #1792e6;
      font-size: 13px;
      font-weight: 700;
      font-family: Proxima Nova Rg;
      cursor: pointer;
      a {
        color: #1792e6;
        text-decoration: none;
        transition: 0.4s;
      }
      .icon {
        font-size: 18px;
      }
    }
    .td.actions a:hover {
      text-decoration: underline;
    }
  }
}
</style>
