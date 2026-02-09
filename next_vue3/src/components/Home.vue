<template>
	<div class="container">
		<el-carousel v-if="carouselStore.isCarouselShow" :interval="4000" type="card" height="280px"
			style="padding: 10px 0;">
			<el-carousel-item v-for="(img, index) in carouselImages" :key="index">
				<!-- 包裹a标签实现点击跳转，覆盖整个图片区域 -->
				<a :href="img.link" class="carousel-link" target="_blank" rel="noopener noreferrer">
					<div class="carousel-img-wrapper">
						<img :src="img.url" :alt="img.alt" class="carousel-img">
					</div>
				</a>
			</el-carousel-item>
		</el-carousel>
		<div class="goods-page">
			<el-card class="goods-card" v-for="(id,index) in goodsmessage" :key="index" @click="mesbtn(id)">
				{{id.name}}
				<br />
				{{id.id}}
				<br />
				{{id.type}}
			</el-card>
		</div>
		<el-dialog v-model="messtatus" title="商品详情" width="50%" style="overflow: hidden;">
			<div v-loading="loading">
				<img :src='mescard.url' :alt='mescard.id' srcset="">
				<div>名称：{{ mescard.name }}</div>
				<div>价格：{{ mescard.id }}</div>
				<div>类型：{{ mescard.type }}</div>
				<button @click="buybtn(mescard)">商品购买</button>
			</div>

		</el-dialog>
	</div>
</template>

<script setup>
	import {
		useCarouselStore
	} from '../stores/carouselStore'
	const carouselStore = useCarouselStore()
	import {
		ref
	} from 'vue'
	import router from '@/router';
	const loading = ref(false)
	// 轮播图数据：新增link字段存储跳转地址
	const carouselImages = [{
			url: "https://picsum.photos/800/200?random=1",
			alt: "轮播图1",
			link: "https://www.baidu.com" // 跳转链接1
		},
		{
			url: "https://picsum.photos/800/200?random=2",
			alt: "轮播图2",
			link: "https://www.taobao.com" // 跳转链接2
		},
		{
			url: "https://picsum.photos/800/200?random=3",
			alt: "轮播图3",
			link: "https://www.jd.com" // 跳转链接3
		},
		{
			url: "https://picsum.photos/800/200?random=4",
			alt: "轮播图4",
			link: "https://www.vuejs.org" // 跳转链接4
		},
		{
			url: "https://picsum.photos/800/200?random=5",
			alt: "轮播图5",
			link: "https://element-plus.org" // 跳转链接5
		},
		{
			url: "https://picsum.photos/800/200?random=6",
			alt: "轮播图6",
			link: "https://www.github.com" // 跳转链接6
		}
	];
	const goodsmessage = [{
			name: "1",
			url: "https://picsum.photos/800/200?random=1",
			id: 10,
			type: "food"
		},
		{
			name: '2',
			url: "https://picsum.photos/800/200?random=1",
			id: 22,
			type: "iphone"
		},
		{
			name: '3',
			url: "https://picsum.photos/800/200?random=1",
			id: 35,
			type: "car"
		},
		{
			name: '4',
			url: "https://picsum.photos/800/200?random=1",
			id: 48,
			type: "book"
		},
		{
			name: '5',
			url: "https://picsum.photos/800/200?random=1",
			id: 53,
			type: "pen"
		},
		{
			name: '6',
			url: "https://picsum.photos/800/200?random=1",
			id: 69,
			type: "text"
		},

	];
	const messtatus = ref(false)
	const mescard = ref([])

	const mesbtn = (data) => {
		mescard.value = data
		messtatus.value = true
		loading.value = true
		setTimeout(() => {
			loading.value = false
		}, 1500)

	}
	const buybtn = (mescard) => {
		router.push({
			path: '/buy',
			query: {
				// 传递商品核心字段（查询参数，键值对形式）
				id: mescard.id,
				name: mescard.name,
				type: mescard.type

			}
		})
	}
</script>

<style scoped>
	.container {
		width: 100vw;
		height: 100vh;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	/* 跳转链接容器：覆盖整个轮播项，去除默认a标签样式 */
	.carousel-link {
		display: block;
		width: 100%;
		height: 100%;
		text-decoration: none;
		/* 去掉下划线 */
	}

	.carousel-link:hover {
		transform: scale(1.2);
		/* 等比例放大 1.2 倍，scale(1) 是原始大小 */
	}

	.carousel-img-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.carousel-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		/* 可选：添加鼠标悬浮效果，提示可点击 */
		cursor: pointer;
	}

	.goods-page {
		height: 100vh;
		/* 		background-color: seagreen; */
		flex-wrap: wrap;
		align-content: flex-start;
		display: flex;
	}

	.goods-card {
		width: 300px;
		height: 150px;
		/* 		background-color: red; */
		margin: 10px;
		padding: auto 0;
		cursor: pointer;


	}
</style>