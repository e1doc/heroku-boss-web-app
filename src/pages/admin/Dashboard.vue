<template>
  <div class="admin-container">
    <div class="admin-page-title flex-center">
      <font-awesome-icon icon="chart-line" class="admin-icon" />
      Dashboard
    </div>
    <div class="admin-body flex-wrap">
      <div class="admin-items flex-center">
        <div class="admin-item">
          <div class="item-content">
            <div class="item-icon flex-center">
              <font-awesome-icon icon="users" class="icon" />
            </div>
            <div class="item-value">{{ dashboard.users_count }}</div>
            <div class="item-label">Registered Users</div>
          </div>
        </div>
        <div class="admin-item">
          <div class="item-content">
            <div class="item-icon flex-center">
              <font-awesome-icon icon="store" class="icon" />
            </div>
            <div class="item-value">{{ dashboard.business }}</div>
            <div class="item-label">Business Permit Applications</div>
          </div>
        </div>
        <div class="admin-item">
          <div class="item-content">
            <div class="item-icon flex-center">
              <font-awesome-icon icon="city" class="icon" />
            </div>
            <div class="item-value">{{ dashboard.building }}</div>
            <div class="item-label">Building Permit Applications</div>
          </div>
        </div>
        <div class="admin-item">
          <div class="item-content">
            <div class="item-icon flex-center">
              <font-awesome-icon icon="store" class="icon" />
            </div>
            <div class="item-value">
              {{ dashboard.enrolled_business_count }}
            </div>
            <div class="item-label">Enrolled Business</div>
          </div>
        </div>
        <div class="admin-item">
          <div class="item-content">
            <div class="item-icon flex-center">
              <font-awesome-icon icon="city" class="icon" />
            </div>
            <div class="item-value">
              {{ dashboard.enrolled_property_count }}
            </div>
            <div class="item-label">Enrolled RPT</div>
          </div>
        </div>
        <div class="admin-item">
          <div class="item-content">
            <div class="item-icon flex-center">
              <font-awesome-icon icon="coins" class="icon" />
            </div>
            <div class="item-value">{{ dashboard.bank_transaction_count }}</div>
            <div class="item-label">Overall Transactions</div>
          </div>
        </div>
        <div class="admin-item">
          <div class="item-content">
            <div class="item-icon flex-center">
              <font-awesome-icon icon="comment-slash" class="icon" />
            </div>
            <div class="item-value">{{ dashboard.pending_inquiries }}</div>
            <div class="item-label">Unresponded Inquiries</div>
          </div>
        </div>
        <div class="admin-item">
          <div class="item-content">
            <div class="item-icon flex-center">
              <font-awesome-icon icon="comments" class="icon" />
            </div>
            <div class="item-value">{{ dashboard.all_inquiries }}</div>
            <div class="item-label">Overall Inquiries</div>
          </div>
        </div>
      </div>
      <div class="admin-table" v-if="isFeatureImplemented">
        <div class="admin-section-title">RECENT TRANSACTIONS</div>
        <transaction-table />
      </div>
    </div>
  </div>
</template>

<script>
import TransactionTable from "@/components/tables/TransactionTable";
import { mapGetters } from "vuex";
export default {
  name: "Dashboard",
  components: {
    TransactionTable,
  },
  data() {
    return {
      isFeatureImplemented: false,
    };
  },
  computed: {
    ...mapGetters(["dashboard"]),
  },
  mounted() {
    this.$store.dispatch("getDashboardData");
    window.scrollTo(0, 0);
  },
};
</script>

<style lang="scss" scoped>
div.admin-container {
  width: 100%;
  div.admin-page-title {
    color: #1492e6;
    font-size: 30px;
    font-weight: bold;
    line-height: 29px;
    text-transform: capitalize;
    margin-bottom: 90px;
    .admin-icon {
      color: #1492e6;
      font-size: 35px;
      margin-right: 15px;
    }
  }
  div.admin-body {
    div.admin-items {
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
      div.admin-item {
        width: calc(100% / 3);
        margin-bottom: 50px;
        div.item-content {
          background-color: #fff;
          box-shadow: 0px 10px 6px #00000008;
          margin: 0 15px 15px;
          padding: 30px 30px 38px;
          border-radius: 15px;
          position: relative;
          div.item-icon {
            background-color: #fff;
            width: 94px;
            height: 94px;
            border: 2px solid #c2e6ff;
            border-radius: 100%;
            justify-content: center;
            position: absolute;
            top: -30px;
            right: 15px;
            .icon {
              color: #1492e6;
              font-size: 50px;
            }
          }
          div.item-value {
            color: #1492e6;
            font-size: 31px;
            font-weight: bold;
            line-height: 1.4;
            margin-bottom: 10px;
          }
        }
      }
    }
    div.admin-table {
      width: 100%;
      padding: 60px;
      background-color: #eaf6ff8c;
      border-radius: 15px;
      max-width: 1280px;
      margin-left: auto;
      margin-right: auto;
      div.admin-section-title {
        color: #e23a36fc;
        font-size: 18px;
        font-weight: bold;
        line-height: 1.6;
        letter-spacing: 0.36px;
        text-transform: uppercase;
        border-bottom: 4px solid #e23a36fc;

        max-width: 220px;
        padding-bottom: 10px;
        margin-bottom: 25px;
      }
    }
  }
}

@media only screen and (max-width: 1380px) {
  div.admin-container div.admin-page-title {
    font-size: 28px;
    margin-bottom: 40px;
  }

  div.admin-container
    div.admin-body
    div.admin-items
    div.admin-item
    div.item-content {
    padding: 25px 25px 30px;
  }

  div.admin-container
    div.admin-body
    div.admin-items
    div.admin-item
    div.item-content
    div.item-icon {
    width: 80px;
    height: 80px;
  }

  div.admin-container
    div.admin-body
    div.admin-items
    div.admin-item
    div.item-content
    div.item-icon
    .icon {
    color: #1492e6;
    font-size: 38px;
  }

  div.admin-container
    div.admin-body
    div.admin-items
    div.admin-item
    div.item-content
    div.item-value {
    font-size: 25px;
  }
}
</style>
