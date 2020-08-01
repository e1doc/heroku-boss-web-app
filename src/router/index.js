import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Login from "../pages/Login.vue"
import BusinessPermitEnrollment from "../pages/BusinessPermitEnrollment.vue"
import RealPropertyEnrollment from "../pages/RealPropertyEnrollment.vue"
import Payment from "../pages/Payment.vue"
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/business-enrollment',
    name: 'BusinessPermitEnrollment',
    component: BusinessPermitEnrollment
  },
  {
    path: '/real-property-enrollment',
    name: 'RealPropertyEnrollment',
    component: RealPropertyEnrollment
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
