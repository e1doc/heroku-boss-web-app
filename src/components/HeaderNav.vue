<template>
  <section class="meta-navigation flex-center">
    <div class="meta-left-box flex-center">
      <img class="meta-img" src="../assets/bacoor-cavite-logo.png" />
      <div class="meta-site-name">Bacoor One Stop<br />Shop System</div>
    </div>
    <div v-if="isAuthenticated" class="meta-center-box">
      <ul class="meta-nav">
        <li class="meta-menu redirect" @click="extRedirect">Bacoor.gov.ph</li>
        <li class="meta-menu has-children">
          <router-link to="#"
            >Transactions
            <font-awesome-icon icon="chevron-down" class="mr10 sub-menu-icon"
          /></router-link>
          <ul class="meta-sub-menu">
            <li class="meta-menu">
              <router-link to="building-permit-application"
                >Building Permit Application</router-link
              >
            </li>
            <li class="meta-menu">
              <router-link to="business-permit-application"
                >New Business Application</router-link
              >
            </li>
            <li class="meta-menu">
              <router-link to="business-enrollment"
                >Business Permit Enrollment</router-link
              >
            </li>
            <li class="meta-menu">
              <router-link to="real-property-enrollment"
                >Real Property Enrollment</router-link
              >
            </li>
            <li class="meta-menu">
              <router-link to="request-new-td"
                >Request New Tax Declaration Number</router-link
              >
            </li>
            <!-- <li class="meta-menu"><router-link to="#">Search Reference No.</router-link></li> -->
            <li class="meta-menu">
              <router-link to="statement-of-accounts"
                >Statement of Accounts</router-link
              >
            </li>
            <li class="meta-menu">
              <router-link :to="{ name: 'UserTransactions' }"
                >Payment Transactions</router-link
              >
            </li>
            <li class="meta-menu">
              <router-link to="appointment">Appointments</router-link>
            </li>
          </ul>
        </li>
        <!-- <li class="meta-menu"><router-link to="#">About</router-link></li> -->
        <li class="meta-menu"><router-link to="faq">FAQ's</router-link></li>
      </ul>
    </div>
    <div v-if="isAuthenticated" class="meta-right-box">
      <ul class="meta-nav flex-center hide-in-mobile">
        <li class="meta-menu meta-inquire">
          <router-link to="user-inquiries"
            ><font-awesome-icon
              icon="comment-alt"
              class="mr10 icon"
            />Inquire</router-link
          >
        </li>
        <li class="meta-menu meta-user-settings">
          <router-link to="#"
            ><font-awesome-icon icon="user" class="mr10 user-icon"
          /></router-link>
          <ul class="meta-sub-menu">
            <li class="meta-menu">
              <router-link to="profile">View Profile</router-link>
            </li>
            <li class="meta-menu">
              <a @click="logout()"
                >Logout <font-awesome-icon icon="power-off" class="logout-icon"
              /></a>
            </li>
          </ul>
        </li>
      </ul>
      <div class="mobile-menu-nav show-in-mobile">
        <font-awesome-icon
          icon="bars"
          class="menu-icon"
          @click="slidemenu = true"
        />
      </div>
    </div>

    <!-- MOBILE SLIDE MENU -->
    <div
      v-if="isAuthenticated"
      class="meta-mobile-nav"
      :class="{ active: slidemenu == true }"
    >
      <div class="meta-wrap">
        <div class="close-menu">
          <font-awesome-icon
            icon="times"
            class="close-icon"
            @click="slidemenu = false"
          />
        </div>
        <div class="profile-menu flex-center">
          <div class="meta-user-icon">
            <span class="meta-icon"
              ><font-awesome-icon icon="user" class="mr10 user-icon"
            /></span>
          </div>
          <div class="meta-user-info">
            <span class="meta-name"
              >{{ userDetails.first_name }} {{ userDetails.last_name }}</span
            >
            <span class="meta-email">{{ userDetails.email }}</span>
          </div>
        </div>
        <ul class="mobile-menu">
          <li
            class="meta-menu"
            @click="(slidemenu = false), (menuActive = 'profile')"
            :class="{ active: menuActive == 'profile' }"
          >
            <router-link to="profile">
              <span class="meta-label flex-center" @click="slidemenu = false">
                <font-awesome-icon icon="user" class="mr10 icon" />
                Profile
              </span>
            </router-link>
          </li>
          <li
            class="meta-menu"
            @click="
              slidemenu = false;
              extRedirect();
            "
          >
            <font-awesome-icon icon="globe" class="mr10 icon" />
            Bacoor.gov.ph
          </li>
          <li
            class="meta-menu"
            @click="
              slidemenu = false;
              menuActive = 'business_application';
            "
            :class="{ active: menuActive == 'business_application' }"
          >
            <router-link to="business-permit-application">
              <font-awesome-icon icon="store" class="mr10 icon" />
              Business Permit Application
            </router-link>
          </li>
          <li
            class="meta-menu"
            @click="
              slidemenu = false;
              menuActive = 'building_application';
            "
            :class="{ active: menuActive == 'building_application' }"
          >
            <router-link to="building-permit-application">
              <font-awesome-icon icon="city" class="mr10 icon" />
              Building Permit Application
            </router-link>
          </li>
          <li
            class="meta-menu"
            @click="
              slidemenu = false;
              menuActive = 'business_enrollment';
            "
            :class="{ active: menuActive == 'business_enrollment' }"
          >
            <router-link to="business-enrollment">
              <font-awesome-icon icon="business-time" class="mr10 icon" />
              Business Permit Enrollment
            </router-link>
          </li>
          <li
            class="meta-menu"
            @click="
              slidemenu = false;
              menuActive = 'realp_enrollment';
            "
            :class="{ active: menuActive == 'realp_enrollment' }"
          >
            <router-link to="real-property-enrollment">
              <font-awesome-icon icon="laptop-house" class="mr10 icon" />
              Real Property Enrollment
            </router-link>
          </li>
          <li
            class="meta-menu"
            @click="
              slidemenu = false;
              menuActive = 'request-new-td';
            "
            :class="{ active: menuActive == 'request-new-td' }"
          >
            <router-link to="request-new-td">
              <font-awesome-icon icon="laptop-house" class="mr10 icon" />
              Request New Tax Declaration Number
            </router-link>
          </li>
          <li
            class="meta-menu"
            @click="
              slidemenu = false;
              menuActive = 'soa';
            "
            :class="{ active: menuActive == 'soa' }"
          >
            <router-link to="statement-of-accounts">
              <font-awesome-icon icon="file-invoice-dollar" class="mr10 icon" />
              Statement of Accounts
            </router-link>
          </li>
          <li
            class="meta-menu"
            @click="
              slidemenu = false;
              menuActive = 'transactions';
            "
            :class="{ active: menuActive == 'transactions' }"
          >
            <router-link :to="{ name: 'UserTransactions' }">
              <font-awesome-icon icon="file-invoice-dollar" class="mr10 icon" />
              Payment Transactions
            </router-link>
          </li>
          <li
            class="meta-menu"
            @click="
              slidemenu = false;
              menuActive = 'appointment';
            "
            :class="{ active: menuActive == 'appointment' }"
          >
            <router-link to="appointment">
              <font-awesome-icon icon="calendar" class="mr10 icon" />
              Appointments
            </router-link>
          </li>
          <!-- <li class="meta-menu" @click="slidemenu = false; menuActive = 'about'" :class="{active:menuActive == 'about'}">
                    <router-link to="#">
                        <font-awesome-icon icon="info-circle" class="mr10 icon" />
                        About
                    </router-link></li> -->
          <li
            class="meta-menu"
            @click="
              slidemenu = false;
              menuActive = 'faqs';
            "
            :class="{ active: menuActive == 'faqs' }"
          >
            <router-link to="faq">
              <font-awesome-icon icon="question" class="mr10 icon" />
              FAQ's
            </router-link>
          </li>
          <li
            class="meta-menu meta-inquire"
            @click="
              slidemenu = false;
              menuActive = 'inquire';
            "
            :class="{ active: menuActive == 'inquire' }"
          >
            <router-link to="user-inquiries">
              <font-awesome-icon icon="comment-alt" class="mr10 icon" />
              Inquire
            </router-link>
          </li>
        </ul>
      </div>
      <div class="meta-menu logout-menu" @click="slidemenu = false">
        <a @click="logout()">
          <font-awesome-icon icon="power-off" class="logout-icon" />
          Logout
        </a>
      </div>
    </div>
    <router-link to="/" v-if="!isAuthenticated" class="meta-signin"
      >Go back to previous page</router-link
    >
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HeaderNav",
  data() {
    return {
      slidemenu: false,
      menuActive: "profile",
    };
  },
  props: {
    isAuthenticated: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters(["userDetails"]),
  },
  methods: {
    logout() {
      this.$store.commit("setIsAuthenticated", false);
      this.$store.commit("resetUIState");
      this.$store.commit("resetAuthState");
      this.$store.commit("resetBusinessState");
      this.$store.commit("resetPropertyState");
      this.$store.commit("resetInquiryState");
      this.$store.commit("resetAppointmentState");
      this.$store.commit("resetSoaState");
      this.$router.push({ path: "/" });
    },
    extRedirect() {
      window.open("http://bacoor.gov.ph/", "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.redirect {
  cursor: pointer;
}
section.meta-navigation {
  padding: 0px 30px;
  box-shadow: -2px 10px 30px rgba(127, 127, 127, 0.1);
  .meta-left-box {
    width: 20%;
    padding: 8px 0;
    img.meta-img {
      width: auto;
      max-height: 65px;
      margin-right: 15px;
    }
    .meta-site-name {
      color: #2b2b2b;
      font-size: 15px;
      font-weight: bold;
      line-height: 24px;
      letter-spacing: 0.1px;
    }
  }
  .meta-center-box {
    width: 60%;
    ul.meta-nav {
      text-align: center;
      li {
        margin: 0 40px;
      }
    }
  }
  .meta-right-box {
    width: 20%;
    ul.meta-nav {
      justify-content: flex-end;
      li {
        padding: 0 15px;
        ul.meta-sub-menu {
          width: 189px;
          top: 82px;
          right: 15px;
          left: unset;
          li {
            padding: 0;
          }
        }
      }
      li.meta-user-settings {
        padding: 21px 15px;
        .user-icon {
          font-size: 18px;
          padding: 8px 10px;
          border: 1px solid;
          border-radius: 100%;
          margin-right: 0;
        }
        .logout-icon {
          position: absolute;
          right: 20px;
        }
      }
      li.meta-inquire a {
        color: #e23a36;
      }
    }
  }
  ul.meta-nav {
    li {
      color: #2b2b2b;
      font-size: 15px;
      font-weight: bold;
      text-transform: uppercase;
      line-height: 20px;
      letter-spacing: 0.34px;
      display: inline;
      list-style-type: none;
      position: relative;
      div,
      a {
        text-decoration: none;
        color: #2b2b2b;
        padding: 10px 5px;
        border-bottom: 2px solid transparent;
        transition: 0.4s;
        .sub-menu-icon {
          margin-right: 0;
          font-size: 10px;
          padding-left: 8px;
        }
      }
    }
    ul.meta-sub-menu {
      background: #fcfcfc;
      width: 295px;
      display: none;
      position: absolute;
      top: 52px;
      left: -47px;
      z-index: 2;
      text-align: left;
      box-shadow: -2px 10px 20px rgba(127, 127, 127, 0.1);
      li {
        display: block;
        margin: 0;
        a {
          display: block;
          border-color: #f5f5f5;
          padding: 20px !important;
          font-size: 14px;
        }
      }
    }
  }
}

section.meta-navigation div.meta-center-box ul.meta-nav li:hover > a,
section.meta-navigation div.meta-center-box ul.meta-nav li > a:hover,
section.meta-navigation ul.meta-nav li ul.meta-sub-menu li > a:hover,
section.meta-navigation ul.meta-nav li ul.meta-sub-menu li > div:hover,
section.meta-navigation div.meta-center-box ul.meta-nav li.active {
  color: #e23a36;
  border-color: #e23a36;
  cursor: pointer;
}

.show-in-mobile {
  display: none !important;
}

section.meta-navigation ul.meta-nav > li.has-children {
  padding-bottom: 50px;
}

section.meta-navigation ul.meta-nav li:hover > ul.meta-sub-menu {
  display: block;
}

li.meta-user-settings:hover > a {
  color: #e23a36 !important;
}

li.meta-inquire:hover a {
  color: #2b2b2b !important;
}

/*
MOBILE SLIDE MENU
----------------------------------------------------------------------------- */

div.meta-mobile-nav {
  background: #fff;
  height: 100%;
  width: 100%;
  // padding: 0 30px;
  display: flex;
  flex-wrap: wrap;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;

  opacity: 0;
  overflow: scroll;
  transform: translateX(200%);
  transition: 0.6s;
}

.meta-wrap {
  width: 100%;
  padding: 0 30px;
}

div.meta-mobile-nav.active {
  opacity: 1;
  transform: translateX(0);
}

div.meta-mobile-nav ul.mobile-menu {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  padding: 30px 0 0;
}

div.meta-mobile-nav ul.mobile-menu li {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

div.meta-mobile-nav ul.mobile-menu li a {
  color: #47525d;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;

  width: 100%;
  display: block;
}
div.meta-mobile-nav ul.mobile-menu li {
  color: #47525d;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;

  width: 100%;
  display: block;
  padding: 15px 0px;
}

div.meta-mobile-nav ul.mobile-menu li.meta-menu .icon {
  font-size: 18px;
  margin-right: 16px;
  width: 20px;
  color: #ccc;
}

div.meta-mobile-nav ul.mobile-menu li.meta-menu.active a,
div.meta-mobile-nav ul.mobile-menu li.meta-menu.active .icon {
  color: #e23a36;
}

div.meta-mobile-nav .close-menu {
  width: auto;
  height: auto;
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 2;
  text-align: right;
}

div.meta-mobile-nav .close-menu .close-icon {
  font-size: 25px;
  color: #e23a36;
  width: auto;
}

div.meta-mobile-nav .profile-menu {
  width: 100%;
  height: auto;
  margin-top: 26px;
  padding: 30px 0;
  color: #e23a36;
  border-bottom: 2px solid #e23a3626;
}

div.meta-mobile-nav .profile-menu .meta-user-icon {
  // width: 100%;
  height: 52px;
  width: 52px;
  margin-right: 15px;
  justify-content: center;
  float: left;
}

div.meta-mobile-nav .profile-menu .meta-user-info {
  width: calc(100% - 67px);
  float: left;
}

div.meta-mobile-nav .profile-menu .meta-user-info span {
  line-height: 1.6;
  float: left;
}

span.meta-name {
  font-weight: bold;
}

div.meta-mobile-nav .profile-menu span.meta-email {
  font-size: 14px;
  clear: both;
}

div.meta-mobile-nav .profile-menu span.meta-icon .user-icon {
  margin-right: 0;
  padding: 15px;
  margin-bottom: 30px;
  border: 1px solid;
  border-radius: 100%;
  width: 20px;
  height: 20px;
}

div.meta-mobile-nav .profile-menu a {
  text-transform: uppercase;
  text-decoration: none;
  font-weight: bold;
  color: #2699fb;
}

div.meta-mobile-nav .logout-menu {
  width: 100%;
  margin-top: 50px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

div.meta-mobile-nav .logout-menu a {
  color: #fff;
  background-color: #e23a36;
  text-align: center;
  display: block;
  width: 100%;
  padding: 15px 0;
  transition: 0.4s;
}

div.meta-mobile-nav .logout-menu a:hover,
div.meta-mobile-nav .logout-menu a:focus {
  opacity: 0.75;
}

div.meta-mobile-nav .logout-menu .logout-icon {
  margin-right: 15px;
}

.meta-signin {
  margin-left: auto;
  font-weight: bold;
  color: #e23a36;
  cursor: pointer;
  text-decoration: none !important;
}

@media only screen and (max-width: 1320px) {
  section.meta-navigation {
    .meta-center-box {
      ul.meta-nav li {
        font-size: 13px;
        margin: 0 20px;
      }
    }
    .meta-left-box {
      img.meta-img {
        max-height: 45px;
      }
      .meta-site-name {
        font-size: 13px;
        line-height: 20px;
      }
    }
    .meta-right-box {
      ul.meta-nav {
        li.meta-user-settings {
          padding: 11px 15px;
          .meta-sub-menu {
            width: 189px;
            top: 63px;
          }
        }
        li.meta-inquire {
          font-size: 13px;
        }
      }
    }
    ul.meta-nav {
      ul.meta-sub-menu {
        top: 40px;
        width: 245px;
        li {
          div,
          a {
            font-size: 12px;
            padding: 15px !important;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 1080px) {
  section.meta-navigation .meta-right-box ul.meta-nav li.meta-user-settings {
    padding: 11px 0;
  }
}

@media only screen and (max-width: 991px) {
  .hide-in-mobile {
    display: none !important;
  }
  .show-in-mobile {
    display: block !important;
  }
  section.meta-navigation .meta-right-box ul.meta-nav li.meta-user-settings {
    padding: 11px 0;
  }

  section.meta-navigation .meta-center-box {
    display: none;
  }

  section.meta-navigation .meta-left-box,
  section.meta-navigation .meta-right-box {
    width: 50%;
  }

  .mobile-menu-nav {
    text-align: right;
  }

  .mobile-menu-nav .menu-icon {
    font-size: 28px;
    color: #e23a36;
  }
}

@media only screen and (max-width: 600px) {
  section.meta-navigation {
    padding: 0px 15px;
  }
  section.meta-navigation .meta-left-box {
    width: 70%;
  }
  section.meta-navigation .meta-right-box {
    width: 30%;
  }
}

@media only screen and (max-width: 480px) {
  div.meta-mobile-nav ul.mobile-menu li a {
    font-size: 13px;
  }
}
</style>