<template>
   <div>
      <b-modal id="modalOTP" title="ระบบยืนยันตัวตน" v-model="checkOTP" no-close-on-esc no-close-on-backdrop hide-header-close hide-footer centered v-if="confirmuser === null">
         <div class="row justify-content-center mt-2">
            <div class="col-6 text-center mt-2" @click="confirmuser = 'phone_confirm'">
               <!-- <i class="fas fa-mobile-alt fa-8x blue-text" style="cursor:pointer;"></i> -->
               <img src="/images/icon/mobile.png" class="mx-3" width="100%;" style="max-width:130px; cursor:pointer;" />
               <div class="color_white font14 p-2" style="cursor:pointer;">ยืนยันตัวตนผ่านโทรศัพท์</div>
            </div>
            <div class="col-6 text-center mt-2">
               <a href="https://line.me/R/ti/p/@248zcbiq" target="_blank">
                  <!-- <i class="fab fa-line fa-9x text-success" style="cursor:pointer;"></i> -->
                  <img src="/images/icon/line2.png" class="mx-3" width="100%;" style="max-width:130px; cursor:pointer;" />
                  <div class="color_white font14 p-2" style="cursor:pointer;">ยืนยันตัวตนผ่าน Line</div>
               </a>
            </div>
         </div>
         <div class="row justify-content-center">
            <div class="col-12 text-center mt-2">
               <mdb-btn class="btn-confirm font16" @click="checkLinesub()" block>ตรวจสอบการยืนยัน</mdb-btn>
            </div>
            <div class="col-12 text-center color_white font14 mt-3">
               หากเกิดปัญหา ให้ติดต่อแอดมินทาง
               <span class="color_green">
                  <a href="https://lin.ee/4loZnaa" target="_blank"><b>LINE คลิ๊ก</b></a></span
               >
            </div>
         </div>
      </b-modal>
      <div v-if="confirmuser === 'phone_confirm'">
         <b-modal id="modalOTP" title="ระบบยืนยันตัวตน" v-model="checkOTP" no-close-on-esc no-close-on-backdrop hide-header-close hide-footer centered>
            <template v-slot:modal-header="{close}">
               <!-- Emulate built in modal header close button action -->
               <div class="color_white font20">ยืนยันตัวตนผ่านเบอร์โทรศัพท์</div>
               <i class="text-white fas fa-arrow-alt-circle-left fa-2x" style="cursor:pointer;" @click="confirmuser = null"></i>
            </template>

            <div>
               <p class="text-white" style="margin-top:5px;">หมายเลขโทรศัพท์</p>
               <b-form-input type="text" v-model="confirm_phonenumber" maxlength="10" onkeypress="return event.charCode >= 48 && event.charCode <= 57" style="margin-top:-10px;"></b-form-input>
            </div>
            <div v-if="counting === true">
               <p class="text-white" style="margin-top:15px;">หมายเลข OTP</p>
               <b-form-input type="text" v-model="confirm_OTP" maxlength="6" onkeypress="return event.charCode >= 48 && event.charCode <= 57" style="margin-top:-10px;"></b-form-input>
            </div>
            <p class="text-white font14" style="margin-top:20px;">
               กรณีไม่ได้รับรหัส
               <b>OTP</b> ให้ติดต่อแอดมินทาง
               <a href="https://lin.ee/4loZnaa" target="_bank" v-b-tooltip title="Tooltip in a modal!" class="color_green">
                  <b>LINE CLICK</b>
               </a>
            </p>
            <div class="text-right" style="margin-top:20px; margin-bottom:3px;">
               <b-button size="xl" variant="warning" @click="OTP()" class="text-white" :disabled="counting">
                  <countdown v-if="counting" :time="90000" :leading-zero="false" @countdownend="countdownend()">
                     <template slot-scope="props">{{ props.totalSeconds }} วินาที</template> </countdown
                  >ขอรหัส OTP
               </b-button>
               <b-button type="button" :disabled="btnsubmit" :class="btnsubmit === false ? 'btn btn-confirm-phone' : 'disabled btn-confirm-phone'" @click="phonenumber()">ยืนยันเบอร์โทรศัพท์</b-button>
            </div>
         </b-modal>
      </div>
   </div>
