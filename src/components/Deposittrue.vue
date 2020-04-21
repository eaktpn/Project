<template>
   <div class="container" v-if="isLogin">
      <div class="row justify-content-center">
         <div class="col-xl-9 col-md-9 col-12" style="font-weight:400;">
            <div class="row justify-content-center">
               <div class="col-6 font26">ฝากเงิน</div>
               <div class="col-6 align-self-center text-right color_yellow"><mdb-icon icon="angle-double-left" /><router-link to="/Deposit" class="color_yellow"> ย้อนกลับ</router-link></div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center p-3">
         <div class="col-xl-9 col-md-9 col-12 BG-gray">
            <div class="row my-1" style="margin-top:-5px;">
               <div><img src="/images/icon/coin.png" class="mx-3" width="100%;" style="max-width:65px; margin-top:-2px;" /></div>
               <div class="align-self-center">
                  <div class="font16">ยอดเงิน</div>
                  <div class="color_blue font26" style="font-weight:400;">{{ currencyFormat(amount) }}</div>
               </div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center px-3">
         <div class="col-xl-9 col-md-9 col-12 BG-yellow color_red text-center font18 p-4" style="font-weight:400;">
            แจ้งเตือนก่อนฝาก
            <div class="font14 mt-2" style="color:#747474;">ลูกค้าทุกท่านต้องมียอดไม่ต่ำกว่า 10 บาท<br />มิเช่นนั้น ยอดเทิร์นจะถูกคิดรวมกับของเก่า</div>
         </div>
      </div>
      <div class="row justify-content-center p-3">
         <div class="col-xl-9 col-md-9 col-12 BG-pink color_back font18 p-4" style="font-weight:400;">
            <div class="text-center">คำเตือน</div>
            <div class="font14 mt-2" style="color:#606060;">ต้องใช้บัญชีที่สมัครฝากเงินเข้ามาเท่านั้น และต้องโอนเงินผ่านช้องทางแอพพลิเคชั่นของธนาคารบานมือถือเท่านั้น มิเช่นนั้นจะไม่สามารถยืนยันรายการฝากได้<br />ถ้าเกิดข้อผิดพลาดของระบบให้แจ้งกับพนักงานทันที กรณีที่ไม่แจ้งเราขอสงวนสิทธิ์การถอนเงินทุกกรณี</div>
         </div>
      </div>
      <div v-if="banktrue[0]">
         <div class="row justify-content-center">
            <div class="col-xl-9 col-md-9 col-12 text-center color_yellow font18" style="font-weight:400;"><img src="/images/icon/TRUEWALLET.png" class="mx-3" width="100%;" style="max-width:100px; margin-top:-2px;" />ฝากผ่าน Truewallet</div>
         </div>
         <div class="row justify-content-center px-3">
            <div class="col-xl-6 col-md-7 col-12 BG-gray2 text-center">
               <div class="font20">{{ banktrue[0].number }}</div>
               <div>{{ banktrue[0].name }}</div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center mt-3 p-3">
         <div class="col-xl-6 col-md-7 col-12 border-deptrue">
            <div class="row justify-content-center mt-2">
               <div class="col-12 text-center">
                  <div class="font18">ยืนยันยอดฝาก</div>
                  <div class="font14">(กรณีที่ใช้เบอร์อื่นทำรายการเข้ามา)</div>
               </div>
            </div>
            <div class="row justify-content-center py-3 mt-2">
               <div class="col-11">
                  <div><i class="fas fa-mobile-alt"></i> กรอกเบอร์โทรศัพท์</div>
                  <input v-model="phonenumber" type="text" class="form-control1 text-right" maxlength="10" placeholder="เบอร์โทรศัพท์" @keypress="isNumber($event)" />

                  <div class="mt-2"><i class="fab fa-bitcoin"></i> กรอกจำนวนเงิน</div>
                  <input v-model="add_money" type="text" style="width:100%;" class="form-control1 text-right withdraw-input-css" v-mask="{alias: 'currency', prefix: '', groupSeparator: ''}" maxlength="10" @blur="onChange_Money()" />
               </div>
            </div>
            <div class="row justify-content-center">
               <div class="col-10">
                  <div class="row justify-content-center">
                     <div class="col-6">ยอดเงินที่ฝาก</div>
                     <div class="col-6 text-right">{{ currencyFormat(res_money) }}</div>
                  </div>
                  <div class="row justify-content-center">
                     <div class="col-6">โบนัส</div>
                     <div class="col-6 text-right">{{ currencyFormat(res_bonus) }}</div>
                  </div>
                  <div class="row justify-content-center">
                     <div class="col-6">ยอดเทิร์น</div>
                     <div class="col-6 text-right">{{ currencyFormat(res_withdraw_fix) }}</div>
                  </div>
                  <div class="row justify-content-center color_yellow">
                     <div class="col-6" style="font-weight:400;">ยอดฝากรวม</div>
                     <div class="col-6 text-right" style="font-weight:400;">{{ currencyFormat(parseFloat(res_money) + parseFloat(res_bonus)) }}</div>
                  </div>
                  <div class="row color_yellow font18 mt-3" style="font-weight:400;" v-if="res_title !== '' || res_money !== 0">
                     <div class="col text-center color_green font20">คุณได้รับโบนัส "{{ res_title }}"</div>
                  </div>
               </div>
            </div>
            <div class="row justify-content-center ">
               <div class="col-11 mt-3 mb-2">
                  <mdb-btn @click="deposittrue()" block size="sm" class="btn-login-orange color_back font18" style="font-weight:400;">ยืนยันยอดฝาก</mdb-btn>
               </div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center mb-3 px-3">
         <div class="col-xl-9 col-md-9 col-12 text-center">
            <a href="https://line.me/R/ti/p/@596zqntk" target="_blank">
               <mdb-btn size="md" class="animation-Button animation-border  color_white font16"> <img src="/images/icon/lineback.png" width="20" /> รับแจ้งเตือนผ่านไลน์ </mdb-btn>
            </a>
            <div class="font14 mt-2">*กดเพิ่มเพื่อนเพื่อรับบริการแจ้งเตือนยอดฝาก</div>
            <div class="font12 my-2" style="color:#0085FF;">**หลังจากโอนเงินแล้ว ระบบจะใช้เวลาดำเนินการไม่เกิน 1 นาที แต่หากเกินเวลาที่กำหนด ให้ติดต่อพนักงานทันที</div>
         </div>
      </div>
   </div>
