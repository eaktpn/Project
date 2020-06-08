<template>
	<div id="app">
		<div class="preloader">
			<div class="container container--100 d-flex flex-column justify-content-between">
				<div id="loader" class="justify-content-center" style="margin-left:-175px; margin-top:170px;"></div>
				<div class style="border-radius: 50%; margin-left: auto; margin-right: auto;">
					<img src="/images/logo/sexy222.png" alt="..." class style="border-radius:20%; width:270px; margin-top:-380px; margin-right:0px;" />
				</div>
				<div class="row justify-content-center"></div>
			</div>
		</div>
		<router-view name="header" />
		<router-view name="default" />
		<router-view name="footer" />
	</div>
</template>

<script>
	import firebase from 'firebase'
	import {mapGetters} from 'vuex'
	import $ from 'jquery'
	const firebaseConfig = {
		databaseURL: 'https://topup-sexy222.firebaseio.com/',
	}
	firebase.initializeApp(firebaseConfig)
	export default {
		name: 'app',
		data() {
			return {}
		},
		created() {
			$('.preloader').show()
			setTimeout(() => {
				$('.preloader').hide()
			}, 2000)
		},
		methods: {
			...mapGetters({
				isLogin: 'isLogin',
			}),
		},
		mounted() {
			if (location.protocol != 'https:') {
				location.href = 'https:' + window.location.href.substring(window.location.protocol.length)
			}
		},
	}
</script>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=Mitr:200,300,400,500,600,700&display=swap&subset=latin-ext,thai,vietnamese');
	@import url('./assets/index.css');
	@import url('./assets/ring.css');
	@import url('./assets/loading.css');

	#app,
	html,
	body {
		font-family: 'Mitr', sans-serif;
		font-weight: 300;
		background: #181818;
		color: #ffffff;
		overflow-x: hidden;
	}
	p,
	li,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	a {
		font-family: 'Mitr', sans-serif !important;
	}
	// div {
	//    border: 1px solid #8d8c8c3d !important;
	// }
</style>
