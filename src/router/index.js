import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUp from '../views/Signup.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'SignUp',
		component: SignUp
	},
	{
		path: '/login',
		name: 'SignIn',
		component: () => import(/* webpackChunkName: "about" */ '../views/Signin.vue')
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
	},
	{
		path: '/users/verify/:email',
		name: 'VerifyEmail',
		component: () => import(/* webpackChunkName: "about" */ '../views/VerifyEmail.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router