<template>
	<div class="container" v-if="isLogin">
		<div class="row justify-content-center mt-3">
			<div class="col-xl-9 col-md-9 col-12 text-center">
				<carousel :per-page="1" v-bind:autoplay="true" v-bind:autoplayTimeout="4000" v-bind:loop="true" :mouse-drag="false">
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
						<div class="color_blue font26" style="font-weight:400;">{{ currencyFormat(amount) }}</div>
					</div>
				</div>
				<div class="line-main my-3"></div>
				<div class="row justify-content-center">
					<div class="col font16 mb-2">
						<div class="text-center">
							ยูสเซอร์เนม : <span style="color:#5E72E4;">{{ user.username }}</span>
						</div>
						<div class="text-center mt-2">
							รหัสผ่าน : <span style="color:#5E72E4;">{{ user.password }}</span>
						</div>
					</div>
				</div>
				<div class="col text-center">
					<router-link to="/Profile">
						<button type="button" class="btn btn-profile color_yellow font14" style="font-weight:200;">ข้อมูลบัญชี</button>
					</router-link>
				</div>
			</div>
		</div>
		<div class="row justify-content-center px-3">
			<div class="col-xl-9 col-md-9 col-12 login-game text-center font28" style="font-weight:400; cursor: pointer;" @click="linkGame()"><img src="/images/icon/gamepad.png" class="m-2" width="100%;" style="max-width:50px; margin-top:-2px;" /> เข้าเกม</div>
		</div>
		<div class="row justify-content-center p-2 mt-2">
			<div class="col-xl-9 col-md-9 col-12">
				<div class="row text-center">
					<div class="col-xl-3 col-md-4 col-4 padding-main mb-3">
						<router-link to="/Depositauto">
							<div class="BG-gray-radius-main" style="cursor: pointer;">
								<img src="/images/icon/wallet.png" width="60px;" />
								<div class="color_white font16" style="font-weight:400;">ฝากเงิน</div>
							</div>
						</router-link>
					</div>
					<div class="col-xl-3 col-md-4 col-4 padding-main mb-3">
						<router-link to="/Withdraw">
							<div class="BG-gray-radius-main" style="cursor: pointer;">
								<img src="/images/icon/cash.png" width="60px;" class="p-1" />
								<div class="color_white font16" style="font-weight:400;">ถอนเงิน</div>
							</div>
						</router-link>
					</div>
					<div class="col-xl-3 col-md-4 col-4 padding-main mb-3">
						<router-link to="/Affiliate">
							<div class="BG-gray-radius-main" style="cursor: pointer;">
								<img src="/images/icon/add-user.png" width="60px;" class="p-1" />
								<div class="color_white font16" style="font-weight:400;">แนะนำเพื่อน</div>
							</div>
						</router-link>
					</div>
					<div class="col-xl-3 col-md-4 col-4 padding-main mb-3">
						<router-link to="Bonusspecial">
							<div class="BG-gray-radius-main" style="cursor: pointer;">
								<img src="/images/icon/gift-box.png" width="60px;" class="p-1" />
								<div class="color_white font16" style="font-weight:400;">โบนัสพิเศษ</div>
							</div>
						</router-link>
					</div>
					<div class="col-xl-3 col-md-4 col-4 padding-main mb-3">
						<router-link to="/History">
							<div class="BG-gray-radius-main" style="cursor: pointer;">
								<img src="/images/icon/wall-clock.png" width="60px;" class="p-1" />
								<div class="color_white font16" style="font-weight:400;">ประวัติทำรายการ</div>
							</div>
						</router-link>
					</div>
					<div class="col-xl-3 col-md-4 col-4 padding-main mb-3">
						<a href="https://lin.ee/ajg7Ize" target="_blank">
							<div class="BG-gray-radius-main" style="cursor: pointer;">
								<img src="/images/icon/chat.png" width="60px;" class="p-1" />
								<div class="color_white font16" style="font-weight:400;">ติดต่อพนักงาน</div>
							</div>
						</a>
					</div>
					<!-- <div class="col-xl-3 col-md-4 col-4 padding-main mb-3">
                  <a href="javascript:start_wheel();">
                     <div class="BG-gray-radius-main" style="cursor: pointer;">
                        <img src="/images/icon/chat.png" width="60px;" class="p-1" />
                        <div class="color_white font16" style="font-weight:400;">กงล้อ</div>
                     </div>
                  </a>
               </div> -->
				</div>
			</div>
		</div>
		<ModalCheck></ModalCheck>
		<div v-if="user">
			<Checkfullnamebank v-if="user.active === 1"></Checkfullnamebank>
		</div>
		<!-- <div>
         <b-modal id="modalOTP" hide-footer centered title="ยืนยัน OTP" no-close-on-esc no-close-on-backdrop hide-header-close v-model="checkOTP">
            <div>
               <p class="text-white" style="margin-top:5px;">หมายเลขโทรศัพท์ {{ user.phone_number }}</p>
               <b-form-input type="text" v-model="confirm_phonenumber" maxlength="10" onkeypress="return event.charCode >= 48 && event.charCode <= 57" style="margin-top:-10px;"></b-form-input>
            </div>
            <div v-if="counting === true">
               <p class="text-white" style="margin-top:15px;">หมายเลข OTP</p>
               <b-form-input type="text" v-model="confirm_OTP" maxlength="6" onkeypress="return event.charCode >= 48 && event.charCode <= 57" style="margin-top:-10px;"></b-form-input>
            </div>
            <p class="text-white" style="margin-top:20px;">
               กรณีไม่ได้รับรหัส
               <b>OTP</b> ให้ติดต่อแอดมินทาง
               <a href="http://line.me/ti/p/@winbetth" target="_bank" v-b-tooltip title="Tooltip in a modal!" class="color_green">
                  <b>LINE CLICK</b>
               </a>
            </p>
            <div class="text-right" style="margin-top:20px; margin-bottom:3px;">
               <b-button size="xl" variant="warning" @click="OTP()" class="text-white" :disabled="counting">
                  <countdown v-if="counting" :time="90000" :leading-zero="false" @countdownend="countdownend()">
                     <template slot-scope="props">{{ props.totalSeconds }} วินาที</template> </countdown
                  >ขอรหัส OTP
               </b-button>
               <b-button type="button" :disabled="btnsubmit" :class="btnsubmit === false ? 'btn btn-infobtn' : 'disabled btn btn-info'" @click="phonenumber()">ยืนยันเบอร์โทรศัพท์</b-button>
            </div>
         </b-modal>
      </div> -->
	</div>
