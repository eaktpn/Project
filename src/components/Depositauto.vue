<template>
   <div class="container" v-if="isLogin">
      <div class="row justify-content-center px-3 mt-4">
         <div class="col-xl-9 col-md-9 col-12 BG-gray-radius" style="font-weight:400;">
            <div class="row justify-content-center">
               <div class="col-6 color_pink font22">ฝากเงิน</div>
               <div class="col-6 align-self-center text-right color_yellow"><mdb-icon icon="angle-double-left" /><router-link to="/" class="color_yellow"> ย้อนกลับ</router-link></div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center px-3 mt-3">
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
      <div class="row justify-content-center mt-1">
         <div class="col-xl-9 col-md-9 col-12 text-center">
            <div v-if="bank[0]">
               <div class="BG-gray-radius px-3">
                  <div class="row justify-content-center mt-1">
                     <div class="col-12 text-left font18 ml-4"><b>ฝากเข้าบัญชี</b></div>
                  </div>
                  <div class="row justify-content-center mt-3">
                     <div class="col-xl-5 col-md-5 col-4 text-right margin-delete">ธนาคาร :</div>
                     <div class="col-xl-7 col-md-7 col-8 text-left"><img :src="'/images/bank-deposit/' + bank[0].code + '.png'" style="max-width:70px;" /> {{ bank[0].bank_name }}</div>
                  </div>
                  <div class="row justify-content-center mt-1">
                     <div class="col-xl-5 col-md-5 col-4 text-right margin-delete">ชื่อบัญชี :</div>
                     <div class="col-xl-7 col-md-7 col-8 text-left">{{ bank[0].name }}</div>
                  </div>
                  <div class="row justify-content-center mt-1 mb-3">
                     <div class="col-xl-5 col-md-5 col-4 text-right margin-delete">เลขบัญชี :</div>
                     <div class="col-xl-7 col-md-7 col-8 text-left">{{ bank[0].number }}<mdb-btn color="warning" class="color_back font13 px-2 py-0" @click="copy_numberbank(bank[0].bank_name, bank[0].number)">คัดลอก</mdb-btn></div>
                  </div>
               </div>
               <!-- <div class="hr-deposit my-3"></div> -->
               <div class="BG-gray-radius my-3">
                  คุณได้โบนัส<label class="font18 color_pink mt-1 ml-2">“<b>{{ bonus.title }}</b>”</label>
               </div>
            </div>
            <a href="https://line.me/R/ti/p/@586fphiq" target="_blank">
               <mdb-btn size="md" class="animation-Button animation-border color_white font16"> <img src="/images/icon/lineback.png" width="20" /> รับแจ้งเตือนผ่านไลน์ </mdb-btn>
            </a>
            <div class="font14 mt-2">*กดเพิ่มเพื่อนเพื่อรับบริการแจ้งเตือนยอดฝาก</div>
            <div class="color_gray font14 mt-2">**หลังจากโอนเงินแล้ว ระบบจะใช้เวลาดำเนินการไม่เกิน 1 นาที แต่ผากเกินเวลาที่กำหนด ให้ติดต่อพนักงานทันที</div>
         </div>
      </div>
      <div class="mt-3"></div>
   </div>
</template>

<script>
// const jwt = require("jsonwebtoken");
import momentjs from "moment";
import {mapActions, mapGetters} from "vuex";
import $ from "jquery";
// import {mdbContainer, mdbRow, mdbCol, mdbInput, mdbBtn} from "mdbvue";
import firebase from "firebase";
var popup_deposit = firebase.database().ref("popup");
export default {
   name: "Deposit",
   data() {
      return {
         bank: "",
         bonus: ""
         // number:null,
         // bankcop:null
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
      currencyFormat(n) {
         n = parseFloat(n);
         return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
      },
      copy_numberbank(bank, number) {
         this.$copyText(number);
         this.$swal("คัดลอกสำเร็จ", bank + " " + number, "success");
      }
   },
   mounted() {
      popup_deposit.child("deposit").on("value", snap => {
         //Popup affiliate
         var leng = snap.val();
         var show_popup_deposit = [];
         console.log(snap.val());
         for (var i = 0; i < leng.length; i++) {
            if (snap.val()[i].status === 1 && momentjs().format("YYYY-MM-DD HH:mm") >= snap.val()[i].date_start && momentjs().format("YYYY-MM-DD HH:mm") <= snap.val()[i].date_end) {
               show_popup_deposit.push({
                  title: snap.val()[i].title,
                  html: snap.val()[i].text,
                  imageUrl: snap.val()[i].imageUrl,
                  showConfirmButton: true
               });
            }
            this.$swal.queue(show_popup_deposit);
         }
      });
      // this.$session.set("page", "/Depositauto");
      if (this.$session.get("isLogin")) {
         if (this.isLogin) {
            $(".preloader").show();
            this.$axios.get("/is_login", this.token).then(response => {
               $(".preloader").hide();
               if (response.data.msg === "LOGOUT") {
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
                     // .get("/showBank?bank=TRUEWALLET", this.token)
                     .get("/showBank", this.token)
                     .then(response => {
                        console.log(response.data);
                        this.bank = response.data.payload;
                     });
                  this.$axios.get("/bonus", this.token).then(response => {
                     this.bonus = response.data.payload;
                  });
               }
            });
         }
      } else {
         console.log("Logout Depositauto");
         this.$router.push("/Logout");
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
.margin-delete {
   margin-right: -15px !important;
   margin-left: -15px !important;
}
.btn-line-dep {
   background-color: #65ce40 !important;
   border-radius: 10px;
   padding: 10px;
}
</style>
