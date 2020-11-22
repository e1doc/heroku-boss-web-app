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
import Payment from "../pages/Payment.vue";
import ResetPassword from "../pages/ResetPassword.vue";
import UserInquiries from "../pages/UserInquiries";
import UserReplyInquiry from "../pages/UserReplyInquiry";
import NewInquiry from "../pages/NewInquiry";
import Bills from "../pages/Bills";
import Admin from "../Admin.vue";
import AdminLogin from "../pages/AdminLogin";
import Applications from "../pages/admin/Applications";
import Transactions from "../pages/admin/Transactions";
import Dashboard from "../pages/admin/Dashboard";
import Inquiries from "../pages/admin/Inquiries";
import ReplyInquiry from "../pages/admin/ReplyInquiry";
import Departments from "../pages/admin/Departments";
import Assessments from "../pages/admin/Assessments";
import ApproveBusinessApplication from "../pages/admin/ApproveBusinessApplication.vue";
import ApproveBuildingApplication from "../pages/admin/ApproveBuildingApplication.vue";
import AdminAppointment from "../pages/admin/AdminAppointment.vue";
import Appointment from "../pages/Appointment"
import AddAppointment from "../pages/AddAppointment"
import AppointmentInvoice from "../pages/AppointmentInvoice"
import TestPage from "../pages/TestPage";
import ComingSoon from "../pages/ComingSoon";
import store from "../store";
import swal from "sweetalert2"
Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Login",
    component: Login,
    // async beforeEnter(to, from, next) {
    //   let isAdmin = await store.state.service.isAdminAuthenticated;
    //   let isUser = await store.state.service.isAuthenticated;
    //   if (isAdmin) {
    //     next({
    //       name: "Dashboard",
    //     });
    //   } else if (isUser) {
    //     next({
    //       name: "Profile",
    //     });
    //   } else {
    //     next();
    //   }
    // },
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
    children: [{
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
        path: "payment",
        name: "Payment",
        component: Payment,
      },
      {
        path: "business-permit-application",
        name: "BusinessPermitApplication",
        component: BusinessPermitApplication,
      },
      {
        path: "building-permit-application",
        name: "BuildingPermitApplication",
        component: BuildingPermitApplication,
      },
      {
        path: "view-business-details",
        name: "ViewBusinessDetails",
        component: ViewBusinessDetails,
      },
      {
        path: "view-building-details",
        name: "ViewBuildingDetails",
        component: ViewBuildingDetails,
      },
      {
        path: "user-inquiries",
        name: "UserInquiries",
        component: UserInquiries,
      },
      {
        path: "user-reply-inquiry",
        name: "UserReplyInquiry",
        component: UserReplyInquiry,
        props: true 
      },
      {
        path: "new-inquiry",
        name: "NewInquiry",
        component: NewInquiry,
      },
      {
        path: "test-page",
        name: "TestPage",
        component: TestPage,
      },
      {
        path: "appointment",
        name: "Appointment",
        component: Appointment,
      },
      {
        path: "add-appointment",
        name: "AddAppointment",
        component: AddAppointment,
      },
      {
        path: "appointment-slip",
        name: "AppointmentSlip",
        component: AppointmentInvoice,
      },
      {
        path: "bills",
        name: "Bills",
        component: Bills,
      },
    ],
    // async beforeEnter(to, from, next) {
    //   let hasPermission = await store.state.service.isAuthenticated;
    //   if (hasPermission) {
    //     next();
    //   } else {
    //     next({
    //       name: "Login",
    //     });
    //   }
    // },
  },
  {
    path: "/admin-login",
    name: "AdminLogin",
    component: AdminLogin,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    children: [{
        path: "",
        name: "AdminLanding",
        component: Dashboard,
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "applications",
        name: "Applications",
        component: Applications,
        async beforeEnter(to, from, next) {
          let groups = await store.state.admin.groups;
          if(groups.includes('superadmin') || groups.includes('business_application_approver') || groups.includes('building_application_approver') || groups.includes('assessment_approver')){
            next()
          }else{
            swal.fire({
              title: "Failed!",
              text: "You have no access for this module.",
              icon: "error",
            });
            next(from)
          }
        },
      },
      {
        path: "assessments",
        name: "Assessments",
        component: Assessments,
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
        props: true 
      },
      {
        path: "new-remarks",
        name: "NewRemarks",
        component: NewInquiry,
        props: true 
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
      {
        path: "appointments",
        name: "AdminAppointment",
        component: AdminAppointment,
        async beforeEnter(to, from, next) {
          let groups = await store.state.admin.groups;
          if(groups.includes('superadmin') || groups.includes('business_application_approver') || groups.includes('building_application_approver') || groups.includes('assessment_approver')){
            next()
          }else{
            swal.fire({
              title: "Failed!",
              text: "You have no access for this module.",
              icon: "error",
            });
            next(from)
          }
        },
      },
      {
        path: "departments",
        name: "Departments",
        component: Departments,
        async beforeEnter(to, from, next) {
          let groups = await store.state.admin.groups;
          if(groups.includes('superadmin')){
            next()
          }else{
            swal.fire({
              title: "Failed!",
              text: "You have no access for this module.",
              icon: "error",
            });
            next(from)
          }
        },
      },
    ],
    // async beforeEnter(to, from, next) {
    //   let hasPermission = await store.state.service.isAdminAuthenticated;
    //   if (hasPermission) {
    //     next();
    //   } else {
    //     next({
    //       name: "AdminLogin",
    //     });
    //   }
    // },
  },
  // {
  // path: '/about',
  // name: 'About',
  // // route level code-splitting
  // // this generates a separate chunk (about.[hash].js) for this route
  // // which is lazy-loaded when the route is visited.
  // component: () => import(/ webpackChunkName: "about" / '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;