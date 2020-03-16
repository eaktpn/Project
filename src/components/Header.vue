<template>
   <div class="header">
      <div class="BG-Header">
         <div class="container ">
            <div class="row justify-content-center p-3">
               <div class="col-xl-9 col-md-9 col-12">
                  <div class="row justify-content-center">
                     <div class="col-6 align-self-center"><mdb-icon icon="bars" @click.native="toggleLeftSideNav" class="icon-menu fas2 fab2" /></div>
                     <div class="col-6 text-right"><img src="/images/logo/joker24h.png" width="40%;" style="max-width:80px;" /></div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="mb-4"></div>
      <mdb-side-nav :OpenedFromOutside.sync="toggleA" hidden waves>
         <ul>
            <li>
               <mdb-side-nav-nav>
                  <div class="container mt-4">
                     <div class="row justify-content-center">
                        <div class="col-4"><img src="/images/icon/user.png" width="110%;" class="ml-2 mt-1" style="max-width:55px;" /></div>
                        <div class="col-8 text-left">
                           Apitsada132 <br />
                           <mdb-btn block class="font14 color_back btn-profile mt-1">ดูข้อมูลผู้ใช้</mdb-btn>
                        </div>
                     </div>
                  </div>
                  <hr class="my-hr mt-4" />
                  <mdb-side-nav-item icon="home" href="#">หน้าหลัก</mdb-side-nav-item>
                  <mdb-side-nav-item icon="thumbs-up" href="#">โปรโมชั่น</mdb-side-nav-item>
                  <mdb-side-nav-item icon="history" href="#">ประวัติการใช้งาน</mdb-side-nav-item>
                  <mdb-side-nav-item icon="download" href="#">ดาวน์โหลด</mdb-side-nav-item>
                  <mdb-side-nav-item icon="sign-out-alt" href="#">ออกจากระบบ</mdb-side-nav-item>
               </mdb-side-nav-nav>
            </li>
         </ul>
      </mdb-side-nav>
   </div>
</template>

<script>
import {} from "mdbvue";
export default {
   name: "SideNavPage",
   components: {},
   data() {
      return {
         toggleA: false
      };
   },
   methods: {
      toggleLeftSideNav() {
         this.toggleA = !this.toggleA;
      }
   }
};
</script>
<style lang="scss">
.BG-Header {
   background: #181818;
   box-shadow: 0px 2px 10px #70f6ff;
}
.header {
   .fas,
   .fab {
      color: #ffffff;
      font-size: 1.2rem !important;
   }
   .fas2,
   .fab2 {
      color: #ffffff;
      font-size: 2rem !important;
   }
   .my-hr {
      //height: 2px;
      width: 100%;
      border-bottom: 1px solid #000000;
   }
   .side-nav .logo-wrapper {
      height: auto !important;
   }
   .side-nav .logo-wrapper a {
      height: auto !important;
   }
   .side-nav .collapsible a {
      height: 36px;
      font-size: 1rem;
      font-weight: 300;
      line-height: 36px;
      color: #fff;
   }
   .icon-div {
      width: 49%;
      display: inline-block;
   }
   .icon-div .fa {
      cursor: pointer;
   }
   .main_width {
      max-width: 576px;
   }
   .icon-menu {
      color: #ffde30;
      cursor: pointer;
      font-size: 22px;
   }
   .btn-profile {
      background: #fcff68 !important;
      box-shadow: 0px 4px 6px rgba(50, 50, 93, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      padding: 5px 15px 6px 15px;
   }
}
</style>
