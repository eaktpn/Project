<template>
   <div>
      <div class="header-register">
         <div class="container">
            <router-link to="/Index" class="color_white">
               <div class="row justify-content-center">
                  <div class="col-xl-7 col-md-9 col-11 font14" style="margin-top:-2px;">
                     <div class="color_white font16 mt-3"><mdb-icon icon="angle-double-left" /> ย้อนกลับ</div>
                  </div>
               </div>
            </router-link>
         </div>
      </div>
      <div class="Register d-flex flex-column justify-content-center">
         <div class="container">
            <div class="row justify-content-center">
               <div class="col-xl-7 col-md-9 col-11 text-center font22" style="font-weight:400;">
                  <div><img src="/images/logo/siamslotxo.png" width="100%;" style="max-width:100px;" /></div>
                  สมัครสมาชิก
               </div>
            </div>
            <div class="row justify-content-center color_yellow mt-3">
               <div class="col-xl-7 col-md-9 col-11 ">
                  <i class="fas fa-mobile-alt"></i> กรอกเบอร์โทรศัพท์
                  <input type="text" v-model="phonenumber" class="form-control1 mt-1" placeholder="เบอร์โทรศัพท์" maxlength="10" @keypress="isNumber($event)" />
               </div>
               <div class="col-xl-7 col-md-9 col-11 mt-2">
                  <i class="fas fa-key"></i> กรอกรหัสผ่าน
                  <input type="password" v-model="password" class="form-control1 mt-1" placeholder="รหัสผ่าน" maxlength="16" id="password-field" />
                  <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password" @click="show_hide()"></span>
               </div>
               <div class="col-xl-7 col-md-9 col-11 mt-2">
                  <i class="fas fa-key"></i> ยืนยันรหัสผ่าน
                  <input type="password" v-model="againpassword" class="form-control1 mt-1" placeholder="กรอกรหัสผ่านอีกครั้ง" maxlength="16" id="password-field2" />
                  <span toggle="#password-field2" class="fa fa-fw fa-eye field-icon toggle-password2" @click="show_hide2()"></span>
               </div>

               <div class="col-xl-7 col-md-9 col-11 mt-2">
                  <i class="fas fa-address-book"></i> เลือกธนาคาร
                  <select class="browser-default custom-select" v-model="bankcode">
                     <option selected disabled value="null">เลือกธนาคารของคุณ</option>
                     <option value="KBANK">กสิกร จำกัด (มหาชน)</option>
                     <option value="BBL">กรุงเทพ จำกัด (มหาชน)</option>
                     <option value="KTB">กรุงไทย จำกัด (มหาชน)</option>
                     <option value="BAY">กรุงศรีอยุธยา จำกัด (มหาชน)</option>
                     <option value="KNK">เกียรตินาคิณ จำกัด (มหาชน)</option>
                     <option value="CI">ซิตี้แบงค์</option>
                     <option value="CIMB">ซีไอเอ็มบี จำกัด (มหาชน)</option>
                     <option value="TMB">ทหารไทย จำกัด (มหาชน)</option>
                     <option value="TISGO">ทิสโก้ จำกัด (มหาชน)</option>
                     <option value="SCB">ไทยพาณิชย์ จำกัด (มหาชน)</option>
                     <option value="TBANK">ธนชาต จำกัด (มหาชน)</option>
                     <option value="BAAC">ธนาคาร ธ.ก.ส</option>
                     <option value="UOB">ยูโอบี จำกัด (มหาชน)</option>
                     <option value="LNH">แลนด์ แอนด์ เฮ้าส์</option>
                     <option value="GSB">ออมสิน</option>
                  </select>
               </div>
               <div class="col-xl-7 col-md-9 col-11 mt-2">
                  <i class="fas fa-key"></i> กรอกเลขบัญชี
                  <input type="text" class="form-control1 mt-1" v-model="banknumber" placeholder="เลขบัญชีธนาคาร" maxlength="14" @keypress="isNumber($event)" />
               </div>
            </div>
            <div class="row justify-content-center ">
               <div class="col-xl-5 col-md-6 col-11 mt-3">
                  <mdb-btn @click="register()" block size="sm" class="btn-login-orange color_back font18" style="font-weight:400;">สมัครสมาชิก</mdb-btn>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import axios from "axios";
