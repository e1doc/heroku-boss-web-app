import Vue from 'vue'
import Vuex from 'vuex'
import ui from './modules/ui'
import service from "./modules/service"
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ui,
    service
  }
})
