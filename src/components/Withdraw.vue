<template>
   <div class="container">
      <div class="row justify-content-center">
         <div class="col-xl-9 col-md-9 col-12 font26" style="font-weight:400;">ถอนเงิน</div>
      </div>
      <div class="row justify-content-center p-3">
         <div class="col-xl-9 col-md-9 col-12 BG-gray">
            <div class="row my-1" style="margin-top:-5px;">
               <div><img src="/images/icon/dollar-coin.png" class="mx-3" width="100%;" style="max-width:65px; margin-top:-2px;" /></div>
               <div class="align-self-center">
                  <div class="font16">ยอดเงิน</div>
                  <div class="color_blue font26" style="font-weight:400;">3,156.00</div>
               </div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center px-3">
         <div class="col-xl-9 col-md-9 col-12 BG-yellow color_red font18 p-4" style="font-weight:400;">
            <div class="text-center">กติกาการถอนเงิน</div>
            <div class="font16 mt-2" style="color:#747474;">
               1. ถอนขั้นต่ำ 300 บาท<br />
               2. กรณี ไม่รับโบนัส จะต้องมีรายการเล่นอย่างน้อย 1 ครั้ง<br />
               3. กรณีมีการทุจริต การตัดสินใจของแอดมินถือเป็นที่สุด
            </div>
         </div>
      </div>
      <div class="row justify-content-center p-3">
         <div class="col-xl-9 col-md-9 col-12 border-with text-center font18 p-3"><img src="/images/icon/warning.png" class="mx-3" width="100%;" style="max-width:45px;" />ถอนขั้นต่ำ 300 บาท</div>
      </div>
      <div class="row justify-content-center">
         <div class="col-xl-8 col-md-8 col-11">
            <div class="text-white">จำนวนเงินที่จะถอน</div>
         </div>
      </div>
      <div class="row justify-content-center" style="margin-top:-16px;">
         <div class="col-xl-8 col-md-8 col-11 text-rigth">
            <input type="text" style="width:100%;" id="withdraw_amount" class="form-control text-right withdraw-input-css mt-3" v-mask="{alias: 'currency', prefix: '', groupSeparator: ''}" maxlength="9" @change="check_amount()" />
         </div>
      </div>
      <div class="row justify-content-center ">
         <div class="col-xl-5 col-md-6 col-11 mt-2">
            <mdb-btn block size="sm" class="btn-login-orange color_back font18" style="font-weight:400;">เข้าสู่ระบบ</mdb-btn>
         </div>
      </div>
      <div class="col-12">
         <router-link to="/">
            <div class="text-center text-white font16" style="margin-top:15px;">ยกเลิกการถอน</div>
         </router-link>
      </div>
      <div class="mt-4"></div>
   </div>
</template>

<script>
export default {
   name: "Withdraw",
   data() {
      return {
         withdraw_amount: false
      };
   },
   methods: {
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
