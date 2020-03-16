<template>
   <div class="BG-Gradient d-flex flex-column justify-content-center">
      <div class="container">
         <div class="row justify-content-center">
            <div class="col-xl-8 col-md-8 col-11 text-center "><img src="/images/logo/joker24h.png" width="100%;" style="max-width:160px;" /></div>
         </div>
         <div class="row justify-content-center mt-3">
            <div class="col-xl-7 col-md-9 col-11 ">
               <i class="fas fa-mobile-alt"></i> กรอกเบอร์โทรศัพท์
               <input type="text" class="form-control1 mt-1" placeholder="เบอร์โทรศัพท์" v-model="phonenumber" maxlength="10" @keypress="isNumber($event)" />
            </div>
            <div class="col-xl-7 col-md-9 col-11 mt-2">
               <i class="fas fa-key"></i> กรอกรหัสผ่าน
               <input type="password" class="form-control1 mt-1" placeholder="รหัสผ่าน" v-model="password" maxlength="16"/>
            </div>
         </div>
         <div class="row justify-content-center ">
            <div class="col-xl-5 col-md-6 col-11 mt-3">
               <mdb-btn block size="sm" class="btn-login-orange color_back font18" style="font-weight:400;">เข้าสู่ระบบ</mdb-btn>
            </div>
         </div>
         <div class="row justify-content-center color_yellow font16 mt-3">
            <div class style="cursor: pointer;" @click="showModal = true">ลงทะเบียนใช้งาน</div>
         </div>
         <div style="margin-bottom:50px;"></div>

         <mdb-modal class="color_back" :show="showModal" @close="showModal = false" centered>
            <mdb-modal-header>
               <mdb-modal-title class="color_blue" style="font-weight:400;">เงื่อนไขการสมัคร</mdb-modal-title>
            </mdb-modal-header>
            <mdb-modal-body class="color_white font14">
               <div class="row justify-content-center ">
                  <div class="col-xl-11 col-md-11 col-11">
                     <p>1. หมายเลขโทรศัพท์ที่ใช้ ต้องสามารถรับข้อความได้ เพราะระบบจำเป็นต้องส่งรหัสยืนยัน ไปยังหมายเลข โทรศัพท์ของท่าน มิเช่นนั้นจะไม่สามารถถอนเงินได้</p>
                     <p>2. ชื่อ - นามสกุล จะจ้องจรงกับข้อมูลบัญชี มิเช่นนั้นจะไม่สามารถภอนเงินได้</p>
                     <p>3. ต้องใช้บัญชีที่สมัครฝากเงินเข้ามาเท่านั้น</p>
                     <p>4. ถ้าเกิดข้อผิดพลาดของระบบ ให้ทำการแจ้งพนักงานทันที กรณีไม่แจ้ง ทางเราขอสงวนสิทธิ์การถอนเงิน ทุกกรณี</p>
                     <p>5. สมาชิก 1 คน ต่อ 1 ไอดีเท่านั้น กรณีตรวจพบว่ามีการสมัครหลายไอดี ทางเราจะสงวนสิทธิ์ในการถอน ทุกกรณี</p>
                  </div>
               </div>
               <mdb-input class="color_white" type="checkbox" id="check_condition" name="check2" v-model="check_condition" label="ยอมรับเงื่อนไข" />
            </mdb-modal-body>
            <div class="row justify-content-center mb-2">
               <div class="col-xl-11 col-md-11 col-11">
                  <mdb-btn block :disabled="check_condition === false" size="sm" :class="check_condition === false ? 'btn-login-gray font16' : 'btn-login-orange color_back font16'" style="font-weight:400;" @click="GoRegister()">ตกลง</mdb-btn>
               </div>
            </div>
         </mdb-modal>
      </div>
   </div>
</template>

<script>
export default {
   name: "Login",
   data() {
      return {
         phonenumber: "",
         password: "",
         check_condition: false,
         showModal: false
      };
   },
   methods: {
      isNumber: function(evt) {
         evt = evt ? evt : window.event;
         var charCode = evt.which ? evt.which : evt.keyCode;
         if (charCode < 48 || charCode > 57) {
            evt.preventDefault();
         } else {
            return true;
         }
      },
      showModalcheck() {
         if (this.user.is_bonus === 1) {
            this.settingSwitch = true;
         } else {
            this.settingSwitch = false;
         }
         this.showsetting = true;
      },
      GoRegister() {
         this.$router.push("/Register");
      }
   }
};
</script>

<style>
.BG-Gradient {
   background: radial-gradient(50% 50% at 50% 50%, #363636 0%, #181818 78.65%);
   height: 100vh;
}
.logo {
   min-width: 160px;
}
</style>
