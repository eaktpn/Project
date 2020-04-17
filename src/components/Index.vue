<template>
   <div class="BG-Gradient d-flex flex-column justify-content-center">
      <div class="container">
         <div class="row justify-content-center">
            <div class="col-xl-8 col-md-8 col-11 text-center "><img src="/images/logo/sexy222.png" width="100%;" style="max-width:310px;" /></div>
         </div>
         <div class="row justify-content-center ">
            <div class="col-xl-5 col-md-7 col-10 mt-5">
               <router-link to="/Login">
                  <mdb-btn block size="md" class="btn-Purple_Pink color_white font20" style="font-weight:300;">เข้าสู่ระบบ</mdb-btn>
               </router-link>
            </div> 
         </div>
         <div class="row justify-content-center ">
            <div class="col-xl-5 col-md-7 col-10 mt-2">
               <mdb-btn block size="md" class="btn-register color_white font16" style="font-weight:300;" @click="showModal = true">ลงทะเบียน</mdb-btn>
            </div>
         </div>
         <div style="margin-bottom:55px;"></div>
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
                  <mdb-btn block :disabled="check_condition === false" size="sm" :class="check_condition === false ? 'btn-Purple_Pink font16' : 'btn-Purple_Pink color_white font16'" style="font-weight:400;" @click="GoRegister()">ตกลง</mdb-btn>
               </div>
            </div>
         </mdb-modal>
      </div>
   </div>
</template>

<script>
export default {
   name: "Index",
   data() {
      return {
         check_condition: false,
         showModal: false
      };
   },
   methods: {
      GoRegister() {
         this.$router.push("/Register");
      }
   }
};
</script>

<style>
.BG-Gradient {
   background: #141414;
   height: 100vh;
}
.btn-register {
   border: 2px solid #742b74;
   border-radius: 10px;
}
.btn-default {
   background-color: #ffffff00 !important;
}
</style>
