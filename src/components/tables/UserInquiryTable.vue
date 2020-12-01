<template>
  <section>
    <div v-if="currentTable === 'inquiries'">
      <div class="thead">
        <div class="th date">DATE</div>
        <div class="th subject">SUBJECT</div>
        <!-- <div class="th content">INQUIRY CONTENT</div> -->
        <div class="th status">STATUS</div>
        <div class="th actions">ACTIONS</div>
      </div>
      <div class="tbody" v-if="inquiries.length > 0">
        <div class="tr" v-for="(inquiry, index) in inquiries" :key="index">
          <div class="td date">
            {{ inquiry.created_at | moment("MMMM DD YYYY") }}
          </div>
          <div class="td subject">{{ inquiry.subject }}</div>
          <div class="td status">{{ inquiry.status }}</div>
          <div class="td actions">
            <router-link
              :to="{ name: 'UserReplyInquiry', params: { thread: inquiry.id } }"
            >
              <font-awesome-icon icon="envelope-open-text" class="mr5 icon" />
              READ
            </router-link>
          </div>
        </div>
      </div>
      <div class="tbody" v-if="inquiries.length < 1">
        <div class="tr">
          <div class="td meta-no-data">No data available</div>
        </div>
      </div>
      <paginate
        v-if="inquiries.length > 0"
        :page-count="pageCount"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :click-handler="getAllInquiries"
      >
      </paginate>
    </div>
    <div v-if="currentTable === 'remarks'">
      <div class="thead">
        <div class="th date">DATE</div>
        <div class="th subject">SUBJECT</div>
        <!-- <div class="th content">INQUIRY CONTENT</div> -->
        <div class="th status">STATUS</div>
        <div class="th actions">ACTIONS</div>
      </div>
      <div class="tbody">
        <div class="tr" v-for="(remark, index) in remarks" :key="index">
          <div class="td date">
            {{ remark.created_at | moment("MMMM DD YYYY") }}
          </div>
          <div class="td subject">{{ remark.subject }}</div>
          <div class="td status">{{ remark.status }}</div>
          <div class="td actions">
            <router-link
              :to="{ name: 'UserReplyInquiry', params: { thread: remark.id } }"
            >
              <font-awesome-icon icon="envelope-open-text" class="mr5 icon" />
              READ
            </router-link>
          </div>
        </div>
      </div>
      <paginate
        v-if="inquiries.length > 0"
        :page-count="pageCount"
        :prev-text="'Prev'"
        :next-text="'Next'"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :click-handler="getAllInquiries"
      >
      </paginate>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "InquiryTable",
  computed: {
    ...mapGetters([
      "currentType",
      "currentTable",
      "inquiries",
      "pageCount",
      "remarks",
    ]),
  },
  mounted() {
    this.getAllInquiries();
  },
  methods: {
    async inquiryClickCallBack(pageNum) {
      await this.$store.dispatch("getAllUserInquiries", pageNum);
    },
    async getAllInquiries(pageNum = 1) {
      await this.$store.dispatch("getAllUserInquiries", pageNum);
      // await this.$store.dispatch("getAllUserRemarks");
    },
  },
};
</script>

<style lang="scss" scoped>
section {
  width: 100%;
}

.date {
  width: 20%;
  text-transform: uppercase;
}

.subject {
  width: 40%;
  text-transform: uppercase;
}

// .content {
//   width: 28%;
// }

.status {
  width: 20%;
  text-transform: uppercase;
}
.actions {
  width: 20%;
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
.meta-no-data{
    width: 100% !important;
}
</style>
