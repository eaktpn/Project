<template>
   <div class="container">
      <div class="row justify-content-center">
         <div class="col-xl-9 col-md-9 col-12 font26" style="font-weight:400;">ฝากเงิน</div>
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
         <div class="col-xl-9 col-md-9 col-12 BG-yellow color_red text-center font18 p-4" style="font-weight:400;">
            แจ้งเตือนก่อนฝาก
            <div class="font16 mt-2" style="color:#747474;">ลูกค้าทุกท่านต้องมียอดไม่ต่ำกว่า 10 บาท<br />มิเช่นนั้น ยอดเทิร์นจะถูกคิดรวมกับของเก่า</div>
         </div>
      </div>
      <div class="row justify-content-center p-3">
         <div class="col-xl-9 col-md-9 col-12 BG-pink color_back font18 p-4" style="font-weight:400;">
            <div class="text-center">คำเตือน</div>
            <div class="font16 mt-2" style="color:#606060;">ต้องใช้บัญชีที่สมัครฝากเงินเข้ามาเท่านั้น และต้องโอนเงินผ่านช้องทางแอพพลิเคชั่นของธนาคารบานมือถือเท่านั้น มิเช่นนั้นจะไม่สามารถยืนยันรายการฝากได้<br />ถ้าเกิดข้อผิดพลาดของระบบให้แจ้งกับพนักงานทันที กรณีที่ไม่แจ้งเราขอสงวนสิทธิ์การถอนเงินทุกกรณี</div>
         </div>
      </div>
      <div class="row justify-content-center px-3">
         <div class="col-xl-9 col-md-9 col-12 BG-gray-radius text-center">
            <img src="/images/bank/SCB.png" width="100%;" style="max-width:80px;" />
            <div class="mt-3">ชื่อบัญชี : เอกชัย</div>
            <div>ธนาคาร : ไทยพาณิชย์</div>
            <div>เลขบัญชี : 2564445555</div>
            <mdb-btn color="warning" class="color_back font16 px-3 py-1 mt-2">คัดลอก</mdb-btn>
            <div class="hr-deposit my-3"></div>
            <div>คุณได้โบนัส <label class="color_blue">“สมาชิกใหม่ 50%”</label></div>
            <a href="" target="_blank">
               <mdb-btn size="md" class="btn-line-dep color_white font16"> <img src="/images/icon/lineback.png" width="20" /> รับแจ้งเตือนผ่านไลน์ </mdb-btn>
            </a>
            <div class="font14 mt-2">*กดเพิ่มเพื่อนเพื่อรับบริการแจ้งเตือนยอดฝาก</div>
            <div class="color_gray font14 mt-2">**หลังจากโอนเงินแล้ว ระบบจะใช้เวลาดำเนินการไม่เกิน 1 นาที แต่ผากเกินเวลาที่กำหนด ให้ติดต่อพนักงานทันที</div>
         </div>
      </div>
      <div class="mt-3"></div>
   </div>
</template>

<script>
export default {};
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
</style>
