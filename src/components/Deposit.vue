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
      <!-- <div class="row justify-content-center p-3">
         <div class="col-xl-9 col-md-9 col-12 BG-gray">
            <div class="row my-1" style="margin-top:-5px;">
               <div><img src="/images/icon/dollar-coin.png" class="mx-3" width="100%;" style="max-width:65px; margin-top:-2px;" /></div>
               <div class="align-self-center">
                  <div class="font16">ยอดเงิน</div>
                  <div class="color_blue font26" style="font-weight:400;">{{ currencyFormat(amount) }}</div>
               </div>
            </div>
         </div>
      </div> -->
      <div class="row justify-content-center mt-3 mb-2">
         <div class="col-12 color_white text-center font20" style="font-weight:400;">เลือกช่องทางการฝากเงิน</div>
      </div>
      <div class="row justify-content-center">
         <div class="col-xl-9 col-md-9 col-12 text-center">
            <div class="row justify-content-center">
               <div class="col-xl-4 col-md-5 col-5 BG-gray-radius text-white font14" style="margin:10px;">
                  <router-link to="/Deposittrue">
                     <img src="/images/icon/TRUEWALLET.png" width="100px;" />
                     <div class="color_white">
                        ฝากเงินผ่านระบบ
                        <br />True Wallet
                     </div>
                  </router-link>
               </div>
               <div class="col-xl-4 col-md-5 col-5 col-auto BG-gray-radius text-white font14" style="margin:10px;">
                  <router-link to="/Depositauto">
                     <img src="/images/icon/wallet.png" width="100px;" />

                     <div class="color_white">
                        ฝากเงินผ่านระบบ
                        <br />AUTO
                     </div>
                  </router-link>
               </div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center p-3">
         <div class="col-xl-9 col-md-9 col-12 bg-yellow text-center">
            <div class="color_red" style="cursor: pointer; font-weight:400;">แจ้งเตือนก่อนฝาก</div>
            <div class="mt-1 font14" style="color:#747474; font-weight:400;">ลูกค้าทุกท่านต้องมียอดไม่ต่ำกว่า 10 บาท มิเช่นนั้น ยอดเทิร์นจะถูกคิดรวมกับของเก่า</div>
         </div>
      </div>
      <div class="row justify-content-center p-3" style="margin-top:-15px;">
         <div class="col-xl-9 col-md-9 col-12 bg-pink text-center">
            <div class="color_back" style="cursor: pointer; font-weight:400;">คำเตือน</div>
            <div class="mt-1 font14" style="color:#747474; font-weight:400;">ต้องใช้บัญชีที่สมัคร ฝากเงินเข้ามาเท่านั้น และต้องโอนเงินผ่านช้องทางแอพพลิเคชั่น ของธนาคารบานมือถือเท่านั้น มิเช่นนั้นจะไม่สามารถยืนยันรายการฝากได้ ถ้าเกิดข้อผิดพลาดของระบบ ให้แจ้งกับพนักงานทันที กรณีที่ไม่แจ้งเราขอสงวนสิทธิ์การถอนเงิน ทุกกรณี</div>
         </div>
      </div>
   </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import $ from "jquery";
export default {
   name: "Deposit",
   data() {
      return {};
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
      }
   },
   mounted() {
      this.$session.set("page", "/Deposit");
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
   }
};
</script>

<style>
.bg-yellow {
   background: #fff3a4;
   border-radius: 3px;
   padding: 20px;
}
.bg-pink {
   background: #ffd9c5;
   border-radius: 3px;
   padding: 20px;
}
</style>
