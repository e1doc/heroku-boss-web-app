import Vue from 'vue'
import Vuex from 'vuex'
import ui from './modules/ui'
import service from "./modules/service"
import business from "./modules/business"
import property from "./modules/property"
import admin from "./modules/admin"
import inquiry from "./modules/inquiry"
import appointment from "./modules/appointment";
import VuexPersist from 'vuex-persist';
Vue.use(Vuex)
const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.sessionStorage,
  reducer: state => ({
    ui: state.ui,
    service: state.service,
    business: state.business,
    property: state.property,
    admin: state.admin,
    inquiry: state.inquiry,
    appointment: state.appointment
  })
})
export default new Vuex.Store({
  modules: {
    ui,
    service,
    business,
    property,
    admin,
    inquiry,
    appointment
  },
  plugins: [vuexLocalStorage.plugin]
})
