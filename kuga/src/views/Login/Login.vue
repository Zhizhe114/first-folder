<template>
	<div class="container">
		<div class="login-container">
			<h3>{{ route.name }}</h3>
			<h4>当前登录状态:{{userStore.isLogin}}</h4>
			<el-input v-model="account" style="width: 240px" placeholder="Please input your account" />
			<el-input v-model="password" style="width: 240px" type="password" placeholder="Please input your password"
				show-password />
			<div>
				<el-button type="primary" @click="handleLogin" style="width: 240px;">登录</el-button>
			</div>
			<p>登录即同意<a href="###" style="text-decoration: none;">用户协议</a>和<a href="###" style="text-decoration: none;">隐私政策</a></p>
		</div>

	</div>
</template>

<script setup lang="ts">
	import { useRoute, useRouter } from "vue-router"
	import { ref, onMounted } from "vue"
	import { useUserStore } from "@/stores/counter"
	import { ElMessage } from "element-plus"

	const route = useRoute()
	const router = useRouter()
	const userStore = useUserStore() // 获取仓库实例

	const account = ref('')
	const password = ref('')

	//挂载，在初始化时拿到仓库中的账号密码并显示在输入框上
	onMounted(() => {
		setTimeout(() => {
			account.value = userStore.account
			password.value = userStore.password
		}, 1000)

	})

	const handleLogin = () => {

		const success = userStore.login(account.value, password.value)
		if (success) { //判断为true，timeout延迟代码执行1.5秒
			setTimeout(() => {
				ElMessage.success('登录成功，即将跳转首页...')

				// 3. 第二步延迟：再等0.5秒（总共2秒）执行跳转
				setTimeout(() => {
					router.push('/home') // 这里才是真正的跳转，不会立即执行
				}, 500)
			}, 1500)
		} else {
			ElMessage.error('登录失败')
		}
	}
</script>
<style scoped>
	.container {
		width: 100vw;
		height: 100vh;
		/* 		background-color: #ffaa7f; */
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.login-container {
		width: 404px;
		height: 348px;
		border: 1px solid gainsboro;
		border-radius: 3%;
		/* 		align-content: center; */

		text-align: center;
	}
	.login-container>:first-child{
		margin-top:40px
	}


	.login-container>* {
		margin-top: 10px;
	}
	
	.login-container>:last-child{
		margin-top: 40px;
		font-size: 14px;
		color: #8A919F;
		
	}
</style>