<template>
	<div class="container" v-if="isLogin">
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
		<!-- <div class="row justify-content-center px-3 mt-3">
			<div class="col-xl-9 col-md-9 col-12 login-game text-center color_back font28" style="font-weight:400; cursor: pointer;" @click="linkGame2()"><img src="/images/icon/gamepad22.png" class="m-2" width="100%;" style="max-width:50px; margin-top:-2px;" /> เข้าเกม</div>
		</div> -->
		<a href="https://winbetth.com/" target="_blank">
			<div class="row justify-content-center px-3 mt-3">
				<div class="col-xl-9 col-md-9 col-12 login-game text-center color_back font28" style="font-weight:400; cursor: pointer;"><img src="/images/icon/gamepad22.png" class="m-2" width="100%;" style="max-width:50px; margin-top:-2px;" /> เข้าเกม</div>
			</div>
		</a>
		<div class="row justify-content-center p-2 mt-2">
			<div class="col-xl-9 col-md-9 col-12">
				<div class="row text-center">
					<div class="col-xl-3 col-md-4 col-4 padding-main mb-3">
						<router-link to="/Depositauto">
							<div class="BG-gray-radius-main" style="cursor: pointer;">
								<img src="/images/icon/wallet.png" width="60px;" class="p-1" />
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
								<img src="/images/icon/add-user2.png" width="60px;" class="p-1" />
								<div class="color_white font16" style="font-weight:400;">รับรายได้ฟรี</div>
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
								<img src="/images/icon/wall-clock2.png" width="60px;" class="p-1" />
								<div class="color_white font16" style="font-weight:400;">ประวัติ</div>
							</div>
						</router-link>
					</div>
					<div class="col-xl-3 col-md-4 col-4 padding-main mb-3">
						<div class="BG-gray-radius-main" style="cursor: pointer;" @click="settingBonusshow()">
							<img src="/images/icon/bonus-setting.png" width="60px;" class="p-1" />
							<div class="color_white font16" style="font-weight:400;">ตั้งค่าโบนัส</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<settingbonus v-if="settingBonus === true"></settingbonus>
		<ModalCheck></ModalCheck>
		<Checkfullnamebank v-if="user.active === 0"></Checkfullnamebank>
	</div>
</template>

