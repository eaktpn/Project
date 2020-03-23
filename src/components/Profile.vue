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
                     <img :src="'/images/bank/' + user.bank_code + '.png'" style="width:20px;" alt />
                     <div class="font14 mt-2" style="color:#FFDE30;">{{ user.bank_number }}<br> {{ user.full_name }}</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
// const jwt = require("jsonwebtoken");
// import moment from "moment";
import {mapActions, mapGetters} from "vuex";
// import $ from "jquery";
export default {
   name: "Profile",
   data() {
      return {};
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
      }
      // copy_numberbank() {
      //    this.$copyText(this.user.bank_number);
      //    this.$swal("คัดลอกสำเร็จ", this.user.bank_type + " " + this.user.bank_number, "success");
      // },
      // copy_username() {
      //    this.$copyText(this.user.username);
      //    this.$swal("คัดลอกสำเร็จ", "ยูสเซอร์เนม" + " " + this.user.username, "success");
      // }
   },
   mounted() {
      if (this.$session.get("isLogin")) {
         this.$axios
            .get("/is_login", this.token)
            .then(response => {
               // console.log(response.data);
               if (response.data.msg != "LOGOUT") {
                  this.$session.set("isLogin", true);
                  this.$session.set("token", response.data);
                  this.storeLogin(response.data);
                  this.$session.set("page", "/Profile"); //เก็บ session page เวลา refresh ให้อยู่หน้าเดิม
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
      } else {
         this.$router.push("/Logout");
      }
   }
};
</script>

<style>
.line-profile {
   border: 0.5px solid #969595;
}
</style>
