<template>
   <div>
      <div class="container">
         <div class="row justify-content-center mt-4">
            <div class="col-xl-7 col-md-9 col-11 font14">
               <router-link to="/Login"> <img src="/images/icon/back.png" width="100%;" style="max-width:10px;" /> <span style="color:#FFDE30;"> ย้อนกลับ </span></router-link>
            </div>
         </div>
      </div>
      <div class="Register d-flex flex-column justify-content-center">
         <div class="container">
            <div class="row justify-content-center">
               <div class="col-xl-7 col-md-9 col-11 font28" style="font-weight:400;">
                  <img src="/images/logo/joker24h.png" width="100%;" style="max-width:90px;" />
                  สมัครสมาชิก
               </div>
            </div>
            <div class="row justify-content-center mt-3">
               <div class="col-xl-7 col-md-9 col-11 ">
                  <i class="fas fa-mobile-alt"></i> กรอกเบอร์โทรศัพท์
                  <input type="text" v-model="phonenumber" class="form-control1 mt-1" placeholder="เบอร์โทรศัพท์" maxlength="10" @keypress="isNumber($event)" />
               </div>
               <div class="col-xl-7 col-md-9 col-11 mt-2">
                  <i class="fas fa-key"></i> กรอกรหัสผ่าน
                  <input type="password" v-model="password" class="form-control1 mt-1" placeholder="รหัสผ่าน" maxlength="16" />
               </div>
               <div class="col-xl-7 col-md-9 col-11 mt-2">
                  <i class="fas fa-key"></i> ยืนยันรหัสผ่าน
                  <input type="password" v-model="againpassword" class="form-control1 mt-1" placeholder="กรอกรหัสผ่านอีกครั้ง"  maxlength="16"/>
               </div>
               <div class="col-xl-7 col-md-9 col-11 mt-2">
                  <i class="fas fa-address-book"></i> เลือกธนาคาร
                  <select class="browser-default custom-select" v-model="bankcode">
                     <option selected disabled value="null">เลือกธนาคารของคุณ</option>
                     <option value="KBANK">กสิกร จำกัด (มหาชน)</option>
                     <option value="BBL">กรุงเทพ จำกัด (มหาชน)</option>
                     <option value="KTB">กรุงไทย จำกัด (มหาชน)</option>
                     <option value="BAY">กรุงศรีอยุธยา จำกัด (มหาชน)</option>
                     <option value="KNK">เกียรตินาคิณ จำกัด (มหาชน)</option>
                     <option value="CI">ซิตี้แบงค์</option>
                     <option value="CIMB">ซีไอเอ็มบี จำกัด (มหาชน)</option>
                     <option value="TMB">ทหารไทย จำกัด (มหาชน)</option>
                     <option value="TISGO">ทิสโก้ จำกัด (มหาชน)</option>
                     <option value="SCB">ไทยพาณิชย์ จำกัด (มหาชน)</option>
                     <option value="TBANK">ธนชาต จำกัด (มหาชน)</option>
                     <option value="BAAC">ธนาคาร ธ.ก.ส</option>
                     <option value="UOB">ยูโอบี จำกัด (มหาชน)</option>
                     <option value="LNH">แลนด์ แอนด์ เฮ้าส์</option>
                     <option value="GSB">ออมสิน</option>
                  </select>
               </div>
               <div class="col-xl-7 col-md-9 col-11 mt-2">
                  <i class="fas fa-key"></i> กรอกเลขบัญชี
                  <input type="text" class="form-control1 mt-1" placeholder="รหัสผ่าน" maxlength="14" @keypress="isNumber($event)" />
               </div>
            </div>
            <div class="row justify-content-center ">
               <div class="col-xl-5 col-md-6 col-11 mt-3">
                  <mdb-btn block size="sm" class="btn-login-orange color_back font18" style="font-weight:400;">เข้าสู่ระบบ</mdb-btn>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: "Register",
   data() {
      return {
         phonenumber: "",
         password: "",
         againpassword: "",
         bankcode: null,
         banknumber: "",
         banktype: {
            KBANK: "กสิกรไทย",
            BBL: "กรุงเทพ",
            KTB: "กรุงไทย",
            BAY: "กรุงศรีอยุธยา",
            KNK: "เกียรตินาคิน",
            JPK: "เจพีมอร์แกน เชส",
            CI: "ซิตี้แบงค์",
            CIMB: "ซีไอเอ็มบี",
            ZTM: "ซูมิโตโม มิตซุย",
            DOIB: "ดอยซ์แบงค์",
            TMB: "ทหารไทย",
            TISGO: "ทิสโก้",
            TCREDIT: "ไทยเครดิต",
            SCB: "ไทยพาณิชย์",
            TBANK: "ธนชาต",
            BNP: "ธนาคารบีเอ็นพี",
            BAAC: "ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร",
            MSU: "มิซูโฮ",
            MEGA: "เมกะ",
            UOB: "ยูโอบี",
            LNH: "แลนด์ แอนด์ เฮ้าส์",
            SNT: "สแตนดาร์ดชาร์เตอร์ด",
            CN: "ธนาคารแห่งประเทศจีน",
            USA: "แห่งอเมริกาฯ",
            GSB: "ออมสิน",
            OSK: "อาคารสงเคราะห์",
            ASL: "อิสลามแห่งประเทศไทย",
            IZBS: "ไอซีบีซี ",
            HK: "ฮ่องกงและเซี่ยงไฮ้"
         },
         errors: []
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
      }
   }
};
</script>

<style>
.Register {
   height: 93vh;
}
.custom-select {
   background-color: #060606 !important;
   color: #ffffff !important;
}
</style>
