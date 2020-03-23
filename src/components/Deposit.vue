<template>
   <div class="container" v-if="isLogin">
      <div class="row justify-content-center">
         <div class="col-xl-9 col-md-9 col-12" style="font-weight:400;">
            <div class="row justify-content-center">
               <div class="col-6 font26">ฝากเงิน</div>
               <div class="col-6 align-self-center text-right color_yellow"><mdb-icon icon="angle-double-left" /><router-link to="/" class="color_yellow"> ย้อนกลับ</router-link></div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center p-3">
         <div class="col-xl-9 col-md-9 col-12 BG-gray">
            <div class="row my-1" style="margin-top:-5px;">
               <div><img src="/images/icon/dollar-coin.png" class="mx-3" width="100%;" style="max-width:65px; margin-top:-2px;" /></div>
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
            <div class="font16 mt-2" style="color:#747474;">ลูกค้าทุกท่านต้องมียอดไม่ต่ำกว่า 10 บาท<br />มิเช่นนั้น ยอดเทิร์นจะถูกคิดรวมกับของเก่า</div>
         </div>
      </div>
      <div class="row justify-content-center p-3">
         <div class="col-xl-9 col-md-9 col-12 BG-pink color_back font18 p-4" style="font-weight:400;">
            <div class="text-center">คำเตือน</div>
            <div class="font16 mt-2" style="color:#606060;">ต้องใช้บัญชีที่สมัครฝากเงินเข้ามาเท่านั้น และต้องโอนเงินผ่านช้องทางแอพพลิเคชั่นของธนาคารบานมือถือเท่านั้น มิเช่นนั้นจะไม่สามารถยืนยันรายการฝากได้<br />ถ้าเกิดข้อผิดพลาดของระบบให้แจ้งกับพนักงานทันที กรณีที่ไม่แจ้งเราขอสงวนสิทธิ์การถอนเงินทุกกรณี</div>
         </div>
      </div>
      <div class="row justify-content-center px-3">
         <div class="col-xl-9 col-md-9 col-12 BG-gray-radius text-center">
            <div v-if="bank[0]">
               <img :src="'/images/bank-deposit/' + bank[0].code + '.png'" style="max-width:80px;" />
               <div class="mt-3">ชื่อบัญชี : {{ bank[0].name }}</div>
               <div>ธนาคาร : {{ bank[0].bank_name }}</div>
               <div>เลขบัญชี : {{ bank[0].number }}</div>
               <mdb-btn color="warning" class="color_back font16 px-3 py-1 mt-2" @click="copy_numberbank(bank[0].bank, bank[0].number)">คัดลอก</mdb-btn>

               <div class="hr-deposit my-3"></div>
               <div>
                  คุณได้โบนัส <label class="color_blue">“{{ bonus.title }}”</label>
               </div>
            </div>
            <a href="" target="_blank">
               <mdb-btn size="md" class="btn-line-dep color_white font16"> <img src="/images/icon/lineback.png" width="20" /> รับแจ้งเตือนผ่านไลน์ </mdb-btn>
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
// import moment from "moment";
import {mapActions, mapGetters} from "vuex";
import $ from "jquery";
// import {mdbContainer, mdbRow, mdbCol, mdbInput, mdbBtn} from "mdbvue";
// import firebase from "firebase";
export default {
   name: "Deposit",
   data() {
      return {
         bank: "",
         bonus: ""
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
      copy_numberbank(number, bank) {
         this.$copyText(number);
         this.$swal("คัดลอกสำเร็จ", bank + " " + number, "success");
      }
   },
   mounted() {
      this.$session.set("page", "/Depositauto");
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
</style>
