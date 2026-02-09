<template>
	<header>
		<div class="na_bar" v-loading="loading" @click="abtn">
			<scan >导航栏</scan>
		</div>
	</header>
	<div class="slider-demo-block">
		<el-slider v-model="value" show-input size="small" />
	</div>
	<el-timeline>
		<el-timeline-item v-for="(timesum,index) in activities" :key="index" :timestamp="timesum.timestamp">
			{{timesum.content}}
		</el-timeline-item>
	</el-timeline>
	<div>
		<el-carousel :interval="4000" type="card" height="200px">
			<el-carousel-item v-for="item in 6" :key="item">
				<h3 text="2xl" justify="center">{{ item }}</h3>
			</el-carousel-item>
		</el-carousel>
	</div>
	<el-switch v-model="value1" />{{value1}}
	<el-button class="!ml-0" :plain="true" @click="open4">Error</el-button>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'
	import { ElMessage } from 'element-plus'
	const loading = ref(false)
	const value1 = ref(true)
	let abtn = () =>{
		loading.value = true
		  setTimeout(() => {
		    loading.value = false
		    ElMessage.success('Loading已关闭')
			ElMessage.error('Loading关闭失败')
			ElMessage.info('Loading加载中')
			ElMessage.warning('关闭失败')
			ElMessage.primary("加载")
		  }, 1500)
	}
	const open4 = () => {
	  ElMessage.error('Oops, this is a error message.')
	}

	let activities = [
		{
			content: 'start',
			timestamp: '04-15'
		},
		{
			content: 'loading',
			timestamp: '04-16'
		},
		{
			content: 'end',
			timestamp: '04-17'
		}
	]
</script>

<style scoped>
	.na_bar {
		width: 100%vh;
		height: 40px;
		background-color: azure;
	}

	.slider-demo-block {
		max-width: 200px;
		display: flex;
		align-items: center;
	}

	.slider-demo-block .el-slider {
		margin-top: 0;
		margin-left: 12px;
	}
	.el-carousel__item h3 {
	  color: #475669;
	  opacity: 0.75;
	  line-height: 200px;
	  margin: 0;
	  text-align: center;
	}
	
	.el-carousel__item:nth-child(2n) {
	  background-color: #99a9bf;
	}
	
	.el-carousel__item:nth-child(2n + 1) {
	  background-color: #d3dce6;
	}
</style>