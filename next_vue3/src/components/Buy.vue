<template>
	<div class="container">
		<!-- 商品展示区域 -->
		<div class="goods-card">
			<h3>商品：{{goodsName || '暂无'}}</h3>
			<p>价格：¥<span>{{ goodsId || '暂无'}}</span></p>
			<p>类型：{{goodsType || '暂无'}}</p>
			<p>我的余额：¥<span class="balance-text">{{ myBalance }}</span></p>
			<button class="buy-btn" @click="buyGoods" :disabled="isModalShow || isLoading">
				立即购买
			</button>
		</div>

		<!-- 全局加载动画（2秒内显示） -->
		<div class="loading-mask" v-if="isLoading">
			<div class="loading-spinner">
				<div class="spinner"></div>
				<p class="loading-text">加载中，请稍候...</p>
			</div>
		</div>

		<!-- 全局遮罩层：只做灰化遮挡，不绑定点击关闭事件 -->
		<div class="modal-mask" v-if="isModalShow"></div>

		<!-- 金额不足提示弹窗 -->
		<div class="modal-box" v-if="showTipModal">
			<h4 class="modal-title error">💸 购买失败</h4>
			<p>你的余额不足，还差 ¥{{ lackMoney }} 元</p>
			<button class="modal-btn" @click="closeModal">
				关闭弹窗
			</button>
		</div>

		<!-- 购买成功提示 -->
		<div class="modal-box" v-if="showSuccessModal">
			<h4 class="modal-title success">✅ 购买成功</h4>
			<p>已成功购买无线鼠标，扣款 ¥{{ goodsId }}</p>
			<button class="modal-btn" @click="closeSuccessModal">
				确定
			</button>
		</div>
	</div>
</template>

<script setup>
	import {
		ref,
		computed,
		onMounted,
		onBeforeUnmount
	} from 'vue';
	import {
		useRoute,
		useRouter
	} from 'vue-router'
	const route = useRoute()
	// 基础数据
	const goodsPrice = ref(99);
	const myBalance = ref(50);

	const goodsId = ref('')
	const goodsName = ref('')
	const goodsType = ref('')

	// 状态管理
	const showTipModal = ref(false); // 失败弹窗
	const showSuccessModal = ref(false); // 成功弹窗
	const lackMoney = ref(0); // 缺少金额
	const isLoading = ref(true); // 加载动画状态（初始为true，显示加载）
	let timer = null; // 定时器存储

	// 计算属性：任意弹窗显示则禁用按钮
	const isModalShow = computed(() => {
		return showTipModal.value || showSuccessModal.value;
	});

	// 购买逻辑（点击购买也显示加载动画+延迟）
	const buyGoods = () => {
		isLoading.value = true; // 点击购买后立即显示加载动画
		lackMoney.value = goodsId.value - myBalance.value;

		setTimeout(() => {
			isLoading.value = false; // 2秒后隐藏加载动画
			if (myBalance.value >= goodsId.value) {
				myBalance.value -= goodsId.value;
				showSuccessModal.value = true;
			} else {
				showTipModal.value = true;
			}
		}, 2000);
	};

	// 关闭弹窗方法
	const closeModal = () => {
		showTipModal.value = false;
	};
	const closeSuccessModal = () => {
		showSuccessModal.value = false;
	};

	// 页面加载后：显示加载动画→2秒后隐藏→弹弹窗
	onMounted(() => {
		goodsId.value = route.query.id
		goodsName.value = route.query.name
		goodsType.value = route.query.type
		lackMoney.value = goodsId.value - myBalance.value;
		console.log(goodsId.value, goodsName.value, goodsType.value)
		timer = setTimeout(() => {
			isLoading.value = false;

		}, 2000);
	});

	// 清理定时器，避免内存泄漏
	onBeforeUnmount(() => {
		if (timer) clearTimeout(timer);
	});
</script>

<style scoped>
	/* 全局容器 */
	.container {
		padding: 20px;
		max-width: 400px;
		margin: 0 auto;
		position: relative;
		z-index: 1;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	/* 加载圆圈样式 + 绑定动画 */
	.spinner {
		width: 40px;
		height: 40px;
		border: 4px solid #f3f3f3;
		/* 浅灰边框 */
		border-top: 4px solid #409eff;
		/* 蓝色顶部边框 */
		border-radius: 50%;
		/* 圆形 */
		animation: spin 1s linear infinite;
		/* 绑定旋转动画 */
	}

	/* 商品卡片 */
	.goods-card {
		border: 1px solid #eee;
		padding: 15px;
		border-radius: 8px;
	}

	.balance-text {
		color: #e64340;
	}

	/* 购买按钮：加载/弹窗时都禁用 */
	.buy-btn {
		margin-top: 10px;
		padding: 8px 16px;
		background: #409eff;
		color: #fff;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background 0.2s;
	}

	.buy-btn:hover {
		background: #337ecc;
	}

	.buy-btn:disabled {
		background: #c0c4cc;
		cursor: not-allowed;
		pointer-events: none;
	}

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

	/* 弹窗遮罩 */
	.modal-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
		user-select: none;
	}

	/* 弹窗主体 */
	.modal-box {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 300px;
		background: #fff;
		border-radius: 8px;
		padding: 20px;
		z-index: 1000;
		text-align: center;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
	}

	.modal-title {
		margin: 0 0 15px 0;
		font-size: 18px;
	}

	.modal-title.error {
		color: #e64340;
	}

	.modal-title.success {
		color: #67c23a;
	}

	.modal-btn {
		margin-top: 20px;
		padding: 8px 24px;
		background: #409eff;
		color: #fff;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background 0.2s;
	}

	.modal-btn:hover {
		background: #337ecc;
	}
</style>