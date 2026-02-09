<template>
	<input type="text" v-model="user" placeholder="账号" />
	<input type="password" v-model="password" placeholder="密码" />
	<button @click="login">登录</button>

		<div class="loading-mask" v-if="isLoading">
			<div class="loading-spinner">
				<div class="spinner"></div>
				<p class="loading-text">加载中，请稍候...</p>
			</div>
		</div>
</template>

<script lang="ts" setup>
	import { ref } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import { useCarouselStore } from '@/stores/carouselStore'
	import { ElMessage } from 'element-plus'
	const store = useCarouselStore() // 引入 pinia
	// const one = 'admin'
	// const two = '123456'
	const user = ref(store.userInfo.username)
	const password = ref(store.userInfo.password)
	const route = useRoute()
	const router = useRouter()
		const isLoading = ref(false); // 加载动画状态（初始为true，显示加载）
	const login = () => {
		isLoading.value = true// 延迟 1.5 秒后跳转登录页
		// 调用 pinia 里的 login 方法验证
		const success = store.login(user.value, password.value)

		if (success) {
			setTimeout(() => {
			isLoading.value = false
			router.push('/home')
			}, 1500) // 1500 即 1.5 秒

		} else {
			isLoading.value = false
			ElMessage.error('账号或密码错误')
		}
	}
</script>

<style scoped>
	/* 加载动画遮罩（全屏） */
	.loading-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(255, 255, 255, 0.8);
		z-index: 1001;
		/* 层级高于弹窗遮罩，确保加载动画在最上层 */
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	
	.loading-spinner {
		display: flex;
		flex-direction: column;
		align-items: center;
		/* 水平居中 */
		justify-content: center;
		/* 垂直居中 */
		gap: 8px;
		/* 可选：增加转圈和文字的间距 */
	}
	
	/* 加载动画（旋转的圆圈） */
	.loading-spinner .spinner {
		width: 40px;
		height: 40px;
		border: 4px solid #f3f3f3;
		border-top: 4px solid #409eff;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin-bottom: 10px;
	}
	
	/* 加载文字 */
	.loading-text {
		color: #666;
		font-size: 14px;
	}
	
	/* 旋转动画关键帧 */
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
	
		100% {
			transform: rotate(360deg);
		}
	}
	
</style>