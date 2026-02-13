import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from "@/stores/counter"

const routes = [
	{
		path: "/",
		redirect: '/home'//默认跳转到首页
	},
	{
		path: "/login",
		name: '登录',
		component: () => import('@/views/Login/Login.vue')
	},
	{
		path: "/home",
		name: "主页",
		component: () => import('@/views/Home/Home.vue'),

	},
	{
		path: "/mine",
		name: "我的",
		component: () => import('@/views/Mine/Mine.vue'),
		meta: { requiresAuth: true } //登录检测，说明这个页面需要判断通过后才能进入
	}
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes //导入路由
})

router.beforeEach((to, from, next) => {
	console.log(to.path) // 输出：/home 表明你要跳转的页
	console.log(from.path) // 输出：/login 表明你从哪个页面来
	console.log(to.meta.requiresAuth) // 输出：true（你标记的“需要登录”）
	//导入isLogin
	const userStore = useUserStore()


	if (to.meta.requiresAuth) {  //需要检测的，为true往下执行

		if (userStore.isLogin) {//登录状态为true往下执行
			next()//执行跳转
		} else {//为false回到登录页
			next('/login')
		}
	} else { //不需要检测的，为false往下执行
		if (to.path === '/login' && userStore.isLogin) { //如果范围登录页，且登录状态为true
			setTimeout(() => {
				next('/home')//延迟两秒跳到首页
			}, 2000)
		} else {
			next()//执行范围登录页
		}
	}
})




export default router