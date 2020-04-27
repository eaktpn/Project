<template>
   <div class="container" v-if="isLogin">
      <div class="row justify-content-center">
         <div class="col-xl-9 col-md-9 col-12" style="font-weight:400;">
            <div class="row justify-content-center">
               <div class="col-6 font26">แนะนำเพื่อน</div>
               <div class="col-6 align-self-center text-right color_yellow"><mdb-icon icon="angle-double-left" /><router-link to="/" class="color_yellow"> ย้อนกลับ</router-link></div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center" v-if="codejoin !== 'ไม่มีรหัสผู้แนะนำ'">
         <div class="col-xl-9 col-md-9 col-12 mt-1" style="font-weight:400;">
            รหัสผู้แนะนำคุณ : <span style="color:#5E72E4;">{{ codejoin }}</span>
         </div>
      </div>
      <div class="row justify-content-center mb-2" v-if="codesuggestcode === undefined">
         <mdb-btn class="btn-aff color_back font14 mt-2" @click="afffriend()">ขอ Link แนะนำเพื่อน</mdb-btn>
      </div>
      <div class="row justify-content-center p-3" v-if="codesuggestcode !== undefined">
         <div class="col-xl-9 col-md-9 col-12 BG-gray color_blue font22" style="font-weight:400;">
            <div class="row justify-content-center">
               <div class="col-xl-5 col-md-5 col-6 align-self-center pl-4">
                  {{ currencyFormat(walletSum) }}
                  <span>
                     <a @click="depositWallet()">
                        <img src="/images/affiliate/refresh.png" alt width="15px" />
                     </a>
                  </span>
               </div>
               <div class="col-xl-5 col-md-5 col-6 text-right">
                  <mdb-btn size="sm" :disabled="btn_confirm" :class="btn_confirm ? 'btn-gray-aff font14' : 'btn-yellow-aff font14'" @click="withdraw()">รับรายได้</mdb-btn>
               </div>
            </div>
            <div class="row justify-content-center">
               <div class="col-11 BG-gray2 text-center color_orange font14 mt-3">คุณต้องมียอดเงินมากกว่า 100 บาท <br />จึงจะสามารถถอนเงินได้</div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center mt-2" v-if="codesuggestcode !== undefined">
         <div class="col-xl-9 col-md-9 col-12">ลิ้งค์แนะนำของคุณ</div>
      </div>
      <div class="row justify-content-center mt-2" v-if="codesuggestcode !== undefined">
         <div class="col-xl-9 col-md-9 col-12 font16">
            <section class="preview">
               <mdb-input basic :value="'http://joker24h.abatopup.com/systemaff?join=' + codesuggest" disabled>
                  <mdb-btn class="color_white font12" color="elegant" size="md" group slot="append" @click="coppyText()">คัดลอก</mdb-btn>
               </mdb-input>
            </section>
         </div>
      </div>
      <div class="row justify-content-center mt-3" v-if="codesuggestcode !== undefined">
         <div class="col-xl-9 col-md-9 col-12">แชร์</div>
      </div>
      <div class="row justify-content-center mt-2" v-if="codesuggestcode !== undefined">
         <div class="col-xl-10 col-md-10 col-12">
            <social-sharing :url="'http://joker24h.abatopup.com/systemaff?join=' + codesuggest" title="ลิ้งสมัคร " discription="ชวนเพื่อนมาเล่น" quote="ชวนเพื่อนมาเล่นสล๊อต" hashtags="ชวนเพื่อนมาเล่นสลอต" v-cloak inline-template class="row">
               <div class="row justify-content-center text-center">
                  <div class="col-xl-2 col-md-2 col-2 bg-aff-share p-3 m-1">
                     <network network="facebook">
                        <img src="/images/affiliate/facebook.png" style="width:100%; cursor: pointer; max-width:60px;" />
                     </network>
                  </div>
                  <div class="col-xl-2 col-md-2 col-2 bg-aff-share p-3 m-1">
                     <a :href="'fb-messenger://share/?link=' + url">
                        <img src="/images/affiliate/messenger.png" style="width:100%; cursor: pointer; max-width:60px;" />
                     </a>
                  </div>
                  <div class="col-xl-2 col-md-2 col-2 bg-aff-share p-3 m-1">
                     <network network="line">
                        <img src="/images/affiliate/line.png" style="width:100%; cursor: pointer; max-width:60px;" />
                     </network>
                  </div>
                  <div class="col-xl-2 col-md-2 col-2 bg-aff-share p-3 m-1">
                     <network network="sms">
                        <img src="/images/affiliate/sms.png" style="width:100%; cursor: pointer; max-width:60px;" />
                     </network>
                  </div>
                  <div class="col-xl-2 col-md-2 col-2 bg-aff-share p-3 m-1">
                     <network network="email">
                        <img src="/images/affiliate/gmail.png" style="width:100%; cursor: pointer; max-width:60px;" />
                     </network>
                  </div>
               </div>
            </social-sharing>
         </div>
      </div>
      <div class="row justify-content-center mt-3" v-if="codesuggestcode !== undefined">
         <div class="col-xl-9 col-md-9 col-12">สถิติ</div>
      </div>
      <div class="row justify-content-center p-3" v-if="codesuggestcode !== undefined">
         <div class="col-xl-9 col-md-9 col-12 BG-gray">
            <div class="row text-center color_yellow">
               <span class="col-xl-5 col-md-5 col-4">ว/ด/ป เวลา</span>
               <span class="col-xl-3 col-md-3 col-4">ยอดแชร์</span>
               <span class="col-xl-4 col-md-4 col-4">จำนวนคลิก</span>
            </div>
            <div class="line-yellow mt-2"></div>
            <div class="row text-center font14 mt-2">
               <span class="col-xl-5 col-md-5 col-4">{{ tableaff.joinDate | moment("YYYY-MM-DD") }}</span>
               <span class="col-xl-3 col-md-3 col-4">{{ tableaff.share }}</span>
               <span class="col-xl-4 col-md-4 col-4">{{ tableaff.click }}</span>
            </div>
         </div>
      </div>
      <div class="row justify-content-center mt-1" v-if="codesuggestcode !== undefined">
         <div class="col-xl-9 col-md-9 col-12">
            <div class="row">
               <div class="col-6 color_white font16">สมาชิกที่คุณแนะนำ</div>
               <div class="col-6 color_white text-right font16">
                  <span
                     >รวม<span class="color_yellow"> {{ currencyFormat(logdividend) }}</span> บาท</span
                  >
               </div>
            </div>
            <div class="row">
               <div class="col-12 color_white font16">
                  <span>
                     <label class="color_white" style="margin-top:2px;">เลือกวันที่แสดง</label>
                  </span>
                  <span>
                     <date-picker class="input-date" style="margin-left:20px; padding-right:5px;" lang="en" format="YYYY-MM-DD" v-model="dateselect" @change="selectDate()"></date-picker>
                  </span>
               </div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center p-3" v-if="codesuggestcode !== undefined">
         <div class="col-xl-9 col-md-9 col-12 BG-gray">
            <div class="row text-center color_yellow mt-1">
               <span class="col-xl-1 col-md-1 col-1">#</span>
               <span class="col-xl-4 col-md-4 col-4">ว/ด/ป เวลา</span>
               <span class="col-xl-3 col-md-3 col-3">ยูสเซอร์</span>
               <span class="col-xl-4 col-md-4 col-4">ยอดเสียของเพื่อน 5%</span>
            </div>
            <div class="row text-center font14 mt-2" v-for="(logaff, key) in afflog" :key="key">
               <span class="col-xl-1 col-md-1 col-1">{{ key + 1 }}</span>
               <span class="col-xl-4 col-md-4 col-4">{{ logaff | moment("YYYY-MM-DD") }}</span>
               <span class="col-xl-3 col-md-3 col-3">{{ logaff.username }}</span>
               <span class="col-xl-4 col-md-4 col-4">{{ currencyFormat(logaff.winloss) }}</span>
            </div>
         </div>
      </div>
      <div class="row justify-content-center p-3" style="margin-top:-10px;">
         <div class="col-xl-9 col-md-9 col-12 border-note text-center font14">หมายเหตุ ระบบจะทำการคำนวณยอดเงิน<br />เวลา 23:00 - 00:00 ของทุกวัน</div>
      </div>
   </div>
