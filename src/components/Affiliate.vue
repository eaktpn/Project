<template>
   <div class="container">
      <div class="row justify-content-center">
         <div class="col-xl-9 col-md-9 col-12 font26" style="font-weight:400;">แนะนำเพื่อน</div>
         <div class="col-xl-9 col-md-9 col-12 mt-1" style="font-weight:400;">รหัสผู้แนะนำ : <span style="color:#5E72E4;">gtDfffe589</span></div>
      </div>
      <div class="row justify-content-center p-3">
         <div class="col-xl-9 col-md-9 col-12 BG-gray color_blue font22" style="font-weight:400;">
            <div class="row justify-content-center">
               <div class="col align-self-center pl-4">
                  3,000.00
               </div>
               <div class="col text-right">
                  <mdb-btn color="warning" size="sm" class="color_back font16">รับรายได้</mdb-btn>
               </div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center mt-2">
         <div class="col-xl-9 col-md-9 col-12">ลิ้งค์แนะนำของคุณ</div>
      </div>
      <div class="row justify-content-center mt-2">
         <div class="col-xl-9 col-md-9 col-12 font16">
            <section class="preview">
               <mdb-input basic :value="'http://slotimlive22.abatopup.com/systemaff?join=' + codesuggest" disabled>
                  <mdb-btn class="color_white font12" color="elegant" size="md" group slot="append" @click="coppyText()">คัดลอก</mdb-btn>
               </mdb-input>
            </section>
         </div>
      </div>
      <div class="row justify-content-center mt-3">
         <div class="col-xl-9 col-md-9 col-12">แชร์</div>
      </div>
      <div class="row justify-content-center mt-2">
         <div class="col-xl-10 col-md-10 col-12">
            <div class="row justify-content-center text-center">
               <div class="col-xl-2 col-md-2 col-2 bg-aff-share p-3 m-1">
                  <img src="/images/affiliate/facebook.png" style="width:100%; cursor: pointer; max-width:60px;" />
               </div>
               <div class="col-xl-2 col-md-2 col-2 bg-aff-share p-3 m-1">
                  <img src="/images/affiliate/messenger.png" style="width:100%; cursor: pointer; max-width:60px;" />
               </div>
               <div class="col-xl-2 col-md-2 col-2 bg-aff-share p-3 m-1">
                  <img src="/images/affiliate/line.png" style="width:100%; cursor: pointer; max-width:60px;" />
               </div>
               <div class="col-xl-2 col-md-2 col-2 bg-aff-share p-3 m-1">
                  <img src="/images/affiliate/sms.png" style="width:100%; cursor: pointer; max-width:60px;" />
               </div>
               <div class="col-xl-2 col-md-2 col-2 bg-aff-share p-3 m-1">
                  <img src="/images/affiliate/gmail.png" style="width:100%; cursor: pointer; max-width:60px;" />
               </div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center mt-3">
         <div class="col-xl-9 col-md-9 col-12">สถิติ</div>
      </div>
      <div class="row justify-content-center p-3">
         <div class="col-xl-9 col-md-9 col-12 BG-gray">
            <div class="row text-center color_yellow">
               <span class="col-xl-5 col-md-5 col-4">ว/ด/ป เวลา</span>
               <span class="col-xl-3 col-md-3 col-4">ยอดแชร์</span>
               <span class="col-xl-4 col-md-4 col-4">จำนวนคลิก</span>
            </div>
            <div class="line-yellow mt-2"></div>
            <div class="row text-center font14 mt-2">
               <span class="col-xl-5 col-md-5 col-4">20/08/2019 16:50</span>
               <span class="col-xl-3 col-md-3 col-4">30</span>
               <span class="col-xl-4 col-md-4 col-4">44</span>
            </div>
         </div>
      </div>
      <div class="row justify-content-center mt-1">
         <div class="col-xl-9 col-md-9 col-12">
            <div class="row">
               <div class="col-6 color_white font16">สมาชิกที่คุณแนะนำ</div>
               <div class="col-6 color_white text-right font16">
                  <span>รวม<span class="color_yellow"> 230.00</span> บาท</span>
               </div>
            </div>
            <div class="row">
               <div class="col-12 color_white font16">
                  <span>
                     <label class="color_white" style="margin-top:2px;">เลือกวันที่แสดง</label>
                  </span>
                  <span>
                     <date-picker class="input-date" style="margin-left:20px; padding-right:5px;" lang="en" format="YYYY-MM-DD" v-model="dateselect"></date-picker>
                  </span>
               </div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center p-3">
         <div class="col-xl-9 col-md-9 col-12 BG-gray">
            <div class="row text-center color_yellow mt-1">
               <span class="col-xl-1 col-md-1 col-1">#</span>
               <span class="col-xl-4 col-md-4 col-4">ว/ด/ป เวลา</span>
               <span class="col-xl-3 col-md-3 col-3">ยูสเซอร์</span>
               <span class="col-xl-4 col-md-4 col-4">ยอดเสีย 5%</span>
            </div>
            <div class="row text-center font14 mt-2">
               <span class="col-xl-1 col-md-1 col-1">1</span>
               <span class="col-xl-4 col-md-4 col-4">20/08/2019 16:50</span>
               <span class="col-xl-3 col-md-3 col-3">145222</span>
               <span class="col-xl-4 col-md-4 col-4">10</span>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   name: "Affiliate",
   data() {
      return {
         codesuggest: "",
         dateselect: new Date(),
         attrs: [
            {
               key: "today",
               highlight: true,
               dates: new Date()
            }
         ],
         date: new Date(),
         option: {
            type: "day",
            SundayFirst: false,
            week: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
            month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            format: "YYYY-MM-DD",
            color: {
               header: "primary",
               headerText: "white",
               checkedDay: "primary"
            },
            placeholder: "2018-04-13",
            buttons: {
               ok: "OK",
               clear: "Clear",
               today: "Today"
            },
            overlayOpacity: 0.5
         }
      };
   }
};
</script>

<style>
.bg-aff-share {
   background: #2c2c2c;
   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
   border-radius: 7px;
}
.line-yellow {
   border: 0.7px solid #ffde30;
}
</style>
