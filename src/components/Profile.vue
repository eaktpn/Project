<template>
   <div class="container">
      <div class="row justify-content-center">
         <div class="col-xl-9 col-md-9 col-12" style="font-weight:400;">
            <div class="row justify-content-center">
               <div class="col-6 font26">ข้อมูลผู้ใช้</div>
               <div class="col-6 align-self-center text-right color_yellow"><mdb-icon icon="angle-double-left" /><router-link to="/" class="color_yellow"> ย้อนกลับ</router-link></div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center p-3">
         <div class="col-xl-9 col-md-9 col-12 BG-gray-radius">
            <div class="row">
               <div class="col-xl-6 col-md-6 col-12">
                  <div class="row mt-4">
                     <div class="col-5 text-right" style="margin-top:-5px;"><img src="/images/icon/dollar-coin.png" width="110%;" class="ml-2 mt-1" style="max-width:65px;" /></div>
                     <div class="col-7">
                        <div class=" font18">ยอดเงิน</div>
                        <div class="color_blue font24" style="font-weight:400;">3,156.00</div>
                     </div>
                  </div>
               </div>
               <div class="col-xl-6 col-md-6 col-12">
                  <div class="row mt-3">
                     <div class="col-5 text-right"><img src="/images/icon/insignia.png" width="110%;" class="ml-2 mt-1" style="max-width:65px;" /></div>
                     <div class="col-7 align-self-center">
                        <div class=" font18">แต้มสะสม</div>
                        <div class="color_blue font24" style="font-weight:400;">350</div>
                     </div>
                  </div>
               </div>
            </div>
            <div class="row justify-content-center mt-4"><div class="col-xl-11 col-md-11 col-11 line-profile"></div></div>
            <div class="row justify-content-center mt-4">
               <div class="col font16 mb-4">
                  <div class="text-center">ยูสเซอร์เนม : <span style="color:#5E72E4;">Apitsada132</span></div>
                  <div class="text-center mt-2">รหัสผ่าน : <span style="color:#5E72E4;">Aa112233</span></div>
                  <div class="text-center mt-2">บัญชีธนาคาร : <img src="/images/bank/KBANK.png" style="max-width:20px;" /> <span style="color:#FFDE30;">898-555-4567 Apitsada K.</span></div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {};
</script>

<style>
.line-profile {
   border: 0.5px solid #969595;
}
</style>