const jwt = require("jsonwebtoken"); //ใช้ในการเข้ารหัส 2420260295
import moment from "moment"; //ใช้กับเวลา
import {mapActions} from "vuex";
import $ from "jquery";
export default {
   name: "Register",
   data() {
      return {
         phonenumber: "",
         password: "",
         againpassword: "",
         bankcode: null,
         banknumber: "",
         join: null,
         banktype: {
            KBANK: "กสิกรไทย",
            BBL: "กรุงเทพ",
            KTB: "กรุงไทย",
            BAY: "กรุงศรีอยุธยา",
            KNK: "เกียรตินาคิน",
            JPK: "เจพีมอร์แกน เชส",
            CI: "ซิตี้แบงค์",
            CIMB: "ซีไอเอ็มบี",
            ZTM: "ซูมิโตโม มิตซุย",
            DOIB: "ดอยซ์แบงค์",
            TMB: "ทหารไทย",
            TISGO: "ทิสโก้",
            TCREDIT: "ไทยเครดิต",
            SCB: "ไทยพาณิชย์",
            TBANK: "ธนชาต",
            BNP: "ธนาคารบีเอ็นพี",
            BAAC: "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร",
            MSU: "มิซูโฮ",
            MEGA: "เมกะ",
            UOB: "ยูโอบี",
            LNH: "แลนด์ แอนด์ เฮ้าส์",
            SNT: "สแตนดาร์ดชาร์เตอร์ด",
            CN: "ธนาคารแห่งประเทศจีน",
            USA: "แห่งอเมริกาฯ",
            GSB: "ออมสิน",
            OSK: "อาคารสงเคราะห์",
            ASL: "อิสลามแห่งประเทศไทย",
            IZBS: "ไอซีบีซี ",
            HK: "ฮ่องกงและเซี่ยงไฮ้"
         },
         errors: []
      };
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
      show_hide2: function() {
         $(".toggle-password2").toggleClass("fa-eye fa-eye-slash");
         var input = $($(".toggle-password2").attr("toggle"));
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
      check_condition: function() {
         this.errors = [];
         // Check phonenumber
         if (this.phonenumber.length !== 10) {
            this.errors.push("กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก");
            return this.$swal({
               icon: "warning",
               title: "เบอร์โทรศัพท์",
               text: "กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก",
               timer: 5000,
               showConfirmButton: true,
               allowOutsideClick: false,
               allowEscapeKey: false
            });
         } else if (this.phonenumber[0] !== "0") {
            this.errors.push("เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 0 เท่านั้น");
            return this.$swal({
               icon: "warning",
               title: "เบอร์โทรศัพท์",
               text: "เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 0 เท่านั้น",
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
                  icon: "warning",
                  title: "เบอร์โทรศัพท์",
                  text: "เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 06 หรือ 08 หรือ 09 เท่านั้น",
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
               icon: "warning",
               title: "รหัสผ่าน",
               text: "กรุณากรอกรหัสผ่าน 8 - 16 ตัว",
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
                  icon: "warning",
                  title: "รหัสผ่าน",
                  text: "กรุณากรอกรหัสผ่านที่มีพิมพ์เล็กพิมพ์ใหญ่และตัวเลขผสมกัน",
                  timer: 5000,
                  showConfirmButton: true,
                  allowOutsideClick: false,
                  allowEscapeKey: false
               });
            }
         }

         //Check againpassword
         if (this.password != this.againpassword) {
            this.errors.push("รหัสผ่านกับยืนยันรหัสผ่านไม่ตรงกัน");
            return this.$swal({
               icon: "warning",
               title: "ยืนยันรหัสผ่าน",
               text: "รหัสผ่านกับยืนยันรหัสผ่านไม่ตรงกัน",
               timer: 5000,
               showConfirmButton: true,
               allowOutsideClick: false,
               allowEscapeKey: false
            });
         }

         // Check bankcode
         if (this.bankcode == null) {
            this.errors.push("เลือกบัญชีธนาคารของท่าน");
            return this.$swal({
               icon: "warning",
               title: "ธนาคาร",
               text: "เลือกบัญชีธนาคารของท่าน",
               timer: 5000,
               showConfirmButton: true,
               allowOutsideClick: false,
               allowEscapeKey: false
            });
         }

         //  Check banknumber
         if (this.banknumber === "") {
            this.errors.push("กรุณากรอกเลขบัญชีของท่านให้ถูกต้อง");
            return this.$swal({
               icon: "warning",
               title: "เลขที่บัญชี",
               text: "กรุณากรอกเลขบัญชีของท่านให้ถูกต้อง",
               timer: 5000,
               showConfirmButton: true,
               allowOutsideClick: false,
               allowEscapeKey: false
            });
         }
      },
      async register() {
         await this.check_condition();
         // console.log(this.errors.length);
         if (this.errors.length <= 0) {
            let payload = {
               date_regis: moment(new Date()).format("Y-MM-DD hh:mm:ss"),
               phone_number: this.phonenumber,
               password: this.password,
               bank_type: this.banktype[this.bankcode],
               bank_code: this.bankcode,
               bank_number: this.banknumber,
               join: this.join
            };
            let token = jwt.sign(payload, this.$keypayload, {
               expiresIn: "5s"
            });

            $(".preloader").show(); //เรียกตัว Loader ขึ้นมาโชว์
            this.$axios
               .post("/register", {token: token})
               .then(response => {
                  console.log(response.data);
                  $(".preloader").hide(); //ซ่อนตัว Loader
                  if (response.data.msg === "ERROR_NOT_FOUND") {
                     this.$swal({
                        icon: "error",
                        title: "เกิดข้อผิดพลาด",
                        text: "เกิดข้อผิดพลาดของเซิฟเวอร์",
                        timer: 5000,
                        showConfirmButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                     });
                  }
                  // if (response.data.msg === "ERROR_NOT_FOUND_TOKEN_ON_METHOD") {
                  //    this.$swal({
                  //       icon: "error",
                  //       title: "เกิดข้อผิดพลาด",
                  //       text: "มีปัญชีนี้อยู่ในระบบแล้ว",
                  //       timer: 5000,
                  //       showConfirmButton: true,
                  //       allowOutsideClick: false,
                  //       allowEscapeKey: false
                  //    });
                  // } else
                  if (response.data.code === "ER_DUP_ENTRY") {
                     this.$swal({
                        icon: "error",
                        title: "เกิดข้อผิดพลาด",
                        text: "กรุณาเปลี่ยนบัญชีธนาคาร หรือ เบอร์โทรศัพท์",
                        timer: 5000,
                        showConfirmButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                     });
                  } else if (response.data.code === "ERROR") {
                     this.$swal({
                        icon: "error",
                        title: "เกิดข้อผิดพลาด",
                        text: response.data.msg,
                        timer: 5000,
                        showConfirmButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                     }).then(result => {
                        if (result.value) {
                           this.register();
                        }
                     });
                  } else if (response.data.msg === "Register Success") {
                     this.$swal({
                        icon: "success",
                        title: "สมัครสำเร็จ",
                        text: "",
                        timer: 5000,
                        showConfirmButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                     });
                     this.login();
                  }
               })
               .catch(error => {
                  $(".preloader").hide();
                  console.log(error);
               });
         }
      },
      login: function() {
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
                  this.$router.push("/");
               } else {
                  this.$session.set("isLogin", false);
                  this.errors.push("เบอร์โทรศัพท์หรือรหัสผ่านผิด");
               }
            })
            .catch(function(error) {
               console.log(error);
            });
      }
   },
   mounted() {
      this.join = this.$route.query.ref;
      if (this.join != undefined) {
         let payload = {
            join: this.join
         };
         let token = jwt.sign(payload, this.$keypayload, {
            expiresIn: "5s"
         });
         this.$axios
            .post("/AffrefDE", {token: token})
            .then(response => {
               this.join = response.data.payload.token;
               // console.log(this.join);
            })
            .catch(function(error) {
               console.log(error);
            });
      }

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
.Register {
   height: 90vh;
}
.custom-select::before {
   background-color: #181818 !important;
   color: #ff0000 !important;
}
.custom-select {
   background-color: #181818 !important;
   color: #ffffff !important;
}
.header-register {
   background: linear-gradient(180deg, #ac9100 20%, #6d5b04 100%);
   height: 50px;
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
