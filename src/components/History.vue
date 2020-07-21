<template>
	<div class="container" v-if="isLogin">
		<div class="row justify-content-center px-3 mt-4">
			<div class="col-xl-9 col-md-9 col-12 BG-gray-radius">
				<div class="row justify-content-center">
					<div class="col-12" style="font-weight:400;">
						<div class="row justify-content-center">
							<div class="col-6 color_yellow font22">ประวัติการใช้งาน</div>
							<div class="col-6 align-self-center text-right color_blue"><mdb-icon icon="angle-double-left" /><router-link to="/" class="color_blue"> ย้อนกลับ</router-link></div>
						</div>
					</div>
					<div class="col-12 mt-3">
						<div class="row text-center px-3">
							<div @click="deposithis()" :class="depositselect === true ? 'bg-radius-his2 color_back' : 'bg-radius-his color_white'" style="margin:5px 5px 5px 0px;">รายการฝาก</div>
							<div @click="withdrawhis()" :class="withdrawselect === true ? 'bg-radius-his2 color_back' : 'bg-radius-his color_white'" style="margin:5px;">รายการถอน</div>
							<div @click="bonushis()" :class="bonusselect === true ? 'bg-radius-his2 color_back' : 'bg-radius-his color_white'" style="margin:5px;">โบนัส</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row justify-content-center p-3 mt-1" style="margin-top:-10px;" v-if="depositselect === true">
			<div class="col-xl-9 col-md-9 col-12 border-his">
				<div style="height:350px; overflow-y:auto; overflow-x:hidden;">
					<div class="row justify-content-center text-center color_orange mt-2">
						<span class="col-xl-4 col-md-4 col-4">ว/ด/ป เวลา</span>
						<span class="col-xl-4 col-md-4 col-4">จำนวนเงิน</span>
						<span class="col-xl-4 col-md-4 col-4 mb-2">สถานะ</span>
					</div>
					<div class="hr-his mb-2"></div>
					<div v-for="val in deposit" :key="val.ID">
						<div class="row justify-content-center text-center font14">
							<span class="col-xl-4 col-md-4 col-4">{{ val.date | moment('YYYY-MM-DD') }} {{ val.time }}</span>
							<span class="col-xl-4 col-md-4 col-4">{{ val.amount }}</span>
							<span class="col-xl-4 col-md-4 col-4 mb-2" v-if="val.status === 1">
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
		<div class="row justify-content-center p-3 mt-1" style="margin-top:-10px;" v-if="withdrawselect === true">
			<div class="col-xl-9 col-md-9 col-12 border-his">
				<div style="height:350px; overflow-y:auto; overflow-x:hidden;">
					<div class="row justify-content-center text-center color_orange mt-2">
						<span class="col-xl-4 col-md-4 col-4">ว/ด/ป เวลา</span>
						<span class="col-xl-4 col-md-4 col-4">จำนวนเงิน</span>
						<span class="col-xl-4 col-md-4 col-4 mb-2">สถานะ</span>
					</div>
					<div class="hr-his mb-2"></div>
					<div v-for="val in withdraw" :key="val.ID">
						<div class="row justify-content-center text-center font14">
							<span class="col-xl-4 col-md-4 col-4">{{ val.date | moment('YYYY-MM-DD') }} {{ val.time }}</span>
							<span class="col-xl-4 col-md-4 col-4">{{ val.amount }}</span>
							<span class="col-xl-4 col-md-4 col-4 mb-2" v-if="val.status === 1">
								<font color="#6FCF97">สำเร็จ</font>
							</span>
							<span class="col-xl-4 col-md-4 col-4 mb-2" v-if="val.status === 2">
								<font color="#F2994A">รอโอนเงิน</font>
							</span>
							<span class="col-xl-4 col-md-4 col-4 mb-2" v-if="val.status === 3">
								<font color="#F2994A">กำลังดำเนินการ</font>
							</span>
							<span class="col-xl-4 col-md-4 col-4 mb-2" v-if="val.status === 4">
								<font color="#FF0033">ยกเลิก</font>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row justify-content-center p-3 mt-1" style="margin-top:-10px;" v-if="bonusselect === true">
			<div class="col-xl-9 col-md-9 col-12 border-his">
				<div style="height:350px; overflow-y:auto; overflow-x:hidden;">
					<div class="row justify-content-center text-center color_orange mt-2">
						<span class="col-xl-3 col-md-3 col-3">ว/ด/ป เวลา</span>
						<span class="col-xl-3 col-md-3 col-3">ID</span>
						<span class="col-xl-3 col-md-3 col-3">โบนัส</span>
						<span class="col-xl-3 col-md-3 col-3 mb-2">จำนวนโบนัส</span>
					</div>
					<div class="hr-his mb-2"></div>
					<div v-for="val in bonus" :key="val.id">
						<div class="row justify-content-center text-center font14">
							<span class="col-xl-3 col-md-3 col-3">{{ val.date | moment('YYYY-MM-DD') }} {{ val.time }}</span>
							<span class="col-xl-3 col-md-3 col-3">{{ val.id }}</span>
							<span class="col-xl-3 col-md-3 col-3">{{ val.title }}</span>
							<span class="col-xl-3 col-md-3 col-3 mb-2">{{ val.bonus }}</span>
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
	import {mapGetters} from 'vuex'
	import $ from 'jquery'
	export default {
		name: 'History',
		data() {
			return {
				depositselect: true,
				withdrawselect: false,
				bonusselect: false,
				deposit: '',
				withdraw: '',
				Bonus: '',
				Bonusfree: '',
			}
		},
		computed: {
			...mapGetters({
				isLogin: 'isLogin',
				user: 'user',
				amount: 'amount',
				token: 'token',
			}),
		},
		methods: {
			deposithis() {
				this.depositselect = true
				this.withdrawselect = false
				this.bonusselect = false
			},
			withdrawhis() {
				this.depositselect = false
				this.withdrawselect = true
				this.bonusselect = false
			},
			bonushis() {
				this.depositselect = false
				this.withdrawselect = false
				this.bonusselect = true
			},
		},
		mounted() {
			if (this.isLogin) {
				$('.preloader').show()
				this.$axios.get('/history/deposit', this.token).then((response) => {
					$('.preloader').hide()
					this.deposit = response.data.payload
					this.depositcheckstatus = response.data.payload
					var checklist = []
					for (var i = 0; i < this.depositcheckstatus.length; i++) {
						if (this.depositcheckstatus[i].status === 5) {
							checklist.push(this.depositcheckstatus[i])
						}
					}
					this.hisdepostatus = checklist.length
				})
				this.$axios.get('/history/withdraw', this.token).then((response) => {
					$('.preloader').hide()
					this.withdraw = response.data.payload
				})
				this.$axios.get('/history/bonus', this.token).then((response) => {
					$('.preloader').hide()
					this.bonus = response.data.payload
				})
			} else {
				console.log('Logout Bonusspecial')
				this.$router.push('/Logout')
			}
		},
	}
</script>

<style>
	.bg-radius-his {
		background: #262626;
		width: 105px;
		border-radius: 5px;
		padding: 6px 5px;
		border: 1px solid rgb(255, 255, 255);
		cursor: pointer;
	}
	.bg-radius-his2 {
		font-weight: 500;
		background: rgb(255, 255, 255);
		width: 105px;
		border-radius: 5px;
		padding: 6px 5px;
		cursor: pointer;
	}
	.border-his {
		background: #42424250;
		/* border: 1px solid #ffffff; */
	}
	.hr-his {
		border: 0.6px solid #ffffff;
		margin-right: -15px;
		margin-left: -15px;
	}
</style>
