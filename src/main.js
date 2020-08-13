import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Ripple from "vue-ripple-directive";
import "@/css/main.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import VModal from 'vue-js-modal'
import VueHtml2pdf from 'vue-html2pdf'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Skeleton from 'vue-loading-skeleton';
Vue.use(Skeleton)
Vue.use(VueSweetalert2);
Vue.use(VueHtml2pdf)
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
  faSave,
  faArrowLeft,
  faChartLine,
  faCoins,
  faUsers,
  faSearch,
  faCommentSlash,
  faComments,
  faInbox,
  faEnvelopeOpenText,
  faReply,
  faPaperPlane,
  faBars
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
  faSave,
  faArrowLeft,
  faChartLine,
  faCoins,
  faUsers,
  faSearch,
  faCommentSlash,
  faComments,
  faInbox,
  faEnvelopeOpenText,
  faReply,
  faPaperPlane,
  faBars
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
