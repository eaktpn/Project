<template>
	<div>
		<div class="BG-linear">
			<div class="container">
				<div class="row">
					<div>
						<img src="/logo/baccarat.png" class="mx-2" width="100%;" style="max-width:125px;" />
					</div>
					<!-- <div class="col align-self-center text-right">
						<div class="font20" style="font-weight:400; margin-top:-30px;">
							<span class="mx-1"><img src="/icon/user.png" class="m-2" width="100%;" style="max-width:30px;" />ADO</span>
							<span class="mr-2"><img src="/icon/coin.png" class="rotate-y-positive mx-2" width="100%;" style="max-width:30px;" />200.00</span>
						</div>
					</div> -->
					<div class="col text-right mt-4 mr-2">
						<mdb-btn color="amber" class="py-2" @click="showModal = true">เข้าสู่ระบบ</mdb-btn>
					</div>
				</div>
				<div class="linear_gradient" style="margin: -35px 0px 0px 100px;"></div>
				<div class="row mt-4">
					<div class="col"><img src="/banner/banner.png" width="100%;" /></div>
				</div>
				<div class="row justify-content-center mt-2">
					<div class="col-xl col-md col-4">
						<a href="https://adosoft.net/SourceGaming/sexygame?user=ado001&pass=Aa112233" target="_bank"><img src="/btn_game/sexybaccarat.png" class="animate-flicker" width="100%;"/></a>
					</div>
					<div class="col-xl col-md col-4">
						<a href="https://adosoft.net/SourceGaming/dreamgame?user=ado001&pass=Aa112233" target="_bank"><img src="/btn_game/dreamgaming.png" width="100%;"/></a>
					</div>
					<div class="col-xl col-md col-4">
						<a href="https://adosoft.net/SourceGaming/pretty?user=ado001&pass=Aa112233" target="_bank"><img src="/btn_game/pretty.png" class="animate-flicker" width="100%;"/></a>
					</div>
					<div class="col-xl col-md col-4">
						<a href="https://adosoft.net/SourceGaming/ag?user=ado001&pass=Aa112233" target="_bank"><img src="/btn_game/ag.png" width="100%;"/></a>
					</div>
					<div class="col-xl col-md col-4">
						<a href="https://adosoft.net/SourceGaming/sagame?user=ado001&pass=Aa112233" target="_bank"><img src="/btn_game/sa.png" class="animate-flicker" width="100%;"/></a>
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<!-- <div class="module-border-wrap-condition">
        <div class="module-border-condition"> -->

			<div class="block">
				<div class="row justify-content-center module-border">
					<div class="col-xl-12 col-md-12 col-12 text-center mb-2">
						<div class="color_orange font22" style="font-weight:500;">
							ALLBACCARAT
						</div>
						<div class="font22" style="font-weight:400;">บาคาร่าออนไลน์</div>
					</div>
					<div class="col-xl-5 col-md-5 col-12">
						<img src="/sexy.jpg" width="100%;" />
					</div>

					<div class="col-xl-7 col-md-7 col-12 font14 mt-3">
						เราเป็นผู้ให้บริการบาคาร่าออนไลน์แบบเรียลไทม์ ส่งตรงจากบ่อน Casino ผู้เล่นสามารถดูไพ่ที่แจก ก่อนเริ่มเดิมพันได้ในเวลา 20-30 วินาที Baccarat Online เป็นเกมส์ที่มีเสน่ห์ มีนักพนันเล่นกันเป็นจำนวนมาก ผู้เล่นยังสามารถรับเงินรางวัลจากเกมส์ไปได้ ภายในเวลาไม่กี่วินาทีก่อนที่เกมส์การแข่งขันจะจบลงอีกด้วย และผู้เล่นจะได้รับประสบการณ์ การเล่นคาสิโนออนไลน์ที่ปลอดภัย โดยมีระบบตรวจสอบที่ได้รับการยอมรับในระดับสากล สมัครเล่นบาคาร่ากับ Sexybaccarat รับโบนัสแรกเข้าทันที และลุ้นรับโบนัสอีกมากมายกับโปรโมชั่นประจำเดือน สนใจเล่นบาคาร่ากับเราติดต่อเราได้ตลอด 24 ช.ม.
					</div>
				</div>
			</div>
			<!-- </div>
        </div> -->
			<div class="row justify-content-center text-center my-3 p-3">
				<div class="col align-self-center">
					<router-link to="/"><img src="/logo/sexybaccarat.png" width="100%;" style="max-width:100px;"/></router-link>
				</div>
				<div class="col align-self-center">
					<router-link to="/"><img src="/logo/dreamgaming.png" width="100%;" style="max-width:80px;"/></router-link>
				</div>
				<div class="col align-self-center">
					<router-link to="/"><img src="/logo/pretty-gaming.png" width="100%;" style="max-width:100px;"/></router-link>
				</div>
				<div class="col align-self-center">
					<router-link to="/"><img src="/logo/ag-asia-gaming.png" width="100%;" style="max-width:100px;"/></router-link>
				</div>
				<div class="col align-self-center">
					<router-link to="/"><img src="/logo/sagaming.png" width="100%;" style="max-width:100px;"/></router-link>
				</div>
			</div>
		</div>
		<mdb-modal class="color_back" :show="showModal" centered @close="showModal = false">
			<mdb-modal-body class="color_white font14 mt-4">
				<div class="row justify-content-center">
					<div class="col-11">
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="basic-addon">
									<i class="fas fa-user prefix"></i>
								</span>
							</div>
							<input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon" />
						</div>
						<div class="input-group mt-3">
							<div class="input-group-prepend">
								<span class="input-group-text" id="basic-addon">
									<i class="fas fa-user prefix"></i>
								</span>
							</div>
							<input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon" />
						</div>
					</div>
				</div>
			</mdb-modal-body>
			<div class="text-center mb-4">
				<mdb-btn color="amber" class="py-2" style="max-width:300px;">เข้าสู่ระบบ</mdb-btn>
			</div>
		</mdb-modal>
	</div>
