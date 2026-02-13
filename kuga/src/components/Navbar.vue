<!-- src/components/Navbar.vue -->
<template>
	<!-- 导航栏结构（示例） -->
	<div class="navbar">
		<a href="/home" :class="{ active: route.name === '主页'}">首页</a>
		<a href="/mine" :class="{ active: route.name === '我的' }">我的</a>
		<a href="???" :class="{ active: route.name === '???' }">###</a>
		<a href="###" :class="{ active: route.name === '###' }">登录状态：{{userStore.isLogin}}</a>

		<button @click="logout" class="logout-btn">
			<!-- 判断登录状态显示对应提示 -->
			{{userStore.isLogin ? '退出登录' : '去登录'}}

		</button>

	</div>
</template>

<script setup lang="ts">
	import { useRoute, useRouter } from 'vue-router'
	import { useUserStore } from '@/stores/counter'
	const route = useRoute()
	const router = useRouter()
	const userStore = useUserStore()

	// 退出登录逻辑
	const logout = () => {
		userStore.isLogin = false
		localStorage.removeItem('isLogin')
		router.push('/login')
	}
</script>

<style scoped>
	/* 导航栏样式（示例） */
	.navbar {
		height: 60px;
		width: 100vw;
		line-height: 60px;
		background-color: #fff;
		border-bottom: 1px solid #ebeef5;
		/* 		background: #333; */
		padding: 0 20px;
		display: flex;
		gap: 20px;
		/* 子元素垂直居中 */
		align-items: center;
	}

	.navbar a {
		color: black;
		text-decoration: none;

		/* 去掉链接下划线 */
	}

	.navbar a:hover {
		border-bottom: 1px solid #333;

	}

	.navbar a.active {
/* 		目前所在页面,对应按钮高亮 */
		color: #409eff;
	}

	.logout-btn {
		width: 100px;
		height: 50px;
		text-align: center;
		border-radius: 5px;
		/* 左边元素拉满,向右挤 */
		margin-left: auto;
		background: #1aecff;
		border: none;
		padding: 5px 10px;
		cursor: pointer;
	}
</style>