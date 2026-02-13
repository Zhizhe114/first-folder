<script setup lang="ts">
	import { useRoute, useRouter } from 'vue-router' //导入路由文件
	import { ref } from 'vue'
	// 获取当前路由信息
	const route = useRoute()//返回信息
	const router = useRouter()//跳转页面
</script>

<template>
	<router-view></router-view> <!-- 展示路由页面 -->
	
</template>

<style scoped></style>