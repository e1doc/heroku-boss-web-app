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
import Main from "../Main.vue";
import Payment from "../pages/Payment.vue"
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
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
    ],
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
