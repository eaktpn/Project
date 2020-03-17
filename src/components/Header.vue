<template>
   <div class="header" v-if="isLogin">
      <div class="BG-Header">
         <div class="container ">
            <div class="row justify-content-center p-3">
               <div class="col-xl-9 col-md-9 col-12">
                  <div class="row justify-content-center">
                     <div class="col-6 align-self-center"><mdb-icon icon="bars" @click.native="toggleLeftSideNav" class="icon-menu fas2 fab2" /></div>
                     <div class="col-6 text-right"><img src="/images/logo/joker24h.png" width="40%;" style="max-width:80px;" /></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="mb-4"></div>
      <mdb-side-nav :OpenedFromOutside.sync="toggleA" hidden waves>
         <ul>
            <li>
               <mdb-side-nav-nav>
                  <div class="container mt-4">
                     <div class="row justify-content-center">
                        <div class="col-4"><img src="/images/icon/user.png" width="110%;" class="ml-2 mt-1" style="max-width:55px;" /></div>
                        <div class="col-8 text-left">
                           Apitsada132 <br />
                           <mdb-btn block class="font14 color_back btn-profile mt-1">ดูข้อมูลผู้ใช้</mdb-btn>
                        </div>
                     </div>
                  </div>
                  <hr class="my-hr mt-4" />
                  <mdb-side-nav-item icon="home" href="#">หน้าหลัก</mdb-side-nav-item>
                  <mdb-side-nav-item icon="thumbs-up" href="#">โปรโมชั่น</mdb-side-nav-item>
                  <mdb-side-nav-item icon="history" href="#">ประวัติการใช้งาน</mdb-side-nav-item>
                  <mdb-side-nav-item icon="download" href="#">ดาวน์โหลด</mdb-side-nav-item>

                  <mdb-side-nav-item icon="sign-out-alt" href="Logout">ออกจากระบบ</mdb-side-nav-item>
               </mdb-side-nav-nav>
            </li>
         </ul>
      </mdb-side-nav>
   </div>
</template>

<script>
const jwt = require("jsonwebtoken");
import {mapActions, mapGetters} from "vuex";
import $ from "jquery";
export default {
   name: "SideNavPage",
   components: {},
   data() {
      return {
         toggleA: false,
         show_menu: false,
         settingSwitch: "",
         showsetting: false
      };
   },
   computed: {
      ...mapGetters({
         isLogin: "isLogin",
         user: "user",
         amount: "amount",
         token: "token"
      })
   },
   methods: {
      ...mapActions({
         storeLogin: "login",
         storeLogout: "logout"
      }),
      toggleLeftSideNav() {
         this.toggleA = !this.toggleA;
      },
      currencyFormat(n) {
         n = parseFloat(n);
         return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      },
      onChange() {
         let payload = {
            bonus_status: this.settingSwitch ? 1 : 0
         };
         let token = jwt.sign(payload, this.$keypayload, {
            expiresIn: "5s"
         });
         $(".preloader").show();
         this.$axios
            .post("/is_bonus", {token: token}, this.token)
            .then(response => {
               $(".preloader").hide();
               if (response.data.code != "SUCCESS") {
                  this.$swal({
                     title: "เกิดข้อผิดพลาด",
                     text: "ไม่สามารเปิด-ปิดโบนัสได้",
                     icon: "error",
                     timer: 3000,
                     showConfirmButton: true,
                     allowOutsideClick: false,
                     allowEscapeKey: false
                  });
               }
               $(".preloader").hide();
               this.$axios
                  .get("/is_login", this.token)
                  .then(response => {
                     if (response.data.msg != "LOGOUT") {
                        this.$session.set("isLogin", true);
                        this.$session.set("token", response.data);
                        this.storeLogin(response.data);
                        this.$router.push("/");
                        // $(".preloader").hide();
                     } else {
                        this.$swal({
                           title: "เกิดข้อผิดพลาด",
                           text: "มีการเข้าสู่ระบบจากที่อื่น",
                           icon: "error",
                           timer: 3000,
                           showConfirmButton: true,
                           allowOutsideClick: false,
                           allowEscapeKey: false
                        });
                        // $(".preloader").hide();
                        this.$router.push("/");
                     }
                  })
                  .catch(function(error) {
                     console.log(error);
                  });
            })
            .catch(function(error) {
               console.log(error);
            });
      },
      showModalcheck() {
         if (this.user.is_bonus === 1) {
            this.settingSwitch = true;
         } else {
            this.settingSwitch = false;
         }
         this.showsetting = true;
      }
   },
   mounted() {
      this.$session.start();
      if (this.$session.get("isLogin")) {
         let tokenSession = this.$session.get("token");
         let user = jwt.decode(tokenSession);
         let payload = {
            password: user.results[0].password,
            phone_number: user.results[0].phone_number
         };
         let token = jwt.sign(payload, this.$keypayload, {
            expiresIn: "5s"
         });

         this.$axios
            .post("/login", {token: token})
            .then(response => {
               // console.log(response.data);
               if (response.data.msg != "USER_NOT_FOUND") {
                  this.$session.set("isLogin", true);
                  this.$session.set("token", response.data);
                  this.storeLogin(response.data);
                  this.$router.push(this.$session.get("page")); //เก็บ session page เวลา push ให้อยู่หน้าเดิม
               } else {
                  this.$router.push("/Logout");
                  this.$session.set("isLogin", false);
               }
            })
            .catch(function(error) {
               console.log(error);
            });
      }
   }
};
</script>

<style lang="scss">
.BG-Header {
   background: #181818;
   box-shadow: 0px 2px 10px #70f6ff;
}
.header {
   .fas,
   .fab {
      color: #ffffff;
      font-size: 1.2rem !important;
   }
   .fas2,
   .fab2 {
      color: #ffffff;
      font-size: 2rem !important;
   }
   .my-hr {
      //height: 2px;
      width: 100%;
      border-bottom: 1px solid #000000;
   }
   .side-nav {
      background: #181818;
   }
   .side-nav .logo-wrapper {
      height: auto !important;
   }
   .side-nav .logo-wrapper a {
      height: auto !important;
   }
   .side-nav .collapsible a {
      height: 36px;
      font-size: 1rem;
      font-weight: 300;
      line-height: 36px;
      color: #fff;
   }
   .icon-div {
      width: 49%;
      display: inline-block;
   }
   .icon-div .fa {
      cursor: pointer;
   }
   .main_width {
      max-width: 576px;
   }
   .icon-menu {
      color: #ffde30;
      cursor: pointer;
      font-size: 22px;
   }
   .btn-profile {
      background: #fcff68 !important;
      box-shadow: 0px 4px 6px rgba(50, 50, 93, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      padding: 5px 15px 6px 15px;
   }
}
</style>
