import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import "mdbvue/lib/mdbvue.css";

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as mdbvue from "mdbvue";

import VueSession from "vue-session";
Vue.use(VueSession);

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);

import moment from "vue-moment";
Vue.use(moment);

const keypayload = "ABAsecretKey*"; //ตัวแปรคงที่ไม่สามารถเปลียนแปลงค่าได้
Vue.prototype.$keypayload = keypayload;

import axios from "axios";
axios.defaults.baseURL = "//slotimlive22.abatopup.com/api";
Vue.prototype.$axios = axios;

for (const component in mdbvue) {
   Vue.component(component, mdbvue[component]);
}

window.$ = require("jquery"); //ติตตั้งเรียกใช้ jquery

Vue.config.productionTip = false

import Notify from 'mdbvue/lib/components/Notify'
Vue.use(Notify)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// sfd45fsd