</template>

<script>
	let getwheelEvent = 'https://allbet.asia/wheel/script'
	import ModalCheck from '../components/ModalCheck.vue'
	import Checkfullnamebank from '../components/Checkfullname_bank.vue'
	const jwt = require('jsonwebtoken')
	import momentjs from 'moment'
	import {mapActions, mapGetters} from 'vuex'
	import {Carousel, Slide} from 'vue-carousel'
	import {} from 'mdbvue'
	import $ from 'jquery'
	import firebase from 'firebase'
	var bannerRef = firebase.database().ref('banner')
	var popup_main = firebase.database().ref('popup')
	export default {
		name: 'Mian',
		data() {
			return {
				btnsubmit: true,
				active: false,
				bannerimg: '',
				showDialog: true,
				confirm_phonenumber: null,
				confirm_OTP: '',
				counting: null,
				settingSwitch: '',
				showsetting: false,
			}
		},
		components: {
			ModalCheck,
			Carousel,
			Slide,
			Checkfullnamebank,
		},
		methods: {
			...mapActions({
				storeLogin: 'login',
				storeLoout: 'logout',
			}),
			currencyFormat(n) {
				n = parseFloat(n)
				return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
			},
			linkGame() {
				var formPlaygame = document.createElement('form')
				formPlaygame.setAttribute('method', 'post')
				formPlaygame.setAttribute('action', 'https://www.joker123.net/SignIn')
				formPlaygame.setAttribute('target', '_blank')
				var i = document.createElement('input')
				i.setAttribute('type', 'hidden')
				i.setAttribute('name', 'Username')
				i.setAttribute('value', this.user.username)
				formPlaygame.appendChild(i)
				var p = document.createElement('input')
				p.setAttribute('type', 'hidden')
				p.setAttribute('name', 'Password')
				p.setAttribute('value', this.user.password)
				formPlaygame.appendChild(p)
				var a = document.createElement('input')
				a.setAttribute('type', 'hidden')
				a.setAttribute('name', 'Action')
				a.setAttribute('value', 'GameIndex')
				formPlaygame.appendChild(a)
				var gamecode = document.createElement('input')
				gamecode.setAttribute('type', 'hidden')
				gamecode.setAttribute('name', 'GameCode')
				// p.setAttribute("value", this.user.password);
				formPlaygame.appendChild(gamecode)
				document.body.appendChild(formPlaygame)
				formPlaygame.submit()
				// var formPlaygame = document.createElement("form");
				// formPlaygame.setAttribute("method", "post");
				// formPlaygame.setAttribute("action", "https://joker.slot789th.com");
				// formPlaygame.setAttribute("target", "_blank");
				// var i = document.createElement("input");
				// i.setAttribute("type", "hidden");
				// i.setAttribute("name", "username");
				// i.setAttribute("value", this.user.username);
				// formPlaygame.appendChild(i);
				// var j = document.createElement("input");
				// j.setAttribute("type", "hidden");
				// j.setAttribute("name", "password");
				// j.setAttribute("value", this.user.password);
				// formPlaygame.appendChild(j);
				// document.body.appendChild(formPlaygame);
				// formPlaygame.submit();
			},
			// OTP() {
			//    // Check phonenumber
			//    if (this.confirm_phonenumber === "") {
			//       this.$swal({
			//          icon: "error",
			//          title: "เกิดข้อผิดพลาด",
			//          text: "กรุณากรอกเบอโทรศัพท์",
			//          timer: 5000,
			//          showConfirmButton: true,
			//          allowOutsideClick: false,
			//          allowEscapeKey: false
			//       });
			//    } else if (this.confirm_phonenumber.length !== 10) {
			//       this.$swal({
			//          title: "เบอร์โทรศัพท์",
			//          text: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง",
			//          icon: "warning", //error warning success
			//          timer: 5000,
			//          showConfirmButton: true,
			//          allowOutsideClick: false,
			//          allowEscapeKey: false
			//       });
			//    } else if (this.confirm_phonenumber[0] !== "0") {
			//       this.$swal({
			//          title: "เบอร์โทรศัพท์",
			//          text: "เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 0 เท่านั้น",
			//          icon: "warning",
			//          timer: 5000,
			//          showConfirmButton: true,
			//          allowOutsideClick: false,
			//          allowEscapeKey: false
			//       });
			//    } else if (this.confirm_phonenumber.length === 10) {
			//       let payload = {
			//          phone_number: this.confirm_phonenumber
			//       };
			//       let token = jwt.sign(payload, this.$keypayload, {
			//          expiresIn: "5s"
			//       });
			//       $(".preloader").show();
			//       this.$axios.post("/otp", {token: token}, this.token).then(response => {
			//          $(".preloader").hide();
			//          if (response.data.code === "ERROR") {
			//             this.$swal({
			//                icon: "warning",
			//                title: "เกิดข้อผิดพลาด",
			//                text: response.data.msg,
			//                timer: 5000,
			//                showConfirmButton: true,
			//                allowOutsideClick: false,
			//                allowEscapeKey: false
			//             });
			//          } else {
			//             this.$swal({
			//                icon: "success",
			//                title: "สำเร็จ",
			//                html: "ระบบได้ส่งรหัส OTP ไปยัง <br> หมายเลข " + this.confirm_phonenumber + " เรียบร้อยแล้ว<br>กรุณากรอกรหัส OTP ที่ได้รับ",
			//                timer: 5000,
			//                showConfirmButton: true,
			//                allowOutsideClick: false,
			//                allowEscapeKey: false
			//             });
			//             this.counting = true;
			//             this.btnsubmit = false;
			//          }
			//       });
			//    }
			// },
			// countdownend: function() {
			//    this.counting = false;
			//    this.btnsubmit = true;
			// },
			// phonenumber() {
			//    let payload = {
			//       phone_number: this.confirm_phonenumber,
			//       otp: this.confirm_OTP
			//    };
			//    if (this.confirm_phonenumber === "" || this.confirm_OTP === "") {
			//       this.$swal({
			//          icon: "error",
			//          title: "เกิดข้อผิดพลาด",
			//          text: "หมายเลข OTP ผิดพลาด",
			//          timer: 5000,
			//          showConfirmButton: true,
			//          allowOutsideClick: false,
			//          allowEscapeKey: false
			//       });
			//    } else {
			//       let token = jwt.sign(payload, this.$keypayload, {
			//          expiresIn: "5s"
			//       });
			//       $(".preloader").show();
			//       this.$axios.post("/otp_verify", {token: token}, this.token).then(response => {
			//          $(".preloader").hide();
			//          if (response.data.code === "SUCCESS") {
			//             this.$swal({
			//                icon: "success",
			//                title: "ยืนยันสำเร็จ",
			//                timer: 5000,
			//                showConfirmButton: true,
			//                allowOutsideClick: false,
			//                allowEscapeKey: false
			//             }).then(result => {
			//                if (result.value) {
			//                   $("#modalOTP").hide();
			//                   $("#modalOTP___BV_modal_backdrop_").hide();
			//                }
			//             });
			//             this.$router.push("/");
			//          }
			//          if (response.data.code === "ERROR") {
			//             $(".preloader").hide();
			//             this.$swal({
			//                icon: "error",
			//                title: "เกิดข้อผิดพลาด",
			//                text: "รหัส OTP ไม่ถูกต้อง",
			//                timer: 5000,
			//                showConfirmButton: true,
			//                allowOutsideClick: false,
			//                allowEscapeKey: false
			//             });
			//          }
			//       });
			//    }
			// },
			OTPcheck() {
				this.counting = true
				this.btnsubmit = false
				console.log(this.counting)
			},
			onChange() {
				let payload = {
					bonus_status: this.settingSwitch ? 1 : 0,
				}
				let token = jwt.sign(payload, this.$keypayload, {
					expiresIn: '5s',
				})
				$('.preloader').show()
				this.$axios
					.post('/is_bonus', {token: token}, this.token)
					.then((response) => {
						$('.preloader').hide()
						if (response.data.code != 'SUCCESS') {
							this.$swal({
								title: 'เกิดข้อผิดพลาด',
								text: 'ไม่สามารเปิด-ปิดโบนัสได้',
								icon: 'error',
								timer: 5000,
								showConfirmButton: true,
								allowOutsideClick: false,
								allowEscapeKey: false,
							})
						}
						$('.preloader').hide()
						this.$axios
							.get('/is_login', this.token)
							.then((response) => {
								$('.preloader').hide()
								if (response.data.msg != 'LOGOUT') {
									this.$session.set('isLogin', true)
									this.$session.set('token', response.data)
									this.storeLogin(response.data)
								} else {
									this.$swal({
										title: 'เกิดข้อผิดพลาด',
										text: 'มีการเข้าสู่ระบบจากที่อื่น',
										icon: 'error',
										timer: 5000,
										showConfirmButton: true,
										allowOutsideClick: false,
										allowEscapeKey: false,
									})
									$('.preloader').hide()
									this.$router.push('/Logout')
								}
							})
							.catch(function(error) {
								console.log(error)
							})
					})
					.catch(function(error) {
						console.log(error)
					})
			},
			showModalcheck() {
				if (this.user.is_bonus === 1) {
					this.settingSwitch = true
				} else {
					this.settingSwitch = false
				}
				this.showsetting = true
			},
		},
		computed: {
			...mapGetters({
				isLogin: 'isLogin',
				user: 'user',
				amount: 'amount',
				token: 'token',
			}),
			checkOTP: function() {
				if (this.user.active === 0) {
					return true
				} else {
					return false
				}
			},
		},
		mounted() {
			popup_main.child('main').on('value', (snap) => {
				//Popup affiliate
				var leng = snap.val()
				var show_popup_main = []
				console.log(snap.val())
				for (var i = 0; i < leng.length; i++) {
					if (snap.val()[i].status === 1 && momentjs().format('YYYY-MM-DD HH:mm') >= snap.val()[i].date_start && momentjs().format('YYYY-MM-DD HH:mm') <= snap.val()[i].date_end) {
						show_popup_main.push({
							title: snap.val()[i].title,
							html: snap.val()[i].text,
							imageUrl: snap.val()[i].imageUrl,
							showConfirmButton: true,
						})
					}
					this.$swal.queue(show_popup_main)
				}
			})
			if (this.$session.get('isLogin')) {
				if (this.isLogin) {
					// this.$session.set("page", "/");
					this.$axios
						.get('/is_login', this.token)
						.then((response) => {
							if (response.data.msg != 'LOGOUT') {
								this.$axios
									.get('/affiliateUpdate', this.token) // Update affiliate
									.then((response) => {
										console.log('affiliateUpdate ' + response.data.msg)
									})
									.catch(function(error) {
										$('.preloader').hide()
										console.log(error)
									})
								this.$session.set('isLogin', true)
								this.$session.set('token', response.data)
								this.storeLogin(response.data)
								//this.confirm_phonenumber = this.user.phone_number; // คืนค่าเบอร์โทรศัพท์ไปช่อง input
								$.getScript(getwheelEvent + '?session_id=' + this.user.session_id + '&service=JOKER24H')
							} else {
								this.$swal({
									title: 'เกิดข้อผิดพลาด',
									text: 'มีการเข้าสู่ระบบจากที่อื่น',
									icon: 'error',
									timer: 5000,
									showConfirmButton: true,
									allowOutsideClick: false,
									allowEscapeKey: false,
								})
								this.$router.push('/Logout')
							}
						})
						.catch(function(error) {
							console.log(error)
						})

					this.checkLogin = 1
				}
			} else {
				this.checkLogin = 0
				console.log('Logout main')
				this.$router.push('/Logout')
			}
			bannerRef.orderByKey().on('value', (snap) => {
				this.bannerimg = snap.val()
			})
		},
	}
</script>

<style>
	/*---------VueCarousel----------*/
	.VueCarousel-dot {
		padding: 5px !important;
	}
	.VueCarousel-dot-container {
		margin-top: -20px !important;
		margin-bottom: 10px !important;
	}
	.VueCarousel-dot--active {
		background-color: #2461bd !important;
	}
	.VueCarousel-dot[data-v-438fd353] {
		width: 50px !important;
		height: 3px !important;
		border-radius: unset !important;
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
	.modal-title {
		color: #eaa33b;
	}
	.btn-profile {
		border-color: #fac549;
		padding: 3px 7px;
	}
</style>
