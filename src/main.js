import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import 'mdbvue/lib/mdbvue.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import * as mdbvue from 'mdbvue'
for (const component in mdbvue) {
	Vue.component(component, mdbvue[component])
}

import {BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

import VueSession from 'vue-session' //session
Vue.use(VueSession)

import VueSweetalert2 from 'vue-sweetalert2' //sweetalert
import 'sweetalert2/dist/sweetalert2.min.css'
Vue.use(VueSweetalert2)

const VueInputMask = require('vue-inputmask').default //formate v-mask
Vue.use(VueInputMask)

import VueCountdown from '@xkeshi/vue-countdown' //นับเวลาถอยหลัง otp
Vue.component(VueCountdown.name, VueCountdown)

import moment from 'vue-moment' //ใช้กับตัวเลข เวลา
Vue.use(moment)

import VueClipboard from 'vue-clipboard2' // ใช้ copyText
Vue.use(VueClipboard)

// import DatePicker from "vue2-datepicker"; //ปฏิทิน
import 'vue2-datepicker/index.css'
// Vue.use(DatePicker);

var SocialSharing = require('vue-social-sharing') //social sharing
Vue.use(SocialSharing)

const keypayload = 'ABAsecretKey*' //ตัวแปรคงที่ไม่สามารถเปลียนแปลงค่าได้
Vue.prototype.$keypayload = keypayload

import axios from 'axios'
axios.defaults.baseURL = 'https://win222.abatopup.com/api'
Vue.prototype.$axios = axios
window.$ = require('jquery') //ติตตั้งเรียกใช้ jquery

Vue.config.productionTip = false

import Notify from 'mdbvue/lib/components/Notify'
Vue.use(Notify)

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app')

// sfd45fsd
