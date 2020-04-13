<template>
   <div class="container" v-if="isLogin">
      <div class="row justify-content-center">
         <div class="col-xl-9 col-md-9 col-12" style="font-weight:400;">
            <div class="row justify-content-center">
               <div class="col-6 font26">ข้อมูลผู้ใช้</div>
               <div class="col-6 align-self-center text-right color_yellow"><mdb-icon icon="angle-double-left" /><router-link to="/" class="color_yellow"> ย้อนกลับ</router-link></div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center p-3">
         <div class="col-xl-9 col-md-9 col-12 BG-gray-radius">
            <div class="row">
               <div class="col-xl-6 col-md-6 col-12">
                  <div class="row mt-4">
                     <div class="col-5 text-right" style="margin-top:-5px;"><img src="/images/icon/dollar-coin.png" width="110%;" class="ml-2 mt-1" style="max-width:65px;" /></div>
                     <div class="col-7">
                        <div class=" font18">ยอดเงิน</div>
                        <div class="color_blue font24" style="font-weight:400;">{{ currencyFormat(amount) }}</div>
                     </div>
                  </div>
               </div>
               <div class="col-xl-6 col-md-6 col-12">
                  <div class="row mt-3">
                     <div class="col-5 text-right"><img src="/images/icon/insignia.png" width="110%;" class="ml-2 mt-1" style="max-width:65px;" /></div>
                     <div class="col-7 align-self-center">
                        <div class=" font18">แต้มสะสม</div>
                        <div class="color_blue font24" style="font-weight:400;">{{ user.point }}</div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="row justify-content-center mt-4"><div class="col-xl-11 col-md-11 col-11 line-profile"></div></div>
            <div class="row justify-content-center mt-4">
               <div class="col font16 mb-4">
                  <div class="text-center">
                     ยูสเซอร์เนม : <span style="color:#5E72E4;">{{ user.username }}</span>
                  </div>
                  <div class="text-center mt-2">
                     รหัสผ่าน : <span style="color:#5E72E4;">{{ user.password }}</span>
                  </div>
                  <div class="text-center mt-4">
                     บัญชีธนาคาร :
                     <img :src="'/images/bank/' + user.bank_code + '.png'" style="width:25px;" alt /> {{ user.bank_number }}
                     <div class="font14 mt-3" style="color:#FFDE30;">
                        {{ user.fullname_bank }}
                     </div>
                     <div><mdb-btn class="font14 color_back btn-edit-name mt-1" @click="Editbank()">แก้ไขชื่อ</mdb-btn></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <mdb-modal :show="setEditbank" centered v-if="user" id="modalOTP" @close="setEditbank = false">
         <mdb-modal-body>
            <div class="row justify-content-center">
               <div class="col-12 col-md-8 text-center">
                  <div class="h4"><mdb-icon far icon="check-square mr-2 text-white mt-3" />แก้ไขชื่อบัญชีของคุณ</div>
                  <!-- <div class="h5" v-if="stepSCB === 1">
              กรุณากรอกชื่อ
              <span class="text-danger">“ภาษาอังกฤษ”</span> ตามบัตรประชาชน
            </div> -->
               </div>
            </div>
            <div class="row justify-content-center" v-if="stepSCB === 1">
               <!-- <div class="col-3 col-md-3 px-0 align-self-center mt-3">
            <div class=" text-right ">
              <div class="">คำนำหน้า</div>
            </div>
          </div>
          <div class="col-8 col-md-8 text-left px-0 mt-3">
            <div class="col-6 col-md-8 ">
              <select class="browser-default custom-select" v-model="fistN">
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Miss">Miss</option>
              </select>
            </div>
          </div> -->
               <div class="col-2 col-md-2 px-0 align-self-center mt-2">
                  <div class="text-center">
                     <div class="">ชื่อจริง</div>
                  </div>
               </div>
               <div class="col-9 col-md-9 text-left px-0 mt-2">
                  <div class="col-12 col-md-12">
                     <div>
                        <small class="text-primary">กรุณากรอกเป็นภาษาอังกฤษ ตัวพิมพ์ใหญ่ A-Z</small>
                     </div>
                     <input type="text" class="form-control" v-model="FistnameSCB" onpaste="return false" onkeyup="this.value = this.value.toUpperCase();" onkeypress="return event.charCode >= 65 && event.charCode <= 90 || event.charCode >= 97 && event.charCode <= 122" />
                  </div>
               </div>
               <div class="col-2 col-md-2 px-0 align-self-center mt-3">
                  <div class="text-center">
                     <div class="">นามสกุล</div>
                  </div>
               </div>
               <div class="col-9 col-md-9 text-left px-0 mt-3">
                  <div class="col-12 col-md-12">
                     <div>
                        <small class="text-primary">กรุณากรอกเป็นภาษาอังกฤษ ตัวพิมพ์ใหญ่ A-Z</small>
                     </div>
                     <input type="text" class="form-control" onpaste="return false" onkeyup="this.value = this.value.toUpperCase();" onkeypress="return event.charCode >= 65 && event.charCode <= 90 || event.charCode >= 97 && event.charCode <= 122" v-model="LastnameSCB" />
                  </div>
               </div>
               <div class="col-2 col-md-2 px-0 align-self-center mt-3">
                  <!-- <div class=" text-center ">
              <div class="">นามสกุล</div>
            </div> -->
               </div>
               <div class="col-9 mt-3">
                  <small><span class="text-danger">**ในกรณีที่ลูกค้าใส่ ชื่อ-นามสกุล ผิดจะทำให้ยอดฝากไม่เข้าในระบบ</span></small>
               </div>
               <div class="col-2 col-md-2 px-0 align-self-center mt-3">
                  <!-- <div class=" text-center ">
              <div class="">นามสกุล</div>
            </div> -->
               </div>
               <div class="col-12 col-md-12 text-left mt-3">
                  <div class="col-12 col-md-12 px-1">
                     <div class="row justify-content-center">
                        <div class="col-6 col-md-6">
                           <button class="btn btn-info btn-block" style="margin-left: 0;" @click="checkName()">
                              ยืนยันการกรอกข้อมูล
                           </button>
                        </div>
                        <div class="col-6 col-md-6">
                           <button class="btn btn-danger btn-block" style="margin-left: 0;" @click="setEditbank = false">
                              ยกเลิก
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="row justify-content-center" v-if="stepSCB === 2">
               <div class="col-12 col-md-12">
                  <div class="h3 text-center mt-3 color-main-css">
                     {{ FistnameSCB.toUpperCase() }}
                     {{ LastnameSCB.toUpperCase() }}
                  </div>
                  <div class="row justify-content-center mt-3">
                     <div class="col-5 col-md-5 px-1">
                        <button class="btn btn-danger btn-block" @click="stepSCB = 1">
                           กลับไปแก้ไขข้อมูล
                        </button>
                     </div>
                     <div class="col-5 col-md-5 px-1">
                        <button class="btn btn-success btn-block" @click="Submit()">
                           ยืนยันการกรอกข้อมูล
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </mdb-modal-body>
      </mdb-modal>
   </div>
