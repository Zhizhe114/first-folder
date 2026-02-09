<template>
	<div class="container">
		<div class="userInfo" v-if="store.isLogin">
			<div>
				<p>账号信息</p>
				昵称：{{store.userInfo.nickname}}
				账号：{{ store.userInfo.username }}
				密码：{{passwordDots}}
			</div>
			<div style="cursor: pointer;" @click="dialogVisible = true">
				修改个人信息
			</div>
		</div>
		<div>{{ nowTime }}</div>
		<input v-model="phone" @input="phone = onlyNumber(phone)" placeholder="请输入手机号" />
		<p>{{addArrow(12,24)}}</p>
		<p>{{arrsum(arr1)}}</p>
		<p>{{getLevel(80)}}</p>
		<p>{{getchoose(user1)}}</p>
		<p>{{num1}}</p>
		<p>{{reqString('qqwertyuiop')}}</p>
		<el-dialog v-model="dialogVisible" width="50%">
			<h1 style="font-size: 16px;">详情</h1>

			<p>昵称: <input type="text" v-model="nickname" placeholder="请输入" /></p>
			<p>账号: <input type="text" v-model="username" placeholder="请输入" /></p>
			<p>密码: <input type="text" v-model="password" placeholder="请输入" /></p>
			<span>
				<button @click="handleUpdate">确认</button>
			</span>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { computed } from 'vue'
	import { useCarouselStore } from '@/stores/carouselStore'
	import { ElMessage, ElMessageBox } from 'element-plus'
	import { useNowTime } from '@/hooks/useNowTime'
	// setup / data 中

	const store = useCarouselStore()
	const nickname = ref(store.userInfo.nickname)
	const username = ref(store.userInfo.username)
	const password = ref(store.userInfo.password)
	const phone = ref('');
	const dialogVisible = ref(false)
	const { nowTime } = useNowTime()


	const handleUpdate = () => {
		// 调用 Pinia 中的方法，更新全局状态
		ElMessageBox.confirm(
			'是否进行更改？',
			'修改',
			{
				confirmButtonText: 'Yes',
				cancelButtonText: 'Cancel',
				type: 'info',
				center: true,
			}
		)
			.then(() => {
				store.updateUserInfo(nickname.value, username.value, password.value)
				ElMessage({
					type: 'success',
					message: '修改成功',
				})

			})
		// .catch(() => {
		//   ElMessage({
		//     type: 'info',
		//     message: '取消',
		//   })
		// })

	}
	//输入为数字
	const onlyNumber = (value : string) : string => {
		return value.replace(/[^0-9]/g, '');
	};
	let addArrow = (a : number, b : number) : number => a + b;
	let arr1 = [6, 6, 6, 6];
	let user1 = { name: 'hon' };
	let num1 = Math.floor(Math.random() * 10)
	//循环
	function arrsum(arr : number[]) : number {
		let sum = 0;
		for (let i = 0; i < arr.length; i++) {
			sum += arr[i]!;
		}
		return sum;
	}
	//成绩判断
	function getLevel(score : number) : string {
		if (score < 0 || score > 100) {
			return '1';
		}
		if (score >= 90) {
			return '2';
		} else {
			return '0';
		}
	}
	//空值调用
	function getchoose(user : {
		name : string;
		age ?: number;
		city ?: string
	}) : string {
		let age = user.age || 18;
		let city = user.city || '未知';
		return `姓名：${user.name},${age},${city}`;

	}
	//获取值，拆分为数组，反转数组，合并为字符串
	function reqString(str : string) : string {
		if (str == '') return '';
		return str.split('').reverse().join('');
	}
	const passwordDots = computed(() => {
		const pwd = store.userInfo.password || ''
		return '•'.repeat(pwd.length)
	})
</script>
<style scoped>
	.container {
		width: 100vw;
		height: 100vh;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.userInfo {
		/* width: 100vw; */
		background-color: cadetblue;
		display: flex;
		justify-content: space-between;
		align-items: center;

	}
</style>