<script>
	let getwheelEvent = 'https://allbet.asia/wheel/script'
	import ModalCheck from '../components/ModalCheck.vue'
	import Checkfullnamebank from '../components/Checkfullname_bank.vue'
	import settingbonus from '../components/setting_bonus.vue'
	// const jwt = require("jsonwebtoken");
	import momentjs from 'moment'
	import {mapActions, mapGetters} from 'vuex'
	import {Carousel, Slide} from 'vue-carousel'
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
				settingbonuscheck: false,
			}
		},
		components: {
			ModalCheck,
			Carousel,
			Slide,
			Checkfullnamebank,
			settingbonus,
		},
		methods: {
			...mapActions({
				storeLogin: 'login',
				storeLoout: 'logout',
				updatesettingBonus: 'updatesettingBonus',
			}),
			currencyFormat(n) {
				n = parseFloat(n)
				return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
			},
			linkGame() {
				// var formPlaygame = document.createElement('form')
				// formPlaygame.setAttribute('method', 'post')
				// formPlaygame.setAttribute('action', 'https://sexy333.com')
				// formPlaygame.setAttribute('target', '_blank')
				// var i = document.createElement('input')
				// i.setAttribute('type', 'hidden')
				// i.setAttribute('name', 'Username')
				// i.setAttribute('value', this.user.username)
				// formPlaygame.appendChild(i)
				// var p = document.createElement('input')
				// p.setAttribute('type', 'hidden')
				// p.setAttribute('name', 'Password')
				// p.setAttribute('value', this.user.password)
				// formPlaygame.appendChild(p)
				// var a = document.createElement('input')
				// a.setAttribute('type', 'hidden')
				// a.setAttribute('name', 'Action')
				// a.setAttribute('value', 'GameIndex')
				// formPlaygame.appendChild(a)
				// var gamecode = document.createElement('input')
				// gamecode.setAttribute('type', 'hidden')
				// gamecode.setAttribute('name', 'GameCode')
				// // p.setAttribute("value", this.user.password);
				// formPlaygame.appendChild(gamecode)
				// document.body.appendChild(formPlaygame)
				// formPlaygame.submit()

				// var formPlaygame = document.createElement('form')
				// formPlaygame.setAttribute('method', 'post')
				// formPlaygame.setAttribute('enctype', 'application/json')
				// formPlaygame.setAttribute('action', 'https://sportbook-ambbet.serverless-hub.com/spa/member/login')
				// formPlaygame.setAttribute('target', '_blank')
				// var i = document.createElement('input')
				// i.setAttribute('type', 'hidden')
				// i.setAttribute('name', 'username')
				// i.setAttribute('value', this.user.username)
				// formPlaygame.appendChild(i)
				// var j = document.createElement('input')
				// j.setAttribute('type', 'hidden')
				// j.setAttribute('name', 'password')
				// j.setAttribute('value', this.user.password)
				// formPlaygame.appendChild(j)
				// document.body.appendChild(formPlaygame)
				// formPlaygame.submit()

				var formPlaygame = document.createElement('form')
				formPlaygame.setAttribute('method', 'post')
				formPlaygame.setAttribute('action', 'https://aba-gaming.com/sexy222')
				formPlaygame.setAttribute('target', '_blank')
				var i = document.createElement('input')
				i.setAttribute('type', 'hidden')
				i.setAttribute('name', 'username')
				i.setAttribute('value', this.user.username)
				formPlaygame.appendChild(i)
				var j = document.createElement('input')
				j.setAttribute('type', 'hidden')
				j.setAttribute('name', 'password')
				j.setAttribute('value', this.user.password)
				formPlaygame.appendChild(j)
				document.body.appendChild(formPlaygame)
				formPlaygame.submit()
			},
			linkGame2() {
				// this.$axios.get('/logingame', this.token).then((response) => {
				// 	window.open(response.data.url, 'game')
				// })
				var formPlaygame = document.createElement('form')
				formPlaygame.setAttribute('method', 'get')
				formPlaygame.setAttribute('action', 'https://win222.abatopup.com/api/logingame')
				formPlaygame.setAttribute('target', '_blank')
				var i = document.createElement('input')
				i.setAttribute('type', 'hidden')
				i.setAttribute('name', 'username')
				i.setAttribute('value', this.user.username)
				formPlaygame.appendChild(i)
				var j = document.createElement('input')
				j.setAttribute('type', 'hidden')
				j.setAttribute('name', 'password')
				j.setAttribute('value', this.user.password)
				formPlaygame.appendChild(j)
				document.body.appendChild(formPlaygame)
				formPlaygame.submit()
			},
			settingBonusshow() {
				this.updatesettingBonus(true)
			},
			OTPcheck() {
				this.counting = true
				this.btnsubmit = false
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
				settingBonus: 'settingBonus',
			}),
		},
		mounted() {
			popup_main.child('main').on('value', (snap) => {
				//Popup affiliate
				var leng = snap.val()
				var show_popup_main = []
				// console.log(snap.val())
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
			if (this.isLogin) {
				this.$axios
					.get('/is_login', this.token)
					.then((response) => {
						if (response.data.msg != 'LOGOUT') {
							// this.$axios
							// 	.get('/affiliateUpdate', this.token) // Update affiliate
							// 	.then((response) => {
							// 		console.log('affiliateUpdate ' + response.data.msg)
							// 	})
							// 	.catch(function(error) {
							// 		$('.preloader').hide()
							// 		console.log(error)
							// 	})
							this.$session.set('isLogin', true)
							this.$session.set('token', response.data)
							this.storeLogin(response.data)
							$.getScript(getwheelEvent + '?session_id=' + this.user.session_id + '&service=SEXY222')
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
					.catch(() => {
						this.$swal({
							title: 'เกิดข้อผิดพลาด',
							text: 'มีการเข้าสู่ระบบจากที่อื่น',
							icon: 'error',
							timer: 5000,
							showConfirmButton: true,
						}).then(() => this.$router.push('/Logout'))
					})
			} else {
				this.$router.push('/Logout')
			}
			bannerRef.orderByKey().on('value', (snap) => {
				this.bannerimg = snap.val()
			})
		},
	}
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
		background: linear-gradient(97.95deg, #ff6d00 1.16%, #ffea31 100%) !important;
		box-shadow: 2px 3px 2px 0px #808080;
		border-radius: 12px;
	}
	.padding-main {
		padding-right: 6px !important;
		padding-left: 6px !important;
	}
	.modal-title {
		color: #eaa33b;
	}
	a {
		color: #ffffff;
	}
	a:hover {
		color: #ffffff;
	}
</style>
