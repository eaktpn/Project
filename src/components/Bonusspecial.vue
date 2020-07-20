<template>
	<div class="container" v-if="isLogin">
		<div class="row justify-content-center px-3 mt-4">
			<div class="col-xl-9 col-md-9 col-12 BG-gray-radius" style="font-weight:400;">
				<div class="row justify-content-center">
					<div class="col-6 color_yellow font22">โบนัสพิเศษ</div>
					<div class="col-6 align-self-center text-right color_blue"><mdb-icon icon="angle-double-left" /><router-link to="/" class="color_blue"> ย้อนกลับ</router-link></div>
				</div>
			</div>
		</div>
		<div class="row justify-content-center px-3 py-1 mt-3" v-for="val in bonus" :key="val.ID">
			<div class="col-xl-6 col-md-8 col-12 BG-gray">
				<div class="row my-1" style="margin-top:-5px;">
					<div><img src="/images/icon/star.png" class="mx-3" width="100%;" style="max-width:50px;" /></div>
					<div class="align-self-center">
						<div class="font22" style="font-weight:400;">โบนัส {{ val.bonus }} บาท</div>
						<div class="color_blue font14">รับโบนัสก่อน {{ val.end_time | moment('YYYY-MM-DD') }}</div>
					</div>
					<div class="col align-self-center text-right" style="margin-right:-10px;">
						<mdb-btn color="warning" size="sm" class="color_back font16 px-3" @click="getbonus(val.id, val.bonus, val.trunover, val.hesh)">รับโบนัส</mdb-btn>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	const jwt = require('jsonwebtoken')
	// import {mdbContainer, mdbRow, mdbCol, mdbInput, mdbBtn} from "mdbvue";
	import {mapGetters, mapActions} from 'vuex'
	// import moment from "moment";
	import $ from 'jquery'
	export default {
		name: 'Bonus',
		data() {
			return {
				bank: null,
				bonus: '',
			}
		},
		computed: {
			...mapGetters({
				isLogin: 'isLogin',
				user: 'user',
				server: 'server',
				token: 'token',
			}),
		},
		methods: {
			...mapActions({
				storeLogin: 'login',
				storeLogout: 'logout',
			}),
			getbonus(id, bonus, trunover) {
				let payload = {
					id: id,
					bonus: bonus,
					trunover: trunover,
				}
				let token = jwt.sign(payload, this.$keypayload, {
					expiresIn: '5s',
				})
				$('.preloader').show()
				this.$axios.post('/get_freebonus', {token: token}, this.token).then((response) => {
					if (response.data.code === 'SUCCESS') {
						$('.preloader').hide()
						this.$swal({
							title: 'รับโบนัสสำเร็จ',
							icon: 'success',
							timer: 8000,
							html: 'ต้องทำเทิร์น ' + trunover,
							showConfirmButton: true,
							allowOutsideClick: false,
							allowEscapeKey: false,
						}).then((response) => {
							console.log(response)
							$('.preloader').hide()
							this.$router.push('/')
						})
					} else {
						$('.preloader').hide()
						this.$swal({
							title: 'รับโบนัสไม่สำเร็จ!',
							icon: 'error',
							showConfirmButton: true,
							allowOutsideClick: false,
							allowEscapeKey: false,
						}).then((response) => {
							console.log(response)
							$('.preloader').hide()
							this.$router.push('/')
						})
					}
				})
			},
		},
		mounted() {
			// this.$session.set("page", "/Bonus");
			if (this.$session.get('isLogin')) {
				if (this.isLogin) {
					$('.preloader').show()
					this.$axios
						.get('/is_login', this.token)
						.then((response) => {
							$('.preloader').hide()
							if (response.data.msg === 'LOGOUT') {
								this.$swal({
									title: 'เกิดข้อผิดพลาด',
									text: 'มีการเข้าสู่ระบบจากที่อื่น',
									icon: 'error',
									timer: 4000,
									showConfirmButton: true,
									allowOutsideClick: false,
									allowEscapeKey: false,
								})
								this.$router.push('/Logout')
							} else {
								this.$axios
									.get('/free_bonuslist', this.token)
									.then((response) => {
										if (response.data.payload.length > 0) {
											this.bonus = response.data.payload
										} else {
											this.$swal({
												title: 'คุณไม่มีโบนัสพิเศษ',
												icon: 'warning',
												timer: 3000,
												showConfirmButton: true,
												allowOutsideClick: false,
												allowEscapeKey: false,
											}).then((response) => {
												console.log(response.data)
												this.$router.push('/')
											})
										}
									})
									.catch((err) => {
										console.log(err)
									})
							}
						})
						.catch((err) => {
							console.log(err)
						})
				}
			} else {
				console.log('Logout Bonusspecial')
				this.$router.push('/Logout')
			}
		},
	}
</script>

<style></style>
