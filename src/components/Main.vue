<template>
   <div class="container">
      <div class="row justify-content-center px-3">
         <div class="col-xl-9 col-md-9 col-12">
            <div class="row">
               <div class="pr-2"><img src="/images/icon/coin.png" class="mx-3" width="100%;" style="max-width:75px;" /></div>
               <div class="align-self-center">
                  <div class="font16" style="color:#2F80ED;">ยอดเงิน</div>
                  <div class="font26" style="font-weight:400;">{{ currencyFormat(amount) }}</div>
               </div>
            </div>
            <!-- <div class="line-main my-3"></div> -->
            <div class="row justify-content-center BG-gray-radius-main mt-2">
               <div class="col-8 font16">
                  <div class="mt-2"><label style="color:#2F80ED;">ยูสเซอร์เนม : </label> {{ user.username }}</div>
                  <div><label style="color:#2F80ED;">รหัสผ่าน : </label> {{ user.password }}</div>
               </div>
               <div class="col-4 align-self-center text-right">
                  <router-link to="/Profile">
                     <button type="button" class="btn btn-profile color_yellow font14" style="font-weight:200;">ข้อมูลบัญชี</button>
                  </router-link>
               </div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center mt-3">
         <div class="col-xl-9 col-md-9 col-12 text-center">
            <carousel :per-page="1" v-bind:autoplay="true" v-bind:loop="true" :mouse-drag="false">
               <slide v-for="(banners, key) in bannerimg" :key="key">
                  <a target="_blank" rel="noreferrer">
                     <img :src="banners" class="img-fluid shadow rounded" width="100%" alt="image" />
                  </a>
               </slide>
            </carousel>
         </div>
      </div>

      <div class="row justify-content-center p-3">
         <div class="col-xl-9 col-md-9 col-12 login-game text-center font28" style="font-weight:400; cursor: pointer;" @click="linkGame()"><img src="/images/icon/gamepad.png" class="m-2" width="100%;" style="max-width:50px; margin-top:-2px;" /> เข้าเกม</div>
      </div>
      <div class="row justify-content-center px-2">
         <div class="col-xl-9 col-md-9 col-12">
            <div class="row text-center">
               <div class="col-xl-3 col-md-4 col-4 padding-main mb-3">
                  <router-link to="/Deposit">
                     <div class="BG-gray-radius" style="cursor: pointer;">
                        <img src="/images/icon/coin.png" width="70px;" />
                        <div class="color_white font16" style="font-weight:400;">ฝากเงิน</div>
                     </div>
                  </router-link>
               </div>
               <div class="col-xl-3 col-md-4 col-4 padding-main mb-3">
                  <router-link to="/Withdraw">
                     <div class="BG-gray-radius" style="cursor: pointer;">
                        <img src="/images/icon/cash2.png" width="70px;" class="p-1" />
                        <div class="color_white font16" style="font-weight:400;">ถอนเงิน</div>
                     </div>
                  </router-link>
               </div>
               <div class="col-xl-3 col-md-4 col-4 padding-main mb-3">
                  <router-link to="/Affiliate">
                     <div class="BG-gray-radius" style="cursor: pointer;">
                        <img src="/images/icon/add-user2.png" width="70px;" class="p-1" />
                        <div class="color_white font16" style="font-weight:400;">แนะนำเพื่อน</div>
                     </div>
                  </router-link>
               </div>
               <div class="col-xl-3 col-md-4 col-4 padding-main mb-3">
                  <router-link to="Bonusspecial">
                     <div class="BG-gray-radius" style="cursor: pointer;">
                        <img src="/images/icon/gift-card.png" width="70px;" class="p-1" />
                        <div class="color_white font16" style="font-weight:400;">โบนัสฟรี</div>
                     </div>
                  </router-link>
               </div>
               <div class="col-xl-3 col-md-4 col-4 padding-main mb-3">
                  <router-link to="/History">
                     <div class="BG-gray-radius" style="cursor: pointer;">
                        <img src="/images/icon/history.png" width="70px;" class="p-1" />
                        <div class="color_white font16" style="font-weight:400;">ประวัติ</div>
                     </div>
                  </router-link>
               </div>
               <div class="col-xl-3 col-md-4 col-4 padding-main mb-3">
                  <a href="https://lin.ee/4loZnaa" target="_blank">
                     <div class="BG-gray-radius" style="cursor: pointer;">
                        <img src="/images/icon/contact.png" width="70px;" class="p-1" />
                        <div class="color_white font16" style="font-weight:400;">ติดต่อ</div>
                     </div>
                  </a>
               </div>
            </div>
         </div>
      </div>
      <ModalCheck></ModalCheck>
   </div>
</template>

