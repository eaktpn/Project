<template>
   <div class="BG-Gradient d-flex flex-column justify-content-center">
      <div class="container">
         <div class="row justify-content-center">
            <div class="col-xl-8 col-md-8 col-11 text-center "><img src="/images/logo/joker24h.png" width="100%;" style="max-width:160px;" /></div>
         </div>
         <form @submit.prevent="checklogin()">
            <div class="row justify-content-center mt-3">
               <div class="col-xl-7 col-md-9 col-11 ">
                  <i class="fas fa-mobile-alt"></i> กรอกเบอร์โทรศัพท์
                  <input type="text" class="form-control1 mt-1" placeholder="เบอร์โทรศัพท์" v-model="phonenumber" maxlength="10" @keypress="isNumber($event)" />
               </div>
               <div class="col-xl-7 col-md-9 col-11 mt-2">
                  <i class="fas fa-key"></i> กรอกรหัสผ่าน
                  <input type="password" v-model="password" class="form-control1 mt-1" placeholder="รหัสผ่าน" maxlength="16" id="password-field" />
                  <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password" @click="show_hide()"></span>
               </div>
            </div>
            <div class="row justify-content-center ">
               <div class="col-xl-5 col-md-6 col-11 mt-3">
                  <mdb-btn @click="checklogin()" block size="sm" class="btn-login-orange color_back font18" style="font-weight:400;">เข้าสู่ระบบ</mdb-btn>
               </div>
            </div>
         </form>
         <div class="row justify-content-center color_yellow font16 mt-3">
            <div class style="cursor: pointer;" @click="showModal = true">ลงทะเบียนใช้งาน</div>
         </div>
         <div style="margin-bottom:50px;"></div>

         <mdb-modal class="color_back" :show="showModal" @close="showModal = false" centered>
            <mdb-modal-header>
               <mdb-modal-title class="color_blue" style="font-weight:400;">เงื่อนไขการสมัคร</mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body class="color_white font14">
               <div class="row justify-content-center ">
                  <div class="col-xl-11 col-md-11 col-11">
                     <p>1. หมายเลขโทรศัพท์ที่ใช้ ต้องสามารถรับข้อความได้ เพราะระบบจำเป็นต้องส่งรหัสยืนยัน ไปยังหมายเลข โทรศัพท์ของท่าน มิเช่นนั้นจะไม่สามารถถอนเงินได้</p>
                     <p>2. ชื่อ - นามสกุล จะจ้องจรงกับข้อมูลบัญชี มิเช่นนั้นจะไม่สามารถภอนเงินได้</p>
                     <p>3. ต้องใช้บัญชีที่สมัครฝากเงินเข้ามาเท่านั้น</p>
                     <p>4. ถ้าเกิดข้อผิดพลาดของระบบ ให้ทำการแจ้งพนักงานทันที กรณีไม่แจ้ง ทางเราขอสงวนสิทธิ์การถอนเงิน ทุกกรณี</p>
                     <p>5. สมาชิก 1 คน ต่อ 1 ไอดีเท่านั้น กรณีตรวจพบว่ามีการสมัครหลายไอดี ทางเราจะสงวนสิทธิ์ในการถอน ทุกกรณี</p>
                  </div>
               </div>
               <mdb-input class="color_white" type="checkbox" id="check_condition" name="check2" v-model="check_condition" label="ยอมรับเงื่อนไข" />
            </mdb-modal-body>
            <div class="row justify-content-center mb-2">
               <div class="col-xl-11 col-md-11 col-11">
                  <mdb-btn block :disabled="check_condition === false" size="sm" :class="check_condition === false ? 'btn-login-gray font16' : 'btn-login-orange color_back font16'" style="font-weight:400;" @click="GoRegister()">ตกลง</mdb-btn>
               </div>
            </div>
         </mdb-modal>
      </div>
   </div>
</template>