</template>

<script>
const jwt = require("jsonwebtoken");
// import moment from "moment";
import {mapActions, mapGetters} from "vuex";
// import {mdbContainer, mdbRow, mdbCol, mdbInput, mdbBtn} from "mdbvue";
import $ from "jquery";
// import firebase from "firebase";
export default {
   name: "Deposittrue",
   data() {
      return {
         btn_confirm: true,
         phonenumber: "",
         add_money: "",
         res_title: "",
         res_money: 0,
         banktrue: "",
         res_bonus: 0,
         res_withdraw_fix: 0,
         errors: []
      };
   },
   computed: {
      ...mapGetters({
         isLogin: "isLogin",
         user: "user",
         amount: "amount",
         server: "server",
         token: "token"
      })
   },
   methods: {
      ...mapActions({
         storeLogin: "login",
         storeLogout: "logout"
      }),
      isNumber: function(evt) {
         evt = evt ? evt : window.event;
         var charCode = evt.which ? evt.which : evt.keyCode;
         if (charCode < 48 || charCode > 57) {
            evt.preventDefault();
         } else {
            return true;
         }
      },
      currencyFormat(n) {
         n = parseFloat(n);
         return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      },
      onChange_Money() {
         let payload = {
            amount: this.add_money
         };
         let token = jwt.sign(payload, this.$keypayload, {
            expiresIn: "5s"
         });
         this.$axios.post("/bonusWithdrawfix", {token: token}, this.token).then(response => {
            if (response.data.msg === "ดึงข้อมูลเสร็จ") {
               this.res_title = response.data.payload.title;
               if (response.data.payload.amount === null || response.data.payload.amount === "" || response.data.payload.amount === "0.00" || response.data.payload.amount === 0) {
                  this.res_money = 0;
                  this.btn_confirm = true;
               } else {
                  this.res_money = response.data.payload.amount;
                  this.btn_confirm = false;
               }
               if (response.data.payload.bonus === null || response.data.payload.bonus === "") {
                  this.res_bonus = 0;
               } else {
                  this.res_bonus = response.data.payload.bonus;
               }
               if (response.data.payload.withdraw_fix === null || response.data.payload.withdraw_fix === "") {
                  this.res_withdraw_fix = 0;
               } else {
                  this.res_withdraw_fix = response.data.payload.withdraw_fix;
               }
            }
         });
      },
      check_condition: function() {
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

         if (parseFloat(this.res_money) < 1) {
            this.errors.push("จำนวนเงินต้องมากกว่า 1 บาท");
            return this.$swal({
               title: "จำนวนเงิน",
               text: "จำนวนเงินต้องมากกว่า 1 บาท",
               icon: "warning",
               timer: 5000,
               showConfirmButton: true,
               allowOutsideClick: false,
               allowEscapeKey: false
            });
         }
      },
      async deposittrue() {
         await this.check_condition();
         if (this.errors.length <= 0) {
            let payload = {
               bank_id: this.banktrue[0].id,
               phone_number: this.phonenumber,
               amount: this.add_money
            };
            let token = jwt.sign(payload, this.$keypayload, {
               expiresIn: "5s"
            });
            $(".preloader").show();
            this.$axios.post("/depositTruewallet", {token: token}, this.token).then(response => {
               $(".preloader").hide();
               if (response.data.code === "ERROR") {
                  this.$swal({
                     title: "เกิดข้อผิดพลาด",
                     text: response.data.msg + "ฝาก",
                     icon: "error",
                     timer: 5000,
                     showConfirmButton: true,
                     allowOutsideClick: false,
                     allowEscapeKey: false
                  });
                  this.add_money = 0;
                  this.res_money = "0.00";
                  this.res_bonus = "0.00";
                  this.res_withdraw_fix = "0.00";
                  this.btn_confirm = true;
               } else {
                  let payload = {
                     username: this.user.username,
                     current: this.add_money
                  };
                  let token = jwt.sign(payload, this.$keypayload, {
                     expiresIn: "5s"
                  });
                  this.$axios.post("/affiliateDeposit", {token: token}, this.token).then(response => {
                     this.$swal({
                        title: "สำเร็จ",
                        html: response.data.msg,
                        icon: "success",
                        timer: 5000,
                        showConfirmButton: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                     });
                     this.$router.push("/");
                  });
               }
            });
         }
      }
   },
   //    components: {
   //       mdbContainer,
   //       mdbRow,
   //       mdbCol,
   //       mdbInput,
   //       mdbBtn
   //    },
   mounted() {
      this.$session.set("page", "/Deposittrue");
      if (this.isLogin) {
         $(".preloader").show();
         this.$axios
            .get("/is_login", this.token)
            .then(response => {
               $(".preloader").hide();
               if (response.data.msg === "LOGOUT") {
                  // จะคืนค่า LOGOUT มา ก็ต่อเมื่อมีการ Login จากที่อื่น
                  this.$swal({
                     title: "เกิดข้อผิดพลาด",
                     text: "มีการเข้าสู่ระบบจากที่อื่น",
                     tpye: "error",
                     timer: 3000,
                     showConfirmButton: true,
                     allowOutsideClick: false,
                     allowEscapeKey: false
                  });
                  this.$router.push("/Logout");
               } else {
                  this.$axios
                     .get("/showBank?bank=TRUEWALLET", this.token)
                     .then(response => {
                        this.banktrue = response.data.payload;
                        // console.log(this.banktrue);
                        this.$swal({
                           title: "<div class='color_back'>ลูกค้าที่เติมผ่าน ทรูวอเรท<br><img src='/images/icon/TRUEWALLET.png' width='100%;' style='max-width:120px;'></div>",
                           html: "<div class='color_back font20'><b>กรุณาเติมเข้าเบอร์</b><br>" + this.banktrue[0].name + "<br>" + this.banktrue[0].number + "</div>",
                           tpye: "error",
                           showConfirmButton: true,
                           allowOutsideClick: false,
                           allowEscapeKey: false
                        });
                     })
                     .catch(error => {
                        console.log(error);
                     });
               }
            })
            .catch(error => {
               console.log(error);
            });
      } else {
         this.$router.push("/");
      }
   }
};
</script>

<style>
.BG-yellow {
   background: #fff3a4;
   border-radius: 1px;
}
.BG-pink {
   background: #ffd9c5;
   border-radius: 1px;
}
.border-deptrue {
   border: 3px solid #e0e0e0;
   border-radius: 10px;
   padding: 10px;
}
</style>
