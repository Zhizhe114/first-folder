<!-- <template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
	  <el-aside>side</el-aside>
    </el-container>
  </div>
</template>



<script lang="ts" setup>

</script>
<style scoped>
 .el-header{
	 text-align: center;
	 background-color: bisque;
 }
</style> -->
<template>
  <div class="input-container">
    <!-- 输入框：绑定v-model存数据，监听keyup.enter触发提交 -->
    <input
      type="text"
      v-model="inputValue"
      @keyup.enter="handleSubmit" 
      placeholder="输入内容后按Enter提交"
      class="input-box"
    />
    
    <!-- 可选：提交按钮（点击也能提交，增强体验） -->
    <button @click="handleSubmit" class="submit-btn">提交</button>

    <!-- 展示提交的结果 -->
    <div v-if="submitResult" class="result">
      你提交的内容：{{ submitResult }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 1. 定义响应式变量：存储输入框内容、提交结果
const inputValue = ref(''); // 输入框内容
const submitResult = ref(''); // 提交后的展示结果

// 2. 定义提交方法
const handleSubmit = () => {
  // 第一步：校验输入（非空判断，避免提交空内容）
  if (!inputValue.value.trim()) {
    alert('请输入内容后再提交！');
    return; // 终止函数，不执行后续逻辑
  }

  // 第二步：处理提交逻辑（这里仅做展示，实际项目可发请求、存数据等）
  submitResult.value = inputValue.value; // 把输入内容赋值给结果变量
  console.log('提交的数据：', inputValue.value); // 控制台打印提交内容

  // 第三步：清空输入框（可选，提升体验）
  inputValue.value = '';
};
</script>

<style scoped>
/* 简单样式，让界面更易看 */
.input-container {
  margin: 20px;
}
.input-box {
  padding: 8px 12px;
  width: 300px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.submit-btn {
  padding: 8px 16px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.result {
  margin-top: 15px;
  color: #666;
  font-size: 14px;
}
</style>