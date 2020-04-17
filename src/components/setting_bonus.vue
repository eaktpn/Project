<template>
   <mdb-modal id="modalbonus" :show="showsetting" @close="setshowsetting ()" hide-header hide-footer centered no-close-on-esc hide-header-close v-model="settingSwitch" @change="onChange()">
      <div class="row" style="padding:25px;">
         <div class="col-12">
            <label class="font24">เลือกรับ / ไม่รับโบนัส</label>
         </div>
         <div class="col-3 mt-2">
            <label class="switch">
               <input type="checkbox" v-model="settingSwitch" @change="onChange()" />
               <span class="slider round"></span>
            </label>
         </div>
         <div class="col-9 mt-2">
            <label class="color_yellow">เลือกเปิดเพื่อรับโบนัส !!</label>
            <label class="color_yellow">ระบบจะเลือกโบนัสที่ดีที่สุดให้คุณ</label>
         </div>
      </div>
   </mdb-modal>
</template>

<script>
const jwt = require("jsonwebtoken");
import {mapActions, mapGetters} from "vuex";
import $ from "jquery";
export default {
   name: "Main",
   data() {
      return {
         settingSwitch: "",
         showsetting: false,
      };
   },
mounted () {
 if (this.user.is_bonus === 1) {
            this.settingSwitch = true;
         } else {
            this.settingSwitch = false;
         }
         this.showsetting = true;

},
   computed: {
      ...mapGetters({
         isLogin: "isLogin",
         user: "user",
         amount: "amount",
         token: "token",
         settingbonus:'settingBonus',
settingBonus : 'settingBonus'
      }),
   },
   methods: {
      ...mapActions({
         storeLogin: "login",
         storeLoout: "logout",
updatesettingBonus :'updatesettingBonus'
      }),
setshowsetting() {
   this.showsetting = false
this.updatesettingBonus(false)

},
      onChange() {
         let payload = {
            bonus_status: this.settingSwitch ? 1 : 0,
         };
         let token = jwt.sign(payload, this.$keypayload, {
            expiresIn: "5s",
         });
         $(".preloader").show();
         this.$axios
            .post("/is_bonus", {token: token}, this.token)
            .then((response) => {
               $(".preloader").hide();
               if (response.data.code != "SUCCESS") {
                  this.$swal({
                     title: "เกิดข้อผิดพลาด",
                     text: "ไม่สามารเปิด-ปิดโบนัสได้",
                     type: "error",
                     timer: 5000,
                     showConfirmButton: true,
                     allowOutsideClick: false,
                     allowEscapeKey: false,
                  });
               }
               $(".preloader").hide();
               this.$axios
                  .get("/is_login", this.token)
                  .then((response) => {
                     $(".preloader").hide();
                     if (response.data.msg != "LOGOUT") {
                        this.$session.set("isLogin", true);
                        this.$session.set("token", response.data);
                        this.storeLogin(response.data);
                        this.$router.push("/");
                     } else {
                        this.$swal({
                           title: "เกิดข้อผิดพลาด",
                           text: "มีการเข้าสู่ระบบจากที่อื่น",
                           type: "error",
                           timer: 5000,
                           showConfirmButton: true,
                           allowOutsideClick: false,
                           allowEscapeKey: false,
                        });
                        $(".preloader").hide();
                        this.$router.push("/");
                     }
                  })
                  .catch(function(error) {
                     console.log(error);
                  });
            })
            .catch(function(error) {
               console.log(error);
            });
      },
      showModalcheck() {
         if (this.user.is_bonus === 1) {
            this.settingSwitch = true;
         } else {
            this.settingSwitch = false;
         }
         this.showsetting = true;
      },
   },

};
</script>

<style></style>
