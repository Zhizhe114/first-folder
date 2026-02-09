<template>
	<!-- 页面最外层容器：控制整体布局 -->
	<div class="app-container">
		<!-- 头部导航栏（固定在顶部） -->
		<header class="app-header">
			<div class="header-logo">系统管理平台</div>
			<div class="header-nav">
				<el-badge :value="num1" class="item" @click="clicknum">
					<div class="nav-item" :class="{ active: activeNav === 'message' }" @click="activeNav = 'message'">消息
					</div>
				</el-badge>
				<div class="nav-item" :class="{ active: activeNav === 'home' }" @click="activeNav = 'home'">首页</div>
				<div class="nav-item" :class="{ active: activeNav === 'device' }" @click="activeNav = 'device'">设备</div>
				<div class="nav-item" :class="{ active: activeNav === 'control' }" @click="activeNav = 'control'">控制
				</div>
				<div class="nav-item" :class="{ active: activeNav === 'mine' }" @click="activeNav = 'mine'">我的</div>
			</div>
		</header>

		<!-- 主体内容区（头部下方，占满剩余高度） -->
		<div class="app-main">
			<!-- 左侧菜单 -->
			<div class="sidebar-menu">
				<h3 class="menu-title">Data 数据展示</h3>
				<ul class="menu-list">
					<li v-for="item in menuItems" :key="item.key"
						:class="{ 'menu-item': true, 'active': activeKey === item.key }"
						@click="handleItemClick(item.key)">
						{{ item.label }}

					</li>
				</ul>
			</div>

			<!-- 右侧内容展示区 -->
			<main class="content-area">
				<div class="content-wrapper">
					<el-card style="max-width: 480px;">
						<template #header>
							<div class="card-header">
								<span>{{activeKeyLabel}}</span>
							</div>
						</template>
						<p>{{activeKeyLabel}}的区域</p>
						<template #footer>{{activeKeyLabel}}</template>
					</el-card>
				</div>
				<div class="content-wrapper">
					<div class="img-container">
						<img src="https://picsum.photos/800/400" alt="示例图片" class="zoom-img">
					</div>
				</div>
			</main>
		</div>
	</div>
</template>

<script setup>
	import {
		ref,
		computed
	} from 'vue'

	// 头部导航激活状态
	const activeNav = ref('device')
	const num1 = ref(0)
	const clicknum = () => {
		num1.value += 1
		console.log(num1.value)
	}
	// 左侧菜单数据
	const menuItems = [{
			key: 'avatar',
			label: 'Avatar 头像'
		},
		{
			key: 'badge',
			label: 'Badge 徽章'
		},
		{
			key: 'calendar',
			label: 'Calendar 日历'
		},
		{
			key: 'card',
			label: 'Card 卡片'
		},
		{
			key: 'carousel',
			label: 'Carousel 走马灯'
		},
		{
			key: 'collapse',
			label: 'Collapse 折叠面板'
		},
		{
			key: 'descriptions',
			label: 'Descriptions 描述列表'
		},
		{
			key: 'empty',
			label: 'Empty 空状态'
		},
		{
			key: 'image',
			label: 'Image 图片'
		},
		{
			key: 'infinite-scroll',
			label: 'Infinite Scroll 无限滚动'
		},
		{
			key: 'pagination',
			label: 'Pagination 分页'
		},
		{
			key: 'progress',
			label: 'Progress 进度条'
		},
		{
			key: 'result',
			label: 'Result 结果'
		}
	]

	// 左侧菜单激活状态
	const activeKey = ref('carousel')

	// 点击左侧菜单项
	const handleItemClick = (key) => {
		activeKey.value = key
	}

	// 计算属性：获取当前激活菜单的文字（用于右侧内容区展示）
	const activeKeyLabel = computed(() => {
		const activeItem = menuItems.find(item => item.key === activeKey.value)
		return activeItem ? activeItem.label : '无'
	})
</script>

<style scoped>
	/* 	.item {
	  margin-top: 10px;
	  margin-right: 40px;
	} */
	/* 全局布局样式 */
	.app-container {
		width: 100vw;
		/* 宽度占满屏幕 */
		height: 100vh;
		/* 高度占满屏幕 */
		display: flex;
		flex-direction: column;
		/* 头部+主体垂直排列 */
		overflow: hidden;
		/* 隐藏整体滚动条 */
	}

	/* 头部导航样式 */
	.app-header {
		height: 60px;
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

	.header-logo {
		font-size: 18px;
		font-weight: 600;
		color: #409eff;
	}

	.header-nav {
		display: flex;
		gap: 30px;
		/* 导航项之间的间距 */
	}

	.nav-item {
		font-size: 14px;
		color: #606266;
		cursor: pointer;
		padding: 8px 0;
		border-bottom: 2px solid transparent;
		transition: all 0.3s;
	}

	.nav-item:hover {
		color: #409eff;
	}

	.nav-item.active {
		color: #409eff;
		border-bottom-color: #409eff;
		font-weight: 500;
	}

	/* 主体内容区：占满头部下方剩余高度 */
	.app-main {
		flex: 1;
		/* 自动占满剩余高度 */
		display: flex;
		/* 左侧菜单+右侧内容水平排列 */
		overflow: hidden;
		/* 隐藏主体区滚动条 */
	}

	/* 左侧菜单样式 */
	.sidebar-menu {
		width: 240px;
		/* 菜单宽度 */
		background-color: #fff;
		/* 菜单背景色 */
		border-right: 1px solid #ebeef5;
		/* 右侧分隔线 */
		overflow-y: auto;
		/* 菜单内容超出时内部滚动 */
		padding: 20px 0;
		/* 上下内边距 */
	}

	.menu-title {
		padding: 0 20px 12px;
		font-size: 14px;
		font-weight: 600;
		color: #303133;
		border-bottom: 1px solid #ebeef5;
		margin: 0 0 16px 0;
	}

	.menu-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}


	.menu-item {
		padding: 10px 20px;
		font-size: 14px;
		color: #606266;
		cursor: pointer;
		transition: all 0.3s;
		border-left: 3px solid transparent;
	}

	.menu-item:hover {
		background-color: #f5f7fa;
		color: #409eff;
	}

	.menu-item.active {
		background-color: #ecf5ff;
		color: #409eff;
		border-left-color: #409eff;
		font-weight: 500;
	}

	/* 右侧内容区样式 */
	.content-area {
		flex: 1;
		/* 占满剩余宽度 */
		background-color: #f9fafc;
		/* 内容区背景色 */
		overflow-y: auto;
		/* 内容超出时内部滚动 */
		padding: 20px;
	}

	.content-wrapper {

		background-color: #fff;
		padding: 20px;
		border-radius: 4px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
	}

	.img-container {
		transition: transform 0.3s ease;
		width: 400px;
		/* 容器宽度 */
		height: 200px;
		/* 容器高度 */
		overflow: hidden;
		/* 裁剪放大后超出容器的部分 */
		margin: 20px;
	}

	/* 图片基础样式：保证等比例 */
	.zoom-img {
		width: 100%;
		/* 图片占满容器 */
		height: 100%;
		/* 图片占满容器 */
		object-fit: cover;
		/* 等比例覆盖容器，避免变形 */
		/* 核心：过渡动画，让放大/还原更丝滑 */

		/* 可选：设置放大中心点（默认是图片中心） */
		transform-origin: center center;
	}

	/* 鼠标移入：放大 1.2 倍 */
	.img-container:hover {
		transform: scale(1.2);
		/* 等比例放大 1.2 倍，scale(1) 是原始大小 */
	}
</style>