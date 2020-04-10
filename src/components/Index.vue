<template>
   <div class="BG-Gradient d-flex flex-column justify-content-center">
      <div class="container">
         <div class="row justify-content-center">
            <div class="col-xl-8 col-md-8 col-11 text-center "><img src="/images/logo/siamslotxo.png" width="100%;" style="max-width:220px;" /></div>
         </div>
         <div class="row justify-content-center ">
            <div class="col-xl-5 col-md-7 col-10 mt-4">
               <router-link to="/Login">
                  <mdb-btn block size="sm" class="btn-login-orange color_back font20" style="font-weight:400;">เข้าสู่ระบบ</mdb-btn>
               </router-link>
            </div>
         </div>
         <div class="row justify-content-center ">
            <div class="col-xl-5 col-md-7 col-10 mt-3">
               <router-link to="/Register">
                  <mdb-btn block class="btn-register color_yellow font16" style="font-weight:300;">ลงทะเบียน</mdb-btn>
               </router-link>
            </div>
         </div>
         <div style="margin-bottom:55px;"></div>
      </div>
   </div>
</template>

<script>
export default {};
</script>

<style>
.BG-Gradient {
   background: radial-gradient(50% 50% at 50% 50%, #363636 0%, #181818 78.65%);
   height: 100vh;
}
.btn-register {
   border: 1px solid #ffde30;
   box-sizing: border-box;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);
   border-radius: 30px;
   padding: 3px;
}
</style>