<script>
import axios from "axios";
const jwt = require("jsonwebtoken");
import {mapActions, mapGetters} from "vuex";
import $ from "jquery";
export default {
   name: "Login",
   data() {
      return {
         phonenumber: "",
         password: "",
         check_condition: false,
         showModal: false,
         errors: []
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
         storeLogin: "login"
      }),
      show_hide: function() {
         $(".toggle-password").toggleClass("fa-eye fa-eye-slash");
         var input = $($(".toggle-password").attr("toggle"));
         if (input.attr("type") == "password") {
            input.attr("type", "text");
         } else {
            input.attr("type", "password");
         }
      },
      isNumber: function(evt) {
         evt = evt ? evt : window.event;
         var charCode = evt.which ? evt.which : evt.keyCode;
         if (charCode < 48 || charCode > 57) {
            evt.preventDefault();
         } else {
            return true;
         }
      },
      showModalcheck() {
         if (this.user.is_bonus === 1) {
            this.settingSwitch = true;
         } else {
            this.settingSwitch = false;
         }
         this.showsetting = true;
      },
      GoRegister() {
         this.$router.push("/Register");
      },
      checklogin: function() {
         this.errors = [];
         // Check phonenumber
         if (this.phonenumber.length !== 10) {
            this.errors.push("กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก");
            return this.$swal({
               title: "เบอร์โทรศัพท์",
               text: "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก",
               icon: "warning", //error warning success
               timer: 5000,
               showConfirmButton: true,
               allowOutsideClick: false,
               allowEscapeKey: false
            });
         } else if (this.phonenumber[0] !== "0") {
            this.errors.push("เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 0 เท่านั้น");
            return this.$swal({
               title: "เบอร์โทรศัพท์",
               text: "เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 0 เท่านั้น",
               icon: "warning",
               timer: 5000,
               showConfirmButton: true,
               allowOutsideClick: false,
               allowEscapeKey: false
            });
         } else if (this.phonenumber[0] === "0") {
            if (this.phonenumber[1] === "8" || this.phonenumber[1] === "9" || this.phonenumber[1] === "6") {
               //  this.$router.push("/");
            } else {
               this.errors.push("เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 06 หรือ 08 หรือ 09 เท่านั้น");
               return this.$swal({
                  title: "เบอร์โทรศัพท์",
                  text: "เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 06 หรือ 08 หรือ 09 เท่านั้น",
                  icon: "warning",
                  timer: 5000,
                  showConfirmButton: true,
                  allowOutsideClick: false,
                  allowEscapeKey: false
               });
            }
         }
         //Check password
         if (this.password.length < 8) {
            this.errors.push("กรุณากรอกรหัสผ่าน 8 - 16 ตัว");
            return this.$swal({
               title: "รหัสผ่าน",
               text: "กรุณากรอกรหัสผ่าน 8 - 16 ตัว",
               icon: "warning",
               timer: 5000,
               showConfirmButton: true,
               allowOutsideClick: false,
               allowEscapeKey: false
            });
         } else {
            let msg = [false, false, false];
            for (let index = 0; index < this.password.length; index++) {
               if (this.password.charCodeAt(index) >= 48 && this.password.charCodeAt(index) <= 57) {
                  msg[0] = true;
               } else if (this.password.charCodeAt(index) >= 65 && this.password.charCodeAt(index) <= 90) {
                  msg[1] = true;
               } else if (this.password.charCodeAt(index) >= 97 && this.password.charCodeAt(index) <= 122) {
                  msg[2] = true;
               }
            }
            if (msg[0] && msg[1] && msg[2]) {
               console.log("1");
            } else {
               this.errors.push("กรุณากรอกรหัสผ่านที่มีพิมพ์เล็กพิมพ์ใหญ่และตัวเลขผสมกัน");
               return this.$swal({
                  title: "รหัสผ่าน",
                  text: "กรุณากรอกรหัสผ่านที่มีพิมพ์เล็กพิมพ์ใหญ่และตัวเลขผสมกัน",
                  icon: "warning",
                  timer: 5000,
                  showConfirmButton: true,
                  allowOutsideClick: false,
                  allowEscapeKey: false
               });
            }
         }
         this.login();
      },
      login: function() {
         $(".preloader").show();
         if (this.errors.length === 0) {
            let payload = {
               phone_number: this.phonenumber,
               password: this.password,
               ip: this.ipuser //ส่ง ip user
            };
            let token = jwt.sign(payload, this.$keypayload, {
               expiresIn: "5s"
            });
            this.$axios
               .post("/login", {token: token})
               .then(response => {
                  if (response.data.msg != "USER_NOT_FOUND") {
                     this.$session.set("isLogin", true);
                     this.$session.set("token", response.data);
                     this.storeLogin(response.data);
                     $(".preloader").hide();
                     this.$router.push("/");
                  } else {
                     $(".preloader").hide();
                     this.$swal({
                        title: "เกิดข้อผิดพลาด",
                        text: "เบอร์โทรศัพท์หรือรหัสผ่านผิด",
                        icon: "error",
                        timer: 5000,
                        showConfirmButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                     });
                  }
               })
               .catch(function(error) {
                  $(".preloader").hide();
                  console.log(error);
               });
         }
      }
   },
   mounted() {
      $(".preloader").show();
      let apiGetIp = "https://api.ipify.org";
      axios
         .get(apiGetIp)
         .then(response => {
            $(".preloader").hide();
            this.ipuser = "" + response.data;
         })
         .catch(error => {
            $(".preloader").hide();
            console.log(error);
         });
   }
};
</script>

<style>
.BG-Gradient {
   background: radial-gradient(50% 50% at 50% 50%, #363636 0%, #181818 78.65%);
   height: 100vh;
}
.logo {
   min-width: 160px;
}

/*------- Show-Hide Pass -------*/
.field-icon {
   float: right;
   margin-left: -15px;
   margin-right: 10px;
   margin-top: -27px;
   position: relative;
   z-index: 2;
}
</style>
