<template>
  <div class="admin-sidebar">
    <div class="admin-container">
      <div class="admin-img"><img src="@/assets/bacoor-cavite-logo.png" /></div>
      <div class="admin-text">
        City of Bacoor <br />
        Province of Cavite
      </div>
    </div>

    <div class="admin-body">
      <ul class="admin-nav">
        <li
          class="admin-item"
          :class="{ active: currentAdminTab === 'dashboard' }"
          @click="changeTab('dashboard')"
        >
          <router-link :to="{ name: 'Dashboard' }">
            <font-awesome-icon icon="chart-line" class="admin-icon" />
            DASHBOARD
          </router-link>
        </li>
        <li
          class="admin-item"
          :class="{ active: currentAdminTab === 'transactions' }"
          @click="changeTab('transactions')"
          v-if="
            userDepartment === 'Treasury Office' ||
            groups.includes('superadmin')
          "
        >
          <router-link :to="{ name: 'Transactions' }">
            <font-awesome-icon icon="coins" class="admin-icon" />
            TRANSACTIONS
          </router-link>
        </li>
        <li
          class="admin-item"
          :class="{ active: currentAdminTab === 'applications' }"
          @click="changeTab('applications')"
          v-if="
            groups.includes('superadmin') ||
            groups.includes('business_application_approver') ||
            groups.includes('building_application_approver') ||
            groups.includes('assessment_approver')
          "
        >
          <router-link :to="{ name: 'Applications' }">
            <font-awesome-icon icon="users" class="admin-icon" />
            APPLICATIONS
          </router-link>
        </li>
        <li
          class="admin-item"
          :class="{ active: currentAdminTab === 'assessments' }"
          @click="changeTab('assessments')"
        >
          <router-link :to="{ name: 'Assessments' }">
            <font-awesome-icon icon="users" class="admin-icon" />
            ASSESSMENTS
          </router-link>
        </li>
        <li
          class="admin-item"
          :class="{ active: currentAdminTab === 'appointments' }"
          @click="changeTab('appointments')"
          v-if="
            groups.includes('superadmin') ||
            groups.includes('business_application_approver') ||
            groups.includes('building_application_approver')
          "
        >
          <router-link :to="{ name: 'AdminAppointment' }">
            <font-awesome-icon icon="calendar" class="admin-icon" />
            APPOINTMENTS
          </router-link>
        </li>
        <li
          class="admin-item"
          :class="{ active: currentAdminTab === 'adminsoa' }"
          @click="changeTab('adminsoa')"
          v-if="
            groups.includes('superadmin') ||
            groups.includes('business_application_approver') ||
            groups.includes('building_application_approver')
          "
        >
          <router-link :to="{ name: 'AdminSoa' }">
            <font-awesome-icon icon="calendar" class="admin-icon" />
            STATEMENT OF ACCOUNTS
          </router-link>
        </li>
        <li
          class="admin-item"
          :class="{ active: currentAdminTab === 'inquiries' }"
          @click="changeTab('inquiries')"
          v-if="
            groups.includes('superadmin') ||
            groups.includes('business_application_approver') ||
            groups.includes('building_application_approver')
          "
        >
          <router-link :to="{ name: 'Inquiries' }">
            <font-awesome-icon icon="comment-alt" class="admin-icon" />
            INQUIRIES
          </router-link>
        </li>
        <li
          class="admin-item"
          :class="{ active: currentAdminTab === 'departments' }"
          @click="changeTab('departments')"
          v-if="groups.includes('superadmin')"
        >
          <router-link :to="{ name: 'Departments' }">
            <font-awesome-icon icon="network-wired" class="admin-icon" />
            DEPARTMENTS
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SidebarNav",
  data() {
    return {
      activeTab: "dashboard",
    };
  },
  computed: {
    ...mapGetters(["currentAdminTab", "groups", "userDepartment"]),
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;
      this.$store.commit("setAdminCurrentTab", tab);
    },
  },
};
</script>

<style lang="scss" scoped>
div.admin-sidebar {
  height: 100vh;
  width: 290px;
  background-color: #eaf6ff;
  box-shadow: 0px 10px 8px #00000012;
  position: fixed;
  left: 0;
  top: 0;
  overflow-y: scroll;
  div.admin-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    padding: 60px 0;
    div.admin-img {
      width: 100%;
      margin-bottom: 20px;
      img {
        width: 60px;
        margin: 0 auto;
      }
    }
    div.admin-text {
      width: 100%;
      font-size: 16px;
      font-weight: bold;
      line-height: 29px;
      letter-spacing: 0.18px;
    }
  }
  div.admin-body {
    ul.admin-nav {
      li.admin-item {
        a {
          color: #1492e6;
          font-size: 15px;
          font-family: Raleway;
          font-weight: bold;
          line-height: 29px;
          letter-spacing: 0.9px;
          text-decoration: none;
          padding: 20px 15px 20px 30px;
          display: block;
          .admin-icon {
            font-size: 24px;
            padding-right: 15px;
            position: relative;
            top: 4px;
          }
        }
      }
      li.admin-item.active {
        background-color: #c2e6ff;
      }
    }
  }
}
</style>