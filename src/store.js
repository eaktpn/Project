import Vue from "vue";
import Vuex from "vuex";

import VueSession from "vue-session";
import Axios from "axios";
import jwt from "jsonwebtoken";

Vue.use(VueSession);
Vue.use(Vuex);

const state = {
   steplog: 1,
   steppage: 0,
   isLogin: false,
   user: null,
   amount: 0,
   token: null,
   service: "SlotIM",
   version: "1.0:29/06/2562"
   // api: "//195.123.239.140"
};

const getters = {
   isLogin: state => {
      return state.isLogin;
   },
   user: state => {
      return state.user;
   },
   amount: state => {
      return state.amount;
   },
   token: state => {
      return state.token;
   },
   server: state => {
      return state.server;
   },
   version: state => {
      return state.version;
   },
   steppage: state => {
      return state.steppage;
   },
   steplog: state => {
      return state.steplog;
   }
};

const mutations = {
   isLogin: (state, payload) => {
      state.isLogin = payload;
   },
   user: (state, payload) => {
      state.user = payload;
   },
   amount: (state, payload) => {
      state.amount = payload;
   },
   token: (state, payload) => {
      state.token = payload;
   },
   steppage: (state, payload) => {
      state.steppage = payload;
   },
   steplog: (state, payload) => {
      state.steplog = payload;
   }
};
const actions = {
   updateAmount: ({commit}, payload) => {
      Axios.get("//joker24h.abatopup.com/api/amount", state.token).then(respone => {
         console.log(payload);
         commit("amount", respone.data);
      });
   },
   login: ({commit}, payload) => {
      commit("isLogin", true);
      let auth = {
         headers: {
            Authorization: "Bearer " + payload
         }
      };
      commit("token", auth);
      let user = jwt.decode(payload);
      if (user) {
         commit("user", user.results[0]);
         Axios.get("//joker24h.abatopup.com/api/amount", state.token).then(respone => {
            commit("amount", respone.data);
         });
      }
   },
   logout: ({commit}) => {
      commit("isLogin", false);
      commit("user", null);
      commit("token", null);
   },
   updateSteppage: ({commit}, payload) => {
      commit("steppage", payload);
   },
   updatesteplog: ({commit}, payload) => {
      commit("steplog", payload);
   }
};

export default new Vuex.Store({
   state,
   actions,
   mutations,
   getters
});
