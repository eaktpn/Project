<template>
   <div class="container">
      <div class="row justify-content-center mt-3">
         <div class="col-xl-9 col-md-9 col-12 text-center">
            <carousel :per-page="1" v-bind:autoplay="true" v-bind:loop="true" :mouse-drag="false">
               <slide v-for="(banners, key) in bannerimg" :key="key">
                  <a target="_blank" rel="noreferrer">
                     <img :src="banners" class="img-fluid shadow rounded" width="100%" alt="image" />
                  </a>
               </slide>
            </carousel>
         </div>
      </div>
      <div class="row justify-content-center p-3" style="margin-top:-5px;">
         <div class="col-xl-9 col-md-9 col-12 BG-gray-radius">
            <div class="row justify-content-center mt-2">
               <div><img src="/images/icon/dollar-coin.png" class="mx-3" width="100%;" style="max-width:65px; margin-top:-2px;" /></div>
               <div class="align-self-center">
                  <div class="font16">ยอดเงิน</div>
                  <div class="color_blue font26" style="font-weight:400;">3,156.00</div>
               </div>
            </div>
            <div class="line-main my-3"></div>
            <div class="row justify-content-center">
               <div class="col font16 mb-3">
                  <div class="text-center">ยูสเซอร์เนม : <span style="color:#5E72E4;">Apitsada132</span></div>
                  <div class="text-center mt-2">รหัสผ่าน : <span style="color:#5E72E4;">Aa112233</span></div>
               </div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center px-3">
         <div class="col-xl-9 col-md-9 col-12 login-game text-center font28" style="font-weight:400; cursor: pointer;"><img src="/images/icon/gamepad.png" class="m-2" width="100%;" style="max-width:50px; margin-top:-2px;" /> เข้าเกม</div>
      </div>
      <div class="row justify-content-center p-2 mt-2">
         <div class="col-xl-9 col-md-9 col-12">
            <div class="row text-center">
               <div class="col-xl-3 col-md-4 col-4 padding-main mb-3">
                  <div class="BG-gray-radius-main" style="cursor: pointer;">
                     <img src="/images/icon/wallet.png" width="60px;" />
                     <div class="color_white font16" style="font-weight:400;">ฝากเงิน</div>
                  </div>
               </div>
               <div class="col-xl-3 col-md-4 col-4 padding-main mb-3">
                  <div class="BG-gray-radius-main" style="cursor: pointer;">
                     <img src="/images/icon/cash.png" width="60px;" class="p-1" />
                     <div class="color_white font16" style="font-weight:400;">ถอนเงิน</div>
                  </div>
               </div>
               <div class="col-xl-3 col-md-4 col-4 padding-main mb-3">
                  <div class="BG-gray-radius-main" style="cursor: pointer;">
                     <img src="/images/icon/add-user.png" width="60px;" class="p-1" />
                     <div class="color_white font16" style="font-weight:400;">แนะนำเพื่อน</div>
                  </div>
               </div>
               <div class="col-xl-3 col-md-4 col-4 padding-main mb-3">
                  <div class="BG-gray-radius-main" style="cursor: pointer;">
                     <img src="/images/icon/gift-box.png" width="60px;" class="p-1" />
                     <div class="color_white font16" style="font-weight:400;">โบนัสพิเศษ</div>
                  </div>
               </div>
               <div class="col-xl-3 col-md-4 col-4 padding-main mb-3">
                  <div class="BG-gray-radius-main" style="cursor: pointer;">
                     <img src="/images/icon/wall-clock.png" width="60px;" class="p-1" />
                     <div class="color_white font16" style="font-weight:400;">โบนัสพิเศษ</div>
                  </div>
               </div>
               <div class="col-xl-3 col-md-4 col-4 padding-main mb-3">
                  <div class="BG-gray-radius-main" style="cursor: pointer;">
                     <img src="/images/icon/chat.png" width="60px;" class="p-1" />
                     <div class="color_white font16" style="font-weight:400;">โบนัสพิเศษ</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
// const jwt = require("jsonwebtoken");
// import momentjs from "moment";
import {Carousel, Slide} from "vue-carousel";
import {} from "mdbvue";
// import $ from "jquery";
import firebase from "firebase";
var bannerRef = firebase.database().ref("banner");
export default {
   name: "Mian",
   data() {
      return {
         bannerimg: ""
      };
   },
   components: {
      Carousel,
      Slide
   },
   mounted() {
      bannerRef.orderByKey().on("value", snap => {
         this.bannerimg = snap.val();
      });
   }
};
</script>

<style>
.VueCarousel-dot-container {
   margin-top: -15px !important;
   margin-bottom: -10px !important;
}
.BG-gray-radius-main {
   background: #232323;
   border-radius: 10px;
   padding: 15px;
   border: 1px solid #373737;
}
.line-main {
   border: 0.5px solid #969595;
}
.login-game {
   background: #232323;
   border-radius: 12px;
   border: 1px solid #36d3f5;
}
.padding-main {
   padding-right: 6px !important;
   padding-left: 6px !important;
}
</style>
