import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Ripple from "vue-ripple-directive";
import "@/css/main.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import VModal from 'vue-js-modal'
import {
  faUser,
  faLock,
  faUserCircle,
  faKey,
  faEnvelope,
  faIdCard,
  faReceipt,
  faCalendar,
  faArrowRight,
  faStore,
  faCity,
  faEye,
  faCaretUp,
  faTimes,
  faCommentAlt,
  faPowerOff,
  faChevronDown,
  faPhone,
  faRetweet,
  faSyncAlt,
  faCheck,
  faSave
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add([
  faUser,
  faLock,
  faUserCircle,
  faKey,
  faEnvelope,
  faIdCard,
  faReceipt,
  faCalendar,
  faArrowRight,
  faStore,
  faCity,
  faEye,
  faCaretUp,
  faTimes,
  faCommentAlt,
  faPowerOff,
  faChevronDown,
  faPhone,
  faRetweet,
  faSyncAlt,
  faCheck,
  faSave
]);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VModal)
Vue.directive("ripple", Ripple);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
