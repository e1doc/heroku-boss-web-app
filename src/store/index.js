import Vue from 'vue'
import Vuex from 'vuex'
import ui from './modules/ui'
import service from "./modules/service"
import VuexPersist from 'vuex-persist';
Vue.use(Vuex)
const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.sessionStorage,
  reducer: state => ({
    ui: state.ui
  })
})
export default new Vuex.Store({
  modules: {
    ui,
    service
  },
  plugins: [vuexLocalStorage.plugin]
})
