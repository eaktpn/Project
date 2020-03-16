import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import "mdbvue/lib/mdbvue.css";

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as mdbvue from "mdbvue";

for (const component in mdbvue) {
   Vue.component(component, mdbvue[component]);
}

Vue.config.productionTip = false

import Notify from 'mdbvue/lib/components/Notify'
Vue.use(Notify)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// sfd45fsd