</template>

<script>
	export default {
		name: 'Allbaccarat_game',
		data() {
			return {
				showModal: false,
			}
		},
	}
</script>

<style>
	.BG-linear {
		background: linear-gradient(180deg, #3f0bc3 0%, #3f0bc3 0.01%, rgba(231, 2, 249, 0.48) 50.52%, rgba(252, 0, 85, 0) 100%);
	}
	.col {
		padding-right: 5px;
		padding-left: 5px;
	}
	.linear_gradient {
		background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(255, 128, 0, 1) 0%, rgba(255, 255, 255, 0) 100%);
		height: 5px;
	}
	.btn-amber {
		color: #fff;
		font-size: 16px;
		background-color: #fa7c05 !important;
	}
	/* .module-border-wrap-condition {
  max-width: 100%;
  position: relative;
  background: linear-gradient(165deg, #3f0bc3, #c800ad);
  padding: 4px;
  border-radius: 6px !important;
}
.module-border-condition {
  background: #101010;
  color: white;
  padding: 20px 25px 25px 25px;
  border-radius: 6px !important;
} */
	.module-border {
		background: #101010;
		margin-right: 0px;
		margin-left: 0px;
		border-radius: 6px;
		padding: 20px;
	}
	.block {
		position: relative;
		margin-top: 40px;
		margin-right: 6px;
		margin-left: 6px;
		z-index: 1;
	}
	.block:before,
	.block:after {
		content: '';
		position: absolute;
		left: -2px;
		top: -2px;
		background: linear-gradient(45deg, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000, #fb0094, #0000ff, #00ff00, #ffff00, #ff0000);
		background-size: 400%;
		width: calc(100% + 4px);
		height: calc(100% + 4px);
		z-index: -1;
		animation: steam 30s linear infinite;
		border-radius: 6px;
	}

	@keyframes steam {
		0% {
			background-position: 0 0;
		}
		50% {
			background-position: 200% 0;
		}
		100% {
			background-position: 0 0;
		}
	}

	.block:after {
		filter: blur(12px);
		border-radius: 6px;
	}

	/*---------BG Modal----------*/
	.modal-header .close {
		color: #ffffff !important;
	}

	.modal-open .modal {
		background: #ffffff50 !important;
	}

	.modal-content {
		background-color: #181818 !important;
		padding: 10px !important;
		border-radius: 10px !important;
	}

	.modal-title {
		color: #ffffff !important;
	}

	.modal-body {
		color: #ffffff !important;
	}

	.modal[data-v-38054772] {
		background-color: rgba(0, 0, 0, 0.95) !important;
	}
</style>
