import { createRouter, createWebHashHistory } from 'vue-router'
// 导入你的页面组件
import login from '../components/Login/login.vue'
import Home from '../components/Home.vue'
import Mine from '../components/Mine.vue'
import control from '../components/control/control.vue'
import Equipment from '../components/Equipment.vue'
import Buy from '../components/Buy.vue'


const routes = [
	{
		path: '/', // 默认路由
		redirect: '/home'
	},
	{
		path: '/login', // 默认路由
		name: 'Login',
		component: login
	},
	{
		path: '/home', // 默认路由
		name: 'Home',
		component: Home
	},
	{
		path: '/mine',
		name: 'Mine',
		component: Mine
	},
	{
		path: '/control',
		name: 'control',
		component: control
	},
	{
		path: '/equipment',
		name: 'Equipment',
		component: Equipment
	},
	{
		path: '/buy',
		name: 'Buy',
		component: Buy
	}
]

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL), // 使用哈希模式（URL带#），也可选择 createWebHistory() 无#模式
	routes
})

export default router