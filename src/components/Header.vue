<template>
   <div class="header" v-if="isLogin">
      <div class="BG-Header">
         <div class="container ">
            <div class="row justify-content-center p-1">
               <div class="col-xl-9 col-md-9 col-12">
                  <div class="row justify-content-center">
                     <div class="col-4 align-self-center mt-1"><mdb-icon icon="bars" @click.native="toggleLeftSideNav" class="icon-menu fas2 fab2" /></div>
                     <div class="col-4 text-center">
                        <router-link to="/"><img src="/images/logo/sexy222.png" width="110%;" style="max-width:150px;"/></router-link>
                     </div>
                     <div class="col-4"></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="BG-gray-header" v-if="$route.name !== 'Profile'">
         <div class="container ">
            <div class="row justify-content-center">
               <div class="col-xl-9 col-md-9 col-12">
                  <div class="row justify-content-center mt-2">
                     <div class="col-xl-6 col-md-6 col-6">
                        ยูสเซอร์เนม : <span class="color_pink">{{ user.username }}</span>
                     </div>
                     <div class="col-xl-6 col-md-6 col-6 text-right">
                        รหัสผ่าน : <span class="color_pink">{{ user.password }}</span>
                     </div>
                  </div>
                  <div class="line-main my-3"></div>
                  <div class="row justify-content-center mt-2">
                     <div class="col-7 font16">
                        <div>ยอดเงินคงเหลือ</div>
                        <div>
                           <span class="color_pink font24">{{ currencyFormat(amount) }}</span> บาท
                        </div>
                     </div>
                     <div class="col-5 align-self-center text-right">
                        <router-link to="/Profile">
                           <button type="button" class="btn btn-profile color_back font14" style="font-weight:400;">ข้อมูลบัญชี</button>
                        </router-link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <mdb-side-nav :OpenedFromOutside.sync="toggleA" hidden waves>
         <mdb-side-nav-nav>
            <!-- <div class="container mt-4">
               <div class="row justify-content-center">
                  <div class="col-4"><img src="/images/icon/user.png" width="110%;" class="ml-2 mt-1" style="max-width:55px;" /></div>
                  <div class="col-8 font14 color_blue">
                     USER: {{ user.username }} <br />
                     <router-link to="/Profile">
                        <mdb-btn block class="font14 color_back btn-profile mt-1">ดูข้อมูลผู้ใช้</mdb-btn>
                     </router-link>
                  </div>
               </div>
            </div>
            <hr class="my-hr mt-4" /> -->
            <div class="row justify-content-center p-2">
               <div class="col"><img src="/images/logo/sexy222.png" width="100%;" class="ml-2 mt-1" style="max-width:110px;" /></div>
            </div>
            <div class="row justify-content-center m-2">
               <div class="col">
                  <router-link to="/">
                     <div class="font16"><i class="fas fa-home"></i>หน้าหลัก</div></router-link
                  >
                  <!-- <router-link to="/Profile">
                     <div class="font16"><i class="fas fa-address-card"></i>ข้อมูลบัญชี</div>
                  </router-link> -->
                  <div @click="showModalcheck()" style="cursor:pointer;"><i class="my-2 fas fa-toggle-on"></i><span class="font16">ตั้งค่าโบนัส</span></div>
                  <div><i class="my-2 fas fa-thumbs-up"></i><span class="font16">โปรโมชั้น</span></div>
                  <div><i class="my-2 fas fa-download"></i><span class="font16">ดาวน์โหลด</span></div>
                  <div>
                     <router-link to="/Logout" class="font16 color_pink"><i class="my-2 fas fa-sign-out-alt color_pink"></i><b>ออกจากระบบ</b></router-link>
                  </div>
                  <hr class="my-hr mt-3" />
                  <a href="https://facebook.com/Joker24h-107816474080548/?ref=bookmarks" target="_blank">
                     <div>
                        <i class="my-1 fab fa-facebook-square text-primary"></i><span class="font16 text-primary"><b>Facebook</b></span>
                     </div>
                  </a>
                  <a href="https://lin.ee/4loZnaa" target="_blank">
                     <div>
                        <i class="fab fa-line text-success"></i><span class="font16 text-success"><b>Line</b></span>
                     </div>
                  </a>
               </div>
            </div>
         </mdb-side-nav-nav>
      </mdb-side-nav>
      <mdb-modal id="modalbonus" :show="showsetting" @close="showsetting = false" hide-header hide-footer centered no-close-on-esc hide-header-close v-model="settingSwitch" @change="onChange()">
         <div class="row" style="padding:25px;">
            <div class="col-12">
               <label class="font24">เลือกรับ / ไม่รับโบนัส</label>
            </div>
            <div class="col-3 mt-2">
               <label class="switch">
                  <input type="checkbox" v-model="settingSwitch" @change="onChange()" />
                  <span class="slider round"></span>
               </label>
            </div>
            <div class="col-9 mt-2">
               <label class="color_pink" style="font-weight:400;">เลือกเปิดเพื่อรับโบนัส !!</label>
               <label class="color_pink" style="font-weight:400;">ระบบจะเลือกโบนัสที่ดีที่สุดให้คุณ</label>
            </div>
         </div>
      </mdb-modal>
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

               $(".preloader").show();
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
                           timer: 3000,
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
            phone_number: user.results[0].phone_number,
            password: user.results[0].password
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
                  // this.$session.get("page"); //เก็บ session page เวลา push ให้อยู่หน้าเดิม
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
   background: linear-gradient(97.95deg, #522b7e 1.16%, #be2b61 100%) !important;
   // box-shadow: 0px 2px 10px #70f6ff;
}
.BG-gray-header {
   background: rgb(39, 39, 39);
   border-radius: 0px 0px 20px 20px;
   padding: 15px;
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
      border-bottom: 1px solid #747474;
   }
   .side-nav {
      background: #181818;
   }
   .side-nav a {
      display: contents;
   }
   .icon-menu {
      color: #ffffff;
      cursor: pointer;
      font-size: 22px;
   }
   .btn-profile {
      background: #fcff68 !important;
      border-radius: 4px;
      padding: 5px 11px 6px 10px;
   }
}
/*----------Switch-----------*/
.switch {
   position: relative;
   display: inline-block;
   width: 60px;
   height: 34px;
}
.switch input {
   opacity: 0;
   width: 0;
   height: 0;
}
.slider {
   position: absolute;
   cursor: pointer;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background-color: #ccc;
   -webkit-transition: 0.4s;
   transition: 0.4s;
}
.slider:before {
   position: absolute;
   content: "";
   height: 26px;
   width: 26px;
   left: 4px;
   bottom: 4px;
   background-color: #212529;
   -webkit-transition: 0.4s;
   transition: 0.4s;
}
input:checked + .slider {
   background-color: #EB4384;
}
input:focus + .slider {
   box-shadow: 0 0 1px #2196f3;
}
input:checked + .slider:before {
   -webkit-transform: translateX(26px);
   -ms-transform: translateX(26px);
   transform: translateX(26px);
}
.slider.round {
   border-radius: 34px;
}
.slider.round:before {
   border-radius: 50%;
}
</style>
