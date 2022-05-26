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
import Faq from "../pages/Faq";
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
import AdminSoa from "../pages/admin/AdminSoa.vue";
import Appointment from "../pages/Appointment";
import AddAppointment from "../pages/AddAppointment";
import AppointmentInvoice from "../pages/AppointmentInvoice";
import TestPage from "../pages/TestPage";
import LandBankPayment from "../pages/LandbankPayment";
import PaymentSuccess from "../pages/PaymentSuccess";
import PaymentError from "../pages/PaymentError";
import ComingSoon from "../pages/ComingSoon";
import RenewalBusinessPermitApplication from "../pages/RenewalBusinessPermitApplication";
import PaymentLayout from "../PaymentLayout.vue";
import UserTransactions from "../pages/UserTransactions";
import RequestNewTaxDec from "../pages/RequestNewTaxDec";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import MobileDownloadBusinessForm from "../pages/MobileDownloadBusinessForm";
import MobileDownloadInvoice from "../pages/MobileDownloadInvoice";
import MobileDownloadAppointment from "../pages/MobileDownloadAppointment";
import MobileRedirectToEpp from "../pages/MobileRedirectToEpp";
import MobileDownloadApp from "../pages/MobileDownloadApp";
import store from "../store";
import swal from "sweetalert2";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    async beforeEnter(to, from, next) {
      let isAdmin = await store.state.service.isAdminAuthenticated;
      let isUser = await store.state.service.isAuthenticated;
      if (isAdmin) {
        next({
          name: "Dashboard",
        });
      } else if (isUser) {
        next({
          name: "Profile",
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/reset-password/:uid/:token",
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/download-business/:id/:token",
    name: "MobileDownloadBusinessForm",
    component: MobileDownloadBusinessForm,
  },
  {
    path: "/download-invoice/:id/:token/:type",
    name: "MobileDownloadInvoice",
    component: MobileDownloadInvoice,
  },
  {
    path: "/download-app",
    name: "MobileDownloadApp",
    component: MobileDownloadApp,
  },
  {
    path: "/download-appointment/:id/:token",
    name: "MobileDownloadAppointment",
    component: MobileDownloadAppointment,
  },
  {
    path: "/mobile-redirect-to-epp/:id/:token/:type",
    name: "MobileRedirectToEpp",
    component: MobileRedirectToEpp,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/payment",
    name: "Payment",
    component: PaymentLayout,
    children: [
      {
        path: "payment-success",
        name: "PaymentSuccess",
        component: PaymentSuccess,
      },
      {
        path: "payment-error",
        name: "PaymentError",
        component: PaymentError,
      },
      {
        path: "mobile-payment/:origin/:soa/:type/:token",
        name: "Payment",
        component: Payment,
      },
    ],
  },
  {
    path: "/privacy-policy",
    name: "PrivacyPolicy",
    component: PrivacyPolicy,
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
        props: true,
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
      {
        path: "faq",
        name: "Faq",
        component: Faq,
      },
      {
        path: "landbank-payment",
        name: "LandBankPayment",
        component: LandBankPayment,
      },
      {
        path: "business-renewal",
        name: "BusinessRenewal",
        component: RenewalBusinessPermitApplication,
      },
      {
        path: "transactions",
        name: "UserTransactions",
        component: UserTransactions,
      },
      {
        path: "request-new-td",
        name: "RequestNewTaxDec",
        component: RequestNewTaxDec,
      },
    ],
    async beforeEnter(to, from, next) {
      let hasPermission = await store.state.service.isAuthenticated;
      if (hasPermission) {
        next();
      } else {
        next({
          name: "Login",
        });
      }
    },
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
    children: [
      {
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
          if (
            groups.includes("superadmin") ||
            groups.includes("business_application_approver") ||
            groups.includes("building_application_approver") ||
            groups.includes("assessment_approver")
          ) {
            next();
          } else {
            swal.fire({
              title: "Failed!",
              text: "You have no access for this module.",
              icon: "error",
            });
            next(from);
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
        props: true,
      },
      {
        path: "new-remarks",
        name: "NewRemarks",
        component: NewInquiry,
        props: true,
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
          if (
            groups.includes("superadmin") ||
            groups.includes("business_application_approver") ||
            groups.includes("building_application_approver") ||
            groups.includes("assessment_approver")
          ) {
            next();
          } else {
            swal.fire({
              title: "Failed!",
              text: "You have no access for this module.",
              icon: "error",
            });
            next(from);
          }
        },
      },
      {
        path: "departments",
        name: "Departments",
        component: Departments,
        async beforeEnter(to, from, next) {
          let groups = await store.state.admin.groups;
          if (groups.includes("superadmin")) {
            next();
          } else {
            swal.fire({
              title: "Failed!",
              text: "You have no access for this module.",
              icon: "error",
            });
            next(from);
          }
        },
      },
      {
        path: "admin-soa",
        name: "AdminSoa",
        component: AdminSoa,
      },
    ],
    async beforeEnter(to, from, next) {
      let hasPermission = await store.state.service.isAdminAuthenticated;
      if (hasPermission) {
        next();
      } else {
        next({
          name: "AdminLogin",
        });
      }
    },
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
