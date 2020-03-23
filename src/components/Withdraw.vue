<template>
   <div class="container">
      <div class="row justify-content-center">
         <div class="col-xl-9 col-md-9 col-12" style="font-weight:400;">
            <div class="row justify-content-center">
               <div class="col-6 font26">ถอนเงิน</div>
               <div class="col-6 align-self-center text-right color_yellow">
                  <mdb-icon icon="angle-double-left" />
                  <router-link to="/" class="color_yellow">ย้อนกลับ</router-link>
               </div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center p-3">
         <div class="col-xl-9 col-md-9 col-12 BG-gray">
            <div class="row my-1" style="margin-top:-5px;">
               <div>
                  <img src="/images/icon/dollar-coin.png" class="mx-3" width="100%;" style="max-width:65px; margin-top:-2px;" />
               </div>
               <div class="align-self-center">
                  <div class="font16">ยอดเงิน</div>
                  <div class="color_blue font26" style="font-weight:400;">{{ currencyFormat(amount) }}</div>
               </div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center px-3">
         <div class="col-xl-9 col-md-9 col-12 BG-yellow color_red font18 p-4" style="font-weight:400;">
            <div class="text-center">กติกาการถอนเงิน</div>
            <div class="font16 mt-2" style="color:#747474;">
               1. กรณี ไม่รับโบนัส จะต้องมีรายการเล่นอย่างน้อย 1 ครั้ง <br />2. กรณีมีการทุจริต การตัดสินใจของแอดมินถือเป็นที่สุด
            </div>
         </div>
      </div>
      <div class="row justify-content-center p-3">
         <div class="col-xl-9 col-md-9 col-12 border-with text-center font18 p-3"><img src="/images/icon/warning.png" class="mx-3" width="100%;" style="max-width:45px;" />ถอนขั้นต่ำ 100 บาท</div>
      </div>
      <div class="row justify-content-center">
         <div class="col-xl-5 col-md-6 col-11">
            <div class="text-white">จำนวนเงินที่จะถอน</div>
         </div>
      </div>
      <div class="row justify-content-center" style="margin-top:-16px;">
         <div class="col-xl-5 col-md-6 col-11 text-rigth">
            <input :disabled="amount < 100" type="text" style="width:100%;" id="withdraw_amount" class="form-control text-right withdraw-input-css mt-3" v-mask="{alias: 'currency', prefix: '', groupSeparator: ''}" maxlength="9" @change="check_amount()" />
         </div>
      </div>
      <div class="row justify-content-center">
         <div class="col-xl-5 col-md-6 col-11 mt-2">
            <mdb-btn block size="sm" :disabled="btn_confirm" :class="btn_confirm ? 'btn-login-gray font16' : 'btn-login-orange font16'" @click="withdraw()" style="font-weight:400;">ยืนยันการถอน</mdb-btn>
         </div>
      </div>
      <div class="col-12">
         <router-link to="/">
            <div class="text-center text-white font16" style="margin-top:15px;">ยกเลิการถอน</div>
         </router-link>
      </div>
      <div class="mt-4"></div>
   </div>
</template>

