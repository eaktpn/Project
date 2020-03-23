<template>
   <div class="container">
      <div class="row justify-content-center">
         <div class="col-xl-9 col-md-9 col-12" style="font-weight:400;">
            <div class="row justify-content-center">
               <div class="col-6 font24">ประวัติการใช้งาน</div>
               <div class="col-6 align-self-center text-right color_yellow"><mdb-icon icon="angle-double-left" /><router-link to="/" class="color_yellow"> ย้อนกลับ</router-link></div>
            </div>
         </div>
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
            <div style="height:350px; overflow-y:auto; overflow-x:hidden;">
               <div class="row justify-content-center text-center color_blue mt-2">
                  <span class="col-xl-4 col-md-4 col-4">ว/ด/ป เวลา</span>
                  <span class="col-xl-4 col-md-4 col-4">จำนวนเงิน</span>
                  <span class="col-xl-4 col-md-4 col-4 mb-2">สถานะ</span>
               </div>
               <div class="hr-his mb-2"></div>
               <div v-for="val in deposit" :key="val.ID">
                  <div class="row justify-content-center text-center font14">
                     <span class="col-xl-4 col-md-4 col-4">{{ val.Date | moment("YYYY-MM-DD") }} {{ val.Time }}</span>
                     <span class="col-xl-4 col-md-4 col-4">{{ val.Depo_num }}</span>
                     <span class="col-xl-4 col-md-4 col-4 mb-2" v-if="val.Status === 1">
                        <font color="#6FCF97">สำเร็จ</font>
                     </span>
                     <span class="col-xl-4 col-md-4 col-4 mb-2" v-else>
                        <font color="#F2994A">กำลังดำเนินการ</font>
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center p-3" style="margin-top:-10px;" v-if="withdrawselect === true">
         <div class="col-xl-9 col-md-9 col-12 border-his">
            <div style="height:350px; overflow-y:auto; overflow-x:hidden;">
               <div class="row justify-content-center text-center color_blue mt-2">
                  <span class="col-xl-4 col-md-4 col-4">ว/ด/ป เวลา</span>
                  <span class="col-xl-4 col-md-4 col-4">จำนวนเงิน</span>
                  <span class="col-xl-4 col-md-4 col-4 mb-2">สถานะ</span>
               </div>
               <div class="hr-his mb-2"></div>
               <div v-for="val in withdraw" :key="val.ID">
                  <div class="row justify-content-center text-center font14">
                     <span class="col-xl-4 col-md-4 col-4">{{ val.Date | moment("YYYY-MM-DD") }} {{ val.Time }}</span>
                     <span class="col-xl-4 col-md-4 col-4">{{ val.Withd_num }}</span>
                     <span class="col-xl-4 col-md-4 col-4 mb-2" v-if="val.Status === 1">
                        <font color="#6FCF97">สำเร็จ</font>
                     </span>
                     <span class="col-xl-4 col-md-4 col-4 mb-2" v-if="val.Status === 2">
                        <font color="#F2994A">รอโอนเงิน</font>
                     </span>
                     <span class="col-xl-4 col-md-4 col-4 mb-2" v-if="val.Status === 3">
                        <font color="#F2994A">กำลังดำเนินการ</font>
                     </span>
                     <span class="col-xl-4 col-md-4 col-4 mb-2" v-if="val.Status === 4">
                        <font color="#FF0033">ยกเลิก</font>
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="row justify-content-center p-3" style="margin-top:-10px;" v-if="bonusselect === true">
         <div class="col-xl-9 col-md-9 col-12 border-his">
            <div style="height:350px; overflow-y:auto; overflow-x:hidden;">
               <div class="row justify-content-center text-center color_blue mt-2">
                  <span class="col-xl-3 col-md-3 col-3">ว/ด/ป เวลา</span>
                  <span class="col-xl-3 col-md-3 col-3">โบนัส</span>
                  <span class="col-xl-3 col-md-3 col-3">ประเภท</span>
                  <span class="col-xl-3 col-md-3 col-3 mb-2">จำนวนโบนัส</span>
               </div>
               <div class="hr-his mb-2"></div>
               <div v-for="val in Bonus" :key="val.ID">
                  <div class="row justify-content-center text-center font14">
                     <span class="col-xl-3 col-md-3 col-3">{{ val.Date | moment("YYYY-MM-DD") }} {{ val.Time }}</span>
                     <span class="col-xl-3 col-md-3 col-3">{{ val.bonus }}</span>
                     <span class="col-xl-3 col-md-3 col-3">{{ val.bonus }}</span>
                     <span class="col-xl-3 col-md-3 col-3 mb-2">{{ val.number }}</span>
                  </div>
               </div>
               <div v-for="val in Bonusfree" :key="val.ID">
                  <div class="row justify-content-center text-center font14">
                     <span class="col-xl-3 col-md-3 col-3">{{ val.Date | moment("YYYY-MM-DD") }} {{ val.Time }}</span>
                     <span class="col-xl-3 col-md-3 col-3">โบนัสฟรี</span>
                     <span class="col-xl-3 col-md-3 col-3">ฟรี</span>
                     <span class="col-xl-3 col-md-3 col-3 mb-2">{{ val.Bonus }}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
// const jwt = require("jsonwebtoken");
// import moment from "moment";
import {mapGetters} from "vuex";
// import $ from "jquery";
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
   computed: {
      ...mapGetters({
         isLogin: "isLogin",
         user: "user",
         amount: "amount",
         token: "token"
      })
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
   },
   mounted() {
      this.$session.set("page", "/History");
      if (this.isLogin) {
         this.$axios.get("/History", this.token).then(response => {
            this.deposit = response.data.data.dataDepo;
            this.depositlength = response.data.data.dataDepo.length;
            this.withdraw = response.data.data.dataWith;
            this.withdrawlength = response.data.data.dataWith.length;
            this.Bonus = response.data.data.dataBonus;
            this.Bonuslength = response.data.data.dataBonus.length;
            this.Bonusfree = response.data.data.dataBonusfree;
            this.Bonusfreelength = response.data.data.dataBonusfree.length;
         });
      } else {
         this.$router.push("/");
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
