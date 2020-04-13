<template>
   <div>
      <mdb-modal :show="check_fullname" centered v-if="user" id="modalOTP">
         <mdb-modal-body>
            <div class="row justify-content-center">
               <div class="col-12 col-md-8 text-center">
                  <div class="h4"><mdb-icon far icon="check-square mr-2 text-white mt-3" />ยืนยันชื่อบัญชีของคุณ</div>
                  <div class="h5" v-if="stepSCB === 1">
                     กรุณากรอกชื่อ
                     <span class="text-danger">“ภาษาอังกฤษ”</span> ตามบัตรประชาชน
                  </div>
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
          </div>-->
               <div class="col-2 col-md-2 px-0 align-self-center mt-2">
                  <div class="text-center">
                     <div class>ชื่อจริง</div>
                  </div>
               </div>
               <div class="col-9 col-md-9 text-left px-0 mt-2">
                  <div class="col-12 col-md-12">
                     <div>
                        <small class="text-primary">กรุณากรอกเป็นภาษาอังกฤษ ตัวพิมพ์ใหญ่ A-Z</small>
                     </div>
                     <input type="text" id="example1" class="form-control" v-model="FistnameSCB" onkeyup="this.value = this.value.toUpperCase();" onpaste="return false" onkeypress="return event.charCode >= 65 && event.charCode <= 90 || event.charCode >= 97 && event.charCode <= 122" />
                  </div>
               </div>
               <div class="col-2 col-md-2 px-0 align-self-center mt-3">
                  <div class="text-center">
                     <div class>นามสกุล</div>
                  </div>
               </div>
               <div class="col-9 col-md-9 text-left px-0 mt-3">
                  <div class="col-12 col-md-12">
                     <div>
                        <small class="text-primary">กรุณากรอกเป็นภาษาอังกฤษ ตัวพิมพ์ใหญ่ A-Z</small>
                     </div>
                     <input type="text" id="example1" class="form-control" onkeyup="this.value = this.value.toUpperCase();" onpaste="return false" onkeypress="return event.charCode >= 65 && event.charCode <= 90 || event.charCode >= 97 && event.charCode <= 122" v-model="LastnameSCB" />
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
            </div>-->
               </div>
               <div class="col-9 col-md-9 text-left mt-3">
                  <button class="btn btn-info" style="margin-left:0;" @click="checkNamk()">
                     ยืนยันการกรอกข้อมูล
                  </button>
               </div>
            </div>
            <div class="row justify-content-center" v-if="stepSCB === 2">
               <div class="col-12 col-md-12">
                  <div class="h3 text-center mt-3 color-main-css">
                     <span class="color-main-css">
                        {{ FistnameSCB.toUpperCase() }}
                        {{ LastnameSCB.toUpperCase() }}</span
                     >
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
import {mdbIcon} from "mdbvue";
const jwt = require("jsonwebtoken");
import {mapGetters, mapActions} from "vuex";
import $ from "jquery";
import {mdbModal, mdbModalBody} from "mdbvue";
export default {
   data() {
      return {
         fistN: "Mr.",
         FistnameSCB: "",
         LastnameSCB: "",
         error: [],
         stepSCB: 1
      };
   },
   computed: {
      ...mapGetters({
         user: "user",
         isLogin: "isLogin",
         amount: "amount",
         token: "token",
         version: "version"
      }),
      check_fullname: function() {
         if (this.user.bank_code === "SCB") {
            if (this.user.fullname_bank === null) {
               return true;
               // console.log("true");
            } else {
               return false;
               // console.log("false");
            }
         } else {
            return false;
         }
      }
   },
   components: {
      mdbModal,
      mdbModalBody,
      mdbIcon
   },
   methods: {
      ...mapActions({
         storeLogin: "login",
         storeLogout: "logout"
      }),
      checkNamk() {
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
            mr: this.fistN,
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
                  showConfirmButton: true
               });
               this.$axios
                  .get("/is_login", this.token)
                  .then(response => {
                     if (response.data.msg != "LOGOUT") {
                        this.$session.set("isLogin", true);
                        this.$session.set("token", response.data);
                        this.storeLogin(response.data);
                        this.setEditbank = false;
                        this.check_fullname = false;
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
      }
   },
   mounted() {
      console.log(this.user);
   }
};
</script>

<style></style>