<script>
const jwt = require("jsonwebtoken");
// import moment from "moment";
// import {mdbContainer, mdbRow, mdbCol, mdbInput, mdbBtn} from "mdbvue";
import {mapActions, mapGetters} from "vuex";
import $ from "jquery";
export default {
   name: "Withdraw",
   data() {
      return {
         btn_confirm: true,
         withdraw_amount: false,
         withdraw_fix: 0,
         withdraw_hide: null,
         withdraw_fix_show: null,
         withdraw_amount_show: null,
         withdraw_with_show: null
      };
   },
   // components: {
   //    mdbContainer,
   //    mdbRow,
   //    mdbCol,
   //    mdbInput,
   //    mdbBtn
   // },
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
         storeLoout: "logout",
         updateAmount: "updateAmount"
      }),
      currencyFormat(n) {
         n = parseFloat(n);
         return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      },
      check_amount() {
         this.withdraw_amount = $("#withdraw_amount").val();
         if (parseFloat(this.withdraw_amount) < 100) {
            this.btn_confirm = true;
         } else if (parseFloat(this.amount) < parseFloat(this.withdraw_amount)) {
            this.btn_confirm = true;
         } else {
            this.btn_confirm = false;
         }
      },

      withdraw() {
         $(".preloader").show();
         let payload = {
            amount: this.withdraw_amount
         };
         let token = jwt.sign(payload, this.$keypayload, {
            expiresIn: "5s"
         });
         this.$axios.post("/withdraw", {token: token}, this.token).then(response => {
            this.updateAmount(response.data.amount);
            $(".preloader").hide();
            if (response.data.code === "SUCCESS") {
               let payload = {
                  username: this.user.username,
                  current: this.withdraw_amount
               };
               let token = jwt.sign(payload, this.$keypayload, {
                  expiresIn: "5s"
               });
               this.$axios.post("/affiliateWithdraw", {token: token}, this.token).then(response => {
                  console.log(response.data);
               });
               this.$swal({
                  icon: "success",
                  title: "สำเร็จ",
                  text: response.data.msg,
                  timer: 5000,
                  showConfirmButton: true,
                  allowOutsideClick: false,
                  allowEscapeKey: false
               }).then(result => {
                  if (result.value) {
                     this.$router.push("/").catch(err => {
                        console.log(err);
                     });
                  }
               });
               this.$router.push("/").catch(err => {
                  console.log(err);
               });
            } else {
               this.$swal({
                  icon: "error",
                  title: "เกิดข้อผิดผลาด",
                  text: response.data.msg,
                  timer: 5000,
                  showConfirmButton: true,
                  allowOutsideClick: false,
                  allowEscapeKey: false
               });
               this.$router.push("/").catch(err => {
                  console.log(err);
               });
            }
         });
      }
   },

   mounted() {
      this.$session.set("page", "/Withdraw");
      if (this.isLogin) {
         $(".preloader").show();
         this.$axios
            .get("/is_login", this.token)
            .then(response => {
               $(".preloader").hide();
               if (response.data.msg === "LOGOUT") {
                  // จะคืนค่า LOGOUT มา ก็ต่อเมื่อมีการ Login จากที่อื่น
                  this.$swal({
                     icon: "error",
                     title: "เกิดข้อผิดพลาด",
                     text: "มีการเข้าสู่ระบบจากที่อื่น",
                     timer: 5000,
                     showConfirmButton: true,
                     allowOutsideClick: false,
                     allowEscapeKey: false
                  });
                  this.$router.push("/Logout");
               } else {
                  this.$axios.get("/wdfix", this.token).then(response => {
                     this.withdraw_fix = response.data.payload;
                     if (this.withdraw_fix > this.amount) {
                        this.withdraw_fix_show = true;
                        // this.$swal({
                        //   title: "ไม่สามารถทำการถอนได้",
                        //   text:
                        //     "คุณต้องมียอดเงินมากกว่าหรือเท่ากับ " +
                        //     this.withdraw_fix +
                        //     " บาท จึงจะสามารถถอนได้",
                        //   icon: "error",
                        //   showConfirmButton: true,
                        //   allowOutsideClick: false,
                        //   allowEscapeKey: false
                        // }).then(result => {
                        //   if (result.value) {
                        //     this.withdraw_hide = false;
                        //     this.$router.push("/");
                        //   }
                        // });
                     } else if (this.amount < 100) {
                        this.withdraw_amount_show = true;
                        // this.$swal({
                        //   title: "ไม่สามารถทำการถอนได้",
                        //   text: "คุณมียอดเงินคงเหลือน้อยกว่า 100 บาท",
                        //   icon: "error",
                        //   showConfirmButton: true,
                        //   allowOutsideClick: false,
                        //   allowEscapeKey: false
                        // }).then(result => {
                        //   if (result.value) {
                        //     this.withdraw_hide = false;
                        //     this.$router.push("/");
                        //   }
                        // });
                     } else if (this.amount >= 100 && this.amount >= this.withdraw_fix) {
                        this.withdraw_with_show = true;
                        // this.$swal({
                        //   title: "ไม่สามารถทำการถอนได้",
                        //   text: "คุณมียอดเงินคงเหลือน้อยกว่า 100 บาท",
                        //   icon: "error",
                        //   showConfirmButton: true,
                        //   allowOutsideClick: false,
                        //   allowEscapeKey: false
                        // }).then(result => {
                        //   if (result.value) {
                        //     this.withdraw_hide = false;
                        //     this.$router.push("/");
                        //   }
                        // });
                     } else {
                        this.$axios.get("/hisWD", this.token).then(response => {
                           if (response.data.count !== 0) {
                              this.$swal({
                                 title: "ไม่สามารถทำรายการถอนได้",
                                 icon: "warning",
                                 html: "เนื่องจากมีรายการถอนอยู่",
                                 showConfirmButton: true,
                                 allowOutsideClick: false,
                                 allowEscapeKey: false
                              }).then(result => {
                                 if (result.value) {
                                    this.withdraw_hide = false;
                                    this.$router.push("/");
                                 }
                              });
                           }
                        });
                     }
                  });
               }
            })
            .catch(err => {
               console.log(err);
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
.hr-deposit {
   border: 0.6px solid #ffffff;
}
.btn-line-dep {
   background-color: #65ce40 !important;
   border-radius: 10px;
   padding: 10px;
}
.border-with {
   border: 1px solid #999999;
}
</style>
