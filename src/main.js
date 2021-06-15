import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Ripple from "vue-ripple-directive";
import "@/css/main.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import VModal from 'vue-js-modal'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Skeleton from 'vue-loading-skeleton';
import Lightbox from 'vue-easy-lightbox'
import Paginate from 'vuejs-paginate'
import VueCurrencyInput from 'vue-currency-input'

Vue.use(VueCurrencyInput, { globalOptions: { 
  currency: 'PHP'
  }
},)
Vue.use(Skeleton)
Vue.use(VueSweetalert2)
Vue.use(Lightbox)
Vue.use(require('vue-moment'));
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
  faBars,
  faPlusCircle,
  faEdit,
  faGlobe,
  faBusinessTime,
  faLaptopHouse,
  faFileInvoiceDollar,
  faInfoCircle,
  faQuestion,
  faFilter,
  faPlus,
  faCalendarCheck,
  faNetworkWired,
  faSort,
  faListAlt,
  faPaperclip,
  faCaretDown,
  faMinus,
  faTimesCircle,
  faCheckCircle,
  faUniversity,
  faMoneyCheck,
} from "@fortawesome/free-solid-svg-icons"
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
  faBars,
  faPlusCircle,
  faEdit,
  faGlobe,
  faBusinessTime,
  faLaptopHouse,
  faFileInvoiceDollar,
  faInfoCircle,
  faQuestion,
  faFilter,
  faPlus,
  faCheck,
  faCalendarCheck,
  faNetworkWired,
  faSort,
  faListAlt,
  faPaperclip,
  faCaretDown,
  faMinus,
  faTimesCircle,
  faCheckCircle,
  faUniversity,
  faMoneyCheck
]);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component('paginate', Paginate)
Vue.use(VModal)
Vue.directive("ripple", Ripple);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
