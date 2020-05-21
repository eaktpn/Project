import Vue from 'vue'
import Router from 'vue-router'
const Allbaccarat_game = () => import('./components/Allbaccarat_game.vue')
const test = () => import('./components/test.vue')
Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Allbaccarat_game',
			components: {default: Allbaccarat_game},
		},
		{
			path: '/Allbaccarat_game',
			name: 'Allbaccarat_game',
			components: {default: Allbaccarat_game},
		},
		{
			path: '/test',
			name: 'test',
			components: {default: test},
		},
	],
})
