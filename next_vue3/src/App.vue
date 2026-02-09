<script setup lang="ts">
	import HelloWorld from './components/HelloWorld.vue'
	import TheWelcome from './components/TheWelcome.vue'
	import WelcomeItem from './components/WelcomeItem.vue'
	import login from './components/Login/login.vue'
	// import NextBest from './components/NextBest.vue'
	import { useRoute, useRouter } from 'vue-router'
	import { ref } from 'vue'
	import { useCarouselStore } from './stores/carouselStore'
	import { watch } from 'vue'
	import { ElMessage } from 'element-plus'
	const carouselStore = useCarouselStore()
	// 获取当前路由信息
	const route = useRoute()//返回信息
	const router = useRouter()//跳转页面
	const activeNav = ref('home')

	let activebtn = (api) => {
		activeNav.value = api
		if (api === 'login') {
			if (carouselStore.isLogin) {
				carouselStore.isLogin = false
				ElMessage.success('退出成功，即将跳转登录页') // 立即显示，不等待
			} else {
				ElMessage.info('正在跳转登录页')
			}


			// 第二步：设置 1500 毫秒延迟，再执行跳转
			setTimeout(() => {
				router.push(`/${api}`) // 延迟 1.5 秒后跳转登录页
			}, 1500) // 1500 即 1.5 秒

			// 注意：这里不需要额外 return，setTimeout 不阻塞代码，但跳转逻辑已放在延迟里
			return // 可选：阻止后续可能的多余逻辑，更严谨
		}

		// 其他页面：无延迟直接跳转s
		setTimeout(() => {
			router.push(`/${api}`) // 延迟 1.5 秒后跳转登录页
		}, 150) // 1500 即 1.5 秒
	}
	watch(
		() => route.path, // 监听当前路由的路径变化
		(newPath) => {
			// 当路由跳转到 /home 时，把 activeNav 设为 'home'（和你导航的标识对应）
			if (newPath === '/home') {
				activeNav.value = 'home'
			} else if (newPath === '/buy') {
				activeNav.value = 'buy'
			}
		},

		{ immediate: true } // 初始化时立即执行一次，确保页面加载就同步状态
	)
</script>

<template>
	<div id="app">
		<header class="app-header" v-if="route.path !== '/login'">
			<div class="header-logo">
				<h1>XXXX网</h1>
			</div>
			<div class="header-btn">
				<div v-if="route.path == '/home'">
					<el-switch v-model="carouselStore.isCarouselShow" active-text="显示轮播" inactive-text="隐藏轮播"
						style="margin: 0 20px;" />
				</div>
				<div :class="{ active: activeNav === 'home' }" @click="activebtn('home')">主页</div>
				<div :class="{ active: activeNav === 'buy' }" @click="activebtn('buy')">限时</div>
				<div :class="{ active: activeNav === 'equipment' }" @click="activebtn('equipment')">资产</div>
				<div :class="{ active: activeNav === 'mine' }" @click="activebtn('mine')">我的</div>
				<div :class="{ active: false }" @click="activebtn('login')">
					<span v-if="carouselStore.isLogin">退出登录</span>
					<span v-else>去登录</span>
				</div>

			</div>


		</header>


		<router-view></router-view>



	</div>
</template>

<style scoped>
/* 第一步：彻底重置所有元素默认样式，消除边距、滚动条隐患 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 第二步：禁止横向滚动条（核心解决横向滑动问题） */
html, body {
  width: 100%;
  overflow-x: hidden !important;
}

/* 第三步：根容器只做基础配置，不限制高度，避免内容被压缩 */
#app {
  width: 100%;
}
	.app-header {
		height: 60px;
		width: 100vw;
		/* 头部高度（可自定义） */
		background-color: #fff;
		/* 头部背景色 */
		border-bottom: 1px solid #ebeef5;
		/* 底部分隔线 */
		display: flex;
		align-items: center;
		/* 垂直居中 */
		justify-content: space-between;
		/* 左右分布 */
		padding: 0 20px;
		/* 左右内边距 */
		position: sticky;
		/* 固定在顶部 */
		top: 0;
		z-index: 100;
		/* 确保头部在最上层 */
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
		/* 轻微阴影，提升层次感 */
	}

	.header-logo h1 {

		font-family: 'Noto Sans SC', sans-serif;
		font-weight: 700;
		font-size: clamp(1.5rem, 3vw, 2.2rem);
		letter-spacing: 2px;
		/* 渐变文字 + 柔和阴影 */
		background: linear-gradient(135deg, #8ca4c8 0%, #409eff 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

	}

	.header-btn {
		display: flex;
	}

	.header-btn div {
		margin: 0 20px;
		padding: 8px 0;
		cursor: pointer;
		transition: all 1s;
	}

	.header-btn div:hover {
		color: #409eff;
		/* 		border-bottom: 1px solid #ebeef5; */
	}

	.header-btn div.active {
		/* 		background-color: #55ff00; */
		border-bottom: 1px solid #409eff;
		color: #409eff;

	}


</style>