</template>

<script>
const jwt = require("jsonwebtoken");
// import moment from "moment";
import {mapActions, mapGetters} from "vuex";
import $ from "jquery";
export default {
   name: "Profile",
   data() {
      return {
         setEditbank: false,
         FistnameSCB: "",
         LastnameSCB: "",
         stepSCB: 1
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
         storeLoout: "logout"
      }),
      currencyFormat(n) {
         n = parseFloat(n);
         return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      },
      Editbank() {
         if (this.user.fullname_bank != null) {
            this.setEditbank = true;
         } else {
            console.log("Null");
         }
      },
      checkName() {
         if (this.FistnameSCB === "") {
            this.$swal({
               title: "เกิดข้อผิดพลาด",
               text: "กรุณากรอกชื่อ",
               icon: "error",
               timer: 3000,
               showConfirmButton: true
            });
         } else if (this.LastnameSCB === "") {
            this.$swal({
               title: "เกิดข้อผิดพลาด",
               text: "กรุณากรอกนามสกุล",
               icon: "error",
               timer: 3000,
               showConfirmButton: true
            });
         } else if (this.FistnameSCB != "" && this.LastnameSCB != "") {
            this.stepSCB = 2;
         }
      },
      Submit() {
         $(".preloader").show();
         let payload = {
            first_name: this.FistnameSCB.toUpperCase(),
            last_name: this.LastnameSCB.toUpperCase()
         };
         let token = jwt.sign(payload, this.$keypayload, {
            expiresIn: "5s"
         });
         this.$axios.post("/updateBankname", {token: token}, this.token).then(response => {
            $(".preloader").hide();
            if (response.data.code === "SUCCESS") {
               this.$swal({
                  title: "สำเร็จ",
                  html: response.data.msg.toUpperCase(),
                  icon: "success",
                  timer: false,
                  showConfirmButton: true,
                  allowEscapeKey: false,
                  allowOutsideClick: false
               }).then(result => {
                  if (result.value) {
                     this.$axios
                        .get("/is_login", this.token)
                        .then(response => {
                           if (response.data.msg != "LOGOUT") {
                              this.$session.set("isLogin", true);
                              this.$session.set("token", response.data);
                              this.storeLogin(response.data);
                              this.setEditbank = false;
                              this.stepSCB = 1;
                           } else {
                              this.$swal({
                                 title: "เกิดข้อผิดพลาด",
                                 text: "มีการเข้าสู่ระบบจากที่อื่น",
                                 icon: "error",
                                 timer: 3000,
                                 showConfirmButton: false
                              });
                              this.$router.push("/logout");
                           }
                        })
                        .catch(function(error) {
                           console.log(error);
                        });
                  }
               });
            } else {
               this.$swal({
                  title: "เกิดข้อผิดพลาด",
                  text: response.data.msg,
                  icon: "error",
                  timer: false,
                  showConfirmButton: false
               });
            }
         });
         // }
      }
   },
   mounted() {
      if (this.$session.get("isLogin")) {
         if (this.isLogin) {
            $(".preloader").show();
            this.$axios
               .get("/is_login", this.token)
               .then(response => {
                  $(".preloader").hide();
                  if (response.data.msg != "LOGOUT") {
                     this.$session.set("isLogin", true);
                     this.$session.set("token", response.data);
                     this.storeLogin(response.data);
                     let str = this.user.fullname_bank;
                     let first_name_log = str.split(" ")[0];
                     let last_name_log = str.split(" ")[1];
                     this.FistnameSCB = first_name_log;
                     this.LastnameSCB = last_name_log;
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
         }
      } else {
         console.log("Logout Profile");
         this.$router.push("/Logout");
      }
   }
};
</script>

<style>
.line-profile {
   border: 0.5px solid #969595;
}
.btn-edit-name {
   background: #fcff68 !important;
   border-radius: 4px;
   padding: 2px 9px 1px 9px;
}
</style>