</template>

<script>
const jwt = require("jsonwebtoken"); //ใช้ในการเข้ารหัส
import firebase from "firebase";
import momentjs from "moment";
import moment from "moment"; //ใช้กับเวลา
import {mapGetters} from "vuex";
import $ from "jquery";
import DatePicker from "vue2-datepicker"; //ปฏิทิน
// import {mdbContainer, mdbRow, mdbCol, mdbInput, mdbBtn} from "mdbvue";
var popup_aff = firebase.database().ref("popup");
export default {
   name: "Affiliate",
   data() {
      return {
         btn_confirm: true,
         history: "",
         codejoin: "",
         wallet: "",
         walletSum: "",
         tableaff: "",
         codesuggest: "",
         codesuggestcode: "",
         affiliate: null,
         linkAffiliate: null,
         affiliateData: [],
         logdividend: "",
         afflog: "",
         dateselect: new Date(),
         attrs: [
            {
               key: "today",
               highlight: true,
               dates: new Date(),
            },
         ],
         date: new Date(),
         option: {
            type: "day",
            SundayFirst: false,
            week: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            format: "YYYY-MM-DD",
            color: {
               header: "primary",
               headerText: "white",
               checkedDay: "primary",
            },
            placeholder: "2018-04-13",
            buttons: {
               ok: "OK",
               clear: "Clear",
               today: "Today",
            },
            overlayOpacity: 0.5,
         },
      };
   },
   computed: {
      ...mapGetters({
         isLogin: "isLogin",
         user: "user",
         amount: "amount",
         token: "token",
      }),
   },
   methods: {
      coppyText() {
         this.$copyText("http://joker24h.abatopup.com/systemaff?join=" + this.codesuggest);
         this.$swal("คัดลอกสำเร็จ", "", "success");
      },
      currencyFormat(n) {
         n = parseFloat(n);
         return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      },
      depositWallet() {
         if (parseFloat(this.wallet) > 0) {
            $(".preloader").show();
            let payload = {
               username: this.user.username,
            };
            let token = jwt.sign(payload, this.$keypayload, {
               expiresIn: "5s",
            });
            $(".preloader").show();
            this.$axios.post("/walletDeposit", {token: token}, this.token).then((response) => {
               $(".preloader").hide();
               if (response.data.code === "SUCCESS") {
                  this.$axios.get("/affiliateAddwallet", this.token).then((response) => {
                     console.log(response.data);
                  });
                  this.$axios.get("/wallet", this.token).then((response) => {
                     this.history = response.data.payload;
                     this.walletSum = response.data.walletSum;
                  });
                  this.$swal({
                     icon: "success",
                     title: "สำเร็จ",
                     text: "อัพเดทเงินทำเร็จ",
                     timer: 3000,
                     showConfirmButton: true,
                     allowOutsideClick: false,
                     allowEscapeKey: false,
                  });
                  this.$router.push("/Affiliate");
               } else {
                  $(".preloader").hide();
                  this.$swal({
                     icon: "error",
                     title: "เกิดข้อผิดพลาด",
                     text: response.data.msg,
                     timer: 5000,
                     showConfirmButton: true,
                     allowOutsideClick: false,
                     allowEscapeKey: false,
                  });
               }
            });
         } else {
            this.$swal({
               icon: "info",
               title: "แจ้งเตือน",
               text: "ยอดเงินอัพเดทเป็นล่าสุดแล้ว",
               timer: 3000,
               showConfirmButton: true,
               allowOutsideClick: false,
               allowEscapeKey: false,
            });
         }
      },
      selectDate: function() {
         this.dateselect = moment(this.dateselect).format("YYYY-MM-DD");
         console.log(this.dateselect);
         let payload = {
            date: this.dateselect,
         };
         let token = jwt.sign(payload, this.$keypayload, {
            expiresIn: "5s",
         });
         $(".preloader").show();
         this.$axios
            .post("/affiliateLog", {token: token}, this.token)
            .then((response) => {
               $(".preloader").hide();
               if (response.data.payload.length > 0) {
                  this.afflog = JSON.parse(response.data.payload[0].stat);
                  this.logdividend = response.data.payload[0].dividend;
               } else {
                  this.afflog = response.data.payload;
                  this.logdividend = 0;
               }
            })
            .catch(function(error) {
               console.log(error);
            });
      },
      afffriend() {
         let payload = {
            join: this.codesuggestcode,
         };
         let token = jwt.sign(payload, this.$keypayload, {
            expiresIn: "5s",
         });
         $(".preloader").show();
         this.$axios
            .post("/affiliateRegister", {token: token}, this.token)
            .then((response) => {
               this.codesuggestcode = response.data.payload;
               this.codesuggest = response.data.payload.token;
               this.tableaff = response.data.payload;
               let payload = {
                  date: new Date().toISOString().slice(0, 10),
               };
               let token = jwt.sign(payload, this.$keypayload, {
                  expiresIn: "5s",
               });
               this.$axios
                  .post("/affiliateLog", {token: token}, this.token)
                  .then((response) => {
                     $(".preloader").hide();
                     if (response.data.payload.length > 0) {
                        this.afflog = response.data.payload;
                        this.logdividend = response.data.payload[0].dividend;
                     } else {
                        this.afflog = response.data.payload;
                        this.logdividend = 0;
                     }
                  })
                  .catch(function(error) {
                     console.log(error);
                  });
            })
            .catch(function(error) {
               console.log(error);
            });
         $(".preloader").hide();
      },
      withdraw() {
         if (this.walletSum >= 100) {
            this.$swal({
               title: "ถอนเงิน",
               text: "การถอนเงินจะถอนยอดเงินคงเหลือทั้งหมด",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "ตกลง",
               cancelButtonText: "ยกเลิก",
            }).then((result) => {
               if (result.value) {
                  let payload = {
                     username: this.user.username,
                  };
                  let token = jwt.sign(payload, this.$keypayload, {
                     expiresIn: "5s",
                  });
                  $(".preloader").show();
                  this.$axios.post("/walletWithdraw", {token: token}, this.token).then((response) => {
                     $(".preloader").hide();
                     if (response.data.code === "SUCCESS") {
                        this.$axios.get("/wallet", this.token).then((response) => {
                           this.history = response.data.payload;
                           this.walletSum = response.data.walletSum;
                        });
                        this.$swal({
                           icon: "success",
                           title: "ทำรายการสำเร็จ",
                           text: response.data.msg + " กรุณารอการดำเนินการ",
                           timer: 6000,
                           showConfirmButton: true,
                           allowOutsideClick: false,
                           allowEscapeKey: false,
                        });
                        this.$router.push("/");
                     } else {
                        this.$swal({
                           title: "เกิดข้อผิดพลาด",
                           text: "มีข้อผิดพลาดเกิดขึ้น",
                           icon: "error",
                           timer: 5000,
                           showConfirmButton: true,
                           allowOutsideClick: false,
                           allowEscapeKey: false,
                        });
                     }
                  });
               }
            });
         } else {
            this.$swal({
               title: "ไม่สามารถถอนได้",
               text: "เนื่องจากคุณต้องมีเงินมากกว่า 100 บาท",
               icon: "info",
               timer: 5000,
               showConfirmButton: true,
               allowOutsideClick: false,
               allowEscapeKey: false,
            });
         }
      },
   },
   components: {
      DatePicker,
   },
   mounted() {
      if (this.$session.get("isLogin")) {
         if (this.isLogin) {
            // this.$session.set("page", "/Affiliate");
            this.dateselect = moment(new Date()).format("YYYY-MM-") + (moment(new Date()).format("DD") - 1);
            popup_aff.child("affiliate").on("value", (snap) => {
               //Popup affiliate
               var leng = snap.val();
               var show_popup_aff = [];
               console.log(snap.val());
               for (var i = 0; i < leng.length; i++) {
                  if (snap.val()[i].status === 1 && momentjs().format("YYYY-MM-DD HH:mm") >= snap.val()[i].date_start && momentjs().format("YYYY-MM-DD HH:mm") <= snap.val()[i].date_end) {
                     show_popup_aff.push({
                        title: snap.val()[i].title,
                        html: snap.val()[i].text,
                        imageUrl: snap.val()[i].imageUrl,
                        showConfirmButton: true,
                     });
                  }
                  this.$swal.queue(show_popup_aff);
               }
            });

            $(".preloader").show();
            this.$axios
               .get("/affiliateToken", this.token)
               .then((response) => {
                  $(".preloader").hide();
                  if (response.data.payload === undefined) {
                     this.codesuggestcode = response.data.payload;
                     console.log(this.codesuggestcode);
                     this.codesuggest = "ไม่มีรหัสผู้แนะนำ";
                     this.tableaff = 0;
                     this.wallet = 0;
                  } else {
                     this.codesuggest = response.data.payload.token;
                     this.tableaff = response.data.payload;
                     if (response.data.payload.join === "undefined") {
                        this.codejoin = "ไม่มีรหัสผู้แนะนำ";
                     } else {
                        this.codejoin = response.data.payload.join;
                     }
                     this.$axios
                        .get("/affiliateWallet", this.token)
                        .then((response) => {
                           this.wallet = response.data.payload;
                        })
                        .catch(function(error) {
                           console.log(error);
                        });
                  }
               })
               .catch(function(error) {
                  console.log(error);
               });
            var dateto = new Date();
            let payload = {
               date: new Date().toISOString().slice(0, 8) + (dateto.getDate() - 1),
            };
            let token = jwt.sign(payload, this.$keypayload, {
               expiresIn: "5s",
            });
            this.$axios
               .post("/affiliateLog", {token: token}, this.token)
               .then((response) => {
                  if (response.data.payload.length > 0) {
                     this.afflog = JSON.parse(response.data.payload[0].stat);
                     this.logdividend = response.data.payload[0].dividend;
                     $(".preloader").hide();
                  } else {
                     this.afflog = response.data.payload;
                     this.logdividend = 0;
                     $(".preloader").hide();
                  }
               })
               .catch(function(error) {
                  console.log(error);
               });
            this.$axios.get("/wallet", this.token).then((response) => {
               this.history = response.data.payload;
               this.walletSum = response.data.walletSum;
               if (this.walletSum >= 100) {
                  this.btn_confirm = false;
               }
            });
         }
      } else {
         this.$router.push("/Logout");
      }
   },
};
</script>

<style>
.bg-aff-share {
   background: #2c2c2c;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   border-radius: 7px;
}
.line-yellow {
   border: 0.7px solid #ffde30;
}
.btn-aff {
   background: #fcff68 !important;
   border-radius: 4px;
   padding: 5px 15px 6px 15px;
}
.btn-yellow-aff {
   background-color: #ffde30 !important;
   border-radius: 3px;
   padding: 5px 100px;
}
.btn-gray-aff {
   background-color: #666666 !important;
   border-radius: 3px;
   padding: 5px 100px;
}
.border-note {
   border: 1px solid #a4a4a4;
   box-shadow: 0px 4px 6px rgba(50, 50, 93, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08);
   border-radius: 5px;
   padding: 10px;
}
</style>
