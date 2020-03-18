import Vue from "vue";
import Router from "vue-router";
const Login = () => import("./components/Login.vue");
const Logout = () => import("./components/Logout.vue");
const Register = () => import("./components/Register.vue");
const Header = () => import("./components/Header.vue");
const Main = () => import("./components/Main.vue");
const Profile = () => import("./components/Profile.vue");
const Affiliate = () => import("./components/Affiliate.vue");
const History = () => import("./components/History.vue");
const Bonus = () => import("./components/Bonus.vue");
const Deposit = () => import("./components/Deposit.vue");
const Withdraw = () => import("./components/Withdraw.vue");

Vue.use(Router);

export default new Router({
   mode: "history",
   linkExactActiveClass: "active",
   scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
         return savedPosition;
      }
      if (to.hash) {
         return {selector: to.hash};
      }
      return {x: 0, y: 0};
   },
   routes: [
      {
         path: "/Login",
         name: "Login",
         components: {header: Header, default: Login}
      },
      {
         path: "/Logout",
         name: "Logout",
         components: {default: Logout}
      },
      {
         path: "/Register",
         name: "Register",
         components: {header: Header, default: Register}
      },
      {
         path: "/Header",
         name: "Header",
         components: {header: Header}
      },
      {
         path: "/",
         name: "Main",
         components: {header: Header, default: Main}
      },
      {
         path: "/Main",
         name: "Main",
         components: {header: Header, default: Main}
      },
      {
         path: "/Profile",
         name: "Profile",
         components: {header: Header, default: Profile}
      },
      {
         path: "/Affiliate",
         name: "Affiliate",
         components: {header: Header, default: Affiliate}
      },
      {
         path: "/History",
         name: "History",
         components: {header: Header, default: History}
      },
      {
         path: "/Bonus",
         name: "Bonus",
         components: {header: Header, default: Bonus}
      },
      {
         path: "/Deposit",
         name: "Deposit",
         components: {header: Header, default: Deposit}
      },
      {
         path: "/Withdraw",
         name: "Withdraw",
         components: {header: Header, default: Withdraw}
      }
   ]
});