</template>

<script>
const jwt = require("jsonwebtoken");
import {mapActions, mapGetters} from "vuex";
import $ from "jquery";
export default {
   data() {
      return {
         confirmuser: null,
         btnsubmit: true,
         confirm_phonenumber: null,
         confirm_OTP: "",
         counting: null,
      };
   },
   methods: {
      ...mapActions({
         storeLogin: "login",
         storeLoout: "logout",
      }),
      OTP() {
         // Check phonenumber
         if (this.confirm_phonenumber === "") {
            this.$swal({
               icon: "error",
               title: "เกิดข้อผิดพลาด",
               text: "กรุณากรอกเบอโทรศัพท์",
               timer: 5000,
               showConfirmButton: true,
               allowOutsideClick: false,
               allowEscapeKey: false,
            });
         } else if (this.confirm_phonenumber.length !== 10) {
            this.$swal({
               title: "เบอร์โทรศัพท์",
               text: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง",
               icon: "warning", //error warning success
               timer: 5000,
               showConfirmButton: true,
               allowOutsideClick: false,
               allowEscapeKey: false,
            });
         } else if (this.confirm_phonenumber[0] !== "0") {
            this.$swal({
               title: "เบอร์โทรศัพท์",
               text: "เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 0 เท่านั้น",
               icon: "warning",
               timer: 5000,
               showConfirmButton: true,
               allowOutsideClick: false,
               allowEscapeKey: false,
            });
         } else if (this.confirm_phonenumber.length === 10) {
            let payload = {
               phone_number: this.confirm_phonenumber,
            };
            let token = jwt.sign(payload, this.$keypayload, {
               expiresIn: "5s",
            });
            $(".preloader").show();
            this.$axios.post("/otp", {token: token}, this.token).then((response) => {
               $(".preloader").hide();
               if (response.data.code === "ERROR") {
                  this.$swal({
                     icon: "warning",
                     title: "เกิดข้อผิดพลาด",
                     text: response.data.msg,
                     timer: 5000,
                     showConfirmButton: true,
                     allowOutsideClick: false,
                     allowEscapeKey: false,
                  });
               } else {
                  this.$swal({
                     icon: "success",
                     title: "สำเร็จ",
                     html: "ระบบได้ส่งรหัส OTP ไปยัง <br> หมายเลข " + this.confirm_phonenumber + " เรียบร้อยแล้ว<br>กรุณากรอกรหัส OTP ที่ได้รับ",
                     timer: 5000,
                     showConfirmButton: true,
                     allowOutsideClick: false,
                     allowEscapeKey: false,
                  });
                  this.counting = true;
                  this.btnsubmit = false;
               }
            });
         }
      },
      countdownend: function() {
         this.counting = false;
         this.btnsubmit = true;
      },
      phonenumber() {
         let payload = {
            phone_number: this.confirm_phonenumber,
            otp: this.confirm_OTP,
         };
         if (this.confirm_phonenumber === "" || this.confirm_OTP === "") {
            this.$swal({
               icon: "error",
               title: "เกิดข้อผิดพลาด",
               text: "หมายเลข OTP ผิดพลาด",
               timer: 5000,
               showConfirmButton: true,
               allowOutsideClick: false,
               allowEscapeKey: false,
            });
         } else {
            let token = jwt.sign(payload, this.$keypayload, {
               expiresIn: "5s",
            });
            $(".preloader").show();
            this.$axios.post("/otp_verify", {token: token}, this.token).then((response) => {
               $(".preloader").hide();
               if (response.data.code === "SUCCESS") {
                  this.$swal({
                     icon: "success",
                     title: "ยืนยันสำเร็จ",
                     timer: 5000,
                     showConfirmButton: true,
                     allowOutsideClick: false,
                     allowEscapeKey: false,
                  }).then((result) => {
                     if (result.value) {
                        this.$axios.get("/is_login", this.token).then((response) => {
                           // console.log(response.data);
                           if (response.data.msg != "LOGOUT") {
                              this.$session.set("isLogin", true);
                              this.$session.set("token", response.data);
                              this.storeLogin(response.data);
                           }
                        });
                        $("#modalOTP").hide();
                        $("#modalOTP___BV_modal_backdrop_").hide();
                     }
                  });
                  //   this.$router.push("/");
               }
               if (response.data.code === "ERROR") {
                  $(".preloader").hide();
                  this.$swal({
                     icon: "error",
                     title: "เกิดข้อผิดพลาด",
                     text: "รหัส OTP ไม่ถูกต้อง",
                     timer: 5000,
                     showConfirmButton: true,
                     allowOutsideClick: false,
                     allowEscapeKey: false,
                  });
               }
            });
         }
      },
      checkLinesub() {
         $(".preloader").show();
         this.$axios
            .get("/is_login", this.token)
            .then((response) => {
               $(".preloader").hide();
               if (response.data.msg != "LOGOUT") {
                  this.$session.set("isLogin", true);
                  this.$session.set("token", response.data);
                  this.storeLogin(response.data);
                  if (this.user.active === 0) {
                     this.$swal({
                        title: "เกิดข้อผิดพลาด",
                        text: "คุณยังไม่ได้ยืนยันตัวตน",
                        icon: "info",
                        timer: 3000,
                        showConfirmButton: true,
                     });
                  } else {
                     this.$swal({
                        title: "สำเร็จ",
                        text: "คุณยืนยันตัวตนสำเร็จ",
                        icon: "success",
                        timer: 3000,
                        showConfirmButton: true,
                     });
                  }
               } else {
                  this.$swal({
                     title: "เกิดข้อผิดพลาด",
                     text: "มีการเข้าสู่ระบบจากที่อื่น",
                     icon: "error",
                     timer: 3000,
                     showConfirmButton: false,
                  });
                  this.$router.push("/Logout");
               }
            })
            .catch(function(error) {
               $(".preloader").hide();
               console.log(error);
            });
      },
   },
   computed: {
      ...mapGetters({
         isLogin: "isLogin",
         user: "user",
         amount: "amount",
         token: "token",
      }),
      checkOTP: function() {
         if (this.user.active === 0) {
            return true;
         } else {
            return false;
         }
      },
   },
   mounted() {
      // console.log('token : ' + this.token)

      if (this.$session.get("isLogin")) {
         this.$session.set("page", "/");
         if (this.token) {
            this.$axios
               .get("/is_login", this.token)
               .then((response) => {
                  if (response.data.msg != "LOGOUT") {
                     this.$session.set("isLogin", true);
                     this.$session.set("token", response.data);
                     this.storeLogin(response.data);
                     this.confirm_phonenumber = this.user.phone_number; // คืนค่าเบอร์โทรศัพท์ไปช่อง input
                  } else {
                     this.$swal({
                        title: "เกิดข้อผิดพลาด",
                        text: "มีการเข้าสู่ระบบจากที่อื่น",
                        icon: "error",
                        timer: 5000,
                        showConfirmButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                     });
                     this.$router.push("/Logout");
                  }
               })
               .catch(function(error) {
                  console.log(error);
               });
         }
         this.checkLogin = 1;
      } else {
         this.checkLogin = 0;
         this.$router.push("/Logout");
      }
   },
};
</script>

<style>
.btn-confirm {
   background: #ffffff10 !important;
   border-radius: 4px;
   padding: 5px 15px 6px 15px;
   border: 1px solid #ffde30;
   color: #ffde30;
}
.btn-confirm:hover {
   background: #ffffff10 !important;
   border-radius: 4px;
   padding: 5px 15px 6px 15px;
   border: 1px solid #ffde30;
   color: #ffde30;
}
.btn-confirm-phone {
    color: #fff !important;
    background-color: #EB4384 !important;
    border-color: #EB4384 !important;
}
</style>
