import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import BusinessPermitEnrollment from "../pages/BusinessPermitEnrollment.vue";
import RealPropertyEnrollment from "../pages/RealPropertyEnrollment.vue";
import Profile from "../pages/Profile.vue";
import StatementOfAccounts from "../pages/StatementOfAccounts.vue";
import BusinessPermitApplication from "../pages/BusinessPermitApplication.vue";
import BuildingPermitApplication from "../pages/BuildingPermitApplication.vue";
import ViewBusinessDetails from "../pages/ViewBusinessDetails.vue";
import ViewBuildingDetails from "../pages/ViewBuildingDetails.vue";
import Main from "../Main.vue";
import Payment from "../pages/Payment.vue"
import ResetPassword from "../pages/ResetPassword.vue"
import Admin from "../Admin.vue"
import Applications from "../pages/admin/Applications"
import Transactions from "../pages/admin/Transactions"
import Dashboard from "../pages/admin/Dashboard"
import Inquiries from "../pages/admin/Inquiries"
import ReplyInquiry from "../pages/admin/ReplyInquiry"
import ApproveBusinessApplication from "../pages/admin/ApproveBusinessApplication.vue";
import ApproveBuildingApplication from "../pages/admin/ApproveBuildingApplication.vue";
import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  //  async beforeEnter(to, from, next) {
  //     let hasPermission = await store.state.service.isAuthenticated;
  //     if(hasPermission){
  //       next({
  //         name: "Profile"
  //       })
  //     }else{
  //       next()
  //     }
  // }
  },
  {
    path: "/reset-password/:uid/:token",
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
    children: [
      {
        path: "profile",
        name: "Profile",
        component: Profile,
      },
      {
        path: "business-enrollment",
        name: "BusinessPermitEnrollment",
        component: BusinessPermitEnrollment,
      },
      {
        path: "real-property-enrollment",
        name: "RealPropertyEnrollment",
        component: RealPropertyEnrollment,
      },
      {
        path: "statement-of-accounts",
        name: "StatementOfAccounts",
        component: StatementOfAccounts,
      },
      {
        path: 'payment',
        name: 'Payment',
        component: Payment
      },
      {
        path: 'business-permit-application',
        name: 'BusinessPermitApplication',
        component: BusinessPermitApplication
      },
      {
        path: 'building-permit-application',
        name: 'BuildingPermitApplication',
        component: BuildingPermitApplication
      },
      {
        path: 'view-business-details',
        name: 'ViewBusinessDetails',
        component: ViewBusinessDetails
      },
      {
        path: 'view-building-details',
        name: 'ViewBuildingDetails',
        component: ViewBuildingDetails
      },
      
    ],
   async beforeEnter(to, from, next) {
        let hasPermission = await store.state.service.isAuthenticated;
        if(hasPermission){
          next()
        }else{
          next({
            name: "Login"
          })
        }
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "applications",
        name: "Applications",
        component: Applications,
      },
      {
        path: "transactions",
        name: "Transactions",
        component: Transactions,
      },
      {
        path: "inquiries",
        name: "Inquiries",
        component: Inquiries,
      },
      {
        path: "reply-inquiry",
        name: "ReplyInquiry",
        component: ReplyInquiry,
      },
      {
        path: "approve-building-application",
        name: "ApproveBuildingApplication",
        component: ApproveBuildingApplication,
      },
      {
        path: "approve-business-application",
        name: "ApproveBusinessApplication",
        component: ApproveBusinessApplication,
      },
    ],
   async beforeEnter(to, from, next) {
        let hasPermission = await store.state.service.isAuthenticated;
        if(hasPermission){
          next()
        }else{
          next({
            name: "Login"
          })
        }
    }
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