<script>
import ModalCheck from "../components/ModalCheck.vue";
const jwt = require("jsonwebtoken");
import momentjs from "moment";
import {mapActions, mapGetters} from "vuex";
import {Carousel, Slide} from "vue-carousel";
import {} from "mdbvue";
import $ from "jquery";
import firebase from "firebase";
var bannerRef = firebase.database().ref("banner");
var popup_main = firebase.database().ref("popup");
export default {
   name: "Mian",
   data() {
      return {
         btnsubmit: true,
         active: false,
         bannerimg: "",
         showDialog: true,
         confirm_phonenumber: null,
         confirm_OTP: "",
         counting: null,
         settingSwitch: "",
         showsetting: false
      };
   },
   components: {
      ModalCheck,
      Carousel,
      Slide
   },
   computed: {
      ...mapGetters({
         isLogin: "isLogin",
         user: "user",
         amount: "amount",
         token: "token"
      }),
      checkOTP: function() {
         if (this.user.active === 0) {
            return true;
         } else {
            return false;
         }
      }
   },
   methods: {
      ...mapActions({
         storeLogin: "login",
         storeLoout: "logout"
      }),
      currencyFormat(n) {
         n = parseFloat(n);
         return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      },
      linkGame() {
         var formPlaygame = document.createElement("form");
         formPlaygame.setAttribute("method", "post");
         formPlaygame.setAttribute("action", "https://joker.slot789th.com");
         formPlaygame.setAttribute("target", "_blank");
         var i = document.createElement("input");
         i.setAttribute("type", "hidden");
         i.setAttribute("name", "username");
         i.setAttribute("value", this.user.username);
         formPlaygame.appendChild(i);
         var j = document.createElement("input");
         j.setAttribute("type", "hidden");
         j.setAttribute("name", "password");
         j.setAttribute("value", this.user.password);
         formPlaygame.appendChild(j);
         document.body.appendChild(formPlaygame);
         formPlaygame.submit();
      },
      OTPcheck() {
         this.counting = true;
         this.btnsubmit = false;
         console.log(this.counting);
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
                     timer: 5000,
                     showConfirmButton: true,
                     allowOutsideClick: false,
                     allowEscapeKey: false
                  });
               }
               $(".preloader").hide();
               this.$axios
                  .get("/is_login", this.token)
                  .then(response => {
                     $(".preloader").hide();
                     if (response.data.msg != "LOGOUT") {
                        this.$session.set("isLogin", true);
                        this.$session.set("token", response.data);
                        this.storeLogin(response.data);
                     } else {
                        this.$swal({
                           title: "เกิดข้อผิดพลาด",
                           text: "มีการเข้าสู่ระบบจากที่อื่น",
                           icon: "error",
                           timer: 5000,
                           showConfirmButton: true,
                           allowOutsideClick: false,
                           allowEscapeKey: false
                        });
                        $(".preloader").hide();
                        this.$router.push("/Logout");
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
      popup_main.child("main").on("value", snap => {
         //Popup affiliate
         var leng = snap.val();
         var show_popup_main = [];
         console.log(snap.val());
         for (var i = 0; i < leng.length; i++) {
            if (snap.val()[i].status === 1 && momentjs().format("YYYY-MM-DD HH:mm") >= snap.val()[i].date_start && momentjs().format("YYYY-MM-DD HH:mm") <= snap.val()[i].date_end) {
               show_popup_main.push({
                  title: snap.val()[i].title,
                  html: snap.val()[i].text,
                  icon: snap.val()[i].type,
                  showConfirmButton: snap.val()[i].showConfirmButton
               });
            }
            this.$swal.queue(show_popup_main);
         }
      });
      if (this.$session.get("isLogin")) {
         if (this.isLogin) {
            // this.$session.set("page", "/");
            this.$axios
               .get("/is_login", this.token)
               .then(response => {
                  if (response.data.msg != "LOGOUT") {
                     this.$axios
                        .get("/affiliateUpdate", this.token) // Update affiliate
                        .then(response => {
                           console.log("affiliateUpdate " + response.data.msg);
                        })
                        .catch(function(error) {
                           $(".preloader").hide();
                           console.log(error);
                        });
                     this.$session.set("isLogin", true);
                     this.$session.set("token", response.data);
                     this.storeLogin(response.data);
                     //this.confirm_phonenumber = this.user.phone_number; // คืนค่าเบอร์โทรศัพท์ไปช่อง input
                  } else {
                     this.$swal({
                        title: "เกิดข้อผิดพลาด",
                        text: "มีการเข้าสู่ระบบจากที่อื่น",
                        icon: "error",
                        timer: 5000,
                        showConfirmButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                     });
                     this.$router.push("/Logout");
                  }
               })
               .catch(function(error) {
                  console.log(error);
               });

            this.checkLogin = 1;
         }
      } else {
         this.checkLogin = 0;
         console.log("Logout main");
         this.$router.push("/Logout");
      }
      bannerRef.orderByKey().on("value", snap => {
         this.bannerimg = snap.val();
      });
   }
};
</script>

<style>
.VueCarousel-dot-container {
   margin-top: -15px !important;
   margin-bottom: -10px !important;
}
.BG-gray-radius-main {
   background: #202020;
   border-radius: 10px;
   padding: 10px 5px;
   border: 1px solid #504b00;
   margin-right: -13px;
   margin-left: -13px;
}
.line-main {
   border: 0.5px solid #969595;
}
.login-game {
   background: #252525;
   border-radius: 12px;
   /* border: 1px solid #504b00; */
}
.padding-main {
   padding-right: 6px !important;
   padding-left: 6px !important;
}
.modal-title {
   color: #eaa33b;
}
.btn-profile {
   border-color: #fac549;
   padding: 3px 7px;
}
</style>
