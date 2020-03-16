<template>
   <div class="container">
      <div class="row justify-content-center">
         <div class="col-xl-9 col-md-9 col-12 font26" style="font-weight:400;">ประวัติการใช้งาน</div>
      </div>
      <div class="row justify-content-center mt-1 p-3">
         <div class="col-xl-9 col-md-9 col-12">
            <div class="row text-center">
               <div @click="deposithis()" :class="depositselect === true ? 'bg-radius-his2 color_back' : 'bg-radius-his color_blue'" style="margin:5px 5px 5px 0px;">รายการฝาก</div>
               <div @click="withdrawhis()" :class="withdrawselect === true ? 'bg-radius-his2 color_back' : 'bg-radius-his color_blue'" style="margin:5px;">รายการถอน</div>
               <div @click="bonushis()" :class="bonusselect === true ? 'bg-radius-his2 color_back' : 'bg-radius-his color_blue'" style="margin:5px;">โบนัส</div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center p-3" style="margin-top:-10px;" v-if="depositselect === true">
         <div class="col-xl-9 col-md-9 col-12 border-his">
            <div class="row justify-content-center text-center color_blue mt-2">
               <span class="col-xl-4 col-md-4 col-4">ว/ด/ป เวลา</span>
               <span class="col-xl-4 col-md-4 col-4">จำนวนเงิน</span>
               <span class="col-xl-4 col-md-4 col-4 mb-2">สถานะ</span>
            </div>
            <div class="hr-his mb-2"></div>
            <div class="row justify-content-center text-center font14">
               <span class="col-xl-4 col-md-4 col-4">10/5/19 10:10</span>
               <span class="col-xl-4 col-md-4 col-4">3,321</span>
               <span class="col-xl-4 col-md-4 col-4 mb-2">สำเร็จ</span>
            </div>
            <div class="row justify-content-center text-center font14">
               <span class="col-xl-4 col-md-4 col-4">10/5/19 10:10</span>
               <span class="col-xl-4 col-md-4 col-4">3,321</span>
               <span class="col-xl-4 col-md-4 col-4 mb-2">สำเร็จ</span>
            </div>
         </div>
      </div>
      <div class="row justify-content-center p-3" style="margin-top:-10px;" v-if="withdrawselect === true">
         <div class="col-xl-9 col-md-9 col-12 border-his">
            <div class="row justify-content-center text-center color_blue mt-2">
               <span class="col-xl-4 col-md-4 col-4">ว/ด/ป เวลา</span>
               <span class="col-xl-4 col-md-4 col-4">จำนวนเงิน</span>
               <span class="col-xl-4 col-md-4 col-4 mb-2">สถานะ</span>
            </div>
            <div class="hr-his mb-2"></div>
            <div class="row justify-content-center text-center font14">
               <span class="col-xl-4 col-md-4 col-4">23/5/19 10:10</span>
               <span class="col-xl-4 col-md-4 col-4">321</span>
               <span class="col-xl-4 col-md-4 col-4 mb-2">สำเร็จ</span>
            </div>
            <div class="row justify-content-center text-center font14">
               <span class="col-xl-4 col-md-4 col-4">23/5/19 10:10</span>
               <span class="col-xl-4 col-md-4 col-4">1,321</span>
               <span class="col-xl-4 col-md-4 col-4 mb-2">สำเร็จ</span>
            </div>
         </div>
      </div>
      <div class="row justify-content-center p-3" style="margin-top:-10px;" v-if="bonusselect === true">
         <div class="col-xl-9 col-md-9 col-12 border-his">
            <div class="row justify-content-center text-center color_blue mt-2">
               <span class="col-xl-3 col-md-3 col-3">ว/ด/ป เวลา</span>
               <span class="col-xl-3 col-md-3 col-3">โบนัส</span>
               <span class="col-xl-3 col-md-3 col-3">ประเภท</span>
               <span class="col-xl-3 col-md-3 col-3 mb-2">จำนวนโบนัส</span>
            </div>
            <div class="hr-his mb-2"></div>
            <div class="row justify-content-center text-center font14">
               <span class="col-xl-3 col-md-3 col-3">14/5/19 10:10</span>
               <span class="col-xl-3 col-md-3 col-3">โบนัสฟรี</span>
               <span class="col-xl-3 col-md-3 col-3">ฟรี</span>
               <span class="col-xl-3 col-md-3 col-3 mb-2">245</span>
            </div>
            <div class="row justify-content-center text-center font14">
               <span class="col-xl-3 col-md-3 col-3">14/5/19 10:10</span>
               <span class="col-xl-3 col-md-3 col-3">50</span>
               <span class="col-xl-3 col-md-3 col-3">ประเภท</span>
               <span class="col-xl-3 col-md-3 col-3 mb-2">จำนวนโบนัส</span>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: "History",
   data() {
      return {
         depositselect: true,
         withdrawselect: false,
         bonusselect: false,
         deposit: "",
         withdraw: "",
         Bonus: "",
         Bonusfree: ""
      };
   },
   methods: {
      deposithis() {
         this.depositselect = true;
         this.withdrawselect = false;
         this.bonusselect = false;
      },
      withdrawhis() {
         this.depositselect = false;
         this.withdrawselect = true;
         this.bonusselect = false;
      },
      bonushis() {
         this.depositselect = false;
         this.withdrawselect = false;
         this.bonusselect = true;
      }
   }
};
</script>

<style>
.bg-radius-his {
   background: #262626;
   width: 105px;
   border-radius: 5px;
   padding: 6px 5px;
   border: 1px solid #36d3f5;
   cursor: pointer;
}
.bg-radius-his2 {
   font-weight: 500;
   background: #36d3f5;
   width: 105px;
   border-radius: 5px;
   padding: 6px 5px;
   cursor: pointer;
}
.border-his {
   background: #42424250;
   border: 1px solid #ffffff;
}
.hr-his {
   border: 0.6px solid #ffffff;
   margin-right: -15px;
   margin-left: -15px;
}
</style>
